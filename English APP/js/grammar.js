import { Storage } from './storage.js';
import { App } from './app.js';
import { APP_DATA } from './data.js';
import { GeminiAPI } from './gemini.js';
import { Utils } from './utils.js';
import { state } from './state.js';

  let currentLevel = 'all'; // all | beginner | intermediate | advanced
  let activeLessonId = null;
  let exerciseAnswers = {}; // id -> selected_option
  let dynamicLessonsCache = {}; // lessonId -> generated lesson object

  function render(container) {
    if (state.activeMilestoneTask && state.activeMilestoneTask.type === 'grammar') {
      activeLessonId = state.activeMilestoneTask.lessonId;
    } else {
      activeLessonId = null;
      currentLevel = 'all';
    }
    exerciseAnswers = {};
    renderView(container);
    return function destroy() {
      activeLessonId = null;
    };
  }

  function renderView(container) {
    if (activeLessonId === null) {
      renderLessonList(container);
    } else {
      renderLessonDetail(container);
    }
  }

  // ─── Lesson List ──────────────────────────────────────────

  function renderLessonList(container) {
    const data = APP_DATA;
    if (!data) return;

    let lessons = data.GRAMMAR_LESSONS;
    if (currentLevel !== 'all') {
      lessons = lessons.filter(l => l.level === currentLevel);
    }

    const progress = Storage.getAllLessonProgress();

    container.innerHTML = `
      <div class="page-enter">
        <h1 class="page-title gradient-text">Grammar Practice</h1>
        <p class="page-subtitle">Learn fundamental rules and test yourself with interactive exercises</p>

        <!-- Level selector -->
        <div class="level-tabs">
          <button class="level-tab ${currentLevel === 'all' ? 'active' : ''}" data-level="all">All Levels</button>
          <button class="level-tab ${currentLevel === 'beginner' ? 'active' : ''}" data-level="beginner">Beginner</button>
          <button class="level-tab ${currentLevel === 'intermediate' ? 'active' : ''}" data-level="intermediate">Intermediate</button>
          <button class="level-tab ${currentLevel === 'advanced' ? 'active' : ''}" data-level="advanced">Advanced</button>
        </div>

        <div class="lesson-list">
          ${lessons.map(l => {
            const state = progress[l.id] || { completed: false, bestScore: 0 };
            return `
              <div class="glass-card lesson-card" data-lesson-id="${l.id}">
                <div class="lesson-icon">${l.icon}</div>
                <div class="lesson-info">
                  <div class="lesson-title">${l.title}</div>
                  <div class="lesson-description">${l.description}</div>
                </div>
                <span class="badge badge-${l.level}">${l.level}</span> <span class="badge badge-${l.cefr.toLowerCase()}" style="margin-left: 4px;">${l.cefr}</span>
                ${state.completed ? `
                  <span class="badge" style="background-color: rgba(16,185,129,0.15); color: var(--success); font-weight:700">
                    Done (${state.bestScore}%)
                  </span>
                ` : `
                  <span class="badge" style="background-color: var(--bg-tertiary); color: var(--text-muted);">
                    Not Started
                  </span>
                `}
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    // Event: level switch
    container.querySelectorAll('.level-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        currentLevel = tab.dataset.level;
        
        // Show 3 skeleton cards in the lesson list for an organic transition
        const listDiv = container.querySelector('.lesson-list');
        if (listDiv) {
          listDiv.innerHTML = `
            <div class="skeleton-card" style="height:88px;"></div>
            <div class="skeleton-card" style="height:88px;"></div>
            <div class="skeleton-card" style="height:88px;"></div>
          `;
        }
        
        setTimeout(() => {
          renderLessonList(container);
        }, 250);
      });
    });

    // Event: click lesson
    container.querySelectorAll('.lesson-card').forEach(card => {
      card.addEventListener('click', () => {
        activeLessonId = card.dataset.lessonId;
        exerciseAnswers = {};
        
        // Render lesson detail skeletons
        container.innerHTML = `
          <div class="page-enter" style="max-width: 800px; margin: 0 auto; padding-top: 10px;">
            <div class="page-header-row" style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 32px;">
              <button class="btn btn-secondary btn-sm" style="opacity: 0.5; pointer-events: none;">← Back</button>
              <div class="skeleton-card" style="height: 32px; width: 280px; margin-bottom:0; display:inline-block;"></div>
              <div class="skeleton-card" style="height: 24px; width: 80px; margin-bottom:0; display:inline-block;"></div>
            </div>
            
            <div class="lesson-content">
              <div class="skeleton-card" style="height: 140px; margin-bottom: 24px;"></div>
              <div class="skeleton-card" style="height: 100px; margin-bottom: 24px;"></div>
              <div class="skeleton-card" style="height: 160px; margin-bottom: 24px;"></div>
            </div>
          </div>
        `;
        
        setTimeout(() => {
          renderView(container);
        }, 280);
      });
    });
  }

  // ─── Lesson Details ───────────────────────────────────────

  function renderLessonDetail(container) {
    const data = APP_DATA;
    let lesson = data.GRAMMAR_LESSONS.find(l => l.id === activeLessonId);
    if (!lesson) return;

    if (GeminiAPI && GeminiAPI.hasKey()) {
      if (dynamicLessonsCache[activeLessonId]) {
        renderLessonDetailHTML(container, dynamicLessonsCache[activeLessonId]);
      } else {
        // Render skeletons with a nice tutor loading message
        container.innerHTML = `
          <div class="page-enter" style="max-width: 800px; margin: 0 auto; padding-top: 10px;">
            <div class="page-header-row" style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 32px;">
              <button class="btn btn-secondary btn-sm" style="opacity: 0.5; pointer-events: none;">← Back</button>
              <h1 class="page-title gradient-text" style="font-size: 20px; margin-bottom:0">Preparing Customized Lesson...</h1>
              <div class="skeleton-card" style="height: 24px; width: 80px; margin-bottom:0; display:inline-block;"></div>
            </div>
            
            <div class="text-center" style="margin-bottom: 24px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px;">
              <div class="spinner" style="border: 4px solid rgba(255,255,255,0.1); border-left-color: var(--accent-purple); border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite;"></div>
              <p style="font-size: 15px; color: var(--text-secondary); font-style: italic;">
                🏫 Mrs. Gable is tailoring your "${lesson.title}" lesson to your CEFR level...
              </p>
            </div>
            
            <div class="lesson-content">
              <div class="skeleton-card" style="height: 140px; margin-bottom: 24px;"></div>
              <div class="skeleton-card" style="height: 100px; margin-bottom: 24px;"></div>
              <div class="skeleton-card" style="height: 160px; margin-bottom: 24px;"></div>
            </div>
          </div>
        `;

        const brain = Storage ? Storage.getAIBrain() : { cefrLevel: 'A2', difficultyScore: 25 };
        const cefr = brain.cefrLevel || 'A2';
        const difficulty = brain.difficultyScore || 25;
        const isPro = Storage ? (Storage.getSettings().isProModel || false) : false;

        const systemInstruction = `You are Mrs. Gable, a warm, structured, and highly detailed academic English grammar teacher.
Generate a comprehensive, tailored English grammar lesson matching the user's specific CEFR level: ${cefr}.
Calibration guidelines:
- A1-A2 (Beginner): simple sentences, high-frequency words, simple sentence structures, very clear step-by-step guidance.
- B1-B2 (Intermediate): compound sentences, intermediate vocabulary, nuanced grammar points (e.g. passive vs active, modals of deduction).
- C1-C2 (Advanced): sophisticated discourse markers, complex inversions, subtle register differences, challenging advanced exceptions.

The response MUST strictly conform to the responseSchema provided. Make sure to generate exactly 4 exercises in a mix of 'fill-blank' and 'error-correction' types.
For 'fill-blank' type exercises:
- Ensure the 'sentence' has exactly '___' (three underscores) for the blank.
- The 'answer' must be the exact correct option.
- The 'options' array must have exactly 4 strings.
For 'error-correction' type exercises:
- Provide an incorrect sentence in 'sentence'.
- Provide the corrected version in 'corrected'.
- Provide an explanation of the grammar rule in 'explanation'.
Ensure all IDs of exercises are unique strings, e.g. "dyn_${activeLessonId}_1", "dyn_${activeLessonId}_2", etc.`;

        const prompt = `Please generate a custom grammar lesson for active topic: "${lesson.title}".
User CEFR Level: ${cefr} (difficulty score: ${difficulty}/100).
Ensure the description, explanation texts, tips, and exercises are fully customized to cefr ${cefr}!`;

        const responseSchema = {
          type: "OBJECT",
          properties: {
            title: { type: "STRING" },
            cefr: { type: "STRING" },
            level: { type: "STRING" },
            description: { type: "STRING" },
            icon: { type: "STRING" },
            content: {
              type: "ARRAY",
              items: {
                type: "OBJECT",
                properties: {
                  type: { type: "STRING" },
                  title: { type: "STRING" },
                  text: { type: "STRING" }
                },
                required: ["type", "text"]
              }
            },
            examples: {
              type: "ARRAY",
              items: {
                type: "OBJECT",
                properties: {
                  correct: { type: "STRING" },
                  incorrect: { type: "STRING" },
                  explanation: { type: "STRING" }
                },
                required: ["correct", "incorrect", "explanation"]
              }
            },
            exercises: {
              type: "ARRAY",
              items: {
                type: "OBJECT",
                properties: {
                  id: { type: "STRING" },
                  type: { type: "STRING" },
                  sentence: { type: "STRING" },
                  answer: { type: "STRING" },
                  options: { type: "ARRAY", items: { type: "STRING" } },
                  corrected: { type: "STRING" },
                  explanation: { type: "STRING" }
                },
                required: ["id", "type", "sentence"]
              }
            }
          },
          required: ["title", "cefr", "level", "description", "icon", "content", "examples", "exercises"]
        };

        GeminiAPI.callGemini(prompt, systemInstruction, responseSchema, isPro)
          .then(customLesson => {
            customLesson.id = activeLessonId;
            dynamicLessonsCache[activeLessonId] = customLesson;
            if (App && typeof App.showNotification === 'function') {
              App.showNotification(`🏫 Mrs. Gable tailored a custom ${cefr} lesson!`, 'success');
            }
            renderView(container);
          })
          .catch(err => {
            console.error('Failed to load custom Gemini lesson:', err);
            if (App && typeof App.showNotification === 'function') {
              App.showNotification(`Could not compile customized lesson. Serving standard syllabus.`, 'warning');
            }
            dynamicLessonsCache[activeLessonId] = {
              ...lesson,
              isFallback: true
            };
            renderView(container);
          });
      }
    } else {
      renderLessonDetailHTML(container, lesson);
    }
  }

  function renderLessonDetailHTML(container, lesson) {
    container.innerHTML = `
      <div class="page-enter" style="max-width: 800px; margin: 0 auto;">
        <div class="page-header-row" style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 32px;">
          <button class="btn btn-secondary btn-sm" id="back-to-lessons">← Back</button>
          <h1 class="page-title gradient-text" style="font-size: 24px; margin-bottom:0">${lesson.title}</h1>
           <span class="badge badge-${lesson.level}">${lesson.level}</span> <span class="badge badge-${lesson.cefr ? lesson.cefr.toLowerCase() : 'a2'}" style="margin-left: 4px;">${lesson.cefr || 'A2'}</span>
        </div>

        <div class="lesson-content">
          ${lesson.content.map(c => {
            if (c.type === 'explanation') {
              return `
                <div class="explanation-block">
                  <h3>${c.title || ''}</h3>
                  <p>${c.text}</p>
                </div>
              `;
            } else if (c.type === 'tip') {
              return `
                <div class="glass-card" style="border-left: 4px solid var(--accent-purple); padding: 16px; margin-bottom: var(--space-xl); background: rgba(139,92,246,0.03);">
                  <strong style="color:var(--accent-purple)">💡 Pro Tip:</strong>
                  <p style="margin-top: 4px; font-size:14px; color:var(--text-secondary);">${c.text}</p>
                </div>
              `;
            }
          }).join('')}

          <h2 class="section-title">Examples</h2>
          ${lesson.examples.map(ex => `
            <div class="example-block example-correct">
              <strong style="color: var(--success);">✓ Correct:</strong> ${ex.correct}
              <p style="margin-top:4px; font-size:13px; color: var(--text-muted)">${ex.explanation}</p>
            </div>
            ${ex.incorrect ? `
              <div class="example-block example-incorrect" style="margin-bottom:20px;">
                <strong style="color: var(--error);">✗ Incorrect:</strong> ${ex.incorrect}
              </div>
            ` : ''}
          `).join('')}
        </div>

        <h2 class="section-title">Interactive Exercises</h2>
        <div class="exercise-container">
          ${lesson.exercises.map((ex, index) => `
            <div class="glass-card exercise-item" id="exercise-card-${ex.id}">
              <div class="badge badge-beginner" style="margin-bottom: 12px; background-color: var(--bg-tertiary); color: var(--text-secondary)">Task ${index + 1}</div>
              
              ${ex.type === 'fill-blank' ? `
                <div class="exercise-sentence">${ex.sentence.replace('___', '<span class="exercise-blank" id="blank-' + ex.id + '">_______</span>')}</div>
                <div class="exercise-options" data-ex-id="${ex.id}">
                  ${ex.options.map(opt => `
                    <button class="exercise-option" data-option="${opt}">${opt}</button>
                  `).join('')}
                </div>
              ` : `
                <!-- Error Correction -->
                <div class="exercise-sentence" style="font-weight: 500;">
                  <span style="color: var(--error); text-decoration: line-through;">${ex.sentence}</span>
                </div>
                <div class="exercise-options" data-ex-id="${ex.id}">
                  <p style="font-size:13px; color: var(--text-muted); width:100%; margin-bottom:10px;">Select the corrected version:</p>
                  <button class="exercise-option" data-option="${ex.corrected}">${ex.corrected}</button>
                  <button class="exercise-option" data-option="${ex.sentence}">${ex.sentence}</button>
                </div>
              `}
              <div class="exercise-feedback" id="feedback-${ex.id}" style="margin-top: 12px; font-size:14px; font-weight:600; display:none;"></div>
            </div>
          `).join('')}
        </div>

        <div class="text-center" style="margin-top: 40px; margin-bottom: 80px;">
          <button class="btn btn-primary btn-lg" id="submit-exercises-btn" style="width: 100%; max-width: 320px;">
            Submit Lesson Exercises
          </button>
        </div>
      </div>
    `;

    // Event back
    document.getElementById('back-to-lessons').addEventListener('click', () => {
      if (state.activeMilestoneTask && state.activeMilestoneTask.type === 'grammar') {
        state.activeMilestoneTask = null;
        App.navigate('#dashboard');
      } else {
        activeLessonId = null;
        renderView(container);
      }
    });

    // Option selectors
    container.querySelectorAll('.exercise-option').forEach(btn => {
      btn.addEventListener('click', () => {
        const group = btn.closest('.exercise-options');
        const exId = group.dataset.exId;
        const option = btn.dataset.option;

        // Visual highlights
        group.querySelectorAll('.exercise-option').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');

        // Record
        exerciseAnswers[exId] = option;

        // If blank, update blank text
        const blank = document.getElementById(`blank-${exId}`);
        if (blank) {
          blank.textContent = ` ${option} `;
          blank.style.borderBottomColor = 'var(--accent-purple)';
        }
      });
    });

    // Submit Action
    document.getElementById('submit-exercises-btn').addEventListener('click', () => {
      let correctCount = 0;
      let unanswered = false;

      lesson.exercises.forEach(ex => {
        const answer = exerciseAnswers[ex.id];
        if (!answer) {
          unanswered = true;
          return;
        }

        const card = document.getElementById(`exercise-card-${ex.id}`);
        const feedback = document.getElementById(`feedback-${ex.id}`);
        const group = card.querySelector('.exercise-options');

        const isCorrect = (ex.type === 'fill-blank') 
          ? (answer === ex.answer) 
          : (answer === ex.corrected);

        if (isCorrect) {
          correctCount++;
          feedback.textContent = '✓ Correct answer!';
          feedback.style.color = 'var(--success)';
          feedback.style.display = 'block';
          group.querySelectorAll('.exercise-option').forEach(b => {
            if (b.dataset.option === answer) b.classList.add('correct');
            b.style.pointerEvents = 'none';
          });
        } else {
          feedback.textContent = `✗ Incorrect. Correct: "${ex.type === 'fill-blank' ? ex.answer : ex.corrected}"`;
          if (ex.explanation) feedback.textContent += ` — ${ex.explanation}`;
          feedback.style.color = 'var(--error)';
          feedback.style.display = 'block';
          group.querySelectorAll('.exercise-option').forEach(b => {
            if (b.dataset.option === answer) b.classList.add('incorrect');
            b.style.pointerEvents = 'none';
          });
        }
      });

      if (unanswered) {
        App.showNotification('Please answer all questions before submitting!', 'warning');
        return;
      }

      const pct = Math.round((correctCount / lesson.exercises.length) * 100);
      Storage.setLessonProgress(activeLessonId, { completed: true, score: pct });

      // Reward XP
      let xpEarned = 10;
      if (pct === 100) xpEarned = 25;
      else if (pct >= 50) xpEarned = 15;

      const result = Storage.addXP(xpEarned);
      App.showNotification(`Completed! Score: ${pct}%. Earned +${xpEarned} XP!`, 'success');
      Storage.addActivity({ type: 'lesson_completed', description: `Completed lesson "${lesson.title}"`, xp: xpEarned });
      App.updateSidebarXP();

      // Dynamic brain adaptation!
      if (Storage && typeof Storage.updateAIBrainDifficulty === 'function') {
        const complexity = lesson.level === 'advanced' ? 3 : lesson.level === 'intermediate' ? 2 : 1;
        Storage.updateAIBrainDifficulty(pct, 12000, complexity);
      }

      if (state.activeMilestoneTask && state.activeMilestoneTask.type === 'grammar') {
        Storage.completeMilestone(state.activeMilestoneTask.id);
        App.showNotification("🎯 Milestone Completed Successfully!", "success");
        state.activeMilestoneTask = null;
        setTimeout(() => App.navigate('#dashboard'), 1500);
      } else {
        // Lock submit button
        const submitBtn = document.getElementById('submit-exercises-btn');
        submitBtn.textContent = 'Lesson Completed ✓';
        submitBtn.className = 'btn btn-secondary btn-lg';
        submitBtn.style.pointerEvents = 'none';
        submitBtn.style.width = '100%';
      }

      // Scroll to top of window to see feedback or highlights
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  export const GrammarModule = { render };
