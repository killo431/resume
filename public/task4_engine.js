// AZ-104 Study Engine - Task 4: Application Engine
// Manages quiz state, progress tracking, and UI interactions for the AZ-104 dashboard.

var STATE_KEY = 'az104_app_state';

var AZ104Engine = (function() {
  'use strict';

  // ── State Management ─────────────────────────────────────────────────────────

  var defaultState = {
    currentDomain: null,
    currentQuestionIndex: 0,
    answeredQuestions: {},
    score: { correct: 0, total: 0 },
    activeTab: 'overview',
    completedDomains: [],
    startTime: null,
    lastSaved: null
  };

  function loadState() {
    try {
      var saved = localStorage.getItem(STATE_KEY);
      if (saved) {
        var parsed = JSON.parse(saved);
        return Object.assign({}, defaultState, parsed);
      }
    } catch (e) {
      console.warn('[AZ104Engine] Failed to load state:', e);
    }
    return Object.assign({}, defaultState);
  }

  function saveState(state) {
    try {
      state.lastSaved = new Date().toISOString();
      localStorage.setItem(STATE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('[AZ104Engine] Failed to save state:', e);
    }
  }

  function clearState() {
    try {
      localStorage.removeItem(STATE_KEY);
    } catch (e) {
      console.warn('[AZ104Engine] Failed to clear state:', e);
    }
  }

  // ── Current State ─────────────────────────────────────────────────────────────

  var state = loadState();

  // ── Tab Navigation ────────────────────────────────────────────────────────────

  function switchTab(tabId) {
    state.activeTab = tabId;
    saveState(state);

    // Update tab button styles
    var tabs = document.querySelectorAll('.az104-tab-btn');
    tabs.forEach(function(btn) {
      if (btn.dataset.tab === tabId) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      }
    });

    // Show/hide tab panels
    var panels = document.querySelectorAll('.az104-tab-panel');
    panels.forEach(function(panel) {
      if (panel.id === 'tab-' + tabId) {
        panel.classList.remove('hidden');
        panel.setAttribute('aria-hidden', 'false');
      } else {
        panel.classList.add('hidden');
        panel.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // ── Quiz Logic ────────────────────────────────────────────────────────────────

  function startQuiz(domainId) {
    var questions = domainId === 'all'
      ? (typeof az104Questions !== 'undefined' ? az104Questions : [])
      : (typeof getQuestionsByDomain !== 'undefined' ? getQuestionsByDomain(domainId) : []);

    if (!questions || questions.length === 0) {
      showMessage('No questions available for this domain.', 'warning');
      return;
    }

    state.currentDomain = domainId;
    state.currentQuestionIndex = 0;
    state.startTime = new Date().toISOString();
    saveState(state);

    renderQuestion(questions, 0);
    switchTab('quiz');
  }

  function renderQuestion(questions, index) {
    var container = document.getElementById('quiz-container');
    if (!container) return;

    var q = questions[index];
    if (!q) {
      renderQuizComplete(questions);
      return;
    }

    var answered = state.answeredQuestions[q.id];
    var progressPct = Math.round(((index) / questions.length) * 100);

    var html = '<div class="az104-question-card">';
    html += '<div class="az104-progress-bar" role="progressbar" aria-valuenow="' + progressPct + '" aria-valuemin="0" aria-valuemax="100">';
    html += '<div class="az104-progress-fill" style="width:' + progressPct + '%"></div></div>';
    html += '<p class="az104-progress-text">Question ' + (index + 1) + ' of ' + questions.length + '</p>';
    html += '<div class="az104-domain-badge">' + getDomainName(q.domain) + ' &bull; ' + capitalize(q.difficulty) + '</div>';
    html += '<h3 class="az104-question-text">' + escapeHtml(q.question) + '</h3>';
    html += '<div class="az104-options" role="group" aria-label="Answer options">';

    q.options.forEach(function(opt, i) {
      var letter = String.fromCharCode(65 + i);
      var isCorrect = letter === q.correct;
      var isSelected = answered === letter;
      var cls = 'az104-option';
      if (answered) {
        if (isCorrect) cls += ' correct';
        else if (isSelected) cls += ' incorrect';
        else cls += ' disabled';
      }
      html += '<button class="' + cls + '" data-letter="' + letter + '" data-qid="' + q.id + '"';
      if (answered) html += ' disabled';
      html += '>' + escapeHtml(opt) + '</button>';
    });

    html += '</div>';

    if (answered) {
      var isRight = answered === q.correct;
      html += '<div class="az104-explanation ' + (isRight ? 'correct' : 'incorrect') + '">';
      html += '<strong>' + (isRight ? '✓ Correct!' : '✗ Incorrect') + '</strong> ' + escapeHtml(q.explanation);
      html += '</div>';
    }

    html += '<div class="az104-nav-btns">';
    if (index > 0) html += '<button class="az104-btn secondary" id="btn-prev">← Previous</button>';
    if (index < questions.length - 1) {
      html += '<button class="az104-btn primary" id="btn-next">Next →</button>';
    } else {
      html += '<button class="az104-btn success" id="btn-finish">Finish Quiz</button>';
    }
    html += '</div></div>';

    container.innerHTML = html;

    // Bind option click handlers
    container.querySelectorAll('.az104-option:not([disabled])').forEach(function(btn) {
      btn.addEventListener('click', function() {
        answerQuestion(questions, index, btn.dataset.letter, btn.dataset.qid);
      });
    });

    // Bind nav buttons
    var prevBtn = document.getElementById('btn-prev');
    var nextBtn = document.getElementById('btn-next');
    var finishBtn = document.getElementById('btn-finish');

    if (prevBtn) prevBtn.addEventListener('click', function() { renderQuestion(questions, index - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function() { renderQuestion(questions, index + 1); });
    if (finishBtn) finishBtn.addEventListener('click', function() { renderQuizComplete(questions); });
  }

  function answerQuestion(questions, index, letter, qid) {
    var q = questions[index];
    if (!q || state.answeredQuestions[qid]) return;

    state.answeredQuestions[qid] = letter;
    if (letter === q.correct) {
      state.score.correct++;
    }
    state.score.total++;
    saveState(state);

    renderQuestion(questions, index);
  }

  function renderQuizComplete(questions) {
    var container = document.getElementById('quiz-container');
    if (!container) return;

    var answered = Object.keys(state.answeredQuestions).length;
    var correct = 0;
    questions.forEach(function(q) {
      if (state.answeredQuestions[q.id] === q.correct) correct++;
    });
    var pct = answered > 0 ? Math.round((correct / answered) * 100) : 0;
    var passed = pct >= 70;

    var html = '<div class="az104-result-card ' + (passed ? 'pass' : 'fail') + '">';
    html += '<div class="az104-result-icon">' + (passed ? '🎉' : '📚') + '</div>';
    html += '<h3>' + (passed ? 'Great Job!' : 'Keep Studying!') + '</h3>';
    html += '<div class="az104-score">' + pct + '%</div>';
    html += '<p>' + correct + ' correct out of ' + answered + ' answered</p>';
    html += '<p class="az104-pass-note">' + (passed ? 'You passed! Score ≥ 70%' : 'Score below 70% — review explanations and retry.') + '</p>';
    html += '<div class="az104-nav-btns">';
    html += '<button class="az104-btn secondary" onclick="AZ104Engine.resetQuiz()">Reset Quiz</button>';
    html += '<button class="az104-btn primary" onclick="AZ104Engine.switchTab(\'overview\')">Back to Overview</button>';
    html += '</div></div>';

    container.innerHTML = html;
  }

  function resetQuiz() {
    state.answeredQuestions = {};
    state.score = { correct: 0, total: 0 };
    state.currentDomain = null;
    state.currentQuestionIndex = 0;
    saveState(state);

    var container = document.getElementById('quiz-container');
    if (container) {
      container.innerHTML = '<p class="az104-placeholder">Select a domain above to begin a quiz.</p>';
    }
    switchTab('overview');
  }

  // ── Reference / Flashcards ────────────────────────────────────────────────────

  function renderDomainList() {
    var container = document.getElementById('domain-list');
    if (!container || typeof az104Domains === 'undefined') return;

    var html = '';
    az104Domains.forEach(function(d) {
      var qCount = typeof getQuestionsByDomain !== 'undefined' ? getQuestionsByDomain(d.id).length : 0;
      html += '<div class="az104-domain-card">';
      html += '<div class="az104-domain-header">';
      html += '<h4>' + escapeHtml(d.name) + '</h4>';
      html += '<span class="az104-weight-badge">' + d.weight + '</span>';
      html += '</div>';
      html += '<ul class="az104-topic-list">';
      d.topics.forEach(function(t) {
        html += '<li>' + escapeHtml(t) + '</li>';
      });
      html += '</ul>';
      html += '<div class="az104-domain-footer">';
      html += '<span>' + qCount + ' practice questions</span>';
      html += '<button class="az104-btn small primary" onclick="AZ104Engine.startQuiz(\'' + d.id + '\')">Practice Domain</button>';
      html += '</div>';
      html += '</div>';
    });

    container.innerHTML = html;
  }

  // ── Utilities ─────────────────────────────────────────────────────────────────

  function getDomainName(domainId) {
    if (typeof az104Domains === 'undefined') return domainId;
    var domain = az104Domains.find(function(d) { return d.id === domainId; });
    return domain ? domain.name : domainId;
  }

  function showMessage(msg, type) {
    var el = document.getElementById('az104-message');
    if (!el) return;
    el.textContent = msg;
    el.className = 'az104-message ' + (type || 'info');
    el.classList.remove('hidden');
    setTimeout(function() { el.classList.add('hidden'); }, 4000);
  }

  function capitalize(str) {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function getProgressSummary() {
    var totalQ = typeof az104Questions !== 'undefined' ? az104Questions.length : 0;
    var answered = Object.keys(state.answeredQuestions).length;
    return {
      total: totalQ,
      answered: answered,
      correct: state.score.correct,
      pct: answered > 0 ? Math.round((state.score.correct / answered) * 100) : 0
    };
  }

  function renderProgressSummary() {
    var el = document.getElementById('progress-summary');
    if (!el) return;
    var p = getProgressSummary();
    el.innerHTML =
      '<div class="az104-stat"><span class="az104-stat-num">' + p.answered + '/' + p.total + '</span><span class="az104-stat-label">Questions Attempted</span></div>' +
      '<div class="az104-stat"><span class="az104-stat-num">' + p.correct + '</span><span class="az104-stat-label">Correct</span></div>' +
      '<div class="az104-stat"><span class="az104-stat-num">' + p.pct + '%</span><span class="az104-stat-label">Accuracy</span></div>';
  }

  // ── Initialization ────────────────────────────────────────────────────────────

  function init() {
    // Restore active tab
    if (state.activeTab) {
      switchTab(state.activeTab);
    }

    // Bind tab buttons
    document.querySelectorAll('.az104-tab-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        switchTab(btn.dataset.tab);
      });
    });

    // Bind domain start buttons in overview
    document.querySelectorAll('[data-start-domain]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        startQuiz(btn.dataset.startDomain);
      });
    });

    // Bind reset button
    var resetBtn = document.getElementById('btn-reset-all');
    if (resetBtn) {
      resetBtn.addEventListener('click', function() {
        if (confirm('Reset all quiz progress? This cannot be undone.')) {
          clearState();
          state = loadState();
          resetQuiz();
          renderProgressSummary();
          renderDomainList();
        }
      });
    }

    // Render initial UI
    renderDomainList();
    renderProgressSummary();
  }

  // Auto-init when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Public API
  return {
    init: init,
    switchTab: switchTab,
    startQuiz: startQuiz,
    resetQuiz: resetQuiz,
    getState: function() { return state; },
    getProgressSummary: getProgressSummary
  };
})();
