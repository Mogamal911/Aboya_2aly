import { Storage } from './storage.js';
import { DashboardModule } from './dashboard.js';
import { SpeakingModule } from './speaking.js';
import { VocabularyModule } from './vocabulary.js';
import { GrammarModule } from './grammar.js';
import { QuizModule } from './quiz.js';
import { ProgressModule } from './progress.js';

  const pages = {
    dashboard: { render: null, title: 'Dashboard' },
    speaking: { render: null, title: 'Speaking Studio' },
    vocabulary: { render: null, title: 'Vocabulary' },
    grammar: { render: null, title: 'Grammar' },
    quiz: { render: null, title: 'Quiz' },
    progress: { render: null, title: 'Analytics' },
    settings: { render: null, title: 'Settings' }
  };

  let currentPage = null;
  let currentDestroy = null;

  // ─── Router ───────────────────────────────────────────────

  function navigate(hash) {
    const page = hash.replace('#', '') || 'dashboard';
    if (!pages[page]) return navigate('#dashboard');

    // Update URL
    if (window.location.hash !== '#' + page) {
      window.location.hash = page;
      return; // hashchange event will call navigate again
    }

    // Destroy previous page
    if (currentDestroy) {
      try { currentDestroy(); } catch(e) {}
      currentDestroy = null;
    }

    // Update nav
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.page === page);
    });

    // Render new page
    const container = document.getElementById('main-content');
    container.innerHTML = '';
    container.className = 'main-content page-enter';

    if (pages[page].render) {
      const result = pages[page].render(container);
      if (typeof result === 'function') {
        currentDestroy = result;
      }
    }

    currentPage = page;

    // Update title
    document.title = `${pages[page].title} — Aboya`;

    // Close mobile sidebar
    closeSidebar();

    // Update streak on any navigation (user is active)
    Storage.updateStreak();

    // Check achievements
    const newAchievements = Storage.checkAchievements();
    newAchievements.forEach(a => {
      showNotification(`🏆 Achievement Unlocked: ${a.name}!`, 'success');
    });

    // Update sidebar XP display
    updateSidebarXP();
  }

  function getCurrentPage() {
    return currentPage;
  }

  // ─── Register Page Renderers ──────────────────────────────

  function registerPage(name, renderFn) {
    if (pages[name]) {
      pages[name].render = renderFn;
    }
  }

  // ─── Notifications ────────────────────────────────────────

  function showNotification(message, type = 'success') {
    const container = document.getElementById('notification-container');
    if (!container) return;
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;

    const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
    notification.innerHTML = `
      <span class="notification-icon">${icons[type] || icons.info}</span>
      <span class="notification-text">${message}</span>
      <button class="notification-close" onclick="this.parentElement.remove()">×</button>
    `;

    container.appendChild(notification);

    setTimeout(() => {
      notification.classList.add('exit');
      setTimeout(() => notification.remove(), 300);
    }, 3500);
  }

  // ─── Sidebar ──────────────────────────────────────────────

  function openSidebar() {
    document.getElementById('sidebar').classList.add('open');
    document.getElementById('sidebar-overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebar-overlay').classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateSidebarXP() {
    const level = Storage.getLevel();
    const levelEl = document.getElementById('sidebar-level');
    const xpTextEl = document.getElementById('sidebar-xp-text');
    const xpFillEl = document.getElementById('sidebar-xp-fill');

    if (levelEl) levelEl.textContent = `Level ${level.level}`;
    if (xpTextEl) xpTextEl.textContent = `${level.currentXP} / ${level.requiredXP} XP`;
    if (xpFillEl) xpFillEl.style.width = `${level.progress}%`;
  }

  // ─── Theme ────────────────────────────────────────────────

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    Storage.updateSettings({ theme });
  }

  function getTheme() {
    return Storage.getSettings().theme || 'dark';
  }

  // ─── Settings Page ────────────────────────────────────────

  function renderSettings(container) {
    const settings = Storage.getSettings();
    container.innerHTML = `
      <div class="page-enter">
        <h1 class="page-title gradient-text">Settings</h1>
        <p class="page-subtitle">Customize your learning experience</p>

        <div class="settings-section">
          <h2 class="settings-title">Appearance</h2>
          <div class="setting-item glass-card">
            <div>
              <div class="setting-label">Theme</div>
              <div class="setting-desc">Choose between dark and light mode</div>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" id="setting-theme" ${settings.theme === 'light' ? 'checked' : ''}>
              <span class="toggle-slider">
                <span class="toggle-icon-dark">🌙</span>
                <span class="toggle-icon-light">☀️</span>
              </span>
            </label>
          </div>
        </div>

        <div class="settings-section">
          <h2 class="settings-title">Learning Goal</h2>
          <div class="setting-item glass-card">
            <div>
              <div class="setting-label">Daily Goal</div>
              <div class="setting-desc">Set your daily learning goal (in minutes)</div>
            </div>
            <select class="select-input" id="setting-daily-goal">
              <option value="5" ${settings.dailyGoal === 5 ? 'selected' : ''}>5 min</option>
              <option value="10" ${settings.dailyGoal === 10 ? 'selected' : ''}>10 min</option>
              <option value="15" ${settings.dailyGoal === 15 ? 'selected' : ''}>15 min</option>
              <option value="20" ${settings.dailyGoal === 20 ? 'selected' : ''}>20 min</option>
              <option value="30" ${settings.dailyGoal === 30 ? 'selected' : ''}>30 min</option>
            </select>
          </div>
          <div class="setting-item glass-card">
            <div>
              <div class="setting-label">Sound Effects</div>
              <div class="setting-desc">Play sounds for correct/incorrect answers</div>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" id="setting-sound" ${settings.soundEffects ? 'checked' : ''}>
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>

        <div class="settings-section">
          <h2 class="settings-title">AI Configuration</h2>
          <div class="setting-item glass-card" style="display:flex; flex-direction:column; align-items:stretch; gap:12px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div>
                <div class="setting-label">Gemini API Key</div>
                <div class="setting-desc">Enter your Google Gemini API key to enable the Infinite AI Tutor</div>
              </div>
              <span class="badge ${settings.geminiApiKey ? 'badge-advanced' : 'badge-beginner'}" id="api-status-badge">
                ${settings.geminiApiKey ? 'Active AI' : 'Offline Mode'}
              </span>
            </div>
            <div style="display:flex; gap:8px;">
              <input type="password" class="search-input" id="setting-gemini-key" placeholder="AIzaSy..." value="${settings.geminiApiKey || ''}" style="flex:1; padding: 10px 14px; border: 2px solid var(--text-primary); border-radius: var(--radius-sm); background: var(--bg-secondary); color: var(--text-primary);" aria-label="Gemini API Key">
              <button class="btn btn-primary" id="setting-save-key" style="border: 2px solid var(--text-primary); padding: 0 16px;">Save</button>
            </div>
          </div>
          
          <div class="setting-item glass-card">
            <div>
              <div class="setting-label">Use Pro Model</div>
              <div class="setting-desc">Use gemini-1.5-pro for deep grammar evaluation (slower but highly detailed)</div>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" id="setting-pro-model" ${settings.isProModel ? 'checked' : ''}>
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>

        <div class="settings-section">
          <h2 class="settings-title">Data</h2>
          <div class="setting-item glass-card">
            <div>
              <div class="setting-label">Reset All Progress</div>
              <div class="setting-desc">This will delete all your learning data permanently</div>
            </div>
            <button class="btn btn-danger" id="setting-reset">Reset Progress</button>
          </div>
        </div>
      </div>
    `;

    // Event listeners
    const themeToggle = document.getElementById('setting-theme');
    themeToggle.addEventListener('change', () => {
      setTheme(themeToggle.checked ? 'light' : 'dark');
    });

    const goalSelect = document.getElementById('setting-daily-goal');
    goalSelect.addEventListener('change', () => {
      Storage.updateSettings({ dailyGoal: parseInt(goalSelect.value) });
      showNotification('Daily goal updated!', 'success');
    });

    const soundToggle = document.getElementById('setting-sound');
    soundToggle.addEventListener('change', () => {
      Storage.updateSettings({ soundEffects: soundToggle.checked });
    });

    const saveKeyBtn = document.getElementById('setting-save-key');
    const keyInput = document.getElementById('setting-gemini-key');
    const proToggle = document.getElementById('setting-pro-model');
    const apiStatusBadge = document.getElementById('api-status-badge');

    saveKeyBtn.addEventListener('click', () => {
      const key = keyInput.value.trim();
      Storage.updateSettings({ geminiApiKey: key });
      
      if (key) {
        showNotification('Gemini API key saved! AI engine is active.', 'success');
        if (apiStatusBadge) {
          apiStatusBadge.className = 'badge badge-advanced';
          apiStatusBadge.textContent = 'Active AI';
        }
      } else {
        showNotification('Gemini API key removed. Switched to offline mode.', 'info');
        if (apiStatusBadge) {
          apiStatusBadge.className = 'badge badge-beginner';
          apiStatusBadge.textContent = 'Offline Mode';
        }
      }
    });

    proToggle.addEventListener('change', () => {
      Storage.updateSettings({ isProModel: proToggle.checked });
      showNotification(`Model updated to ${proToggle.checked ? 'Gemini 1.5 Pro' : 'Gemini 1.5 Flash'}!`, 'success');
    });

    const resetBtn = document.getElementById('setting-reset');
    resetBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
        Storage.resetAll();
        showNotification('All progress has been reset.', 'info');
        navigate('#dashboard');
      }
    });
  }

  // ─── Initialize ───────────────────────────────────────────

  function init() {
    // Apply saved theme
    setTheme(getTheme());

    // Register settings page
    registerPage('settings', renderSettings);

    // Register pages from imported modules
    registerPage('dashboard', DashboardModule.render);
    registerPage('speaking', SpeakingModule.render);
    registerPage('vocabulary', VocabularyModule.render);
    registerPage('grammar', GrammarModule.render);
    registerPage('quiz', QuizModule.render);
    registerPage('progress', ProgressModule.render);

    // Hash change listener
    window.addEventListener('hashchange', () => {
      navigate(window.location.hash);
    });

    // Mobile sidebar
    document.getElementById('hamburger-btn').addEventListener('click', openSidebar);
    document.getElementById('sidebar-overlay').addEventListener('click', closeSidebar);

    // Initial navigation
    navigate(window.location.hash || '#dashboard');

    // Update streak on load
    Storage.updateStreak();
    updateSidebarXP();

    // Track daily progress (rough: add 1 min every 60 seconds user is on the page)
    setInterval(() => {
      Storage.addDailyProgress(1);
    }, 60000);
  }

  // ─── Public API ───────────────────────────────────────────

  export const App = {
    navigate,
    getCurrentPage,
    registerPage,
    showNotification,
    setTheme,
    getTheme,
    updateSidebarXP
  };

  // Keep window.App as fallback for inline attributes or backward compatibility
  window.App = App;

  // Start when DOM ready (defer to next tick to ensure ESM dependency graph is fully evaluated)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(init, 0));
  } else {
    setTimeout(init, 0);
  }
