import { Storage } from './storage.js';
import { App } from './app.js';
import { APP_DATA } from './data.js';
import { GeminiAPI } from './gemini.js';
import { Utils } from './utils.js';
import { state } from './state.js';

  let currentView = 'categories'; // categories | list | flashcard
  let currentCategory = null;
  let flashcardIndex = 0;
  let flashcardWords = [];
  let isFlipped = false;
  let searchQuery = '';
  let filterState = 'all'; // all | new | learning | mastered | favorite

  function render(container) {
    if (state.activeMilestoneTask && state.activeMilestoneTask.type === 'vocab') {
      const data = APP_DATA;
      const category = state.activeMilestoneTask.category;
      const targetCount = state.activeMilestoneTask.targetCount || 5;
      const catWords = data.VOCABULARY.filter(w => w.category === category);
      flashcardWords = catWords.slice(0, targetCount);
      flashcardIndex = 0;
      isFlipped = false;
      currentView = 'flashcard';
    } else {
      currentView = 'categories';
      currentCategory = null;
      searchQuery = '';
      filterState = 'all';
    }
    renderView(container);

    return function destroy() {
      currentView = 'categories';
      currentCategory = null;
    };
  }

  function renderView(container) {
    switch (currentView) {
      case 'categories': renderCategories(container); break;
      case 'list': renderWordList(container); break;
      case 'flashcard': renderFlashcardView(container); break;
    }
  }

  function startAIVocabularyStudy(category, container) {
    const targetCategory = category || 'common';
    container.innerHTML = `
      <div class="page-enter" style="max-width: 600px; margin: 0 auto; padding-top: 40px;">
        <div class="text-center" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px;">
          <div class="spinner" style="border: 4px solid rgba(255,255,255,0.1); border-left-color: var(--accent-purple); border-radius: 50%; width: 48px; height: 48px; animation: spin 1s linear infinite;"></div>
          <h2 class="gradient-text">Generating Dynamic Flashcards...</h2>
          <p style="font-size: 15px; color: var(--text-secondary); font-style: italic;">
            🧠 Tailoring vocabulary to your CEFR level and category...
          </p>
        </div>
      </div>
    `;

    const brain = Storage.getAIBrain();
    const cefr = brain.cefrLevel || 'A2';
    const isPro = Storage.getSettings().isProModel || false;

    const systemInstruction = `You are a brilliant, warm EdTech vocabulary tutor.
Generate a list of exactly 8 customized vocabulary words matching the requested CEFR level: ${cefr} and category.
The output MUST strictly conform to the responseSchema provided.
For each word, provide:
- 'word': the English word.
- 'phonetic': IPA phonetic transcription, e.g. "/məˈtɪk.jə.ləs/".
- 'partOfSpeech': e.g. "adjective", "noun", "verb", "adverb".
- 'definition': a clear, helpful definition matching the CEFR level.
- 'example': a natural, engaging example sentence using the word.
- 'synonyms': array of 2-3 real synonyms.
- 'category': must be the exact category identifier requested.
- 'level': must be ${cefr}.
Ensure all IDs are unique strings, e.g. "dyn_v_\${word.toLowerCase().replace(/[^a-z]/g, '')}".`;

    const prompt = `Generate exactly 8 vocabulary words.
Category: "${targetCategory}"
User CEFR Level: ${cefr}`;

    const responseSchema = {
      type: "OBJECT",
      properties: {
        words: {
          type: "ARRAY",
          items: {
            type: "OBJECT",
            properties: {
              id: { type: "STRING" },
              word: { type: "STRING" },
              phonetic: { type: "STRING" },
              partOfSpeech: { type: "STRING" },
              definition: { type: "STRING" },
              example: { type: "STRING" },
              synonyms: { type: "ARRAY", items: { type: "STRING" } },
              category: { type: "STRING" },
              level: { type: "STRING" }
            },
            required: ["id", "word", "phonetic", "partOfSpeech", "definition", "example", "synonyms", "category", "level"]
          }
        }
      },
      required: ["words"]
    };

    GeminiAPI.callGemini(prompt, systemInstruction, responseSchema, isPro)
      .then(result => {
        flashcardWords = result.words || [];
        flashcardIndex = 0;
        isFlipped = false;
        currentView = 'flashcard';
        App.showNotification(`Generated 8 custom ${cefr} words!`, 'success');
        renderView(container);
      })
      .catch(err => {
        console.error('Failed to generate dynamic vocab:', err);
        App.showNotification('Could not connect to Gemini. Loading standard words.', 'warning');
        
        const offlineWords = APP_DATA.VOCABULARY.filter(w => w.category === targetCategory);
        flashcardWords = offlineWords.slice(0, 8);
        flashcardIndex = 0;
        isFlipped = false;
        currentView = 'flashcard';
        renderView(container);
      });
  }

  function startAIVocabularyReview(container) {
    container.innerHTML = `
      <div class="page-enter" style="max-width: 600px; margin: 0 auto; padding-top: 40px;">
        <div class="text-center" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px;">
          <div class="spinner" style="border: 4px solid rgba(255,255,255,0.1); border-left-color: var(--accent-purple); border-radius: 50%; width: 48px; height: 48px; animation: spin 1s linear infinite;"></div>
          <h2 class="gradient-text">Loading Spaced Repetition Review...</h2>
          <p style="font-size: 15px; color: var(--text-secondary); font-style: italic;">
            ⚡ Compiling scheduled due words and targeted cards...
          </p>
        </div>
      </div>
    `;

    const dueWords = Storage.getSRSDueWords();
    const brain = Storage.getAIBrain();
    const cefr = brain.cefrLevel || 'A2';
    const isPro = Storage.getSettings().isProModel || false;

    const systemInstruction = `You are a brilliant, warm EdTech vocabulary tutor specializing in Spaced Repetition.
Generate a list of exactly 8 customized vocabulary words.
The user has these due words to review: ${JSON.stringify(dueWords)}.
You MUST include these due words in the list, and fill the remaining slots with new vocabulary words suitable for CEFR level ${cefr}.
Provide high-quality explanations matching standard definitions, phonetics, example sentences, and synonyms.
The response MUST strictly conform to the responseSchema provided.`;

    const prompt = `Generate exactly 8 review vocabulary cards.
Due words to integrate: ${dueWords.join(', ') || 'none'}.
Target CEFR Level: ${cefr}`;

    const responseSchema = {
      type: "OBJECT",
      properties: {
        words: {
          type: "ARRAY",
          items: {
            type: "OBJECT",
            properties: {
              id: { type: "STRING" },
              word: { type: "STRING" },
              phonetic: { type: "STRING" },
              partOfSpeech: { type: "STRING" },
              definition: { type: "STRING" },
              example: { type: "STRING" },
              synonyms: { type: "ARRAY", items: { type: "STRING" } },
              category: { type: "STRING" },
              level: { type: "STRING" }
            },
            required: ["id", "word", "phonetic", "partOfSpeech", "definition", "example", "synonyms", "category", "level"]
          }
        }
      },
      required: ["words"]
    };

    GeminiAPI.callGemini(prompt, systemInstruction, responseSchema, isPro)
      .then(result => {
        flashcardWords = result.words || [];
        flashcardIndex = 0;
        isFlipped = false;
        currentView = 'flashcard';
        App.showNotification(`Generated SRS review with ${dueWords.length} due words!`, 'success');
        renderView(container);
      })
      .catch(err => {
        console.error('Failed to generate dynamic SRS review:', err);
        App.showNotification('Could not connect to Gemini. Loading standard review.', 'warning');
        
        const classicReviewIds = Storage.getWordsToReview();
        const data = APP_DATA;
        flashcardWords = data.VOCABULARY.filter(w => classicReviewIds.includes(w.id));
        if (flashcardWords.length === 0) {
          const wordStates = Storage.getAllWordStates();
          const learnedIds = Object.keys(wordStates).filter(id => wordStates[id].state !== 'new');
          flashcardWords = data.VOCABULARY.filter(w => learnedIds.includes(w.id)).slice(0, 8);
        }
        flashcardIndex = 0;
        isFlipped = false;
        currentView = 'flashcard';
        renderView(container);
      });
  }

  // ─── Category Grid ────────────────────────────────────────

  function renderCategories(container) {
    const data = APP_DATA;
    if (!data) return;

    let allVocabulary = [...data.VOCABULARY];
    const wordStates = Storage.getAllWordStates();
    Object.entries(wordStates).forEach(([id, state]) => {
      if (state.wordData && !allVocabulary.some(w => w.id === id)) {
        allVocabulary.push(state.wordData);
      }
    });

    const wordsByCategory = {};
    data.CATEGORIES.forEach(c => { wordsByCategory[c.id] = 0; });
    allVocabulary.forEach(w => {
      if (wordsByCategory[w.category] !== undefined) wordsByCategory[w.category]++;
    });

    const learnedByCategory = {};
    data.CATEGORIES.forEach(c => { learnedByCategory[c.id] = 0; });
    allVocabulary.forEach(w => {
      const state = wordStates[w.id];
      if (state && state.state !== 'new') {
        if (learnedByCategory[w.category] !== undefined) learnedByCategory[w.category]++;
      }
    });

    const reviewCount = Storage.getWordsToReview().length + Storage.getSRSDueWords().length;
    const favoriteCount = Storage.getFavoriteWords().length;

    container.innerHTML = `
      <div class="page-enter">
        <h1 class="page-title gradient-text">Vocabulary</h1>
        <p class="page-subtitle">Build your English vocabulary with flashcards and spaced repetition</p>

        ${reviewCount > 0 ? `
          <div class="glass-card review-banner" id="review-banner">
            <div class="review-banner-content">
              <span class="review-banner-icon">🔄</span>
              <div>
                <strong>${reviewCount} words</strong> ready for review
                <p class="review-banner-sub">Review now to strengthen your memory</p>
              </div>
            </div>
            <button class="btn btn-primary btn-sm" id="start-review-btn">Review Now</button>
          </div>
        ` : ''}

        <div class="vocab-special-cards">
          <div class="glass-card vocab-special-card" id="all-words-card">
            <span class="vocab-special-icon">📖</span>
            <div>
              <div class="vocab-special-title">All Words</div>
              <div class="vocab-special-count">${allVocabulary.length} words</div>
            </div>
          </div>
          ${favoriteCount > 0 ? `
            <div class="glass-card vocab-special-card" id="favorites-card">
              <span class="vocab-special-icon">❤️</span>
              <div>
                <div class="vocab-special-title">Favorites</div>
                <div class="vocab-special-count">${favoriteCount} words</div>
              </div>
            </div>
          ` : ''}
        </div>

        <h2 class="section-title">Categories</h2>
        <div class="category-grid">
          ${data.CATEGORIES.map(cat => `
            <div class="category-card glass-card" data-category="${cat.id}" style="--cat-color: ${cat.color}">
              <div class="category-icon">${cat.icon}</div>
              <div class="category-name">${cat.name}</div>
              <div class="category-count">${wordsByCategory[cat.id]} words</div>
              <div class="category-progress-bar">
                <div class="category-progress-fill" style="width: ${wordsByCategory[cat.id] > 0 ? (learnedByCategory[cat.id] / wordsByCategory[cat.id]) * 100 : 0}%"></div>
              </div>
              <div class="category-learned">${learnedByCategory[cat.id]} learned</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Event listeners
    container.querySelectorAll('.category-card').forEach(card => {
      card.addEventListener('click', () => {
        currentCategory = card.dataset.category;
        filterState = 'all';
        if (GeminiAPI && GeminiAPI.hasKey()) {
          startAIVocabularyStudy(currentCategory, container);
        } else {
          currentView = 'list';
          renderView(container);
        }
      });
    });

    const allWordsCard = document.getElementById('all-words-card');
    if (allWordsCard) {
      allWordsCard.addEventListener('click', () => {
        currentCategory = null;
        filterState = 'all';
        currentView = 'list';
        renderView(container);
      });
    }

    const favoritesCard = document.getElementById('favorites-card');
    if (favoritesCard) {
      favoritesCard.addEventListener('click', () => {
        currentCategory = null;
        filterState = 'favorite';
        currentView = 'list';
        renderView(container);
      });
    }

    const reviewBtn = document.getElementById('start-review-btn');
    if (reviewBtn) {
      reviewBtn.addEventListener('click', () => {
        if (GeminiAPI && GeminiAPI.hasKey()) {
          startAIVocabularyReview(container);
        } else {
          const reviewIds = Storage.getWordsToReview();
          flashcardWords = allVocabulary.filter(w => reviewIds.includes(w.id));
          flashcardIndex = 0;
          isFlipped = false;
          currentView = 'flashcard';
          renderView(container);
        }
      });
    }
  }

  // ─── Word List ────────────────────────────────────────────

  function renderWordList(container) {
    const data = APP_DATA;
    if (!data) return;

    let allVocabulary = [...data.VOCABULARY];
    const wordStates = Storage.getAllWordStates();
    Object.entries(wordStates).forEach(([id, state]) => {
      if (state.wordData && !allVocabulary.some(w => w.id === id)) {
        allVocabulary.push(state.wordData);
      }
    });

    let words = currentCategory
      ? allVocabulary.filter(w => w.category === currentCategory)
      : allVocabulary;

    const categoryName = currentCategory
      ? data.CATEGORIES.find(c => c.id === currentCategory)?.name || 'Words'
      : 'All Words';

    // Apply filter
    if (filterState === 'favorite') {
      words = words.filter(w => wordStates[w.id]?.favorite);
    } else if (filterState !== 'all') {
      words = words.filter(w => (wordStates[w.id]?.state || 'new') === filterState);
    }

    // Apply search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      words = words.filter(w =>
        w.word.toLowerCase().includes(q) ||
        w.definition.toLowerCase().includes(q)
      );
    }

    container.innerHTML = `
      <div class="page-enter">
        <div class="page-header-row">
          <button class="btn btn-secondary btn-sm" id="back-to-categories">← Back</button>
          <h1 class="page-title gradient-text">${categoryName}</h1>
        </div>

        <div class="vocab-controls">
          <div class="search-container">
            <span class="search-icon">🔍</span>
            <input type="text" class="search-input" id="word-search"
              placeholder="Search words..." value="${Utils.escapeHTML(searchQuery)}" aria-label="Search Vocabulary Words">
          </div>
          <div class="vocab-actions">
            <button class="btn btn-primary" id="start-flashcards" aria-label="Start studying these words with flashcards">
              🃏 Flashcards
            </button>
          </div>
        </div>

        <div class="filter-tabs" id="filter-tabs">
          <button class="tab ${filterState === 'all' ? 'active' : ''}" data-filter="all">All</button>
          <button class="tab ${filterState === 'new' ? 'active' : ''}" data-filter="new">New</button>
          <button class="tab ${filterState === 'learning' ? 'active' : ''}" data-filter="learning">Learning</button>
          <button class="tab ${filterState === 'mastered' ? 'active' : ''}" data-filter="mastered">Mastered</button>
          <button class="tab ${filterState === 'favorite' ? 'active' : ''}" data-filter="favorite">❤️ Favorites</button>
        </div>

        <div class="word-count">${words.length} words</div>

        ${words.length > 0 ? `
          <div class="word-list" id="word-list">
            ${words.map(word => {
              const state = wordStates[word.id] || { state: 'new', favorite: false };
              return `
                <div class="word-item glass-card" data-word-id="${word.id}">
                  <div class="word-status-dot ${state.state}"></div>
                  <div class="word-main">
                    <div class="word-text">${Utils.escapeHTML(word.word)}</div>
                    <div class="word-pos" style="display: flex; align-items: center; gap: 6px;">${Utils.escapeHTML(word.partOfSpeech)} <span class="badge badge-${word.level.toLowerCase()}">${Utils.escapeHTML(word.level)}</span></div>
                  </div>
                  <div class="word-def">${Utils.escapeHTML(word.definition)}</div>
                  <button class="btn-icon word-fav ${state.favorite ? 'active' : ''}" data-fav-id="${word.id}" aria-label="${state.favorite ? 'Remove from favorites' : 'Add to favorites'}">
                    ${state.favorite ? '❤️' : '🤍'}
                  </button>
                </div>
              `;
            }).join('')}
          </div>
        ` : `
          <div class="empty-state">
            <div class="empty-state-icon">📭</div>
            <div class="empty-state-text">No words found</div>
          </div>
        `}
      </div>
    `;

    // Event listeners
    document.getElementById('back-to-categories').addEventListener('click', () => {
      currentView = 'categories';
      searchQuery = '';
      filterState = 'all';
      renderView(container);
    });

    // High-performance search debouncing to avoid unnecessary DOM thrashing
    const debouncedSearch = Utils.debounce((val) => {
      searchQuery = val;
      renderWordList(container);
    }, 150);

    document.getElementById('word-search').addEventListener('input', (e) => {
      debouncedSearch(e.target.value);
    });

    document.getElementById('start-flashcards').addEventListener('click', () => {
      if (GeminiAPI && GeminiAPI.hasKey()) {
        startAIVocabularyStudy(currentCategory, container);
      } else {
        flashcardWords = words.length > 0 ? [...words] : [];
        flashcardIndex = 0;
        isFlipped = false;
        if (flashcardWords.length === 0) {
          App.showNotification('No words to study!', 'warning');
          return;
        }
        currentView = 'flashcard';
        renderView(container);
      }
    });

    document.getElementById('filter-tabs').addEventListener('click', (e) => {
      if (e.target.classList.contains('tab')) {
        filterState = e.target.dataset.filter;
        renderWordList(container);
      }
    });

    // Word item click → show detail modal
    container.querySelectorAll('.word-item').forEach(item => {
      item.addEventListener('click', (e) => {
        if (e.target.closest('.word-fav')) return;
        const wordId = item.dataset.wordId;
        showWordModal(wordId, container);
      });
    });

    // Favorite buttons
    container.querySelectorAll('.word-fav').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const wordId = btn.dataset.favId;
        const current = Storage.getWordState(wordId);
        Storage.setWordState(wordId, { favorite: !current.favorite });
        btn.classList.toggle('active');
        btn.textContent = !current.favorite ? '❤️' : '🤍';
      });
    });
  }

  // ─── Word Detail Modal ────────────────────────────────────

  function showWordModal(wordId, container) {
    const data = APP_DATA;
    let allVocabulary = [...data.VOCABULARY];
    const wordStates = Storage.getAllWordStates();
    Object.entries(wordStates).forEach(([id, state]) => {
      if (state.wordData && !allVocabulary.some(w => w.id === id)) {
        allVocabulary.push(state.wordData);
      }
    });

    const word = allVocabulary.find(w => w.id === wordId);
    if (!word) return;

    const state = Storage.getWordState(wordId);

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal">
        <button class="modal-close" id="modal-close">×</button>
        <div class="modal-word-header">
          <h2 class="modal-word gradient-text">${word.word}</h2>
          <span class="modal-phonetic">${word.phonetic}</span>
          <span class="word-pos" style="display: inline-flex; align-items: center; gap: 6px; vertical-align: middle;">${word.partOfSpeech} <span class="badge badge-${word.level.toLowerCase()}">${word.level}</span></span>
        </div>

        <div class="modal-section">
          <h4>Definition</h4>
          <p>${word.definition}</p>
        </div>

        <div class="modal-section">
          <h4>Example</h4>
          <p class="modal-example">"${word.example}"</p>
        </div>

        ${word.synonyms && word.synonyms.length > 0 ? `
          <div class="modal-section">
            <h4>Synonyms</h4>
            <div class="synonym-tags">
              ${word.synonyms.map(s => `<span class="badge">${s}</span>`).join('')}
            </div>
          </div>
        ` : ''}

        <div class="modal-section">
          <h4>Learning Status</h4>
          <div class="modal-status-btns">
            <button class="btn btn-sm ${state.state === 'new' ? 'btn-primary' : 'btn-secondary'}" data-state="new">New</button>
            <button class="btn btn-sm ${state.state === 'learning' ? 'btn-primary' : 'btn-secondary'}" data-state="learning">Learning</button>
            <button class="btn btn-sm ${state.state === 'mastered' ? 'btn-primary' : 'btn-secondary'}" data-state="mastered">Mastered</button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    overlay.querySelector('#modal-close').addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.remove();
    });

    overlay.querySelectorAll('.modal-status-btns .btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const newState = btn.dataset.state;
        const oldState = Storage.getWordState(wordId).state;

        // Calculate next review date for spaced repetition
        let nextReview = null;
        if (newState === 'learning') {
          const d = new Date();
          d.setDate(d.getDate() + 1); // Review tomorrow
          nextReview = d.toISOString().split('T')[0];
        }

        Storage.setWordState(wordId, { state: newState, nextReview, lastReviewed: new Date().toISOString() });

        // XP for learning a new word
        if (newState !== 'new' && oldState === 'new') {
          const result = Storage.addXP(10);
          App.showNotification(`+10 XP for learning "${word.word}"!`, 'success');
          Storage.addActivity({ type: 'word_learned', description: `Learned "${word.word}"`, xp: 10 });
          if (result.leveledUp) {
            App.showNotification(`🎉 Level Up! You're now Level ${result.newLevel}!`, 'success');
          }
          App.updateSidebarXP();
        }

        if (newState === 'mastered' && oldState !== 'mastered') {
          const result = Storage.addXP(5);
          App.showNotification(`+5 XP — "${word.word}" mastered!`, 'success');
          App.updateSidebarXP();
        }

        overlay.remove();
        renderWordList(container);
      });
    });
  }

  // ─── Flashcard View ───────────────────────────────────────

  // ─── Flashcard View ───────────────────────────────────────

  function renderFlashcardView(container) {
    if (flashcardWords.length === 0) {
      currentView = 'categories';
      renderView(container);
      return;
    }

    const word = flashcardWords[flashcardIndex];
    const state = Storage.getWordState(word.id);
    const progress = ((flashcardIndex + 1) / flashcardWords.length) * 100;
    const hasAI = GeminiAPI && GeminiAPI.hasKey();

    container.innerHTML = `
      <div class="page-enter">
        <div class="page-header-row">
          <button class="btn btn-secondary btn-sm" id="exit-flashcards">← Exit</button>
          <div class="flashcard-progress-text">${flashcardIndex + 1} / ${flashcardWords.length}</div>
        </div>

        <div class="flashcard-progress-bar">
          <div class="flashcard-progress-fill" style="width: ${progress}%"></div>
        </div>

        <div class="flashcard-container" id="flashcard-container">
          <div class="flashcard ${isFlipped ? 'flipped' : ''}" id="flashcard">
            <div class="flashcard-front">
              <div class="flashcard-category" style="display: flex; align-items: center; justify-content: center; gap: 6px;">${word.category} <span class="badge badge-${word.level.toLowerCase()}">${word.level}</span></div>
              <div class="flashcard-word">${word.word}</div>
              <div class="flashcard-phonetic">${word.phonetic}</div>
              <div class="flashcard-hint">Tap to reveal</div>
            </div>
            <div class="flashcard-back">
              <div class="flashcard-pos">${word.partOfSpeech}</div>
              <div class="flashcard-definition">${word.definition}</div>
              <div class="flashcard-example">"${word.example}"</div>
              ${word.synonyms && word.synonyms.length > 0 ? `
                <div class="flashcard-synonyms">
                  ${word.synonyms.map(s => `<span class="badge">${s}</span>`).join('')}
                </div>
              ` : ''}
            </div>
          </div>
        </div>

        <div class="flashcard-actions">
          <button class="btn btn-secondary btn-lg" id="fc-prev" ${flashcardIndex === 0 ? 'disabled' : ''}>
            ← Previous
          </button>
          <div class="flashcard-state-btns">
            ${hasAI ? `
              <button class="btn btn-sm flashcard-srs-btn" data-success="false" title="Forgot this word" style="background: rgba(239,68,68,0.15); color: var(--error); border: 2px solid var(--error); padding: 8px 16px; font-weight:700; border-radius:var(--radius-sm)">
                Forgot It ❌
              </button>
              <button class="btn btn-sm flashcard-srs-btn" data-success="true" title="Got it right!" style="background: rgba(16,185,129,0.15); color: var(--success); border: 2px solid var(--success); padding: 8px 16px; font-weight:700; border-radius:var(--radius-sm)">
                Got It! 🌟
              </button>
            ` : `
              <button class="btn btn-sm flashcard-state-btn" data-state="learning" title="Still learning" style="background: rgba(245,158,11,0.2); color: #f59e0b; border: 1px solid rgba(245,158,11,0.3);">
                📝 Learning
              </button>
              <button class="btn btn-sm flashcard-state-btn" data-state="mastered" title="I know this!" style="background: rgba(16,185,129,0.2); color: #10b981; border: 1px solid rgba(16,185,129,0.3);">
                ✅ Mastered
              </button>
            `}
          </div>
          <button class="btn btn-primary btn-lg" id="fc-next">
            ${flashcardIndex === flashcardWords.length - 1 ? 'Finish ✓' : 'Next →'}
          </button>
        </div>
      </div>
    `;

    // Event listeners
    document.getElementById('flashcard').addEventListener('click', () => {
      isFlipped = !isFlipped;
      document.getElementById('flashcard').classList.toggle('flipped', isFlipped);
    });

    document.getElementById('exit-flashcards').addEventListener('click', () => {
      if (state.activeMilestoneTask && state.activeMilestoneTask.type === 'vocab') {
        state.activeMilestoneTask = null;
        App.navigate('#dashboard');
      } else {
        currentView = currentCategory ? 'list' : 'categories';
        renderView(container);
      }
    });

    document.getElementById('fc-prev').addEventListener('click', () => {
      if (flashcardIndex > 0) {
        flashcardIndex--;
        isFlipped = false;
        renderFlashcardView(container);
      }
    });

    document.getElementById('fc-next').addEventListener('click', () => {
      if (flashcardIndex < flashcardWords.length - 1) {
        flashcardIndex++;
        isFlipped = false;
        renderFlashcardView(container);
      } else {
        // Finished
        if (state.activeMilestoneTask && state.activeMilestoneTask.type === 'vocab') {
          Storage.completeMilestone(state.activeMilestoneTask.id);
          App.showNotification("🎯 Milestone Completed Successfully!", "success");
          state.activeMilestoneTask = null;
          setTimeout(() => App.navigate('#dashboard'), 1500);
        } else {
          App.showNotification(`🎉 Reviewed ${flashcardWords.length} words!`, 'success');
          Storage.addActivity({ type: 'word_learned', description: `Reviewed ${flashcardWords.length} flashcards`, xp: 0 });
          Storage.addDailyProgress(2);
          currentView = currentCategory ? 'list' : 'categories';
          renderView(container);
        }
      }
    });

    if (hasAI) {
      container.querySelectorAll('.flashcard-srs-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const success = btn.dataset.success === 'true';
          
          Storage.updateSRSVocabQueue(word.word, success);
          Storage.setWordState(word.id, {
            state: success ? 'mastered' : 'learning',
            wordData: word,
            lastReviewed: new Date().toISOString()
          });

          let xpEarned = success ? 10 : 2;
          const result = Storage.addXP(xpEarned);
          App.showNotification(success ? `+10 XP — Awesome! Got "${word.word}"!` : `+2 XP — Kept in practice review.`, success ? 'success' : 'info');
          App.updateSidebarXP();

          Storage.addActivity({
            type: 'word_learned',
            description: success ? `Mastered word "${word.word}"` : `Practiced word "${word.word}"`,
            xp: xpEarned
          });

          // Auto-advance to next card
          if (flashcardIndex < flashcardWords.length - 1) {
            flashcardIndex++;
            isFlipped = false;
            renderFlashcardView(container);
          } else {
            if (state.activeMilestoneTask && state.activeMilestoneTask.type === 'vocab') {
              Storage.completeMilestone(state.activeMilestoneTask.id);
              App.showNotification("🎯 Milestone Completed Successfully!", "success");
              state.activeMilestoneTask = null;
              setTimeout(() => App.navigate('#dashboard'), 1500);
            } else {
              App.showNotification(`🎉 Completed all ${flashcardWords.length} flashcards!`, 'success');
              Storage.addDailyProgress(3);
              currentView = currentCategory ? 'list' : 'categories';
              renderView(container);
            }
          }
        });
      });
    } else {
      container.querySelectorAll('.flashcard-state-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const newState = btn.dataset.state;
          const oldState = Storage.getWordState(word.id).state;

          let nextReview = null;
          if (newState === 'learning') {
            const reviewDays = [1, 3, 7, 14, 30];
            const currentState = Storage.getWordState(word.id);
            const reviewCount = currentState.reviewCount || 0;
            const days = reviewDays[Math.min(reviewCount, reviewDays.length - 1)];
            const d = new Date();
            d.setDate(d.getDate() + days);
            nextReview = d.toISOString().split('T')[0];
            Storage.setWordState(word.id, { state: newState, nextReview, lastReviewed: new Date().toISOString(), reviewCount: reviewCount + 1 });
          } else {
            Storage.setWordState(word.id, { state: newState, nextReview: null, lastReviewed: new Date().toISOString() });
          }

          if (newState !== 'new' && oldState === 'new') {
            const result = Storage.addXP(10);
            App.showNotification(`+10 XP for learning "${word.word}"!`, 'success');
            Storage.addActivity({ type: 'word_learned', description: `Learned "${word.word}"`, xp: 10 });
            App.updateSidebarXP();
          }

          // Auto-advance to next card
          if (flashcardIndex < flashcardWords.length - 1) {
            flashcardIndex++;
            isFlipped = false;
            renderFlashcardView(container);
          } else {
            if (state.activeMilestoneTask && state.activeMilestoneTask.type === 'vocab') {
              Storage.completeMilestone(state.activeMilestoneTask.id);
              App.showNotification("🎯 Milestone Completed Successfully!", "success");
              state.activeMilestoneTask = null;
              setTimeout(() => App.navigate('#dashboard'), 1500);
            } else {
              App.showNotification(`🎉 Completed all ${flashcardWords.length} flashcards!`, 'success');
              Storage.addDailyProgress(3);
              currentView = currentCategory ? 'list' : 'categories';
              renderView(container);
            }
          }
        });
      });
    }
  }

  export const VocabularyModule = { render };
