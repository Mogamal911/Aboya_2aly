import { Storage } from './storage.js';
import { App } from './app.js';
import { APP_DATA } from './data.js';
import { Utils } from './utils.js';
import { state } from './state.js';

  const MILESTONES = [
    {
      id: 1,
      title: "Foundations Quest",
      icon: "📚",
      type: "vocab",
      description: "Unlock your foundational vocabulary with 5 essential everyday expressions.",
      category: "common",
      targetCount: 5,
      navHash: "#vocabulary"
    },
    {
      id: 2,
      title: "Everyday Café Encounter",
      icon: "🎙️",
      type: "speaking_roleplay",
      description: "Step inside a real-world café and order your favorite drink naturally using voice control.",
      roleplayId: "rp1",
      turnLimit: 2,
      navHash: "#speaking"
    },
    {
      id: 3,
      title: "Present Tense Mastery",
      icon: "📝",
      type: "grammar",
      description: "Distinguish between actions happening now and everyday routines through interactive tenses tutorials.",
      lessonId: "g1",
      navHash: "#grammar"
    },
    {
      id: 4,
      title: "Everyday Dialogue Practice",
      icon: "🎙️",
      type: "speaking_roleplay",
      description: "Complete your café dialogue with professional articulation and advanced structures.",
      roleplayId: "rp1",
      startTurn: 2,
      navHash: "#speaking"
    },
    {
      id: 5,
      title: "Café Graduation Challenge",
      icon: "🎯",
      type: "quiz",
      description: "Show off your skills! Pass a rapid-fire quiz covering café dialogues and present tenses.",
      difficulty: 1,
      navHash: "#quiz"
    },
    {
      id: 6,
      title: "Professional Vocabulary Lab",
      icon: "💼",
      type: "vocab",
      description: "Learn 5 essential business English vocabulary terms to boost your professional career.",
      category: "business",
      targetCount: 5,
      navHash: "#vocabulary"
    },
    {
      id: 7,
      title: "The Job Interview Simulation",
      icon: "🎙️",
      type: "speaking_roleplay",
      description: "Introduce yourself confidently under professional pressure in a formal job interview simulation.",
      roleplayId: "rp2",
      turnLimit: 2,
      navHash: "#speaking"
    },
    {
      id: 8,
      title: "Passive Structure Zone",
      icon: "📝",
      type: "grammar",
      description: "Learn how to structure professional logs, database updates, and reports in the Passive Voice.",
      lessonId: "g4",
      navHash: "#grammar"
    },
    {
      id: 9,
      title: "Advanced Career Pitch",
      icon: "🎙️",
      type: "speaking_roleplay",
      description: "Complete your job interview conversation using business buzzwords and advanced vocabulary.",
      roleplayId: "rp2",
      startTurn: 2,
      navHash: "#speaking"
    },
    {
      id: 10,
      title: "Business Challenge Arena",
      icon: "🎯",
      type: "quiz",
      description: "Review and test intermediate business grammar and vocabulary under pressure.",
      difficulty: 2,
      navHash: "#quiz"
    },
    {
      id: 11,
      title: "Travel & Culture Vocabulary",
      icon: "✈️",
      type: "vocab",
      description: "Learn 5 crucial travel and culture vocabulary words for international settings.",
      category: "travel",
      targetCount: 5,
      navHash: "#vocabulary"
    },
    {
      id: 12,
      title: "Articulation & Accent Drills",
      icon: "🎙️",
      type: "speaking_drills",
      description: "Tackle rapid-fire tongue twisters to improve your English articulation and speed.",
      drillId: "tt1",
      navHash: "#speaking"
    },
    {
      id: 13,
      title: "Hypothetical Travel Scenarios",
      icon: "📝",
      type: "grammar",
      description: "Master hypothetical future conditional clauses for complex travel conversations.",
      lessonId: "g3",
      navHash: "#grammar"
    },
    {
      id: 14,
      title: "Graduation Quiz Arena",
      icon: "👑",
      type: "quiz",
      description: "Your final graduation quiz! Complete this to graduate as a highly fluent English speaker.",
      difficulty: 3,
      navHash: "#quiz"
    }
  ];

  function renderPlanChecklist(activeMilestone) {
    const activeType = activeMilestone.type;
    const activeTitle = activeMilestone.title;
    
    if (activeType === 'vocab') {
      return `
        <div style="display:flex; align-items:center; gap:12px; background: rgba(0, 240, 255, 0.05); padding: 10px; border-radius: 8px; border: 1px solid rgba(0, 240, 255, 0.15);">
          <span style="font-size:20px;">📚</span>
          <div style="flex:1;">
            <div style="font-weight:700; font-size:13px; color: var(--accent);">Learn Vocab: ${activeTitle}</div>
            <div style="font-size:11px; color:var(--text-secondary);">Master 5 essential core terms (5 mins)</div>
          </div>
          <span style="background: var(--accent-gradient); color:#050512; font-weight:800; font-size:10px; padding:2px 6px; border-radius:4px;">ACTIVE</span>
        </div>
        <div style="display:flex; align-items:center; gap:12px; opacity: 0.5; padding: 10px;">
          <span style="font-size:20px;">🎙️</span>
          <div style="flex:1;">
            <div style="font-weight:700; font-size:13px;">Speaking Studio Practice</div>
            <div style="font-size:11px; color:var(--text-secondary);">Practice natural pronunciation dialogues</div>
          </div>
          <span>🔒</span>
        </div>
        <div style="display:flex; align-items:center; gap:12px; opacity: 0.5; padding: 10px;">
          <span style="font-size:20px;">🎯</span>
          <div style="flex:1;">
            <div style="font-weight:700; font-size:13px;">Quiz Arena Challenge</div>
            <div style="font-size:11px; color:var(--text-secondary);">Review your vocabulary sets under pressure</div>
          </div>
          <span>🔒</span>
        </div>
      `;
    } else if (activeType === 'speaking_roleplay' || activeType === 'speaking_drills') {
      return `
        <div style="display:flex; align-items:center; gap:12px; background: rgba(255, 0, 85, 0.05); padding: 10px; border-radius: 8px; border: 1px solid rgba(255, 0, 85, 0.15);">
          <span style="font-size:20px;">🎙️</span>
          <div style="flex:1;">
            <div style="font-weight:700; font-size:13px; color: #ff0055;">AI Speak: ${activeTitle}</div>
            <div style="font-size:11px; color:var(--text-secondary);">Roleplay or speak aloud with AI tutor (5 mins)</div>
          </div>
          <span style="background: linear-gradient(135deg, #ff0055, #bd00ff); color:#ffffff; font-weight:800; font-size:10px; padding:2px 6px; border-radius:4px;">ACTIVE</span>
        </div>
        <div style="display:flex; align-items:center; gap:12px; opacity: 0.5; padding: 10px;">
          <span style="font-size:20px;">🧠</span>
          <div style="flex:1;">
            <div style="font-weight:700; font-size:13px;">Grammar Zone Checkup</div>
            <div style="font-size:11px; color:var(--text-secondary);">Review current sentence structures</div>
          </div>
          <span>🔒</span>
        </div>
        <div style="display:flex; align-items:center; gap:12px; opacity: 0.5; padding: 10px;">
          <span style="font-size:20px;">🎯</span>
          <div style="flex:1;">
            <div style="font-weight:700; font-size:13px;">Quiz Arena Challenge</div>
            <div style="font-size:11px; color:var(--text-secondary);">Verify spoken grammatical forms under time limits</div>
          </div>
          <span>🔒</span>
        </div>
      `;
    } else if (activeType === 'grammar') {
      return `
        <div style="display:flex; align-items:center; gap:12px; background: rgba(0, 255, 136, 0.05); padding: 10px; border-radius: 8px; border: 1px solid rgba(0, 255, 136, 0.15);">
          <span style="font-size:20px;">🧠</span>
          <div style="flex:1;">
            <div style="font-weight:700; font-size:13px; color: #00ff88;">Grammar Study: ${activeTitle}</div>
            <div style="font-size:11px; color:var(--text-secondary);">Practice structural tenses and rules (5 mins)</div>
          </div>
          <span style="background: linear-gradient(135deg, #00ff88, #00b3ff); color:#050512; font-weight:800; font-size:10px; padding:2px 6px; border-radius:4px;">ACTIVE</span>
        </div>
        <div style="display:flex; align-items:center; gap:12px; opacity: 0.5; padding: 10px;">
          <span style="font-size:20px;">📚</span>
          <div style="flex:1;">
            <div style="font-weight:700; font-size:13px;">Vocabulary Review</div>
            <div style="font-size:11px; color:var(--text-secondary);">Recycle flashcards to permanent memory</div>
          </div>
          <span>🔒</span>
        </div>
        <div style="display:flex; align-items:center; gap:12px; opacity: 0.5; padding: 10px;">
          <span style="font-size:20px;">🎯</span>
          <div style="flex:1;">
            <div style="font-weight:700; font-size:13px;">Quiz Arena Challenge</div>
            <div style="font-size:11px; color:var(--text-secondary);">Tackle mixed grammatical structures quiz</div>
          </div>
          <span>🔒</span>
        </div>
      `;
    } else {
      return `
        <div style="display:flex; align-items:center; gap:12px; background: rgba(189, 0, 255, 0.05); padding: 10px; border-radius: 8px; border: 1px solid rgba(189, 0, 255, 0.15);">
          <span style="font-size:20px;">🎯</span>
          <div style="flex:1;">
            <div style="font-weight:700; font-size:13px; color: #bd00ff;">Final Quiz: ${activeTitle}</div>
            <div style="font-size:11px; color:var(--text-secondary);">Complete unit review arena challenge (5 mins)</div>
          </div>
          <span style="background: var(--accent-gradient); color:#ffffff; font-weight:800; font-size:10px; padding:2px 6px; border-radius:4px;">ACTIVE</span>
        </div>
        <div style="display:flex; align-items:center; gap:12px; opacity: 0.5; padding: 10px;">
          <span style="font-size:20px;">🎙️</span>
          <div style="flex:1;">
            <div style="font-weight:700; font-size:13px;">Speaking Studio Practice</div>
            <div style="font-size:11px; color:var(--text-secondary);">Roleplay practice for high fluency scores</div>
          </div>
          <span>🔒</span>
        </div>
        <div style="display:flex; align-items:center; gap:12px; opacity: 0.5; padding: 10px;">
          <span style="font-size:20px;">📚</span>
          <div style="flex:1;">
            <div style="font-weight:700; font-size:13px;">Vocabulary Review</div>
            <div style="font-size:11px; color:var(--text-secondary);">Commit new words to permanent memory</div>
          </div>
          <span>🔒</span>
        </div>
      `;
    }
  }

  function render(container) {
    const streak = Storage.getStreak();
    const level = Storage.getLevel();
    const hearts = Storage.getHearts();
    const currentMilestone = Storage.getCurrentMilestone();
    const settings = Storage.getSettings();
    const aiBrain = Storage.getAIBrain();

    const userName = settings.userName || "Scholar";
    const vocabLearned = Storage.getLearnedWordsCount();
    const grammarAccuracy = Storage.getAverageQuizScore() || 85;
    const speakingScore = aiBrain.skills?.speaking || 90;

    const activeMilestone = MILESTONES.find(m => m.id === currentMilestone) || MILESTONES[0];

    // Render premium SaaS EdTech dashboard layout
    container.innerHTML = `
      <div class="page-enter">
        <!-- Top bar stats display for streak, xp, and hearts -->
        <div class="topbar-coffee-stats">
          <div class="coffee-stat-pill streak" title="Your Day Streak">🔥 ${streak.current} Days</div>
          <div class="coffee-stat-pill bean" title="Your Accumulated XP">✨ ${level.totalXP} XP</div>
          <div class="coffee-stat-pill heart" id="topbar-hearts-btn" title="Energy Hearts (Click to refill!)">❤️ ${hearts} / 5</div>
        </div>

        <!-- Glassmorphic Hero Section -->
        <div class="glass-card hero-section" style="margin-bottom: 30px; border-left: 5px solid var(--accent); position: relative; overflow: hidden; padding: var(--space-xl);">
          <div style="max-width: 70%; position: relative; z-index: 2;">
            <h2 style="font-size: 28px; font-weight: 800; margin-bottom: 8px;">Welcome back, ${userName}!</h2>
            <p style="font-size: 15px; color: var(--text-secondary); margin-bottom: 20px;">
              💡 <em>"Language is not a test to pass, but a life to live." Let's master something new today!</em>
            </p>
            <button class="btn btn-primary" id="dashboard-continue-cta-btn">
              Continue Learning 🚀
            </button>
          </div>
          <div style="position: absolute; right: 20px; bottom: -10px; font-size: 120px; opacity: 0.05; transform: rotate(15deg); pointer-events: none;">🎙️</div>
        </div>

        <!-- Interactive Progress Overview Grid -->
        <h3 class="section-title" style="margin-top: 0;">Progress Overview</h3>
        <div class="stats-grid">
          <!-- Streak -->
          <div class="glass-card stat-card">
            <div class="stat-icon" style="background: linear-gradient(135deg, #ffaa00, #ff5500);">🔥</div>
            <div class="stat-info">
              <div class="stat-value">${streak.current} Days</div>
              <div class="stat-label">Daily Streak</div>
            </div>
          </div>
          <!-- Level/XP -->
          <div class="glass-card stat-card" style="grid-column: span 2;">
            <div class="stat-icon" style="background: linear-gradient(135deg, #00f0ff, #bd00ff);">✨</div>
            <div class="stat-info" style="flex: 1;">
              <div class="stat-value">Level ${level.level}</div>
              <div class="stat-label">XP Progress (${level.currentXP} / ${level.requiredXP} XP)</div>
              <div class="xp-bar" style="margin-top: 8px;">
                <div class="xp-bar-fill" style="width: ${level.progress}%"></div>
              </div>
            </div>
          </div>
          <!-- Vocab learned -->
          <div class="glass-card stat-card">
            <div class="stat-icon" style="background: linear-gradient(135deg, #8b5cf6, #3b82f6);">📚</div>
            <div class="stat-info">
              <div class="stat-value">${vocabLearned}</div>
              <div class="stat-label">Words Learned</div>
            </div>
          </div>
          <!-- Grammar score -->
          <div class="glass-card stat-card">
            <div class="stat-icon" style="background: linear-gradient(135deg, #00ff88, #00b3ff);">🧠</div>
            <div class="stat-info">
              <div class="stat-value">${grammarAccuracy}%</div>
              <div class="stat-label">Grammar Score</div>
            </div>
          </div>
          <!-- Speaking Score -->
          <div class="glass-card stat-card">
            <div class="stat-icon" style="background: linear-gradient(135deg, #ff0055, #bd00ff);">🎙️</div>
            <div class="stat-info">
              <div class="stat-value">${speakingScore}%</div>
              <div class="stat-label">Fluency Score</div>
            </div>
          </div>
        </div>

        <!-- Today's Plan Checklist & Learning Modules -->
        <div style="display: grid; grid-template-columns: 1fr 1.2fr; gap: var(--space-lg); margin-bottom: 40px;">
          <!-- Today's Plan Checklist -->
          <div class="glass-card" style="display: flex; flex-direction: column;">
            <h3 style="font-size: 18px; font-weight: 800; margin-bottom: 15px;">📅 Today's Plan</h3>
            <div style="display: flex; flex-direction: column; gap: 12px; flex: 1; justify-content: center;">
              ${renderPlanChecklist(activeMilestone)}
            </div>
          </div>

          <!-- Learning Modules Grid -->
          <div class="glass-card" style="display: flex; flex-direction: column;">
            <h3 style="font-size: 18px; font-weight: 800; margin-bottom: 15px;">🎮 Learning Labs</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; flex: 1;">
              <!-- Speaking Module -->
              <div class="glass-card module-card" style="padding: 12px; text-align: center; cursor: pointer; border-color: rgba(255, 0, 85, 0.15);" id="module-speaking-btn">
                <span style="font-size: 24px; display: block; margin-bottom: 4px;">🎤</span>
                <div style="font-weight: 800; font-size: 13px;">Speaking Studio</div>
                <div style="font-size: 10px; color: var(--text-secondary); margin-top: 2px;">AI Roleplays</div>
              </div>
              <!-- Vocab Module -->
              <div class="glass-card module-card" style="padding: 12px; text-align: center; cursor: pointer; border-color: rgba(139, 92, 246, 0.15);" id="module-vocabulary-btn">
                <span style="font-size: 24px; display: block; margin-bottom: 4px;">📚</span>
                <div style="font-weight: 800; font-size: 13px;">Vocabulary Lab</div>
                <div style="font-size: 10px; color: var(--text-secondary); margin-top: 2px;">SRS Repetition</div>
              </div>
              <!-- Grammar Module -->
              <div class="glass-card module-card" style="padding: 12px; text-align: center; cursor: pointer; border-color: rgba(0, 255, 136, 0.15);" id="module-grammar-btn">
                <span style="font-size: 24px; display: block; margin-bottom: 4px;">🧠</span>
                <div style="font-weight: 800; font-size: 13px;">Grammar Zone</div>
                <div style="font-size: 10px; color: var(--text-secondary); margin-top: 2px;">Rules & Drills</div>
              </div>
              <!-- Quiz Module -->
              <div class="glass-card module-card" style="padding: 12px; text-align: center; cursor: pointer; border-color: rgba(0, 240, 255, 0.15);" id="module-quiz-btn">
                <span style="font-size: 24px; display: block; margin-bottom: 4px;">🎯</span>
                <div style="font-weight: 800; font-size: 13px;">Quiz Arena</div>
                <div style="font-size: 10px; color: var(--text-secondary); margin-top: 2px;">Challenge Time</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Zigzag Progressive Roadmap Nodes -->
        <h3 class="section-title text-center" style="font-size: 22px; margin-bottom: 20px;">Your English Roadmap</h3>
        <p class="page-subtitle text-center" style="margin-top:-10px; margin-bottom: 30px;">Follow the structural level roadmap to level A1 ➔ C2. Clear one to unlock the next!</p>

        <div class="roadmap-container">
          <!-- UNIT 1 -->
          <div class="roadmap-unit-banner">
            <span class="roadmap-unit-title">Unit 1: Everyday Café Conversations</span>
            <span class="roadmap-unit-desc">Learn how to order coffee, talk naturally with baristas, and use present tenses confidently.</span>
          </div>
          <div class="roadmap-path">
            ${renderMilestoneNodes(1, 5, currentMilestone)}
          </div>

          <!-- UNIT 2 -->
          <div class="roadmap-unit-banner" style="margin-top: 60px;">
            <span class="roadmap-unit-title">Unit 2: Professional & Career Communication</span>
            <span class="roadmap-unit-desc">Nail your job interviews, present database details clearly, and use passive voice structures professionally.</span>
          </div>
          <div class="roadmap-path">
            ${renderMilestoneNodes(6, 10, currentMilestone)}
          </div>

          <!-- UNIT 3 -->
          <div class="roadmap-unit-banner" style="margin-top: 60px;">
            <span class="roadmap-unit-title">Unit 3: Fluency & Cultural Adaptation</span>
            <span class="roadmap-unit-desc">Tackle rapid-fire tongue twisters, hypothetical travel scenarios, and graduate as a fluent speaker.</span>
          </div>
          <div class="roadmap-path">
            ${renderMilestoneNodes(11, 14, currentMilestone)}
          </div>
        </div>
      </div>
    `;

    // Click CTA button to scroll to active node
    const ctaBtn = container.querySelector('#dashboard-continue-cta-btn');
    if (ctaBtn) {
      ctaBtn.addEventListener('click', () => {
        const activeNode = container.querySelector('.milestone-node.active');
        if (activeNode) {
          activeNode.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Add a temporary subtle flash highlight to the active node circle
          const circle = activeNode.querySelector('.milestone-circle');
          if (circle) {
            circle.style.boxShadow = '0 0 45px rgba(0, 240, 255, 0.8), inset 0 0 20px rgba(255, 255, 255, 0.4)';
            setTimeout(() => {
              circle.style.boxShadow = '';
            }, 1500);
          }
        }
      });
    }

    // Module button event listeners
    container.querySelector('#module-speaking-btn').addEventListener('click', () => {
      App.navigate('#speaking');
    });
    container.querySelector('#module-vocabulary-btn').addEventListener('click', () => {
      App.navigate('#vocabulary');
    });
    container.querySelector('#module-grammar-btn').addEventListener('click', () => {
      App.navigate('#grammar');
    });
    container.querySelector('#module-quiz-btn').addEventListener('click', () => {
      App.navigate('#quiz');
    });

    // Click events on milestone nodes
    container.querySelectorAll('.milestone-node').forEach(node => {
      node.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Remove existing popovers
        container.querySelectorAll('.roadmap-popover').forEach(p => p.remove());

        const id = parseInt(node.dataset.id);
        const milestone = MILESTONES.find(m => m.id === id);
        
        if (id > currentMilestone) {
          Utils.playSoundChime(false);
          App.showNotification("🔒 This milestone is locked! Complete previous milestones to unlock.", "warning");
          return;
        }

        // Render Popover bubble inside clicked node
        const popover = document.createElement('div');
        popover.className = 'roadmap-popover';
        
        const typeLabels = {
          vocab: "Vocabulary flashcards lab",
          speaking_roleplay: "AI speech dialogue session",
          speaking_drills: "AI speech articulation drill",
          grammar: "Grammar & structure zone",
          quiz: "Challenge Quiz Arena"
        };

        const cefrTag = milestone.id <= 5 ? "A1-A2" : (milestone.id <= 10 ? "B1-B2" : "C1-C2");
        const cefrClass = milestone.id <= 5 ? "a2" : (milestone.id <= 10 ? "b2" : "c2");

        popover.innerHTML = `
          <div class="roadmap-popover-header" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <span class="roadmap-popover-type" style="margin: 0;">${typeLabels[milestone.type] || "Learning milestone"}</span>
            <span class="badge badge-${cefrClass}">${cefrTag}</span>
          </div>
          <h4 class="roadmap-popover-title" style="margin-top: 0;">${milestone.title}</h4>
          <p class="roadmap-popover-desc">${milestone.description}</p>
          <button class="btn btn-primary roadmap-popover-btn" id="start-brew-action-btn">
            Start Learning Quest (+15 XP)
          </button>
        `;

        node.appendChild(popover);

        // Click start brewing button
        popover.querySelector('#start-brew-action-btn').addEventListener('click', (e) => {
          e.stopPropagation();
          Utils.playSoundChime(true);
          
          // Check hearts
          if (Storage.getHearts() <= 0) {
            popover.remove();
            showHeartsRefillModal();
            return;
          }

          // Set global milestone task
          state.activeMilestoneTask = milestone;
          
          // Close popover
          popover.remove();
          
          // Navigate to page
          App.navigate(milestone.navHash);
        });
      });
    });

    // Close popovers on page body click
    document.addEventListener('click', () => {
      const openPopovers = container.querySelectorAll('.roadmap-popover');
      openPopovers.forEach(p => p.remove());
    });

    // Refill click handler
    document.getElementById('topbar-hearts-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      showHeartsRefillModal();
    });

    return function destroy() {
      // Cleanup if needed
    };
  }

  function renderMilestoneNodes(startId, endId, currentMilestone) {
    const activeNodes = MILESTONES.filter(m => m.id >= startId && m.id <= endId);
    
    return activeNodes.map((m, index) => {
      const offsetPattern = [0, 50, 0, -50];
      const offset = offsetPattern[(m.id - 1) % 4];

      let stateClass = "locked";
      if (m.id < currentMilestone) {
        stateClass = "completed";
      } else if (m.id === currentMilestone) {
        stateClass = "active";
      }

      return `
        <div class="milestone-node ${stateClass}" data-id="${m.id}" style="--zigzag-offset: ${offset}px;">
          <div class="milestone-circle">
            <span class="milestone-icon">${stateClass === 'locked' ? '🔒' : m.icon}</span>
          </div>
          <span class="milestone-label">${m.id}. ${m.title}</span>
        </div>
      `;
    }).join('');
  }

  function showHeartsRefillModal() {
    const currentHearts = Storage.getHearts();
    
    const overlay = document.createElement('div');
    overlay.className = 'refill-modal-overlay';
    overlay.innerHTML = `
      <div class="refill-modal">
        <span class="refill-modal-icon">❤️</span>
        <h3 class="refill-modal-title">Refill Your Energy Hearts?</h3>
        <p class="refill-modal-desc">
          You currently have <strong>${currentHearts} / 5</strong> hearts remaining.
          To continue practicing grammar, vocabulary, and speaking sessions, refill your energy to full!
        </p>
        <div style="display:flex; flex-direction:column; gap:12px">
          <button class="btn btn-primary" id="refill-cups-now-btn" style="width:100%">
            Refill Energy ❤️
          </button>
          <button class="btn btn-secondary" id="refill-modal-close-btn" style="width:100%">
            Continue Studying
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    overlay.querySelector('#refill-cups-now-btn').addEventListener('click', () => {
      Storage.refillHearts();
      Utils.playSoundChime(true);
      overlay.remove();
      App.showNotification("❤️ Energy refilled successfully! Your stamina hearts are fully loaded.", "success");
      
      // Update topbar indicator
      const heartsBtn = document.getElementById('topbar-hearts-btn');
      if (heartsBtn) heartsBtn.textContent = `❤️ 5 / 5`;
    });

    overlay.querySelector('#refill-modal-close-btn').addEventListener('click', () => {
      overlay.remove();
    });

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.remove();
    });
  }

  export const DashboardModule = { render };
