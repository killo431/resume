// AZ-104 Study App - Quiz Engine
const AZ104Engine = (() => {
  // App state
  let state = {
    mode: 'home',        // home | study | quiz | results | review
    currentQuestion: 0,
    selectedAnswer: null,
    showExplanation: false,
    score: 0,
    answers: [],          // { questionId, selected, correct }
    quizQuestions: [],
    domainFilter: 'all',
    difficultyFilter: 'all',
    startTime: null,
    endTime: null,
    studyDomain: null,
  };

  // Utility: shuffle array (Fisher-Yates)
  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // Filter questions based on domain and difficulty
  function filterQuestions(domain, difficulty) {
    let questions = [...AZ104_QUESTIONS];
    if (domain && domain !== 'all') {
      questions = questions.filter(q => q.domain === domain);
    }
    if (difficulty && difficulty !== 'all') {
      questions = questions.filter(q => q.difficulty === difficulty);
    }
    return questions;
  }

  // Start quiz
  function startQuiz(domain, difficulty, count) {
    const filtered = filterQuestions(domain, difficulty);
    const shuffled = shuffle(filtered);
    state.quizQuestions = shuffled.slice(0, Math.min(count || 20, shuffled.length));
    state.currentQuestion = 0;
    state.selectedAnswer = null;
    state.showExplanation = false;
    state.score = 0;
    state.answers = [];
    state.mode = 'quiz';
    state.startTime = Date.now();
    state.endTime = null;
    state.domainFilter = domain || 'all';
    state.difficultyFilter = difficulty || 'all';
    render();
  }

  // Submit answer for current question
  function submitAnswer(answerIndex) {
    if (state.selectedAnswer !== null) return; // already answered
    const q = state.quizQuestions[state.currentQuestion];
    const isCorrect = answerIndex === q.correct;
    state.selectedAnswer = answerIndex;
    state.showExplanation = true;
    if (isCorrect) state.score++;
    state.answers.push({
      questionId: q.id,
      questionIndex: state.currentQuestion,
      selected: answerIndex,
      correct: q.correct,
      isCorrect
    });
    render();
  }

  // Next question
  function nextQuestion() {
    if (state.currentQuestion < state.quizQuestions.length - 1) {
      state.currentQuestion++;
      state.selectedAnswer = null;
      state.showExplanation = false;
    } else {
      state.mode = 'results';
      state.endTime = Date.now();
    }
    render();
  }

  // Go to review mode
  function reviewAnswers() {
    state.mode = 'review';
    state.currentQuestion = 0;
    render();
  }

  // Navigate review questions
  function reviewGoto(index) {
    state.currentQuestion = index;
    render();
  }

  // Go home
  function goHome() {
    state.mode = 'home';
    render();
  }

  // Go to study mode (domain browser)
  function goStudy(domainId) {
    state.mode = 'study';
    state.studyDomain = domainId || null;
    render();
  }

  // Get domain by id
  function getDomain(id) {
    return AZ104_STUDY_DATA.domains.find(d => d.id === id);
  }

  // Get domain name for a question
  function getDomainName(domainId) {
    const d = getDomain(domainId);
    return d ? d.name : domainId;
  }

  // Format time in mm:ss
  function formatTime(ms) {
    const totalSec = Math.floor(ms / 1000);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${min}m ${sec.toString().padStart(2, '0')}s`;
  }

  // Get score percentage
  function getScorePercent() {
    if (!state.quizQuestions.length) return 0;
    return Math.round((state.score / state.quizQuestions.length) * 100);
  }

  // Get Azure-style pass/fail (700/1000 = 70%)
  function getAzureScore() {
    return Math.round(getScorePercent() * 10);
  }

  // === RENDER FUNCTIONS ===

  function render() {
    const root = document.getElementById('az104-app');
    if (!root) return;

    root.innerHTML = '';

    switch (state.mode) {
      case 'home':     root.appendChild(renderHome()); break;
      case 'study':    root.appendChild(renderStudy()); break;
      case 'quiz':     root.appendChild(renderQuiz()); break;
      case 'results':  root.appendChild(renderResults()); break;
      case 'review':   root.appendChild(renderReview()); break;
    }
  }

  function renderHome() {
    const domains = AZ104_STUDY_DATA.domains;

    const div = el('div', 'az104-home');
    div.innerHTML = `
      <div class="az104-hero">
        <div class="az104-badge">Microsoft Certified</div>
        <h1 class="az104-title">${AZ104_STUDY_DATA.examTitle}</h1>
        <p class="az104-subtitle">Practice exam · Study guide · ${AZ104_QUESTIONS.length} questions</p>
        <div class="az104-exam-meta">
          <span>⏱ ${AZ104_STUDY_DATA.timeLimit} min</span>
          <span>📋 ~${AZ104_STUDY_DATA.totalQuestions} questions</span>
          <span>🎯 Pass score: ${AZ104_STUDY_DATA.passingScore}/${AZ104_STUDY_DATA.maxScore}</span>
        </div>
      </div>

      <div class="az104-actions">
        <button class="az104-btn az104-btn-primary" id="btn-start-full">
          🚀 Start Full Practice Exam (${AZ104_QUESTIONS.length} Qs)
        </button>
        <button class="az104-btn az104-btn-secondary" id="btn-start-quick">
          ⚡ Quick Quiz (10 Questions)
        </button>
        <button class="az104-btn az104-btn-outline" id="btn-study">
          📚 Study by Domain
        </button>
      </div>

      <h2 class="az104-section-title">Exam Domains</h2>
      <div class="az104-domains-grid" id="domains-grid"></div>

      <h2 class="az104-section-title">Study Tips</h2>
      <ul class="az104-tips-list">
        ${AZ104_STUDY_DATA.studyTips.map(t => `<li>${t}</li>`).join('')}
      </ul>
    `;

    // Domain cards
    const grid = div.querySelector('#domains-grid');
    domains.forEach(d => {
      const card = el('div', 'az104-domain-card');
      card.style.borderTopColor = d.color;
      card.innerHTML = `
        <div class="az104-domain-header">
          <span class="az104-domain-name">${d.name}</span>
          <span class="az104-domain-weight" style="background:${d.color}20;color:${d.color}">${d.weight}</span>
        </div>
        <ul class="az104-topic-list">
          ${d.topics.map(t => `<li>${t.name}</li>`).join('')}
        </ul>
        <button class="az104-btn az104-btn-sm" data-domain="${d.id}">Practice this domain →</button>
      `;
      card.querySelector('button').addEventListener('click', () => startQuiz(d.id, 'all', 15));
      grid.appendChild(card);
    });

    div.querySelector('#btn-start-full').addEventListener('click', () => startQuiz('all', 'all', AZ104_QUESTIONS.length));
    div.querySelector('#btn-start-quick').addEventListener('click', () => startQuiz('all', 'all', 10));
    div.querySelector('#btn-study').addEventListener('click', () => goStudy());

    return div;
  }

  function renderStudy() {
    const div = el('div', 'az104-study');

    if (state.studyDomain) {
      const domain = getDomain(state.studyDomain);
      div.innerHTML = `
        <button class="az104-back-btn" id="back-study">← Back to Domains</button>
        <h2 class="az104-page-title" style="color:${domain.color}">${domain.name}</h2>
        <div class="az104-domain-weight-badge" style="background:${domain.color}20;color:${domain.color}">Exam weight: ${domain.weight}</div>
        ${domain.topics.map(topic => `
          <div class="az104-study-topic">
            <h3 class="az104-topic-title">${topic.name}</h3>
            <ul class="az104-subtopic-list">
              ${topic.subtopics.map(s => `<li>${s}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
        <button class="az104-btn az104-btn-primary" id="quiz-domain" style="margin-top:1.5rem">
          Practice ${domain.name} Questions →
        </button>
      `;
      div.querySelector('#back-study').addEventListener('click', () => goStudy());
      div.querySelector('#quiz-domain').addEventListener('click', () => startQuiz(state.studyDomain, 'all', 15));
    } else {
      div.innerHTML = `
        <button class="az104-back-btn" id="back-home">← Back to Home</button>
        <h2 class="az104-page-title">Study by Domain</h2>
        <div class="az104-domains-grid" id="study-domains"></div>
        <h2 class="az104-section-title" style="margin-top:2rem">Key Azure Services</h2>
        <div class="az104-services-grid">
          ${Object.entries(AZ104_STUDY_DATA.keyServices).map(([cat, svcs]) => `
            <div class="az104-services-category">
              <h4>${cat.charAt(0).toUpperCase() + cat.slice(1)}</h4>
              <div class="az104-service-tags">
                ${svcs.map(s => `<span class="az104-service-tag">${s}</span>`).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      `;
      div.querySelector('#back-home').addEventListener('click', goHome);

      const domainsGrid = div.querySelector('#study-domains');
      AZ104_STUDY_DATA.domains.forEach(d => {
        const card = el('div', 'az104-domain-card az104-domain-card-clickable');
        card.style.borderTopColor = d.color;
        card.style.cursor = 'pointer';
        card.innerHTML = `
          <div class="az104-domain-header">
            <span class="az104-domain-name">${d.name}</span>
            <span class="az104-domain-weight" style="background:${d.color}20;color:${d.color}">${d.weight}</span>
          </div>
          <p style="font-size:0.85rem;color:#64748b;margin:0.5rem 0 0">${d.topics.length} topic areas</p>
        `;
        card.addEventListener('click', () => goStudy(d.id));
        domainsGrid.appendChild(card);
      });
    }

    return div;
  }

  function renderQuiz() {
    const q = state.quizQuestions[state.currentQuestion];
    const progress = ((state.currentQuestion + 1) / state.quizQuestions.length) * 100;
    const domain = getDomain(q.domain);
    const answered = state.selectedAnswer !== null;

    const div = el('div', 'az104-quiz');

    const diffColors = { easy: '#22c55e', medium: '#f59e0b', hard: '#ef4444' };

    div.innerHTML = `
      <div class="az104-quiz-header">
        <div class="az104-quiz-meta">
          <span>Question ${state.currentQuestion + 1} of ${state.quizQuestions.length}</span>
          <span class="az104-diff-badge" style="background:${diffColors[q.difficulty]}20;color:${diffColors[q.difficulty]}">${q.difficulty}</span>
          <span class="az104-domain-pill" style="background:${domain.color}15;color:${domain.color}">${domain.name}</span>
        </div>
        <div class="az104-progress-bar">
          <div class="az104-progress-fill" style="width:${progress}%"></div>
        </div>
        <div class="az104-score-display">Score: ${state.score}/${state.currentQuestion + (answered ? 1 : 0)}</div>
      </div>

      <div class="az104-question-text">${q.question}</div>

      <div class="az104-options" id="options-container"></div>

      ${answered ? `
        <div class="az104-explanation ${state.selectedAnswer === q.correct ? 'az104-correct-exp' : 'az104-wrong-exp'}">
          <strong>${state.selectedAnswer === q.correct ? '✅ Correct!' : '❌ Incorrect'}</strong>
          <p>${q.explanation}</p>
        </div>
        <button class="az104-btn az104-btn-primary az104-next-btn" id="btn-next">
          ${state.currentQuestion < state.quizQuestions.length - 1 ? 'Next Question →' : 'View Results →'}
        </button>
      ` : ''}
      <button class="az104-btn az104-btn-ghost" id="btn-quit">Quit Quiz</button>
    `;

    const optionsContainer = div.querySelector('#options-container');
    q.options.forEach((opt, i) => {
      const btn = el('button', 'az104-option');
      if (answered) {
        if (i === q.correct) btn.classList.add('az104-option-correct');
        else if (i === state.selectedAnswer && i !== q.correct) btn.classList.add('az104-option-wrong');
        else btn.classList.add('az104-option-disabled');
        btn.disabled = true;
      }
      btn.innerHTML = `<span class="az104-opt-letter">${'ABCD'[i]}</span> ${opt}`;
      if (!answered) {
        btn.addEventListener('click', () => submitAnswer(i));
      }
      optionsContainer.appendChild(btn);
    });

    if (answered) {
      div.querySelector('#btn-next').addEventListener('click', nextQuestion);
    }
    div.querySelector('#btn-quit').addEventListener('click', () => {
      if (confirm('Quit the quiz? Your progress will be lost.')) goHome();
    });

    return div;
  }

  function renderResults() {
    const percent = getScorePercent();
    const azureScore = getAzureScore();
    const passed = azureScore >= AZ104_STUDY_DATA.passingScore;
    const elapsed = state.endTime - state.startTime;

    // Domain breakdown
    const domainStats = {};
    AZ104_STUDY_DATA.domains.forEach(d => {
      domainStats[d.id] = { name: d.name, correct: 0, total: 0, color: d.color };
    });
    state.quizQuestions.forEach((q, i) => {
      const ans = state.answers[i];
      if (ans) {
        domainStats[q.domain].total++;
        if (ans.isCorrect) domainStats[q.domain].correct++;
      }
    });

    const div = el('div', 'az104-results');
    div.innerHTML = `
      <div class="az104-results-header ${passed ? 'az104-passed' : 'az104-failed'}">
        <div class="az104-result-icon">${passed ? '🎉' : '📚'}</div>
        <h2>${passed ? 'Congratulations! You Passed!' : 'Keep Studying — You Can Do It!'}</h2>
        <div class="az104-score-circle">
          <span class="az104-score-big">${azureScore}</span>
          <span class="az104-score-out">/ ${AZ104_STUDY_DATA.maxScore}</span>
        </div>
        <div class="az104-result-details">
          <span>${state.score} / ${state.quizQuestions.length} correct (${percent}%)</span>
          <span>Time: ${formatTime(elapsed)}</span>
          <span class="az104-pass-fail-badge">${passed ? '✅ PASS' : '❌ FAIL'} (Pass: ${AZ104_STUDY_DATA.passingScore})</span>
        </div>
      </div>

      <h3 class="az104-section-title">Performance by Domain</h3>
      <div class="az104-domain-breakdown" id="domain-breakdown"></div>

      <div class="az104-results-actions">
        <button class="az104-btn az104-btn-primary" id="btn-review">📋 Review Answers</button>
        <button class="az104-btn az104-btn-secondary" id="btn-retry">🔄 Retake Quiz</button>
        <button class="az104-btn az104-btn-outline" id="btn-home-results">🏠 Home</button>
      </div>
    `;

    const breakdown = div.querySelector('#domain-breakdown');
    Object.values(domainStats).filter(d => d.total > 0).forEach(d => {
      const pct = Math.round((d.correct / d.total) * 100);
      const row = el('div', 'az104-breakdown-row');
      row.innerHTML = `
        <div class="az104-breakdown-label">
          <span style="color:${d.color}">${d.name}</span>
          <span>${d.correct}/${d.total} (${pct}%)</span>
        </div>
        <div class="az104-breakdown-bar">
          <div class="az104-breakdown-fill" style="width:${pct}%;background:${d.color}"></div>
        </div>
      `;
      breakdown.appendChild(row);
    });

    div.querySelector('#btn-review').addEventListener('click', reviewAnswers);
    div.querySelector('#btn-retry').addEventListener('click', () => startQuiz(state.domainFilter, state.difficultyFilter, state.quizQuestions.length));
    div.querySelector('#btn-home-results').addEventListener('click', goHome);

    return div;
  }

  function renderReview() {
    const q = state.quizQuestions[state.currentQuestion];
    const ans = state.answers[state.currentQuestion];
    const domain = getDomain(q.domain);
    const diffColors = { easy: '#22c55e', medium: '#f59e0b', hard: '#ef4444' };

    const div = el('div', 'az104-review');
    div.innerHTML = `
      <div class="az104-review-header">
        <button class="az104-back-btn" id="back-results">← Back to Results</button>
        <span>Review: ${state.currentQuestion + 1} / ${state.quizQuestions.length}</span>
      </div>

      <div class="az104-quiz-meta" style="margin-bottom:1rem">
        <span class="az104-diff-badge" style="background:${diffColors[q.difficulty]}20;color:${diffColors[q.difficulty]}">${q.difficulty}</span>
        <span class="az104-domain-pill" style="background:${domain.color}15;color:${domain.color}">${domain.name}</span>
        ${ans ? `<span class="${ans.isCorrect ? 'az104-correct-badge' : 'az104-wrong-badge'}">${ans.isCorrect ? '✅ Correct' : '❌ Incorrect'}</span>` : ''}
      </div>

      <div class="az104-question-text">${q.question}</div>

      <div class="az104-options az104-options-review">
        ${q.options.map((opt, i) => {
          let cls = 'az104-option az104-option-disabled';
          if (i === q.correct) cls += ' az104-option-correct';
          else if (ans && i === ans.selected && !ans.isCorrect) cls += ' az104-option-wrong';
          return `<button class="${cls}" disabled><span class="az104-opt-letter">${'ABCD'[i]}</span> ${opt}</button>`;
        }).join('')}
      </div>

      <div class="az104-explanation ${ans && ans.isCorrect ? 'az104-correct-exp' : 'az104-wrong-exp'}">
        <strong>Explanation:</strong>
        <p>${q.explanation}</p>
      </div>

      <div class="az104-review-nav">
        <button class="az104-btn az104-btn-outline" id="btn-prev-review" ${state.currentQuestion === 0 ? 'disabled' : ''}>← Previous</button>
        <div class="az104-review-dots">
          ${state.quizQuestions.map((_, i) => {
            const a = state.answers[i];
            const cls = a ? (a.isCorrect ? 'az104-dot-correct' : 'az104-dot-wrong') : 'az104-dot-neutral';
            return `<button class="az104-dot ${cls} ${i === state.currentQuestion ? 'az104-dot-active' : ''}" data-idx="${i}">${i + 1}</button>`;
          }).join('')}
        </div>
        <button class="az104-btn az104-btn-outline" id="btn-next-review" ${state.currentQuestion === state.quizQuestions.length - 1 ? 'disabled' : ''}>Next →</button>
      </div>
    `;

    div.querySelector('#back-results').addEventListener('click', () => { state.mode = 'results'; render(); });
    const prevBtn = div.querySelector('#btn-prev-review');
    const nextBtn = div.querySelector('#btn-next-review');
    if (prevBtn && !prevBtn.disabled) prevBtn.addEventListener('click', () => reviewGoto(state.currentQuestion - 1));
    if (nextBtn && !nextBtn.disabled) nextBtn.addEventListener('click', () => reviewGoto(state.currentQuestion + 1));
    div.querySelectorAll('.az104-dot').forEach(dot => {
      dot.addEventListener('click', () => reviewGoto(parseInt(dot.dataset.idx)));
    });

    return div;
  }

  // Helper: create element with class
  function el(tag, className) {
    const e = document.createElement(tag);
    if (className) e.className = className;
    return e;
  }

  // Public API
  return { render, startQuiz, goHome, goStudy };
})();

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => AZ104Engine.render());
} else {
  AZ104Engine.render();
}
