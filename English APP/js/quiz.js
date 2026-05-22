import { Storage } from './storage.js';
import { App } from './app.js';
import { APP_DATA } from './data.js';
import { Utils } from './utils.js';
import { state as sharedState } from './state.js';

  let state = 'setup'; // setup | active | results
  let quizType = 'vocabulary'; // vocabulary | grammar | mixed
  let quizDifficulty = 2; // 1 | 2 | 3
  let activeQuestions = [];
  let currentQuestionIndex = 0;
  let selectedOptionIndex = null;
  let isAnswered = false;
  let score = 0;
  let timerInterval = null;
  let timeLeft = 30;
  let quizStartTime = null;
  let userAnswers = []; // list of { question, selected, correct }



  function render(container) {
    if (sharedState.activeMilestoneTask && sharedState.activeMilestoneTask.type === 'quiz') {
      state = 'active';
      quizType = 'mixed';
      quizDifficulty = sharedState.activeMilestoneTask.difficulty || 1;
      currentQuestionIndex = 0;
      score = 0;
      userAnswers = [];
      quizStartTime = Date.now();
      
      const data = APP_DATA;
      if (data) {
        let pool = data.QUIZ_QUESTIONS;
        pool = pool.filter(q => q.difficulty === quizDifficulty);
        pool = [...pool].sort(() => 0.5 - Math.random());
        activeQuestions = pool.slice(0, 6);
        if (activeQuestions.length === 0) {
          activeQuestions = data.QUIZ_QUESTIONS.slice(0, 5);
        }
      }
      
      startQuestionTimer();
      renderQuiz(container);
    } else {
      state = 'setup';
      renderView(container);
    }
    
    return function destroy() {
      clearInterval(timerInterval);
    };
  }

  function renderView(container) {
    switch (state) {
      case 'setup': renderSetup(container); break;
      case 'active': renderQuiz(container); break;
      case 'results': renderResults(container); break;
    }
  }

  // ─── Setup Screen ─────────────────────────────────────────

  function renderSetup(container) {
    container.innerHTML = `
      <div class="page-enter quiz-setup">
        <h1 class="page-title gradient-text">Quiz Arena 🎯</h1>
        <p class="page-subtitle">Test your English speaking, vocabulary, and grammar skills against the clock</p>

        <div class="glass-card">
          <h3 class="section-title" style="margin-top:0">Configure Your Quiz</h3>
          
          <div class="quiz-option-group">
            <p style="font-weight:600; text-align:left; font-size:14px; color:var(--text-secondary);">Select Quiz Subject:</p>
            <select class="select-input" id="quiz-subject" style="width:100%;">
              <option value="vocabulary">Vocabulary Focus</option>
              <option value="grammar">Grammar Focus</option>
              <option value="mixed">Mixed Subject Challenge</option>
            </select>
          </div>

          <div class="quiz-option-group">
            <p style="font-weight:600; text-align:left; font-size:14px; color:var(--text-secondary);">Select Difficulty:</p>
            <select class="select-input" id="quiz-difficulty-level" style="width:100%;">
              <option value="1">Beginner (Level 1)</option>
              <option value="2" selected>Intermediate (Level 2)</option>
              <option value="3">Advanced (Level 3)</option>
            </select>
          </div>

          <button class="btn btn-primary btn-lg" id="start-quiz-btn" style="width:100%; margin-top:20px;">
            Enter Arena →
          </button>
        </div>
      </div>
    `;

    document.getElementById('start-quiz-btn').addEventListener('click', () => {
      quizType = document.getElementById('quiz-subject').value;
      quizDifficulty = parseInt(document.getElementById('quiz-difficulty-level').value);
      
      generateQuizQuestions();
    });
  }

  function generateQuizQuestions() {
    const data = APP_DATA;
    if (!data) return;

    let pool = data.QUIZ_QUESTIONS;

    // Filter by type
    if (quizType !== 'mixed') {
      pool = pool.filter(q => q.type === quizType);
    }

    // Filter by difficulty
    pool = pool.filter(q => q.difficulty === quizDifficulty);

    // Shuffle pool
    pool = [...pool].sort(() => 0.5 - Math.random());

    // Take up to 6 questions
    activeQuestions = pool.slice(0, 6);

    if (activeQuestions.length === 0) {
      App.showNotification('Not enough questions available for this combination. Mixed challenge loaded!', 'info');
      activeQuestions = data.QUIZ_QUESTIONS.slice(0, 5);
    }

    // Start
    state = 'active';
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    quizStartTime = Date.now();
    
    startQuestionTimer();
    renderView(document.getElementById('main-content'));
  }

  // ─── Active Quiz Screen ───────────────────────────────────

  function startQuestionTimer() {
    clearInterval(timerInterval);
    timeLeft = 30;
    
    const timerBox = document.getElementById('quiz-timer-countdown');
    if (timerBox) {
      timerBox.textContent = timeLeft;
      timerBox.className = 'quiz-timer-box';
    }

    timerInterval = setInterval(() => {
      timeLeft--;
      const box = document.getElementById('quiz-timer-countdown');
      if (box) {
        box.textContent = timeLeft;
        if (timeLeft <= 10 && timeLeft > 4) {
          box.className = 'quiz-timer-box warning';
        } else if (timeLeft <= 4) {
          box.className = 'quiz-timer-box danger';
        }
      }

      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        handleAnswerSelected(-1); // Timeout
      }
    }, 1000);
  }

  function renderQuiz(container) {
    const q = activeQuestions[currentQuestionIndex];
    const progressPercent = ((currentQuestionIndex) / activeQuestions.length) * 100;

    container.innerHTML = `
      <div class="page-enter quiz-container">
        <div class="quiz-header">
          <button class="btn btn-secondary btn-sm" id="quit-quiz-btn">Quit</button>
          
          <div class="quiz-progress-bar">
            <div class="quiz-progress-fill" style="width: ${progressPercent}%;"></div>
          </div>
          
          <div class="quiz-timer-box" id="quiz-timer-countdown">${timeLeft}</div>
        </div>

        <div class="glass-card quiz-question-card">
          <div class="badge badge-beginner" style="margin-bottom: 12px; background-color: var(--bg-tertiary); color: var(--text-secondary);">
            Question ${currentQuestionIndex + 1} of ${activeQuestions.length}
          </div>
          
          <div class="quiz-question-text">${Utils.escapeHTML(q.question)}</div>

          <div class="quiz-answers" id="quiz-answers-group">
            ${q.options.map((opt, idx) => `
              <button class="quiz-answer" data-index="${idx}">${Utils.escapeHTML(opt)}</button>
            `).join('')}
          </div>

          <!-- Explanation Panel -->
          <div class="glass-card" id="quiz-explanation-card" style="display:none; margin-top:24px; border-left: 4px solid var(--accent-cyan); background:rgba(6,182,212,0.03);">
            <strong style="color:var(--accent-cyan)">💡 Solution Key:</strong>
            <p id="quiz-explanation-text" style="font-size:14px; margin-top:6px; color:var(--text-secondary);"></p>
          </div>
        </div>

        <div class="text-right">
          <button class="btn btn-primary" id="next-question-btn" style="display:none;">
            ${currentQuestionIndex === activeQuestions.length - 1 ? 'Finish Quiz ✓' : 'Next Question →'}
          </button>
        </div>
      </div>
    `;

    document.getElementById('quit-quiz-btn').addEventListener('click', () => {
      if (confirm('Are you sure you want to quit the quiz? Your progress will be lost.')) {
        clearInterval(timerInterval);
        if (sharedState.activeMilestoneTask) {
          sharedState.activeMilestoneTask = null;
          App.navigate('#dashboard');
        } else {
          state = 'setup';
          renderView(container);
        }
      }
    });

    // Wire up options
    const answersGroup = document.getElementById('quiz-answers-group');
    answersGroup.addEventListener('click', (e) => {
      const btn = e.target.closest('.quiz-answer');
      if (!btn || isAnswered) return;

      const idx = parseInt(btn.dataset.index);
      handleAnswerSelected(idx);
    });

    document.getElementById('next-question-btn').addEventListener('click', () => {
      if (currentQuestionIndex < activeQuestions.length - 1) {
        currentQuestionIndex++;
        isAnswered = false;
        selectedOptionIndex = null;
        startQuestionTimer();
        renderQuiz(container);
      } else {
        clearInterval(timerInterval);
        triggerQuizFinished();
      }
    });
  }

  function handleAnswerSelected(idx) {
    clearInterval(timerInterval);
    isAnswered = true;
    selectedOptionIndex = idx;
    
    const q = activeQuestions[currentQuestionIndex];
    const answersGroup = document.getElementById('quiz-answers-group');
    const explanationCard = document.getElementById('quiz-explanation-card');
    const explanationText = document.getElementById('quiz-explanation-text');
    const nextBtn = document.getElementById('next-question-btn');

    userAnswers.push({ question: q, selected: idx, correct: q.correct });

    // Mark visual answers
    const optionBtns = answersGroup.querySelectorAll('.quiz-answer');
    optionBtns.forEach((btn, index) => {
      btn.classList.add('disabled');
      if (index === q.correct) {
        btn.classList.add('correct');
      } else if (index === idx) {
        btn.classList.add('incorrect');
      }
    });

    const correct = (idx === q.correct);
    if (correct) {
      score++;
    } else {
      Storage.loseHeart();
      const topbarHearts = document.getElementById('topbar-hearts-btn');
      if (topbarHearts) {
        topbarHearts.textContent = `☕ ${Storage.getHearts()} / 5`;
      }
      if (Storage.getHearts() === 0) {
        clearInterval(timerInterval);
        showRefillModalAndAbort();
        return;
      }
    }
    Utils.playBeep(correct);

    // Show explanation
    explanationText.textContent = q.explanation || 'Perfect!';
    explanationCard.style.display = 'block';
    nextBtn.style.display = 'inline-flex';
  }

  // ─── Results Screen ───────────────────────────────────────

  function triggerQuizFinished() {
    state = 'results';
    
    const duration = Math.round((Date.now() - quizStartTime) / 1000);
    
    // Save history
    Storage.addQuizResult({
      score,
      total: activeQuestions.length,
      duration,
      type: quizType
    });

    // Calculate XP
    let xpEarned = score * 10;
    const isPerfect = (score === activeQuestions.length);
    if (isPerfect) xpEarned += 30; // Perfect bonus!

    const levelResult = Storage.addXP(xpEarned);
    Storage.addActivity({ type: 'quiz_completed', description: `Scored ${score}/${activeQuestions.length} on ${quizType} Quiz`, xp: xpEarned });
    App.updateSidebarXP();

    if (levelResult.leveledUp) {
      App.showNotification(`🎉 Level Up! You're now Level ${levelResult.newLevel}!`, 'success');
    }

    renderView(document.getElementById('main-content'));
  }

  function renderResults(container) {
    const total = activeQuestions.length;
    const pct = Math.round((score / total) * 100);
    const xpReward = score * 10 + (score === total ? 30 : 0);

    container.innerHTML = `
      <div class="page-enter quiz-result">
        <span style="font-size: 64px">${pct >= 80 ? '🏆' : pct >= 50 ? '🏅' : '📚'}</span>
        <h1 class="gradient-text" style="font-size:32px; font-weight:800; margin-top:10px;">Quiz Complete!</h1>
        <p class="logo-tagline">Review your performance scores below</p>

        <div class="quiz-score-circle">
          <div class="quiz-score-text">${pct}%</div>
          <div class="quiz-score-label">${score} / ${total} Correct</div>
        </div>

        <div class="quiz-xp-earned">+${xpReward} XP Earned</div>

        <div class="glass-card" style="text-align:left; margin-bottom: 24px;">
          <h3 style="margin-bottom:12px; font-size:16px;">Key Solutions Review</h3>
          <div class="activity-list">
            ${userAnswers.map((ans, idx) => `
              <div style="padding:10px 0; border-bottom:1px solid var(--border-light); font-size:14px;">
                <div style="font-weight:600; margin-bottom:4px;">${idx + 1}. ${Utils.escapeHTML(ans.question.question)}</div>
                <div style="font-size:13px; display:flex; gap:10px;">
                  <span style="color:${ans.selected === ans.correct ? 'var(--success)' : 'var(--error)'}">
                    Your Answer: ${ans.selected === -1 ? 'Timeout' : Utils.escapeHTML(ans.question.options[ans.selected])}
                  </span>
                  ${ans.selected !== ans.correct ? `
                    <span style="color:var(--success)">Correct: ${Utils.escapeHTML(ans.question.options[ans.correct])}</span>
                  ` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <button class="btn btn-primary" id="finish-quiz-close" style="width:100%;">
          Return to Lobby
        </button>
      </div>
    `;

    document.getElementById('finish-quiz-close').addEventListener('click', () => {
      if (sharedState.activeMilestoneTask) {
        const taskId = sharedState.activeMilestoneTask.id;
        Storage.completeMilestone(taskId);
        sharedState.activeMilestoneTask = null;
        App.navigate('#dashboard');
      } else {
        state = 'setup';
        renderView(container);
      }
    });
  }

  function showRefillModalAndAbort() {
    const overlay = document.createElement('div');
    overlay.className = 'refill-modal-overlay';
    overlay.innerHTML = `
      <div class="refill-modal">
        <span class="refill-modal-icon">❤️</span>
        <h3 class="refill-modal-title">Out of Energy Hearts!</h3>
        <p class="refill-modal-desc">
          Oh no! Your energy hearts are completely depleted (0/5 ❤️).
          Replenish your energy hearts right now to continue practicing, or return to the roadmap dashboard.
        </p>
        <div style="display:flex; flex-direction:column; gap:12px">
          <button class="btn btn-primary" id="refill-cups-now-btn" style="width:100%">
            Replenish Hearts ❤️
          </button>
          <button class="btn btn-secondary" id="refill-modal-close-btn" style="width:100%">
            Return to Roadmap
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    overlay.querySelector('#refill-cups-now-btn').addEventListener('click', () => {
      Storage.refillHearts();
      overlay.remove();
      App.showNotification("❤️ Energy hearts replenished successfully! You are fully loaded to learn.", "success");
      sharedState.activeMilestoneTask = null;
      App.navigate('#dashboard');
    });

    overlay.querySelector('#refill-modal-close-btn').addEventListener('click', () => {
      overlay.remove();
      sharedState.activeMilestoneTask = null;
      App.navigate('#dashboard');
    });
  }

  export const QuizModule = { render };
