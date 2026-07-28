// AZ-104 Study Engine - dashboard interaction layer
(function () {
  'use strict';

  var STORAGE_KEY = 'az104_dashboard_state_v2';
  var LEGACY_STORAGE_KEY = 'az104_app_state';
  var TIMER_START_SECONDS = 20 * 60;
  var STUDY_DAYS = 14;
  var MIN_SUBNET_CIDR = 16;
  var MAX_SUBNET_CIDR = 30;
  var timerHandle = null;

  var state = loadState();

  function loadState() {
    var defaults = {
      activeSection: 'overview',
      timerSeconds: TIMER_START_SECONDS,
      timerRunning: false,
      answers: {},
      completedDomains: [],
      weaknessNotes: {}
    };

    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        var legacyRaw = localStorage.getItem(LEGACY_STORAGE_KEY);
        if (legacyRaw) {
          var legacyParsed = JSON.parse(legacyRaw);
          var migrated = Object.assign({}, defaults, legacyParsed);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
          localStorage.removeItem(LEGACY_STORAGE_KEY);
          return migrated;
        }
        return defaults;
      }
      return Object.assign({}, defaults, JSON.parse(raw));
    } catch (error) {
      console.warn('[AZ104] Failed to load saved state:', error);
      return defaults;
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.warn('[AZ104] Failed to save state:', error);
      // no-op
    }
  }

  function byId(id) {
    return document.getElementById(id);
  }

  function sectionFromKey(key) {
    return byId('section-' + key);
  }

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
  }

  function bindNavigation() {
    sectionIds().forEach(function (id) {
      var nav = byId('nav-' + id);
      if (nav) {
        nav.addEventListener('click', function () {
          showSection(id);
        });
      }
    });

    ['dom1', 'dom2', 'dom3', 'dom4', 'dom5'].forEach(function (id) {
      var card = byId('dlc-' + id);
      if (card) {
        card.addEventListener('click', function () {
          showSection(id);
        });
      }
    });
  }

  function formatSeconds(totalSeconds) {
    var mins = Math.floor(totalSeconds / 60);
    var secs = totalSeconds % 60;
    return String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
  }

  function updateTimerUI() {
    var timerDisplay = byId('timer-display');
    var timerMode = byId('timer-mode');
    if (timerDisplay) timerDisplay.textContent = formatSeconds(state.timerSeconds);
    if (timerMode) timerMode.textContent = state.timerRunning ? 'FOCUS MODE' : 'STUDY MODE';
  }

  function tickTimer() {
    if (!state.timerRunning) return;

    state.timerSeconds = Math.max(0, state.timerSeconds - 1);
    updateTimerUI();
    saveState();

    if (state.timerSeconds === 0) {
      state.timerRunning = false;
      clearInterval(timerHandle);
      timerHandle = null;
      updateTimerUI();
      showToast('Timer complete');
      saveState();
    }
  }

  function startTimer() {
    if (state.timerRunning) return;
    state.timerRunning = true;
    updateTimerUI();
    saveState();
    if (!timerHandle) timerHandle = setInterval(tickTimer, 1000);
  }

  function pauseTimer() {
    state.timerRunning = false;
    updateTimerUI();
    saveState();
  }

  function resetTimer() {
    state.timerRunning = false;
    state.timerSeconds = TIMER_START_SECONDS;
    updateTimerUI();
    saveState();
  }

  function bindTimer() {
    var startBtn = byId('btn-start');
    var pauseBtn = byId('btn-pause');
    var resetBtn = byId('btn-reset');
    if (startBtn) startBtn.addEventListener('click', startTimer);
    if (pauseBtn) pauseBtn.addEventListener('click', pauseTimer);
    if (resetBtn) resetBtn.addEventListener('click', resetTimer);

    if (state.timerRunning && !timerHandle) {
      timerHandle = setInterval(tickTimer, 1000);
    }

    updateTimerUI();
  }

  function domainNumberFromId(domainId) {
    var match = String(domainId || '').match(/(\d+)/);
    if (match) return Number(match[1]);

    var fallbackMap = {
      domain1: 1,
      domain2: 2,
      domain3: 3,
      domain4: 4,
      domain5: 5
    };
    return fallbackMap[String(domainId || '').toLowerCase()] || 0;
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
    }
    saveState();
    renderWeaknessLog();
    updateStats();
  }

  function createQuestionCard(question, index, total) {
    var wrapper = document.createElement('div');
    wrapper.className = 'question-card';

    var answered = answerForQuestion(question);
    var isAnswered = !!answered;
    var isCorrect = isAnswered && answered === question.correct;
    if (isAnswered) wrapper.classList.add(isCorrect ? 'answered-correct' : 'answered-wrong');

    var html = '';
    html += '<div class="question-header">';
    html += '<div class="question-number">Question ' + (index + 1) + ' / ' + total + '</div>';
    html += '<div class="scenario-badge">' + (question.difficulty || 'mixed').toUpperCase() + '</div>';
    html += '</div>';
    html += '<div class="question-text">' + escapeHtml(question.question) + '</div>';
    html += '<div class="options-grid">';

    (question.options || []).forEach(function (opt, i) {
      var letter = String.fromCharCode(65 + i);
      var optionClass = 'option-btn';
      if (isAnswered) {
        if (letter === question.correct) optionClass += ' correct';
        else if (letter === answered) optionClass += ' wrong';
      }
      html += '<button class="' + optionClass + '" data-qid="' + question.id + '" data-letter="' + letter + '" ' + (isAnswered ? 'disabled aria-disabled="true"' : '') + '>';
      html += '<strong>' + letter + '.</strong> <span>' + escapeHtml(opt) + '</span>';
      html += '</button>';
    });

    html += '</div>';
    html += '<div class="explanation-card ' + (isAnswered ? 'visible' : 'hidden') + '" aria-hidden="' + (!isAnswered) + '" aria-live="polite"><div class="explanation-content"><b>Explanation:</b> ' + escapeHtml(question.explanation || '') + '</div></div>';

    wrapper.innerHTML = html;
    return wrapper;
  }

  function renderDomainSections() {
    if (typeof az104Domains === 'undefined') return;

    az104Domains.forEach(function (domain) {
      var sectionId = 'dom' + domainNumberFromId(domain.id);
      var section = sectionFromKey(sectionId);
      if (!section) return;

      var qCount = questionsForDomain(domain.id).length;
      var topicsHtml = (domain.topics || []).map(function (topic) {
        return '<li class="protocol-item"><span class="pi-bullet">•</span><span>' + escapeHtml(topic) + '</span></li>';
      }).join('');

      var block = document.createElement('div');
      block.className = 'protocol-block';
      block.innerHTML =
        '<div class="pb-header">' +
        '<div class="pb-title">Study Focus</div>' +
        '<div class="pb-duration">' + escapeHtml(domain.weight || '') + '</div>' +
        '</div>' +
        '<div class="card-subtitle">' + qCount + ' practice questions available for this domain.</div>' +
        '<div class="protocol-list">' + topicsHtml + '</div>' +
        '<div class="mt-2"><button class="btn btn-accent" data-start-domain="' + domain.id + '">Start Domain Quiz</button></div>';

      section.appendChild(block);
    });
  }

  var mockState = {
    activeDomain: 'all',
    index: 0
  };

  function domainLabel(id) {
    if (id === 'all') return 'All Domains';
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

    var controlsHtml = '<div class="card">' +
      '<div class="flex items-center justify-between gap-2" style="flex-wrap:wrap;">' +
      '<div><div class="card-title">Practice Exam</div><div class="card-subtitle">' + escapeHtml(domainLabel(mockState.activeDomain)) + '</div></div>' +
      '<div class="flex gap-1" style="flex-wrap:wrap;">' +
      '<button class="btn btn-outline btn-sm" data-mock-domain="all">All</button>' +
      '<button class="btn btn-outline btn-sm" data-mock-domain="domain1">D1</button>' +
      '<button class="btn btn-outline btn-sm" data-mock-domain="domain2">D2</button>' +
      '<button class="btn btn-outline btn-sm" data-mock-domain="domain3">D3</button>' +
      '<button class="btn btn-outline btn-sm" data-mock-domain="domain4">D4</button>' +
      '<button class="btn btn-outline btn-sm" data-mock-domain="domain5">D5</button>' +
      '</div></div>' +
      '<div class="exam-progress mt-2"><div class="progress-bar"><div class="progress-fill" style="width:' + (total ? Math.round((answeredCount / total) * 100) : 0) + '%"></div></div><div class="progress-text">' + answeredCount + ' / ' + total + ' answered</div></div>' +
      '</div>';

    var body = document.createElement('div');
    body.innerHTML = controlsHtml;

    if (!total) {
      var empty = document.createElement('div');
      empty.className = 'empty-state';
      empty.textContent = 'No questions are available for this domain.';
      body.appendChild(empty);
      section.appendChild(body);
      return;
    }

    var question = questions[mockState.index];
    var card = createQuestionCard(question, mockState.index, total);
    body.appendChild(card);

    var nav = document.createElement('div');
    nav.className = 'exam-submit-area';
    nav.innerHTML =
      '<button class="btn btn-outline" data-nav="prev" ' + (mockState.index === 0 ? 'disabled aria-disabled="true"' : '') + '>Previous</button> ' +
      '<button class="btn btn-accent" data-nav="next" ' + (mockState.index >= total - 1 ? 'disabled aria-disabled="true"' : '') + '>Next</button>';
    body.appendChild(nav);

    var oldCards = section.querySelectorAll('.card, .question-card, .exam-submit-area, .empty-state');
    oldCards.forEach(function (el) { el.remove(); });
    section.appendChild(body);

    body.querySelectorAll('[data-mock-domain]').forEach(function (btn) {
      if (btn.getAttribute('data-mock-domain') === mockState.activeDomain) {
        btn.classList.remove('btn-outline');
        btn.classList.add('btn-accent');
      }
      btn.addEventListener('click', function () {
        mockState.activeDomain = btn.getAttribute('data-mock-domain');
        mockState.index = 0;
        renderMockReview();
      });
    });

    body.querySelectorAll('.option-btn:not([disabled])').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var qid = btn.getAttribute('data-qid');
        var q = questions.find(function (item) { return String(item.id) === qid; });
        if (!q) return;
        setAnswer(q, btn.getAttribute('data-letter'));
        renderMockReview();
      });
    });

    body.querySelectorAll('[data-nav]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (btn.getAttribute('data-nav') === 'prev') mockState.index -= 1;
        if (btn.getAttribute('data-nav') === 'next') mockState.index += 1;
        renderMockReview();
      });
    });
  }

  function startDomainQuiz(domainId) {
    mockState.activeDomain = domainId;
    mockState.index = 0;
    showSection('mock');
    renderMockReview();
  }

  function bindDomainQuizButtons() {
    document.querySelectorAll('[data-start-domain]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var domainId = btn.getAttribute('data-start-domain');
        startDomainQuiz(domainId);
      });
    });
  }

  function renderKeywords() {
    var section = sectionFromKey('keywords');
    if (!section) return;

    var words = [];
    if (typeof az104Domains !== 'undefined') {
      az104Domains.forEach(function (d) {
        (d.topics || []).forEach(function (topic) {
          var term = String(topic).split('(')[0].trim();
          words.push({
            front: term,
            back: d.name
          });
        });
      });
    }

    var unique = [];
    var seen = {};
    words.forEach(function (w) {
      var key = w.front.toLowerCase();
      if (seen[key]) return;
      seen[key] = true;
      unique.push(w);
    });

    var container = document.createElement('div');
    container.className = 'card';
    container.innerHTML =
      '<div class="keyword-header"><h2>Flip Cards</h2><p class="text-muted">Click a keyword card to reveal its domain context.</p></div>' +
      '<div class="keyword-grid" id="keyword-grid"></div>';

    var old = section.querySelector('.card');
    if (old) old.remove();
    section.appendChild(container);

    var grid = container.querySelector('#keyword-grid');
    unique.slice(0, 28).forEach(function (entry) {
      var card = document.createElement('div');
      card.className = 'keyword-card';
      card.innerHTML = '<div class="keyword-front">' + escapeHtml(entry.front) + '</div><div class="keyword-back">' + escapeHtml(entry.back) + '</div>';
      card.addEventListener('click', function () {
        card.classList.toggle('flipped');
      });
      grid.appendChild(card);
    });
  }

  function renderWeaknessLog() {
    var container = byId('errorLogContainer');
    if (!container) return;

    var ids = Object.keys(state.answers).filter(function (qid) {
      var q = allQuestions().find(function (item) { return String(item.id) === qid; });
      return q && state.answers[qid] !== q.correct;
    });

    if (!ids.length) {
      container.innerHTML = '<div class="empty-state">No weak areas logged yet. Incorrect answers will appear here.</div>';
      return;
    }

    var html = '';
    ids.forEach(function (qid) {
      var q = allQuestions().find(function (item) { return String(item.id) === qid; });
      if (!q) return;
      html += '<div class="error-log-entry">';
      html += '<div class="ele-header"><div class="ele-tag">Review Needed</div><div class="text-muted">Q' + qid + '</div></div>';
      html += '<div class="ele-question">' + escapeHtml(q.question) + '</div>';
      html += '<div class="ele-note"><b>Your answer:</b> ' + escapeHtml(state.answers[qid]) + ' &nbsp; <b>Correct:</b> ' + escapeHtml(q.correct) + '</div>';
      html += '</div>';
    });

    container.innerHTML = html;
  }

  function renderCheatSheet() {
    var section = sectionFromKey('cheat');
    if (!section) return;

    var commands = [
      { title: 'List Resource Groups', cmd: 'az group list -o table' },
      { title: 'List VMs', cmd: 'az vm list -d -o table' },
      { title: 'Check NSG Rules', cmd: 'az network nsg rule list -g <rg> --nsg-name <nsg> -o table' },
      { title: 'Storage Account Keys', cmd: 'az storage account keys list -g <rg> -n <account>' },
      { title: 'List Subscriptions', cmd: 'az account list --output table' }
    ];

    var html = '<div class="cheatsheet-card"><div class="cheatsheet-title">AZ CLI Quick Reference</div><div class="cheatsheet-items">';
    commands.forEach(function (item) {
      html += '<div class="cheatsheet-item"><div class="cs-header"><div class="cs-desc">' + escapeHtml(item.title) + '</div></div><pre class="cs-code">' + escapeHtml(item.cmd) + '</pre></div>';
    });
    html += '</div></div>';

    html += '<div class="card"><h3 style="margin-bottom:0.75rem;">Subnet Calculator</h3>' +
      '<div class="subnet-input-row"><label for="cidr-input">CIDR:</label><input id="cidr-input" class="cidr-input" type="number" min="' + MIN_SUBNET_CIDR + '" max="' + MAX_SUBNET_CIDR + '" value="24"><button id="btn-calc-subnet" class="btn btn-accent btn-sm">Calculate</button></div>' +
      '<div id="subnet-output" class="subnet-result-card"></div></div>';

    var old = section.querySelectorAll('.cheatsheet-card, .card');
    old.forEach(function (n) { n.remove(); });
    section.insertAdjacentHTML('beforeend', html);

    var calcBtn = byId('btn-calc-subnet');
    if (calcBtn) {
      calcBtn.addEventListener('click', function () {
        var cidr = Number((byId('cidr-input') || {}).value || 24);
        cidr = Math.max(MIN_SUBNET_CIDR, Math.min(MAX_SUBNET_CIDR, cidr));
        var hostBits = 32 - cidr;
        var totalIps = Math.pow(2, hostBits);
        var usable = Math.max(0, totalIps - 5);
        var output = byId('subnet-output');
        if (!output) return;
        output.innerHTML =
          '<div class="subnet-stat"><span class="stat-label">CIDR</span><span class="stat-value">/' + cidr + '</span></div>' +
          '<div class="subnet-stat"><span class="stat-label">Total IPs</span><span class="stat-value">' + totalIps + '</span></div>' +
          '<div class="subnet-stat"><span class="stat-label">Usable IPs</span><span class="stat-value">' + usable + '</span></div>' +
          '<div class="subnet-stat"><span class="stat-label">Reserved</span><span class="stat-value">5</span></div>';
      });
      calcBtn.click();
    }
  }

  function updateStats() {
    var questions = allQuestions();
    var answered = 0;
    var correct = 0;

    questions.forEach(function (q) {
      var ans = answerForQuestion(q);
      if (!ans) return;
      answered += 1;
      if (ans === q.correct) correct += 1;
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

    var wrongCount = answered - correct;

    if (overviewProgress) overviewProgress.textContent = pctAnswered + '%';
    if (overviewProgress && overviewProgress.nextElementSibling) {
      overviewProgress.nextElementSibling.textContent = Math.min(STUDY_DAYS, Math.round((pctAnswered / 100) * STUDY_DAYS)) + ' of ' + STUDY_DAYS + ' days completed';
    }

    if (overviewQuestions) overviewQuestions.textContent = String(answered);
    if (overviewAccuracy) overviewAccuracy.textContent = answered ? (accuracy + '%') : '—';
    if (overviewWeaknesses) overviewWeaknesses.textContent = String(wrongCount);
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function init() {
    bindNavigation();
    bindTimer();
    renderDomainSections();
    bindDomainQuizButtons();
    renderKeywords();
    renderCheatSheet();
    renderWeaknessLog();
    renderMockReview();
    updateStats();

    if (!sectionFromKey(state.activeSection)) {
      state.activeSection = 'overview';
    }
    showSection(state.activeSection);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
