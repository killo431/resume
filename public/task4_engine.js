// AZ-104 Study Engine — dashboard interaction layer (production-hardened)
(function () {
  'use strict';

  // ─── Constants ─────────────────────────────────────────────────────────────
  var STORAGE_KEY = 'az104_dashboard_state_v2';
  var LEGACY_STORAGE_KEY = 'az104_app_state';
  var TIMER_START_SECONDS = 20 * 60;
  var STUDY_DAYS = 14;
  var MIN_SUBNET_CIDR = 16;
  var MAX_SUBNET_CIDR = 30;
  var timerHandle = null;

  // ─── State ─────────────────────────────────────────────────────────────────
  var state = loadState();

  // ─── Per-domain tab state ──────────────────────────────────────────────────
  var domainTabState = { dom1: 'schedule', dom2: 'schedule', dom3: 'schedule', dom4: 'schedule', dom5: 'schedule' };

  // ─── Per-domain day index ──────────────────────────────────────────────────
  var domainDayIndex = { dom1: 0, dom2: 0, dom3: 0, dom4: 0, dom5: 0 };

  // ─── Mock quiz state ───────────────────────────────────────────────────────
  var mockState = { activeDomain: 'all', index: 0 };

  // ─── Utility ───────────────────────────────────────────────────────────────
  function byId(id) { return document.getElementById(id); }
  function sectionFromKey(key) { return byId('section-' + key); }
  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  // ─── State persistence ─────────────────────────────────────────────────────
  function loadState() {
    var defaults = {
      activeSection: 'overview', timerSeconds: TIMER_START_SECONDS,
      timerRunning: false, answers: {}, completedDomains: [], weaknessNotes: {},
      completedBlocks: {}
    };
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        var legacyRaw = localStorage.getItem(LEGACY_STORAGE_KEY);
        if (legacyRaw) {
          var migrated = Object.assign({}, defaults, JSON.parse(legacyRaw));
          localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
          localStorage.removeItem(LEGACY_STORAGE_KEY);
          return migrated;
        }
        return defaults;
      }
      return Object.assign({}, defaults, JSON.parse(raw));
    } catch (e) {
      console.warn('[AZ104] Failed to load state:', e);
      return defaults;
    }
  }

  function saveState() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
    catch (e) { console.warn('[AZ104] Failed to save state:', e); }
  }

  // ─── Boot checks ──────────────────────────────────────────────────────────
  function checkDependencies() {
    var missing = [];
    var warnings = [];

    if (typeof az104Domains === 'undefined' || !Array.isArray(az104Domains) || !az104Domains.length) {
      missing.push('az104Domains (task2_data.js)');
    }
    if (typeof dailySchedules === 'undefined' || typeof dailySchedules !== 'object') {
      missing.push('dailySchedules (task2_data.js)');
    }
    if (typeof az104Questions === 'undefined' || !Array.isArray(az104Questions) || !az104Questions.length) {
      missing.push('az104Questions (task3_questions.js)');
    }
    if (typeof domainQuestionDatabase === 'undefined') {
      warnings.push('domainQuestionDatabase not found — using filter fallback');
    }
    if (typeof studyGuides === 'undefined') {
      warnings.push('studyGuides not found — study guide tabs will be empty');
    }

    if (warnings.length) console.warn('[AZ104]', warnings.join('; '));

    return missing;
  }

  function showLoadError(missingModules) {
    var banner = document.createElement('div');
    banner.id = 'az104-load-error';
    banner.style.cssText = [
      'position:fixed;top:0;left:0;right:0;z-index:99999',
      'background:#7f1d1d;color:#fecaca;padding:1rem 1.5rem',
      'font-size:0.88rem;line-height:1.6;border-bottom:2px solid #ef4444',
      'pointer-events:auto;user-select:text'
    ].join(';');
    banner.innerHTML =
      '<strong style="color:#fca5a5">⚠️ AZ-104 Dashboard: Missing Data Modules</strong><br>' +
      'The following required data files failed to load: <br>' +
      missingModules.map(function(m) { return '&nbsp;&nbsp;• ' + escapeHtml(m); }).join('<br>') + '<br>' +
      '<em>Check the browser Console (F12) for 404 errors on task2_data.js / task3_questions.js. ' +
      'Navigation and quizzes may not function correctly.</em>' +
      '<button onclick="this.parentElement.remove()" style="float:right;margin-top:-1.5rem;' +
      'background:transparent;border:1px solid #fca5a5;color:#fca5a5;padding:0.2rem 0.5rem;' +
      'border-radius:4px;cursor:pointer;font-size:0.75rem">✕ Dismiss</button>';
    document.body.insertBefore(banner, document.body.firstChild);
  }

  // ─── Toast ─────────────────────────────────────────────────────────────────
  function showToast(message) {
    var el = byId('toast-notification');
    if (!el) {
      el = document.createElement('div');
      el.id = 'toast-notification';
      el.className = 'toast-notification';
      document.body.appendChild(el);
    }
    el.textContent = message;
    el.classList.add('show');
    setTimeout(function () { el.classList.remove('show'); }, 1700);
  }

  // ─── Section management ────────────────────────────────────────────────────
  function sectionIds() {
    return ['overview', 'dom1', 'dom2', 'dom3', 'dom4', 'dom5', 'mock', 'keywords', 'errorlog', 'cheat'];
  }

  function showSection(key) {
    sectionIds().forEach(function (id) {
      var section = sectionFromKey(id);
      var nav = byId('nav-' + id);
      if (section) section.classList.toggle('active', id === key);
      if (nav) nav.classList.toggle('active', id === key);
    });
    state.activeSection = key;
    saveState();
    if (key === 'errorlog') renderWeaknessLog();
    if (key === 'mock') renderMockReview();
  }

  function bindNavigation() {
    sectionIds().forEach(function (id) {
      var nav = byId('nav-' + id);
      if (nav) nav.addEventListener('click', function () { showSection(id); });
    });
    ['dom1', 'dom2', 'dom3', 'dom4', 'dom5'].forEach(function (id) {
      var card = byId('dlc-' + id);
      if (card) card.addEventListener('click', function () { showSection(id); });
    });
  }

  // ─── Timer ─────────────────────────────────────────────────────────────────
  function formatSeconds(s) {
    var m = Math.floor(s / 60);
    return String(m).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
  }

  function updateTimerUI() {
    var td = byId('timer-display'), tm = byId('timer-mode');
    if (td) td.textContent = formatSeconds(state.timerSeconds);
    if (tm) tm.textContent = state.timerRunning ? 'FOCUS MODE' : 'STUDY MODE';
  }

  function tickTimer() {
    if (!state.timerRunning) return;
    state.timerSeconds = Math.max(0, state.timerSeconds - 1);
    updateTimerUI(); saveState();
    if (state.timerSeconds === 0) {
      state.timerRunning = false;
      clearInterval(timerHandle); timerHandle = null;
      updateTimerUI(); showToast('⏱ Timer complete!'); saveState();
    }
  }

  function bindTimer() {
    var s = byId('btn-start'), p = byId('btn-pause'), r = byId('btn-reset');
    if (s) s.addEventListener('click', function () {
      if (state.timerRunning) return;
      state.timerRunning = true; updateTimerUI(); saveState();
      if (!timerHandle) timerHandle = setInterval(tickTimer, 1000);
    });
    if (p) p.addEventListener('click', function () {
      state.timerRunning = false; updateTimerUI(); saveState();
    });
    if (r) r.addEventListener('click', function () {
      state.timerRunning = false; state.timerSeconds = TIMER_START_SECONDS;
      updateTimerUI(); saveState();
    });
    if (state.timerRunning && !timerHandle) timerHandle = setInterval(tickTimer, 1000);
    updateTimerUI();
  }

  // ─── Data helpers ──────────────────────────────────────────────────────────
  function domainNumberFromId(domainId) {
    var m = String(domainId || '').match(/(\d+)/);
    if (m) return Number(m[1]);
    return { domain1: 1, domain2: 2, domain3: 3, domain4: 4, domain5: 5 }[String(domainId || '').toLowerCase()] || 0;
  }

  function questionsForDomain(domainId) {
    if (typeof az104Questions === 'undefined') return [];
    return az104Questions.filter(function (q) { return q.domain === domainId; });
  }

  function allQuestions() {
    return typeof az104Questions === 'undefined' ? [] : az104Questions.slice();
  }

  function answerForQuestion(question) {
    return state.answers[String(question.id)] || null;
  }

  function setAnswer(question, letter) {
    state.answers[String(question.id)] = letter;
    if (letter !== question.correct) {
      state.weaknessNotes[String(question.id)] = question.question;
    } else {
      delete state.weaknessNotes[String(question.id)];
    }
    saveState();
    renderWeaknessLog();
    updateStats();
  }

  function daysForDomain(domainId) {
    if (typeof dailySchedules === 'undefined') return [];
    return Object.keys(dailySchedules).filter(function (k) {
      return dailySchedules[k].domain === domainId;
    }).sort();
  }

  // ─── Question card ─────────────────────────────────────────────────────────
  function createQuestionCard(question, index, total) {
    var wrapper = document.createElement('div');
    wrapper.className = 'question-card';
    var answered = answerForQuestion(question);
    var isAnswered = !!answered;
    var isCorrect = isAnswered && answered === question.correct;
    if (isAnswered) wrapper.classList.add(isCorrect ? 'answered-correct' : 'answered-wrong');

    var html = '<div class="question-header">';
    html += '<div class="question-number">Question ' + (index + 1) + ' / ' + total + '</div>';
    html += '<div class="scenario-badge">' + escapeHtml((question.difficulty || 'mixed').toUpperCase()) + '</div>';
    html += '</div>';
    html += '<div class="question-text">' + escapeHtml(question.question) + '</div>';
    html += '<div class="options-grid">';
    (question.options || []).forEach(function (opt, i) {
      var letter = String.fromCharCode(65 + i);
      var cls = 'option-btn';
      if (isAnswered) {
        if (letter === question.correct) cls += ' correct';
        else if (letter === answered) cls += ' wrong';
      }
      html += '<button class="' + cls + '" data-qid="' + question.id + '" data-letter="' + letter + '" ' + (isAnswered ? 'disabled aria-disabled="true"' : '') + '>';
      html += '<strong>' + letter + '.</strong> <span>' + escapeHtml(opt) + '</span></button>';
    });
    html += '</div>';
    html += '<div class="explanation-card ' + (isAnswered ? 'visible' : 'hidden') + '" aria-hidden="' + (!isAnswered) + '">' +
      '<div class="explanation-content"><b>Explanation:</b> ' + escapeHtml(question.explanation || '') + '</div></div>';

    wrapper.innerHTML = html;
    return wrapper;
  }

  // ─── Domain section rendering ──────────────────────────────────────────────
  function renderDomainSections() {
    if (typeof az104Domains === 'undefined') return;

    az104Domains.forEach(function (domain) {
      var domNum = domainNumberFromId(domain.id);
      var sectionKey = 'dom' + domNum;
      var section = sectionFromKey(sectionKey);
      if (!section) return;

      // Remove any previously rendered content (keep section-header)
      var existing = section.querySelectorAll('.domain-tabs-bar, .domain-tab-content');
      existing.forEach(function (el) { el.remove(); });

      // Build tab bar: Schedule | Study Guide | Practice Quiz
      var tabBar = document.createElement('div');
      tabBar.className = 'domain-tabs-bar';
      tabBar.innerHTML =
        '<button class="domain-tab-btn" data-section="' + sectionKey + '" data-tab="schedule">📅 Schedule</button>' +
        '<button class="domain-tab-btn" data-section="' + sectionKey + '" data-tab="guide">📖 Study Guide</button>' +
        '<button class="domain-tab-btn" data-section="' + sectionKey + '" data-tab="quiz">📝 Practice Quiz</button>';
      section.appendChild(tabBar);

      // Tab content wrapper
      var contentArea = document.createElement('div');
      contentArea.className = 'domain-tab-content';
      contentArea.id = 'domain-content-' + sectionKey;
      section.appendChild(contentArea);

      // Bind tab buttons
      tabBar.querySelectorAll('.domain-tab-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var tab = btn.getAttribute('data-tab');
          var sec = btn.getAttribute('data-section');
          domainTabState[sec] = tab;
          renderDomainTabContent(domain, sectionKey, contentArea);
          updateDomainTabActiveState(tabBar, tab);
        });
      });

      // Initial render
      var activeTab = domainTabState[sectionKey] || 'schedule';
      renderDomainTabContent(domain, sectionKey, contentArea);
      updateDomainTabActiveState(tabBar, activeTab);
    });
  }

  function updateDomainTabActiveState(tabBar, activeTab) {
    tabBar.querySelectorAll('.domain-tab-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === activeTab);
    });
  }

  function renderDomainTabContent(domain, sectionKey, contentArea) {
    contentArea.innerHTML = '';
    var activeTab = domainTabState[sectionKey] || 'schedule';

    if (activeTab === 'schedule') {
      renderScheduleTab(domain, sectionKey, contentArea);
    } else if (activeTab === 'guide') {
      renderStudyGuideTab(domain, contentArea);
    } else if (activeTab === 'quiz') {
      renderDomainQuizTab(domain, contentArea);
    }
  }

  // ─── Schedule Tab ──────────────────────────────────────────────────────────
  function renderScheduleTab(domain, sectionKey, container) {
    var days = daysForDomain(domain.id);

    if (!days.length) {
      container.innerHTML = '<div class="empty-state">No schedule data available for this domain.</div>';
      return;
    }

    // Day tab bar
    var dayTabsRow = document.createElement('div');
    dayTabsRow.className = 'day-tabs-container';
    days.forEach(function (dayKey, i) {
      var dayData = dailySchedules[dayKey];
      var btn = document.createElement('button');
      btn.className = 'day-tab-btn';
      btn.setAttribute('data-day', dayKey);
      btn.setAttribute('data-seckey', sectionKey);
      btn.textContent = 'Day ' + dayKey.replace('day', '');
      btn.title = dayData ? dayData.title : dayKey;
      if (i === (domainDayIndex[sectionKey] || 0)) btn.classList.add('active');
      btn.addEventListener('click', function () {
        domainDayIndex[sectionKey] = i;
        dayTabsRow.querySelectorAll('.day-tab-btn').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        dayContent.innerHTML = '';
        renderDayContent(dayKey, dayContent);
      });
      dayTabsRow.appendChild(btn);
    });
    container.appendChild(dayTabsRow);

    // Day content area
    var dayContent = document.createElement('div');
    dayContent.className = 'day-content-area';
    container.appendChild(dayContent);

    var initialDay = days[domainDayIndex[sectionKey] || 0] || days[0];
    renderDayContent(initialDay, dayContent);
  }

  function renderDayContent(dayKey, container) {
    container.innerHTML = '';
    if (typeof dailySchedules === 'undefined' || !dailySchedules[dayKey]) {
      container.innerHTML = '<div class="empty-state">Schedule data not found for ' + escapeHtml(dayKey) + '.</div>';
      return;
    }

    var day = dailySchedules[dayKey];

    // Day header
    var header = document.createElement('div');
    header.className = 'day-header';
    header.innerHTML = '<h2>' + escapeHtml(day.title) + '</h2>';
    container.appendChild(header);

    // Sessions
    (day.sessions || []).forEach(function (session) {
      var sessionEl = document.createElement('div');
      sessionEl.className = 'session-block';
      var sessionHtml = '<div class="session-title">' + escapeHtml(session.title) + '</div>';
      (session.blocks || []).forEach(function (block, bi) {
        var blockKey = dayKey + '_block_' + bi;
        var isDone = !!(state.completedBlocks && state.completedBlocks[blockKey]);
        if (block.type === 'break') {
          sessionHtml += '<div class="break-block"><span class="block-type break-badge">☕ BREAK</span> <span class="block-topic">' + escapeHtml(block.topic) + '</span> <span style="color:var(--text-muted);font-size:0.78rem">(' + escapeHtml(block.duration) + ')</span></div>';
        } else {
          sessionHtml += '<div class="study-block' + (isDone ? ' completed' : '') + '" id="block-' + escapeHtml(blockKey) + '">';
          sessionHtml += '<div class="block-header">';
          sessionHtml += '<span class="block-type study-badge">📚 STUDY</span>';
          sessionHtml += '<span class="block-topic">' + escapeHtml(block.topic) + '</span>';
          sessionHtml += '<span style="color:var(--text-muted);font-size:0.78rem">(' + escapeHtml(block.duration) + ')</span>';
          sessionHtml += '<button class="btn-complete-block' + (isDone ? ' done' : '') + '" data-block-key="' + escapeHtml(blockKey) + '">' + (isDone ? '✓ Done' : 'Mark Done') + '</button>';
          sessionHtml += '</div>';
          if (block.url) {
            sessionHtml += '<div class="video-ref"><a href="' + escapeHtml(block.url) + '" target="_blank" rel="noopener noreferrer">📖 Microsoft Learn →</a></div>';
          }
          sessionHtml += '</div>';
        }
      });
      sessionEl.innerHTML = sessionHtml;

      // Bind "Mark Done" buttons
      sessionEl.querySelectorAll('.btn-complete-block').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var key = btn.getAttribute('data-block-key');
          if (!state.completedBlocks) state.completedBlocks = {};
          state.completedBlocks[key] = !state.completedBlocks[key];
          saveState();
          var blockDiv = document.getElementById('block-' + key);
          if (blockDiv) {
            blockDiv.classList.toggle('completed', !!state.completedBlocks[key]);
            btn.textContent = state.completedBlocks[key] ? '✓ Done' : 'Mark Done';
            btn.classList.toggle('done', !!state.completedBlocks[key]);
          }
        });
      });

      container.appendChild(sessionEl);
    });

    // Lab card
    if (day.lab) {
      var labCard = document.createElement('div');
      labCard.className = 'lab-card';
      var labHtml = '<div class="lab-title">🧪 ' + escapeHtml(day.lab.title) + '</div>';
      if (day.lab.url) {
        labHtml += '<div class="lab-link"><a href="' + escapeHtml(day.lab.url) + '" target="_blank" rel="noopener noreferrer">🔗 Open Lab Instructions →</a></div>';
      }
      if (day.lab.commands && day.lab.commands.length) {
        labHtml += '<div class="cli-commands"><h4>CLI Commands for this Lab:</h4>';
        day.lab.commands.forEach(function (cmd, ci) {
          var cmdId = 'cmd-' + dayKey + '-' + ci;
          labHtml += '<div class="cli-snippet">';
          labHtml += '<code id="' + cmdId + '">' + escapeHtml(cmd) + '</code>';
          if (!cmd.startsWith('#')) {
            labHtml += '<button class="btn-copy" data-copy-target="' + cmdId + '">Copy</button>';
          }
          labHtml += '</div>';
        });
        labHtml += '</div>';
      }
      labCard.innerHTML = labHtml;

      // Bind copy buttons
      labCard.querySelectorAll('.btn-copy').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var targetId = btn.getAttribute('data-copy-target');
          var codeEl = document.getElementById(targetId);
          if (!codeEl) return;
          var text = codeEl.textContent;
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(function () {
              btn.textContent = 'Copied!';
              setTimeout(function () { btn.textContent = 'Copy'; }, 1500);
            }).catch(function () { fallbackCopy(text, btn); });
          } else {
            fallbackCopy(text, btn);
          }
        });
      });

      container.appendChild(labCard);
    }

    // Key points card
    if (day.keyPoints && day.keyPoints.length) {
      var kpCard = document.createElement('div');
      kpCard.className = 'keypoints-card';
      var kpHtml = '<div class="keypoints-title">⚡ Key Points for ' + escapeHtml(day.title) + '</div>';
      kpHtml += '<div class="keypoints-list">';
      day.keyPoints.forEach(function (point) {
        kpHtml += '<div class="keypoint-item"><span class="kp-bullet">→</span><span class="kp-text">' + escapeHtml(point) + '</span></div>';
      });
      kpHtml += '</div>';
      kpCard.innerHTML = kpHtml;
      container.appendChild(kpCard);
    }

    // Quizlet link card
    if (day.quizlet && day.quizlet.url) {
      var qCard = document.createElement('div');
      qCard.className = 'quizlet-card';
      qCard.innerHTML = '<div class="quizlet-title">🃏 Flashcard Study</div>' +
        '<div class="quizlet-items"><a class="quizlet-link" href="' + escapeHtml(day.quizlet.url) + '" target="_blank" rel="noopener noreferrer">' +
        '🔗 ' + escapeHtml(day.quizlet.title || 'Study Flashcards') + ' →</a></div>';
      container.appendChild(qCard);
    }
  }

  function fallbackCopy(text, btn) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0';
    document.body.appendChild(ta);
    ta.focus(); ta.select();
    try {
      document.execCommand('copy');
      btn.textContent = 'Copied!';
    } catch (e) {
      btn.textContent = 'Error';
    }
    document.body.removeChild(ta);
    setTimeout(function () { btn.textContent = 'Copy'; }, 1500);
  }

  // ─── Study Guide Tab ───────────────────────────────────────────────────────
  function renderStudyGuideTab(domain, container) {
    if (typeof studyGuides === 'undefined' || !studyGuides[domain.id]) {
      container.innerHTML = '<div class="empty-state">Study guide not available for this domain yet.</div>';
      return;
    }

    var guide = studyGuides[domain.id];
    var guideEl = document.createElement('div');
    guideEl.className = 'study-guide';

    var html = '<div class="study-guide-title">' + escapeHtml(guide.title) + '</div>';
    (guide.sections || []).forEach(function (sec) {
      html += '<div class="sg-section">';
      html += '<div class="sg-heading">' + escapeHtml(sec.heading) + '</div>';
      html += '<div class="sg-content">';
      (sec.items || []).forEach(function (item) {
        html += '<div class="sg-bullet"><span class="sg-marker">▸</span><span>';
        if (item.bold) html += '<span class="sg-bold">' + escapeHtml(item.bold) + ': </span>';
        html += '<span class="sg-line">' + escapeHtml(item.text) + '</span>';
        html += '</span></div>';
      });
      html += '</div></div>';
    });
    guideEl.innerHTML = html;
    container.appendChild(guideEl);
  }

  // ─── Domain Quiz Tab ───────────────────────────────────────────────────────
  function renderDomainQuizTab(domain, container) {
    var qs = questionsForDomain(domain.id);
    if (!qs.length) {
      container.innerHTML = '<div class="empty-state">No questions available for this domain.</div>';
      return;
    }

    var headerCard = document.createElement('div');
    headerCard.className = 'card';
    var answeredCount = qs.filter(function (q) { return !!answerForQuestion(q); }).length;
    var correctCount = qs.filter(function (q) { return answerForQuestion(q) === q.correct; }).length;
    var pct = Math.round((answeredCount / qs.length) * 100);
    headerCard.innerHTML =
      '<div class="card-title">Domain Practice Quiz — ' + escapeHtml(domain.name) + '</div>' +
      '<div class="card-subtitle">' + qs.length + ' questions · ' + answeredCount + ' answered · ' + correctCount + ' correct</div>' +
      '<div class="exam-progress mt-2"><div class="progress-bar"><div class="progress-fill" style="width:' + pct + '%"></div></div>' +
      '<div class="progress-text">' + pct + '%</div></div>';
    container.appendChild(headerCard);

    qs.forEach(function (q, i) {
      var card = createQuestionCard(q, i, qs.length);
      card.querySelectorAll('.option-btn:not([disabled])').forEach(function (btn) {
        btn.addEventListener('click', function () {
          setAnswer(q, btn.getAttribute('data-letter'));
          // Re-render this card in place
          var newCard = createQuestionCard(q, i, qs.length);
          card.parentNode.replaceChild(newCard, card);
          card = newCard;
        });
      });
      container.appendChild(card);
    });
  }

  // ─── Mock Exam Review ──────────────────────────────────────────────────────
  function domainLabel(id) {
    if (id === 'all') return 'All Domains (125 Questions)';
    if (typeof az104Domains === 'undefined') return id;
    var found = az104Domains.find(function (d) { return d.id === id; });
    return found ? found.name : id;
  }

  function activeQuizQuestions() {
    return mockState.activeDomain === 'all' ? allQuestions() : questionsForDomain(mockState.activeDomain);
  }

  function renderMockReview() {
    var section = sectionFromKey('mock');
    if (!section) return;

    var questions = activeQuizQuestions();
    var total = questions.length;
    if (mockState.index >= total) mockState.index = Math.max(0, total - 1);

    var answeredCount = questions.filter(function (q) { return !!answerForQuestion(q); }).length;
    var correctCount = questions.filter(function (q) { return answerForQuestion(q) === q.correct; }).length;
    var pct = total ? Math.round((answeredCount / total) * 100) : 0;

    var body = document.createElement('div');
    var controlsHtml = '<div class="card">' +
      '<div class="flex items-center justify-between gap-2" style="flex-wrap:wrap;">' +
      '<div><div class="card-title">Mock Exam / Practice Review</div>' +
      '<div class="card-subtitle">' + escapeHtml(domainLabel(mockState.activeDomain)) + ' — ' + answeredCount + ' of ' + total + ' answered · ' + correctCount + ' correct</div></div>' +
      '<div class="flex gap-1" style="flex-wrap:wrap;">' +
      ['all', 'domain1', 'domain2', 'domain3', 'domain4', 'domain5'].map(function (d) {
        var label = d === 'all' ? 'All' : 'D' + d.replace('domain', '');
        return '<button class="btn btn-sm ' + (mockState.activeDomain === d ? 'btn-accent' : 'btn-outline') + '" data-mock-domain="' + d + '">' + label + '</button>';
      }).join('') +
      '</div></div>' +
      '<div class="exam-progress mt-2"><div class="progress-bar"><div class="progress-fill" style="width:' + pct + '%"></div></div>' +
      '<div class="progress-text">' + pct + '%</div></div>' +
      '</div>';
    body.innerHTML = controlsHtml;

    if (!total) {
      var empty = document.createElement('div');
      empty.className = 'empty-state';
      empty.textContent = 'No questions available for this domain.';
      body.appendChild(empty);
    } else {
      var question = questions[mockState.index];
      var card = createQuestionCard(question, mockState.index, total);
      body.appendChild(card);

      var nav = document.createElement('div');
      nav.className = 'exam-submit-area';
      nav.innerHTML =
        '<button class="btn btn-outline" data-nav="prev" ' + (mockState.index === 0 ? 'disabled' : '') + '>Previous</button> ' +
        '<span style="color:var(--text-muted);font-size:0.82rem;padding:0 0.5rem;">' + (mockState.index + 1) + ' / ' + total + '</span> ' +
        '<button class="btn btn-accent" data-nav="next" ' + (mockState.index >= total - 1 ? 'disabled' : '') + '>Next</button>';
      body.appendChild(nav);
    }

    // Clear and replace
    var oldItems = section.querySelectorAll('.card, .question-card, .exam-submit-area, .empty-state');
    oldItems.forEach(function (el) { el.remove(); });
    section.appendChild(body);

    // Bind domain filter buttons
    body.querySelectorAll('[data-mock-domain]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        mockState.activeDomain = btn.getAttribute('data-mock-domain');
        mockState.index = 0;
        renderMockReview();
      });
    });

    // Bind answer buttons
    body.querySelectorAll('.option-btn:not([disabled])').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var qid = btn.getAttribute('data-qid');
        var q = activeQuizQuestions().find(function (item) { return String(item.id) === qid; });
        if (!q) return;
        setAnswer(q, btn.getAttribute('data-letter'));
        renderMockReview();
      });
    });

    // Bind prev/next
    body.querySelectorAll('[data-nav]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (btn.getAttribute('data-nav') === 'prev' && mockState.index > 0) mockState.index -= 1;
        if (btn.getAttribute('data-nav') === 'next' && mockState.index < activeQuizQuestions().length - 1) mockState.index += 1;
        renderMockReview();
      });
    });
  }

  function startDomainQuiz(domainId) {
    mockState.activeDomain = domainId;
    mockState.index = 0;
    showSection('mock');
  }

  // ─── Keyword Speed Drill ───────────────────────────────────────────────────
  function renderKeywords() {
    var section = sectionFromKey('keywords');
    if (!section) return;

    var words = [];
    if (typeof az104Domains !== 'undefined') {
      az104Domains.forEach(function (d) {
        (d.topics || []).forEach(function (topic) {
          var term = String(topic).split('(')[0].trim();
          words.push({ front: term, back: d.name });
        });
      });
    }

    // Add extra terms from study guides
    if (typeof studyGuides !== 'undefined') {
      Object.keys(studyGuides).forEach(function (domainId) {
        var guide = studyGuides[domainId];
        (guide.sections || []).forEach(function (sec) {
          (sec.items || []).forEach(function (item) {
            if (item.bold) words.push({ front: item.bold, back: sec.heading });
          });
        });
      });
    }

    var seen = {};
    var unique = words.filter(function (w) {
      var k = w.front.toLowerCase();
      if (seen[k]) return false;
      seen[k] = true;
      return true;
    });

    var old = section.querySelector('.card');
    if (old) old.remove();

    var container = document.createElement('div');
    container.className = 'card';
    container.innerHTML =
      '<div class="keyword-header"><h2>Flip Cards (' + unique.length + ' terms)</h2>' +
      '<p class="text-muted">Click any card to flip and reveal the context.</p></div>' +
      '<div class="keyword-grid" id="keyword-grid"></div>';
    section.appendChild(container);

    var grid = container.querySelector('#keyword-grid');
    unique.slice(0, 48).forEach(function (entry) {
      var card = document.createElement('div');
      card.className = 'keyword-card';
      card.innerHTML = '<div class="keyword-front">' + escapeHtml(entry.front) + '</div>' +
        '<div class="keyword-back">' + escapeHtml(entry.back) + '</div>';
      card.addEventListener('click', function () { card.classList.toggle('flipped'); });
      grid.appendChild(card);
    });
  }

  // ─── Weakness Log ──────────────────────────────────────────────────────────
  function renderWeaknessLog() {
    var container = byId('errorLogContainer');
    if (!container) return;

    var wrongIds = Object.keys(state.answers).filter(function (qid) {
      var q = allQuestions().find(function (item) { return String(item.id) === qid; });
      return q && state.answers[qid] !== q.correct;
    });

    if (!wrongIds.length) {
      container.innerHTML = '<div class="empty-state">No weak areas logged yet. Incorrect answers will appear here for review.</div>';
      return;
    }

    var html = '<div class="weakness-header"><h2>Questions to Review (' + wrongIds.length + ')</h2></div>';
    wrongIds.forEach(function (qid) {
      var q = allQuestions().find(function (item) { return String(item.id) === qid; });
      if (!q) return;
      html += '<div class="error-log-entry">';
      html += '<div class="ele-header"><div class="ele-tag">Review Needed</div><div class="text-muted">' + escapeHtml(q.domain) + ' · Q' + qid + '</div></div>';
      html += '<div class="ele-question">' + escapeHtml(q.question) + '</div>';
      html += '<div class="ele-note"><b>Your answer:</b> ' + escapeHtml(state.answers[qid]) + ' &nbsp;|&nbsp; <b>Correct:</b> ' + escapeHtml(q.correct) + '</div>';
      html += '<div class="ele-explanation text-muted" style="font-size:0.82rem;margin-top:0.4rem">' + escapeHtml(q.explanation || '') + '</div>';
      html += '</div>';
    });
    container.innerHTML = html;
  }

  // ─── CLI & Subnetting Reference ────────────────────────────────────────────
  function renderCheatSheet() {
    var section = sectionFromKey('cheat');
    if (!section) return;

    var cliGroups = [
      {
        title: 'Identity & Governance',
        commands: [
          { desc: 'List all Azure AD users', cmd: 'az ad user list --output table' },
          { desc: 'Create a new Azure AD user', cmd: 'az ad user create --display-name "Test User" --user-principal-name test@domain.com --password "P@ss123!"' },
          { desc: 'List role assignments for a user', cmd: 'az role assignment list --assignee <user-id> --output table' },
          { desc: 'Assign a role to a user', cmd: 'az role assignment create --assignee <user-id> --role "Contributor" --scope /subscriptions/<sub-id>' },
          { desc: 'List Azure Policy assignments', cmd: 'az policy assignment list --output table' },
          { desc: 'Create a resource lock', cmd: 'az lock create --name NoDelete --lock-type CanNotDelete --resource-group myRG' }
        ]
      },
      {
        title: 'Storage',
        commands: [
          { desc: 'Create a storage account', cmd: 'az storage account create -n mystorage -g myRG -l eastus --sku Standard_LRS' },
          { desc: 'List storage accounts', cmd: 'az storage account list --resource-group myRG --output table' },
          { desc: 'List storage account keys', cmd: 'az storage account keys list -n mystorage -g myRG' },
          { desc: 'Create a blob container', cmd: 'az storage container create -n mycontainer --account-name mystorage' },
          { desc: 'Upload a file to blob', cmd: 'az storage blob upload --account-name mystorage -c mycontainer -n myfile.txt -f ./myfile.txt' },
          { desc: 'Generate SAS token', cmd: 'az storage account generate-sas --account-name mystorage --expiry 2025-12-31 --permissions rwdlacup --resource-types sco --services bqtf' }
        ]
      },
      {
        title: 'Compute',
        commands: [
          { desc: 'Create a VM', cmd: 'az vm create -g myRG -n myVM --image UbuntuLTS --admin-username azureuser --generate-ssh-keys' },
          { desc: 'List VMs', cmd: 'az vm list -d -o table' },
          { desc: 'Start a VM', cmd: 'az vm start -g myRG -n myVM' },
          { desc: 'Stop and deallocate a VM', cmd: 'az vm deallocate -g myRG -n myVM' },
          { desc: 'Resize a VM', cmd: 'az vm resize -g myRG -n myVM --size Standard_DS2_v2' },
          { desc: 'Deploy ARM template', cmd: 'az deployment group create -g myRG --template-file azuredeploy.json --parameters @params.json' },
          { desc: 'Create App Service Plan', cmd: 'az appservice plan create -n myPlan -g myRG --sku S1' },
          { desc: 'Create Web App', cmd: 'az webapp create -n myApp -g myRG --plan myPlan --runtime "NODE|18-lts"' }
        ]
      },
      {
        title: 'Networking',
        commands: [
          { desc: 'Create a VNet with a subnet', cmd: 'az network vnet create -g myRG -n myVNet --address-prefix 10.0.0.0/16 --subnet-name mySubnet --subnet-prefix 10.0.1.0/24' },
          { desc: 'Create an NSG', cmd: 'az network nsg create -g myRG -n myNSG' },
          { desc: 'Add an NSG rule (allow HTTPS)', cmd: 'az network nsg rule create -g myRG --nsg-name myNSG -n AllowHTTPS --priority 100 --protocol Tcp --destination-port-range 443 --access Allow' },
          { desc: 'List NSG rules', cmd: 'az network nsg rule list -g myRG --nsg-name myNSG -o table' },
          { desc: 'Create a Public IP', cmd: 'az network public-ip create -g myRG -n myPublicIP --sku Standard' },
          { desc: 'Create Azure DNS zone', cmd: 'az network dns zone create -g myRG -n contoso.com' },
          { desc: 'Add a DNS A record', cmd: 'az network dns record-set a add-record -g myRG -z contoso.com -n www --ipv4-address 10.0.1.4' }
        ]
      },
      {
        title: 'Monitor & Backup',
        commands: [
          { desc: 'Create Log Analytics workspace', cmd: 'az monitor log-analytics workspace create -g myRG --workspace-name myWorkspace' },
          { desc: 'List metrics for a VM', cmd: 'az monitor metrics list --resource <resource-id> --metric "Percentage CPU" --output table' },
          { desc: 'Create an alert rule', cmd: 'az monitor metrics alert create -n HighCPU -g myRG --condition "avg Percentage CPU > 90" --window-size 5m --evaluation-frequency 1m' },
          { desc: 'Create Recovery Services Vault', cmd: 'az backup vault create -g myRG -n myVault -l eastus' },
          { desc: 'Enable VM backup', cmd: 'az backup protection enable-for-vm -g myRG --vault-name myVault --vm myVM --policy-name DefaultPolicy' },
          { desc: 'List backup jobs', cmd: 'az backup job list -g myRG --vault-name myVault --output table' }
        ]
      }
    ];

    var cheatHtml = '<div class="cli-section">';
    cheatHtml += '<h3>Azure CLI Quick Reference</h3>';
    cliGroups.forEach(function (group) {
      cheatHtml += '<div class="cli-group">';
      cheatHtml += '<div class="cli-group-title">' + escapeHtml(group.title) + '</div>';
      group.commands.forEach(function (item, ci) {
        var cmdId = 'cheat-cmd-' + group.title.replace(/\s+/g, '') + '-' + ci;
        cheatHtml += '<div class="cli-snippet-block">';
        cheatHtml += '<div class="cli-snippet-header">';
        cheatHtml += '<span class="cli-snippet-title">' + escapeHtml(item.desc) + '</span>';
        cheatHtml += '<button class="btn-copy" data-copy-target="' + cmdId + '">Copy</button>';
        cheatHtml += '</div>';
        cheatHtml += '<div class="cli-code"><code id="' + cmdId + '">' + escapeHtml(item.cmd) + '</code></div>';
        cheatHtml += '</div>';
      });
      cheatHtml += '</div>';
    });
    cheatHtml += '</div>';

    // Subnet calculator
    cheatHtml += '<div class="subnet-section"><h3>Subnet / CIDR Calculator</h3>' +
      '<div class="subnet-input-row">' +
      '<label for="cidr-input" style="color:var(--text-muted);font-size:0.85rem;">CIDR prefix (/</label>' +
      '<input id="cidr-input" class="cidr-input" type="number" min="' + MIN_SUBNET_CIDR + '" max="' + MAX_SUBNET_CIDR + '" value="24">' +
      '<span style="color:var(--text-muted);font-size:0.85rem;">)</span>' +
      '<button id="btn-calc-subnet" class="btn btn-accent btn-sm">Calculate</button></div>' +
      '<div id="subnet-output" class="subnet-result-card"></div>' +
      '<div class="reserved-ips-section mt-2"><h3>Azure Reserved IPs in every subnet</h3>' +
      '<table class="reserved-table"><thead><tr><th>Address</th><th>Purpose</th></tr></thead><tbody>' +
      '<tr><td>x.x.x.0</td><td>Network address</td></tr>' +
      '<tr><td>x.x.x.1</td><td>Default gateway</td></tr>' +
      '<tr><td>x.x.x.2 – x.x.x.3</td><td>Azure DNS servers</td></tr>' +
      '<tr><td>x.x.x.255</td><td>Broadcast address</td></tr>' +
      '</tbody></table>' +
      '<div class="subnet-formula">Usable IPs = 2<sup>(32 – prefix)</sup> – 5</div>' +
      '</div></div>';

    var old = section.querySelectorAll('.cli-section, .subnet-section, .card');
    old.forEach(function (n) { n.remove(); });
    section.insertAdjacentHTML('beforeend', cheatHtml);

    // Bind copy buttons in cheat sheet
    section.querySelectorAll('.btn-copy').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var targetId = btn.getAttribute('data-copy-target');
        var codeEl = document.getElementById(targetId);
        if (!codeEl) return;
        var text = codeEl.textContent;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () {
            btn.textContent = 'Copied!';
            setTimeout(function () { btn.textContent = 'Copy'; }, 1500);
          }).catch(function () { fallbackCopy(text, btn); });
        } else {
          fallbackCopy(text, btn);
        }
      });
    });

    // Subnet calculator
    var calcBtn = byId('btn-calc-subnet');
    if (calcBtn) {
      calcBtn.addEventListener('click', calcSubnet);
      calcSubnet();
    }
  }

  function calcSubnet() {
    var cidrInput = byId('cidr-input');
    var output = byId('subnet-output');
    if (!cidrInput || !output) return;
    var cidr = Math.max(MIN_SUBNET_CIDR, Math.min(MAX_SUBNET_CIDR, Number(cidrInput.value) || 24));
    var hostBits = 32 - cidr;
    var totalIps = Math.pow(2, hostBits);
    var usable = Math.max(0, totalIps - 5);
    output.innerHTML =
      '<div class="subnet-stat"><span class="stat-label">CIDR</span><span class="stat-value">/' + cidr + '</span></div>' +
      '<div class="subnet-stat"><span class="stat-label">Total IPs</span><span class="stat-value">' + totalIps.toLocaleString() + '</span></div>' +
      '<div class="subnet-stat"><span class="stat-label">Usable IPs</span><span class="stat-value">' + usable.toLocaleString() + '</span></div>' +
      '<div class="subnet-stat"><span class="stat-label">Reserved by Azure</span><span class="stat-value">5</span></div>';
  }

  // ─── Stats update ──────────────────────────────────────────────────────────
  function updateStats() {
    var questions = allQuestions();
    var answered = 0, correct = 0;
    questions.forEach(function (q) {
      var ans = answerForQuestion(q);
      if (!ans) return;
      answered++;
      if (ans === q.correct) correct++;
    });

    var pctAnswered = questions.length ? Math.round((answered / questions.length) * 100) : 0;
    var accuracy = answered ? Math.round((correct / answered) * 100) : 0;

    var progressFill = byId('progress-fill');
    var progressText = byId('progressText');
    if (progressFill) progressFill.style.width = pctAnswered + '%';
    if (progressText) progressText.textContent = pctAnswered + '% Complete';

    var overviewProgress = byId('overview-progress-value');
    var overviewQuestions = byId('overview-questions-value');
    var overviewAccuracy = byId('overview-accuracy-value');
    var overviewWeaknesses = byId('overview-weaknesses-value');

    if (overviewProgress) {
      overviewProgress.textContent = pctAnswered + '%';
      var sub = overviewProgress.nextElementSibling;
      if (sub) sub.textContent = Math.min(STUDY_DAYS, Math.round((pctAnswered / 100) * STUDY_DAYS)) + ' of ' + STUDY_DAYS + ' days completed';
    }
    if (overviewQuestions) overviewQuestions.textContent = String(answered);
    if (overviewAccuracy) overviewAccuracy.textContent = answered ? (accuracy + '%') : '—';
    if (overviewWeaknesses) overviewWeaknesses.textContent = String(answered - correct);
  }

  // ─── Debug Panel ───────────────────────────────────────────────────────────
  function isDebugMode() {
    return window.location.hash === '#debug' ||
      window.location.search.indexOf('debug=1') !== -1;
  }

  function renderDebugPanel() {
    if (!isDebugMode()) return;

    var existing = byId('az104-debug-panel');
    if (existing) existing.remove();

    var totalQuestions = typeof az104Questions !== 'undefined' ? az104Questions.length : 0;
    var domainCounts = {};
    if (typeof az104Questions !== 'undefined') {
      az104Questions.forEach(function (q) {
        domainCounts[q.domain] = (domainCounts[q.domain] || 0) + 1;
      });
    }
    var dayCount = typeof dailySchedules !== 'undefined' ? Object.keys(dailySchedules).length : 0;
    var domainCount = typeof az104Domains !== 'undefined' ? az104Domains.length : 0;
    var guideCount = typeof studyGuides !== 'undefined' ? Object.keys(studyGuides).length : 0;

    var checks = [
      { label: 'az104Domains loaded', pass: typeof az104Domains !== 'undefined' && az104Domains.length > 0 },
      { label: 'dailySchedules loaded (' + dayCount + ' days)', pass: dayCount >= 14 },
      { label: 'az104Questions loaded (' + totalQuestions + ' questions)', pass: totalQuestions >= 50 },
      { label: 'domainQuestionDatabase loaded', pass: typeof domainQuestionDatabase !== 'undefined' },
      { label: 'studyGuides loaded (' + guideCount + ' guides)', pass: guideCount >= 5 },
      { label: '125-question target met', pass: totalQuestions >= 125 }
    ];

    var domainDetails = ['domain1', 'domain2', 'domain3', 'domain4', 'domain5'].map(function (d) {
      return d + ': ' + (domainCounts[d] || 0) + 'q, ' + daysForDomain(d).length + ' days, guide=' + (typeof studyGuides !== 'undefined' && studyGuides[d] ? '✓' : '✗');
    });

    var panelHtml =
      '<div id="az104-debug-panel" style="' +
      'position:fixed;bottom:1rem;right:1rem;z-index:99998;width:340px;' +
      'background:#0f1117;border:1px solid #6c8cff;border-radius:10px;' +
      'padding:1rem;font-size:0.75rem;color:#e0e0e6;overflow-y:auto;max-height:80vh;' +
      'box-shadow:0 8px 32px rgba(0,0,0,0.6);pointer-events:auto;' +
      '">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.75rem;">' +
      '<strong style="color:#6c8cff;font-size:0.85rem;">🔍 Debug Panel</strong>' +
      '<button onclick="document.getElementById(\'az104-debug-panel\').remove()" style="' +
      'background:transparent;border:1px solid #2a2d3e;color:#94a3b8;cursor:pointer;' +
      'border-radius:4px;padding:0.15rem 0.4rem;font-size:0.7rem;">✕</button>' +
      '</div>' +
      checks.map(function (c) {
        return '<div style="display:flex;align-items:center;gap:0.4rem;margin-bottom:0.3rem;">' +
          '<span style="color:' + (c.pass ? '#4ade80' : '#f87171') + ';font-size:0.9rem;">' + (c.pass ? '✓' : '✗') + '</span>' +
          '<span style="color:' + (c.pass ? '#e0e0e6' : '#fca5a5') + ';">' + escapeHtml(c.label) + '</span>' +
          '</div>';
      }).join('') +
      '<hr style="border:none;border-top:1px solid #2a2d3e;margin:0.75rem 0;">' +
      '<div style="color:#94a3b8;margin-bottom:0.4rem;font-weight:600;">Per-Domain Details:</div>' +
      domainDetails.map(function (d) {
        return '<div style="color:#94a3b8;font-family:monospace;margin-bottom:0.2rem;">' + escapeHtml(d) + '</div>';
      }).join('') +
      '<hr style="border:none;border-top:1px solid #2a2d3e;margin:0.75rem 0;">' +
      '<div style="color:#94a3b8;margin-bottom:0.4rem;font-weight:600;">App State:</div>' +
      '<div style="color:#94a3b8;font-family:monospace;">Answers: ' + Object.keys(state.answers || {}).length + '</div>' +
      '<div style="color:#94a3b8;font-family:monospace;">Weak areas: ' + Object.keys(state.weaknessNotes || {}).length + '</div>' +
      '<div style="color:#94a3b8;font-family:monospace;">Storage key: ' + STORAGE_KEY + '</div>' +
      '<hr style="border:none;border-top:1px solid #2a2d3e;margin:0.75rem 0;">' +
      '<button id="debug-copy-btn" style="width:100%;padding:0.4rem;background:#6c8cff;color:#fff;' +
      'border:none;border-radius:6px;cursor:pointer;font-size:0.78rem;font-weight:600;">' +
      '📋 Copy Diagnostics</button>' +
      '<button onclick="localStorage.removeItem(\'' + STORAGE_KEY + '\');location.reload()" style="' +
      'width:100%;padding:0.4rem;background:#1c1f2e;color:#f87171;border:1px solid #2a2d3e;' +
      'border-radius:6px;cursor:pointer;font-size:0.78rem;font-weight:600;margin-top:0.4rem;">' +
      '🗑 Reset State</button>' +
      '</div>';

    document.body.insertAdjacentHTML('beforeend', panelHtml);

    var copyBtn = byId('debug-copy-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        var diag = {
          timestamp: new Date().toISOString(),
          checks: checks,
          domainDetails: domainDetails,
          totalQuestions: totalQuestions,
          domainCounts: domainCounts,
          dayCount: dayCount,
          guideCount: guideCount,
          answersCount: Object.keys(state.answers || {}).length,
          url: window.location.href,
          userAgent: navigator.userAgent
        };
        var text = JSON.stringify(diag, null, 2);
        if (navigator.clipboard) {
          navigator.clipboard.writeText(text).then(function () {
            copyBtn.textContent = 'Copied!';
            setTimeout(function () { copyBtn.textContent = '📋 Copy Diagnostics'; }, 1500);
          });
        }
      });
    }
  }

  // ─── Overlay / Extension Interference Guardrails ───────────────────────────
  function applyPointerGuardrails() {
    // Ensure the main-viewport and sidebar don't block events on children
    var main = document.querySelector('.main-viewport');
    var sidebar = document.querySelector('.sidebar');
    var body = document.body;
    if (main) main.style.pointerEvents = 'auto';
    if (sidebar) sidebar.style.pointerEvents = 'auto';
    if (body) body.style.pointerEvents = 'auto';

    // Detect any absolutely positioned elements at top of stacking context covering the viewport
    // that are not our own (injected by extensions)
    var appIds = new Set(['toast-notification', 'az104-load-error', 'az104-debug-panel']);
    var allFixed = document.querySelectorAll('body > *:not(aside):not(main):not(script):not(style)');
    allFixed.forEach(function (el) {
      if (appIds.has(el.id)) return;
      var style = window.getComputedStyle(el);
      if ((style.position === 'fixed' || style.position === 'absolute') &&
          parseFloat(style.width) > window.innerWidth * 0.5 &&
          parseFloat(style.height) > window.innerHeight * 0.5) {
        console.warn('[AZ104] Possible overlay element detected (extension?):', el.id || el.className);
      }
    });
  }

  // ─── Main Init ─────────────────────────────────────────────────────────────
  function init() {
    console.log('[AZ104] Initializing dashboard...');

    // Boot checks
    var missing = checkDependencies();
    if (missing.length) {
      console.error('[AZ104] Missing modules:', missing);
      showLoadError(missing);
    }

    console.log('[AZ104] dailySchedules days:', typeof dailySchedules !== 'undefined' ? Object.keys(dailySchedules).length : 'MISSING');
    console.log('[AZ104] az104Questions count:', typeof az104Questions !== 'undefined' ? az104Questions.length : 'MISSING');
    console.log('[AZ104] az104Domains count:', typeof az104Domains !== 'undefined' ? az104Domains.length : 'MISSING');
    console.log('[AZ104] studyGuides count:', typeof studyGuides !== 'undefined' ? Object.keys(studyGuides).length : 'MISSING');

    // Bind UI
    bindNavigation();
    bindTimer();

    // Render all sections
    renderDomainSections();
    renderKeywords();
    renderCheatSheet();
    renderWeaknessLog();
    renderMockReview();
    updateStats();

    // Restore active section
    var activeSection = state.activeSection;
    if (!sectionFromKey(activeSection)) activeSection = 'overview';
    showSection(activeSection);

    // Apply guardrails
    applyPointerGuardrails();

    // Debug panel
    renderDebugPanel();

    console.log('[AZ104] Dashboard initialized successfully.');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
