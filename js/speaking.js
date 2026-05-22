import { Storage } from './storage.js';
import { App } from './app.js';
import { APP_DATA } from './data.js';
import { GeminiAPI } from './gemini.js';
import { Utils } from './utils.js';
import { state } from './state.js';

  // Sub-sections: 'ai_chat' | 'shadow' | 'roleplays' | 'pairs' | 'twisters'
  let currentTab = 'ai_chat';
  let isRecording = false;
  let recognition = null;
  let audioContext = null;
  let analyser = null;
  let microphone = null;
  let javascriptNode = null;
  let canvasContext = null;
  let animationFrameId = null;
  let activeSpeechTarget = '';
  let recordedTranscript = '';
  let audioStream = null; // Track mic stream globally for proper cleanup
  
  // AI Voice Chat variables
  let isAIChatActive = false;
  let aiChatTurns = []; // List of { sender: 'user'|'ai', text: string, confidence: number }
  let aiChatVoiceState = 'idle'; // 'idle' | 'greeting' | 'listening' | 'thinking' | 'speaking'
  let isMuted = false;
  let aiSpeechRecognition = null;
  
  // Scenarios state
  let activeRoleplayId = null;
  let roleplayIndex = 0;
  let roleplayDialogues = [];

  // Active voice companion persona state
  let activePersonaId = 'sam';

  const PERSONAS = {
    sam: {
      name: 'Tutor Sam',
      role: 'Cozy Tutor',
      emoji: '🎓',
      pitch: 1.0,
      rate: 0.85,
      greeting: "Hello there! I'm Tutor Sam, your supportive English guide. Let's practice together slowly. What would you like to discuss today?",
      systemPrompt: "You are Tutor Sam, a supportive, warm, and highly encouraging English tutor. Speak slowly and clearly. Keep your language simple, clean, and educational. Limit sentences to a comfortable B1-B2 CEFR level. Ask friendly, open questions to guide the learner."
    },
    victor: {
      name: 'Interviewer Victor',
      role: 'Corporate HR',
      emoji: '💼',
      pitch: 0.85,
      rate: 1.0,
      greeting: "Welcome. I am Victor, your interviewer today. Let's assess your professional English communication. Tell me about your background and career goals.",
      systemPrompt: "You are Interviewer Victor, a formal, professional corporate interviewer. Your tone is direct, professional, and slightly corporate. Use business terminology (synergy, leverage, key results, scaling). Ask structured, realistic interview questions and expect concise, professional answers."
    },
    chloe: {
      name: 'Friend Chloe',
      role: 'Casual Buddy',
      emoji: '🧑‍🤝‍🧑',
      pitch: 1.05,
      rate: 1.08,
      greeting: "Hey! Chloe here. So glad we're hanging out. What's up? Got any fun plans or cool stories to share today?",
      systemPrompt: "You are Chloe, a relaxed, energetic, and highly casual peer. Speak with friendly, modern English slang, natural contractions, idioms, and common phrasal verbs. Keep the dialogue lighthearted, spontaneous, and conversational, like chatting with a close friend."
    },
    gable: {
      name: 'Mrs. Gable',
      role: 'Grammar Teacher',
      emoji: '🏫',
      pitch: 1.1,
      rate: 0.9,
      greeting: "Good day. I am Mrs. Gable. We shall focus precisely on grammatical correctness and correct usage today. Please introduce yourself.",
      systemPrompt: "You are Mrs. Gable, a precise, classic, and slightly strict English grammar teacher. Emphasize grammatical correctness and structured sentence building. Provide constructive, precise academic feedback and encourage meticulous practice of vocabulary and tenses."
    }
  };

  // Audio synthesis (Synthesize sounds to avoid files loading errors)


  // Speak target text (TTS)
  function speakText(text) {
    if (!window.speechSynthesis) {
      App.showNotification('Speech synthesis not supported in this browser.', 'warning');
      return;
    }
    // Stop any active speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    
    // Attempt to pick a premium English voice if available
    const voices = window.speechSynthesis.getVoices();
    const premiumVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural')));
    if (premiumVoice) utterance.voice = premiumVoice;
    
    window.speechSynthesis.speak(utterance);
  }

  // Compare transcript and target phrase
  function evaluatePronunciation(target, spoken) {
    const clean = str => str.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim().split(/\s+/);
    const targetWords = clean(target);
    const spokenWords = clean(spoken);
    
    let matches = 0;
    const wordResults = targetWords.map(word => {
      // Find matches roughly
      const isMatched = spokenWords.some((sp, idx) => {
        if (sp === word) {
          spokenWords.splice(idx, 1); // Consume
          return true;
        }
        return false;
      });
      if (isMatched) matches++;
      return { word, matched: isMatched };
    });

    const accuracy = targetWords.length > 0 ? Math.round((matches / targetWords.length) * 100) : 0;
    return { accuracy, wordResults };
  }

  // Web Speech API initialization
  function initSpeechRecognition(targetText, onResultCallback, onEndCallback) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      App.showNotification('Speech Recognition not supported in this browser. Please use Chrome or Edge.', 'error');
      return false;
    }

    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      if (!event.results || event.results.length === 0) return;
      let interimTranscript = '';
      // Accumulate ALL final results to avoid truncation on pauses
      recordedTranscript = Array.from(event.results)
        .filter(r => r.isFinal)
        .map(r => r[0].transcript)
        .join(' ');
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (!event.results[i].isFinal) {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      const displayText = recordedTranscript || interimTranscript;
      const isFinal = event.results[event.results.length - 1].isFinal;
      onResultCallback(displayText, isFinal);
    };

    recognition.onerror = (event) => {
      console.error(event.error);
      if (event.error === 'not-allowed') {
        App.showNotification('Microphone access blocked. Please enable mic permissions.', 'error');
      }
      stopRecordingProcess();
    };

    recognition.onend = () => {
      onEndCallback();
    };

    return true;
  }

  // Web Audio Visualizer setup
  async function startAudioVisualizer(canvas) {
    try {
      audioStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      analyser = audioContext.createAnalyser();
      microphone = audioContext.createMediaStreamSource(audioStream);
      
      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      canvasContext = canvas.getContext('2d');
      microphone.connect(analyser);

      const draw = () => {
        if (!isRecording) return;
        animationFrameId = requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);

        const width = canvas.width;
        const height = canvas.height;
        canvasContext.clearRect(0, 0, width, height);

        canvasContext.fillStyle = 'transparent';
        canvasContext.fillRect(0, 0, width, height);

        const barWidth = (width / bufferLength) * 2.5;
        let barHeight;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          barHeight = dataArray[i] / 2.5;

          // Futuristic neon gradient matching the new theme
          const gradient = canvasContext.createLinearGradient(0, height, 0, 0);
          gradient.addColorStop(0, '#00f0ff');
          gradient.addColorStop(1, '#bd00ff');

          canvasContext.fillStyle = gradient;
          canvasContext.fillRect(x, height - barHeight, barWidth, barHeight);

          x += barWidth + 2;
        }
      };

      draw();
    } catch (err) {
      console.error('Audio Context Error:', err);
    }
  }

  function stopAudioVisualizer() {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    if (audioStream) {
      try { audioStream.getTracks().forEach(t => t.stop()); } catch(e) {}
      audioStream = null;
    }
    if (audioContext) {
      try { audioContext.close(); } catch(e) {}
    }
    audioContext = null;
    analyser = null;
    microphone = null;
  }

  function startRecordingProcess(targetText, onResult, onComplete) {
    if (isRecording) return;
    recordedTranscript = '';
    isRecording = true;
    
    const initialized = initSpeechRecognition(targetText, onResult, () => {
      stopRecordingProcess();
      onComplete();
    });

    if (initialized) {
      recognition.start();
      const canvas = document.getElementById('speaking-wave');
      if (canvas) startAudioVisualizer(canvas);
      
      const card = document.getElementById('speak-viewport-card');
      if (card) card.classList.add('recording');
    } else {
      isRecording = false;
    }
  }

  function stopRecordingProcess() {
    if (!isRecording) return;
    isRecording = false;
    if (recognition) {
      try { recognition.stop(); } catch(e){}
    }
    stopAudioVisualizer();
    
    const card = document.getElementById('speak-viewport-card');
    if (card) card.classList.remove('recording');
  }

  // ─── Main Render ──────────────────────────────────────────

  function render(container) {
    if (state.activeMilestoneTask) {
      const task = state.activeMilestoneTask;
      if (task.type === 'speaking_roleplay') {
        activeRoleplayId = task.roleplayId;
        const rp = APP_DATA.SPEAKING_DRILLS.roleplays.find(r => r.id === activeRoleplayId);
        if (rp) {
          roleplayIndex = task.startTurn || 0;
          roleplayDialogues = [];
          
          // Render layout specifically for roleplay milestone
          container.innerHTML = `<div id="speaking-tab-content" class="page-enter"></div>`;
          renderActiveRoleplayPanel(rp, document.getElementById('speaking-tab-content'));
          
          return function destroy() {
            stopRecordingProcess();
            window.speechSynthesis.cancel();
            activeRoleplayId = null;
            roleplayIndex = 0;
            roleplayDialogues = [];
          };
        }
      } else if (task.type === 'speaking_drills') {
        currentTab = 'twisters';
      }
    }
    
    renderMainLayout(container);
    
    // If tongue twister milestone, auto-open tongue twister drill
    if (state.activeMilestoneTask && state.activeMilestoneTask.type === 'speaking_drills') {
      const drillId = state.activeMilestoneTask.drillId;
      const tt = APP_DATA.SPEAKING_DRILLS.tongueTwisters.find(p => p.id === drillId);
      const contentArea = document.getElementById('speaking-tab-content');
      if (tt && contentArea) {
        // Render tongue twister list, then open drill directly
        renderTwisters(contentArea);
        const workoutArea = document.getElementById('active-tt-drill');
        if (workoutArea) openTwisterDrill(tt, workoutArea);
      }
    }

    return function destroy() {
      stopRecordingProcess();
      stopAIChatCall();
      window.speechSynthesis.cancel();
    };
  }

  function renderMainLayout(container) {
    container.innerHTML = `
      <div class="page-enter">
        <h1 class="page-title gradient-text">Speaking Studio 🎙️</h1>
        <p class="page-subtitle">Master English pronunciation, shadowing, and real dialogue using AI Voice-recognition</p>

        <!-- Speaking Tabs -->
        <div class="filter-tabs" id="speaking-tabs">
          <button class="tab ${currentTab === 'ai_chat' ? 'active' : ''}" data-tab="ai_chat">🤖 AI Tutor Lounge</button>
          <button class="tab ${currentTab === 'shadow' ? 'active' : ''}" data-tab="shadow">Shadowing Arena</button>
          <button class="tab ${currentTab === 'roleplays' ? 'active' : ''}" data-tab="roleplays">Interactive Roleplay</button>
          <button class="tab ${currentTab === 'pairs' ? 'active' : ''}" data-tab="pairs">Pronunciation Pairs</button>
          <button class="tab ${currentTab === 'twisters' ? 'active' : ''}" data-tab="twisters">Fluency Twisters</button>
        </div>

        <div id="speaking-tab-content"></div>
      </div>
    `;

    // Tab switcher
    document.getElementById('speaking-tabs').addEventListener('click', (e) => {
      if (e.target.classList.contains('tab')) {
        stopRecordingProcess();
        stopAIChatCall();
        currentTab = e.target.dataset.tab;
        renderMainLayout(container);
      }
    });

    // Load active tab
    const contentArea = document.getElementById('speaking-tab-content');
    switch (currentTab) {
      case 'ai_chat': renderAICafeChat(contentArea); break;
      case 'shadow': renderShadowing(contentArea); break;
      case 'roleplays': renderRoleplays(contentArea); break;
      case 'pairs': renderPairs(contentArea); break;
      case 'twisters': renderTwisters(contentArea); break;
    }
  }

  // ─── Module 0: AI Café Voice Companion Chat ────────────────
  
  function renderAICafeChat(container) {
    if (isAIChatActive) {
      renderActiveAIChatLounge(container);
    } else {
      renderAIChatLobby(container);
    }
  }

  function renderAIChatLobby(container) {
    container.innerHTML = `
      <div class="glass-card page-enter text-center" style="max-width: 650px; margin: 20px auto; padding: 40px;">
        <span style="font-size: 72px; display: block; margin-bottom: 20px; animation: float 4s infinite ease-in-out;">🎙️</span>
        <h2 class="gradient-text" style="font-size: 28px; font-weight: 800; margin-bottom: 12px;">AI Tutor Lounge</h2>
        <p class="logo-tagline" style="font-size: 15px; line-height: 1.6; margin-bottom: 30px;">
          Accelerate your English speaking confidence! Enter our premium voice lounge for a **fully hands-free, voice-to-voice conversation** with Sam, your interactive AI tutor. 
          Talk naturally about your career, goals, travel, hobbies, or technology. 
          At the end, receive a comprehensive **AI Evaluation Report** analyzing your grammar, vocabulary, and fluency!
        </p>
        
        <div class="glass-card" style="margin-bottom: 30px; background: rgba(255,255,255,0.03); border: 2px dashed var(--text-primary); text-align: left; padding: 20px 24px;">
          <h4 style="margin-bottom: 8px; font-size: 15px;">💡 Lounge Rules:</h4>
          <ul style="margin-left: 20px; font-size: 13.5px; color: var(--text-secondary); line-height: 1.6; display: flex; flex-direction: column; gap: 4px;">
            <li>Sam will greet you to initiate the voice connection.</li>
            <li>When Sam stops speaking, speak your thoughts immediately.</li>
            <li>No clicking needed—the lounge loop listens and replies hands-free!</li>
            <li>Tap "End Conversation" at any time to calculate your score card.</li>
          </ul>
        </div>

        <button class="btn btn-primary btn-lg" id="start-ai-lounge-btn" style="width: 100%; border: 3px solid var(--text-primary); border-bottom: 7px solid var(--text-primary);">
          🎙️ Start Voice Conversation
        </button>
      </div>
    `;

    document.getElementById('start-ai-lounge-btn').addEventListener('click', () => {
      startAIChatCall(container);
    });
  }

  function renderActiveAIChatLounge(container) {
    let stateLabel = 'Initializing...';
    let stateClass = 'thinking';
    
    const persona = PERSONAS[activePersonaId] || PERSONAS.sam;
    let pulseEmoji = persona.emoji;

    switch (aiChatVoiceState) {
      case 'greeting':
        stateLabel = `${persona.name} is introducing the lounge...`;
        stateClass = 'speaking';
        pulseEmoji = '👋';
        break;
      case 'listening':
        stateLabel = 'Listening... Speak naturally now!';
        stateClass = 'listening';
        pulseEmoji = '🎙️';
        break;
      case 'thinking':
        stateLabel = 'Thinking...';
        stateClass = 'thinking';
        pulseEmoji = '🧠';
        break;
      case 'speaking':
        stateLabel = `${persona.name} is speaking...`;
        stateClass = 'speaking';
        pulseEmoji = persona.emoji;
        break;
    }

    container.innerHTML = `
      <div class="ai-voice-lounge ${stateClass} page-enter" style="max-width: 700px;">
        <div class="ai-companion-card glass-card">
          <div class="speaking-special-badge" style="background: var(--accent-gradient); color:#fff; font-weight:800;">LIVE TUTOR LOUNGE</div>
          
          <div class="ai-companion-sphere-container">
            <div class="ai-pulse-wave"></div>
            <div class="ai-pulse-wave" style="animation-delay: 0.5s;"></div>
            <div class="ai-companion-sphere">
              <span>${pulseEmoji}</span>
            </div>
          </div>

          <h3 style="font-weight: 800; font-size: 20px; color: var(--text-primary); margin-bottom: 2px;">${persona.name}</h3>
          <p style="font-size: 12px; color: var(--text-muted); font-weight: 600; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">${persona.role}</p>
          
          <div style="margin-top: 6px; margin-bottom: 12px; width: 100%; display: flex; justify-content: center; align-items: center; gap: 8px;">
            <label for="voice-persona-select" style="font-size: 13px; font-weight: 700; color: var(--text-secondary);">Companion:</label>
            <select class="select-input" id="voice-persona-select" style="padding: 6px 12px; font-size: 13px; font-weight: 700; border: 2px solid var(--text-primary); border-radius: var(--radius-sm); background: var(--bg-secondary); color: var(--text-primary);" ${aiChatVoiceState === 'speaking' || aiChatVoiceState === 'thinking' ? 'disabled' : ''}>
              ${Object.entries(PERSONAS).map(([id, p]) => `
                <option value="${id}" ${activePersonaId === id ? 'selected' : ''}>${p.emoji} ${p.name} (${p.role})</option>
              `).join('')}
            </select>
          </div>

          <p class="logo-tagline" id="ai-voice-status-indicator" style="font-size:14px; font-weight:700; color: var(--accent-purple); text-transform: uppercase; letter-spacing: 1px;">
            ${stateLabel}
          </p>

          <!-- Waveform Canvas mimicking voice call -->
          <canvas class="waveform-canvas" id="ai-speaking-wave" width="300" height="40" style="margin-top: 16px; border-radius: var(--radius-sm); border: 2px solid var(--text-primary); width: 100%; height: 40px; display: ${aiChatVoiceState === 'listening' ? 'block' : 'none'}"></canvas>
        </div>

        <!-- Scrollable Transcript card -->
        <div class="glass-card" style="padding: 16px;">
          <h4 style="font-size: 14px; margin-bottom: 10px; color: var(--text-secondary); display:flex; justify-content:space-between; align-items:center;">
            <span>Conversation Feed</span>
            <span style="font-size:11px; color:var(--text-muted)">Real-time speech to text</span>
          </h4>
          <div class="ai-chat-transcript-box" id="ai-chat-log-box">
            ${aiChatTurns.length === 0 ? `
              <div style="color: var(--text-muted); font-size: 13px; text-align: center; margin: auto;">
                Conversation started. Waiting for connection...
              </div>
            ` : aiChatTurns.map(t => {
              const name = t.sender === 'user' ? 'YOU' : (PERSONAS[t.personaId || activePersonaId]?.name || 'COMPANION');
              const hasCoach = t.sender === 'ai' && t.coach && (t.coach.correction || t.coach.improved);
              return `
                <div class="ai-chat-bubble ${t.sender}">
                  <div style="font-size: 11px; margin-bottom: 4px; color: ${t.sender === 'user' ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)'}; font-weight:700;">
                    ${name}
                  </div>
                  <div>${Utils.escapeHTML(t.text)}</div>
                  
                  ${hasCoach ? `
                    <div class="glass-card" style="margin-top: 10px; background: rgba(0,0,0,0.25); border-left: 3px solid var(--accent-cyan); padding: 10px 14px; font-size: 12.5px; border-radius: var(--radius-xs); text-align: left;">
                      <div style="font-weight: 700; color: var(--accent-cyan); margin-bottom: 4px; display:flex; align-items:center; gap:4px;">
                        <span>🛠️ Grammar Coach Insights</span>
                      </div>
                      ${t.coach.correction ? `
                        <div style="margin-top:4px;"><strong style="color: var(--error);">Correction:</strong> ${Utils.escapeHTML(t.coach.correction)}</div>
                      ` : ''}
                      ${t.coach.improved ? `
                        <div style="margin-top:4px;"><strong style="color: var(--success);">Alternative:</strong> "${Utils.escapeHTML(t.coach.improved)}"</div>
                      ` : ''}
                      ${t.coach.explanation ? `
                        <div style="margin-top:4px; font-style: italic; color: var(--text-muted); font-size:11.5px;">💡 ${Utils.escapeHTML(t.coach.explanation)}</div>
                      ` : ''}
                    </div>
                  ` : ''}
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Voice Call controllers -->
        <div style="display: grid; grid-template-columns: 1fr 3fr; gap: 12px; margin-top: 8px;">
          <button class="btn btn-secondary" id="ai-mute-toggle-btn" style="border: 3px solid var(--text-primary); border-bottom: 7px solid var(--text-primary); padding: 14px 0;">
            ${isMuted ? '🔇 Unmute' : '🎤 Mute'}
          </button>
          
          <button class="btn btn-danger" id="ai-end-call-btn" style="border: 3px solid var(--text-primary); border-bottom: 7px solid var(--text-primary); color: #fff; background: var(--error); padding: 14px 0; font-weight: 800;">
            🛑 End Conversation & Get Report
          </button>
        </div>
      </div>
    `;

    // Scroll chat log to bottom
    const box = document.getElementById('ai-chat-log-box');
    if (box) box.scrollTop = box.scrollHeight;

    // Attach persona selector handler
    const personaSelect = document.getElementById('voice-persona-select');
    if (personaSelect) {
      personaSelect.addEventListener('change', () => {
        activePersonaId = personaSelect.value;
        stopAIChatCall();
        startAIChatCall(container);
      });
    }

    // Attach controllers
    document.getElementById('ai-mute-toggle-btn').addEventListener('click', () => {
      isMuted = !isMuted;
      if (isMuted) {
        stopListeningLoop();
        aiChatVoiceState = 'idle';
        renderActiveAIChatLounge(container);
        App.showNotification("Microphone muted.", "info");
      } else {
        isMuted = false;
        startListeningLoop(container);
        App.showNotification("Microphone live.", "success");
      }
    });

    document.getElementById('ai-end-call-btn').addEventListener('click', () => {
      evaluateAIChatSession(container);
    });

    // Handle Waveform drawing if listening
    if (aiChatVoiceState === 'listening') {
      const canvas = document.getElementById('ai-speaking-wave');
      if (canvas) startAudioVisualizer(canvas);
    } else {
      stopAudioVisualizer();
    }
  }

  function startAIChatCall(container) {
    if (isAIChatActive) return;
    isAIChatActive = true;
    aiChatTurns = [];
    isMuted = false;
    aiChatVoiceState = 'greeting';

    renderActiveAIChatLounge(container);

    const persona = PERSONAS[activePersonaId] || PERSONAS.sam;
    const greetingText = GeminiAPI.hasKey() ? persona.greeting : `Welcome to the Speaking Lounge! I'm ${persona.name}, your dedicated voice tutor. Since we are in offline mode, we will practice using our built-in high-motivation interactive templates. Let's make sure your English is absolutely unforgettable! What would you like to speak about today?`;
    
    // Add to transcript log
    aiChatTurns.push({ sender: 'ai', text: greetingText, personaId: activePersonaId });
    renderActiveAIChatLounge(container);

    // Speak greeting
    setTimeout(() => {
      speakAIChatText(greetingText, container);
    }, 600);
  }

  function stopAIChatCall() {
    isAIChatActive = false;
    stopListeningLoop();
    stopAudioVisualizer();
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    aiChatVoiceState = 'idle';
  }

  function speakAIChatText(text, container) {
    if (!window.speechSynthesis) {
      App.showNotification('Speech synthesis not supported in this browser.', 'warning');
      return;
    }
    window.speechSynthesis.cancel();

    aiChatVoiceState = 'speaking';
    renderActiveAIChatLounge(container);

    const persona = PERSONAS[activePersonaId] || PERSONAS.sam;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = persona.rate;
    utterance.pitch = persona.pitch;

    const voices = window.speechSynthesis.getVoices();
    const premiumVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural')));
    if (premiumVoice) utterance.voice = premiumVoice;

    utterance.onend = () => {
      if (isAIChatActive && !isMuted) {
        startListeningLoop(container);
      } else {
        aiChatVoiceState = 'idle';
        renderActiveAIChatLounge(container);
      }
    };

    utterance.onerror = () => {
      if (isAIChatActive && !isMuted) {
        startListeningLoop(container);
      } else {
        aiChatVoiceState = 'idle';
        renderActiveAIChatLounge(container);
      }
    };

    window.speechSynthesis.speak(utterance);
  }

  function startListeningLoop(container) {
    if (!isAIChatActive || isMuted) return;
    
    aiChatVoiceState = 'listening';
    renderActiveAIChatLounge(container);

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      App.showNotification('Speech Recognition not supported in this browser. Please use Chrome.', 'error');
      stopAIChatCall();
      return;
    }

    aiSpeechRecognition = new SpeechRecognition();
    aiSpeechRecognition.continuous = false;
    aiSpeechRecognition.lang = 'en-US';
    aiSpeechRecognition.interimResults = false;
    aiSpeechRecognition.maxAlternatives = 1;

    let recognizedResultText = '';

    aiSpeechRecognition.onresult = (event) => {
      if (event.results.length > 0) {
        recognizedResultText = event.results[0][0].transcript;
      }
    };

    aiSpeechRecognition.onerror = (e) => {
      console.log('Voice loop recognition error: ', e.error);
      if (e.error === 'not-allowed') {
        App.showNotification('Microphone access blocked. Enable in settings.', 'error');
        stopAIChatCall();
        renderAIChatLobby(container);
      }
    };

    aiSpeechRecognition.onend = () => {
      if (!isAIChatActive || isMuted) return;

      const trimmedText = recognizedResultText.trim();
      if (trimmedText) {
        // Record user reply
        aiChatTurns.push({ sender: 'user', text: trimmedText });
        aiChatVoiceState = 'thinking';
        renderActiveAIChatLounge(container);

        setTimeout(() => {
          generateAIResponse(trimmedText, container);
        }, 1200);
      } else {
        // No speech detected, quietly loop to keep voice channel warm
        setTimeout(() => {
          startListeningLoop(container);
        }, 800);
      }
    };

    try {
      aiSpeechRecognition.start();
    } catch (err) {}
  }

  function stopListeningLoop() {
    if (aiSpeechRecognition) {
      try {
        aiSpeechRecognition.onend = null;
        aiSpeechRecognition.onerror = null;
        aiSpeechRecognition.stop();
      } catch (e) {}
      aiSpeechRecognition = null;
    }
  }

  async function generateAIResponse(userInput, container) {
    if (!GeminiAPI.hasKey()) {
      generateOfflineResponse(userInput, container);
      return;
    }

    const brain = Storage.getAIBrain();
    const cefr = brain.cefrLevel || 'A2';
    const difficulty = brain.difficultyScore || 25;
    const persona = PERSONAS[activePersonaId] || PERSONAS.sam;
    const isPro = Storage.getSettings().isProModel || false;

    // Build context with history
    const recentTurns = aiChatTurns.slice(-6);
    const historyText = recentTurns.map(t => `${t.sender === 'user' ? 'User' : 'Companion'}: ${t.text}`).join('\n');
    const prompt = `${historyText}\nUser: ${userInput}\nCompanion:`;

    const systemInstruction = `${persona.systemPrompt}
The user is at CEFR level ${cefr} (difficulty score ${difficulty}/100). Keep your reply short (under 50 words), natural, and highly aligned to their CEFR level.

CRITICAL: Return a valid JSON matching this schema:
{
  "reply": "Your direct reply to the user. Do NOT mention corrections here.",
  "grammar_correction": "A friendly correction of any grammatical or spelling slips in the user's last message, or null if it was flawless.",
  "improved_version": "A more natural, native phrasing of what the user just said, or null if excellent.",
  "explanation": "A very brief explanation of the correction or alternative phrasing, or null."
}`;

    const responseSchema = {
      type: "OBJECT",
      properties: {
        reply: { type: "STRING" },
        grammar_correction: { type: "STRING" },
        improved_version: { type: "STRING" },
        explanation: { type: "STRING" }
      },
      required: ["reply"]
    };

    try {
      const response = await GeminiAPI.callGemini(prompt, systemInstruction, responseSchema, isPro);
      
      const reply = response.reply || "I hear you! That's very interesting. Let's keep talking.";
      
      // Update User Brain adaptive tracking
      let successPercent = 100;
      if (response.grammar_correction) {
        successPercent = 50;
        if (!brain.errorHistory) brain.errorHistory = [];
        brain.errorHistory.push({
          said: userInput,
          correction: response.grammar_correction,
          explanation: response.explanation || '',
          date: new Date().toISOString()
        });
        if (brain.errorHistory.length > 20) brain.errorHistory.shift();
        Storage.saveAIBrain(brain);
      }
      
      // Update Adaptive difficulty score in AI Brain
      Storage.updateAIBrainDifficulty(successPercent, 8000, response.grammar_correction ? 1 : 3);

      // Add Companion turn to transcript list, including the grammar coaching metadata
      aiChatTurns.push({
        sender: 'ai',
        text: reply,
        personaId: activePersonaId,
        coach: {
          correction: response.grammar_correction,
          improved: response.improved_version,
          explanation: response.explanation
        }
      });

      renderActiveAIChatLounge(container);
      speakAIChatText(reply, container);

    } catch (err) {
      console.error("Gemini speaking lounge error:", err);
      App.showNotification("Gemini API Error: " + err.message, "error");
      
      // Fallback if API fails mid-lounge
      generateOfflineResponse(userInput, container);
    }
  }

  function generateOfflineResponse(userInput, container) {
    const text = userInput.toLowerCase();
    let reply = "";

    // Keyword matching matrix
    if (text.includes("hello") || text.includes("hi ") || text.includes("hey")) {
      reply = "Hello! It is wonderful to chat with you in our digital tutor lounge today. What are your primary goals for our English session today?";
    } else if (text.includes("learn") || text.includes("study") || text.includes("english") || text.includes("improve")) {
      reply = "Studying a language is one of the most rewarding mental workouts! Consistency is the ultimate key to fluency. What is your favorite time of day to practice speaking?";
    } else if (text.includes("hobby") || text.includes("hobbies") || text.includes("relax")) {
      reply = "That sounds fascinating! Finding great ways to recharge is essential for active learning. What is a hobby that really challenges your creativity?";
    } else if (text.includes("travel") || text.includes("trip") || text.includes("vacation")) {
      reply = "I absolutely adore travel! If you could board a plane and travel to any city or country in the world tomorrow, which destination would you explore first?";
    } else if (text.includes("work") || text.includes("job") || text.includes("career") || text.includes("goal")) {
      reply = "Your career aspirations are inspiring! Having strong English skills opens up incredible global opportunities. Tell me about your dream project or role!";
    } else if (text.includes("weather") || text.includes("rain") || text.includes("sunny")) {
      reply = "The weather can really set the mood for productivity! A quiet, focused day inside is perfect for making massive progress. What is the weather like outside today?";
    } else if (text.includes("thank") || text.includes("nice")) {
      reply = "You are so incredibly welcome! I am having an outstanding time chatting with you. What other ideas or topics should we discuss next?";
    } else {
      const templates = [
        "That is highly interesting! Tell me more about that. How does that shape your perspective on learning?",
        "I completely agree. True success is built on small, consistent steps. What did you accomplish today that you are proud of?",
        "Wow, that is beautiful! Your pronunciation is exceptionally clear. What is one habit you've built recently that changed your workflow?",
        "How wonderful! Sharing insights is the fastest way to grow. Tell me, do you prefer structured study routines or spontaneous real-world practice?"
      ];
      reply = templates[Math.floor(Math.random() * templates.length)];
    }

    aiChatTurns.push({ sender: 'ai', text: reply, personaId: activePersonaId });
    renderActiveAIChatLounge(container);
    speakAIChatText(reply, container);
  }

  function evaluateAIChatSession(container) {
    stopAIChatCall();

    const userTurns = aiChatTurns.filter(t => t.sender === 'user');
    const totalTurns = userTurns.length;

    if (totalTurns === 0) {
      App.showNotification("Call ended. Speak to earn XP and reports!", "info");
      renderAIChatLobby(container);
      return;
    }

    // Heuristic 1: Spoken word count
    let totalWords = 0;
    let allUserSpeechCombined = "";
    userTurns.forEach(turn => {
      allUserSpeechCombined += " " + turn.text;
      const words = turn.text.trim().split(/\s+/).filter(Boolean);
      totalWords += words.length;
    });

    // Heuristic 2: Fluency Score calculation
    let fluencyScore = 30; // base score
    if (totalWords > 5) fluencyScore = 50;
    if (totalWords > 20) fluencyScore = 75;
    if (totalWords > 50) fluencyScore = 88;
    if (totalWords > 100) fluencyScore = 96;

    // Linking words bonus
    const linkingWords = ['because', 'although', 'however', 'therefore', 'but', 'and', 'so', 'besides', 'actually'];
    let linkWordMatches = 0;
    linkingWords.forEach(w => {
      if (allUserSpeechCombined.toLowerCase().includes(w)) {
        linkWordMatches++;
        fluencyScore = Math.min(100, fluencyScore + 3);
      }
    });

    // Heuristic 3: Vocabulary variety & richness
    const vocabList = APP_DATA.VOCABULARY;
    const usedAdvancedWords = [];
    vocabList.forEach(item => {
      const regex = new RegExp('\\b' + item.word.toLowerCase() + '\\b', 'i');
      if (regex.test(allUserSpeechCombined)) {
        usedAdvancedWords.push(item.word);
      }
    });

    let vocabScore = Math.min(100, 40 + (usedAdvancedWords.length * 15) + Math.round(totalWords / 2.5));

    // Heuristic 4: Grammar scan corrections
    const grammarErrors = parseGrammarErrors(allUserSpeechCombined);

    renderAIEvaluationReport(container, {
      totalTurns,
      totalWords,
      fluencyScore,
      vocabScore,
      usedAdvancedWords,
      grammarErrors
    });
  }

  function parseGrammarErrors(text) {
    const cleanText = text.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, " ");
    const errors = [];

    // Rule A: Subject-verb agreement mismatches
    if (/\b(he|she|it) (want|go|like|need|have)\b/i.test(cleanText)) {
      errors.push({
        said: "...he/she/it want/go/like...",
        correction: "...he/she/it wants/goes/likes...",
        explanation: "In the third person singular, present simple verbs require an '-s' or '-es' suffix."
      });
    }

    if (/\b(they|we|you) is\b/i.test(cleanText)) {
      errors.push({
        said: "...you/we/they is...",
        correction: "...you/we/they are...",
        explanation: "Plural subject pronouns require plural auxiliary verbs ('are')."
      });
    }

    if (/\bi (goes|wants|likes|needs|has)\b/i.test(cleanText)) {
      errors.push({
        said: "...I goes/wants/likes/has...",
        correction: "...I go/want/like/have...",
        explanation: "First person pronoun 'I' takes plural form verbs without '-s' inside present simple tenses."
      });
    }

    // Rule B: Double negatives
    if (/\b(don't|doesn't) (have|got) no\b/i.test(cleanText)) {
      errors.push({
        said: "...don't have no / don't got no...",
        correction: "...don't have any / have no...",
        explanation: "Avoid double negatives in standard English as they grammatically cancel each other out."
      });
    }

    // Rule C: Wrong past tense adverb triggers
    if (/\byesterday i (go|speak|see|take|run|am)\b/i.test(cleanText)) {
      errors.push({
        said: "...yesterday I go/speak/see...",
        correction: "...yesterday I went/spoke/saw...",
        explanation: "The time indicator 'yesterday' forces the verb into the completed Past Simple tense."
      });
    }
    if (/\blast week i (go|speak|see|take|run|am)\b/i.test(cleanText)) {
      errors.push({
        said: "...last week I go/speak/see...",
        correction: "...last week I went/spoke/saw...",
        explanation: "Past tense time markers ('last week') require the use of completed past verbs."
      });
    }

    // Rule D: Infinitive bare particles after did
    if (/\bdid (went|spoke|saw|took|ran)\b/i.test(cleanText)) {
      errors.push({
        said: "...did went/spoke/saw...",
        correction: "...did go/speak/see...",
        explanation: "After the auxiliary 'did', the main verb must drop to its base infinitive form."
      });
    }

    // Rule E: Missing copulas
    if (/\bi going to\b/i.test(cleanText)) {
      errors.push({
        said: "...I going to...",
        correction: "...I am going to...",
        explanation: "Present continuous construction requires 'be' auxiliary preceding present participles."
      });
    }
    if (/\b(he|she) going to\b/i.test(cleanText)) {
      errors.push({
        said: "...he/she going to...",
        correction: "...he/she is going to...",
        explanation: "Requires verb 'is' preceding the participle for correct continuous grammar."
      });
    }

    return errors;
  }

  function renderAIEvaluationReport(container, data) {
    Utils.playBeep(true);

    // Calculate XP reward
    const xpReward = Math.min(40, data.totalTurns * 8);
    Storage.addXP(xpReward);
    Storage.addActivity({ type: 'word_learned', description: `Completed AI Tutor Lounge session (+${data.totalTurns} turns)`, xp: xpReward });
    App.updateSidebarXP();

    // Unlock achievement
    if (data.totalTurns >= 5) {
      Storage.unlockAchievement('streak_3'); // Or any speaking achievements
    }

    container.innerHTML = `
      <div class="page-enter text-center" style="max-width: 750px; margin: 0 auto;">
        <span style="font-size: 64px; display:block; margin-bottom:10px;">📊</span>
        <h2 class="gradient-text" style="font-size:32px; font-weight:900;">AI Speaking Assessment</h2>
        <p class="logo-tagline" style="margin-bottom: 30px;">Sam's professional assessment of your conversational fluency</p>

        <div class="report-grid">
          <div class="glass-card report-gauge-card">
            <div class="report-gauge-score">${data.fluencyScore}%</div>
            <div class="report-gauge-label">Fluency Score</div>
          </div>
          
          <div class="glass-card report-gauge-card" style="border-color: var(--accent-cyan) !important;">
            <div class="report-gauge-score" style="color:var(--accent-cyan)">${data.vocabScore}%</div>
            <div class="report-gauge-label">Vocab variety</div>
          </div>

          <div class="glass-card report-gauge-card" style="border-color: var(--success) !important;">
            <div class="report-gauge-score" style="color:var(--success)">${data.totalWords}</div>
            <div class="report-gauge-label">Words Spoken</div>
          </div>

          <div class="glass-card report-gauge-card" style="border-color: var(--warning) !important;">
            <div class="report-gauge-score" style="color:var(--warning)">+${xpReward}</div>
            <div class="report-gauge-label">XP Earned</div>
          </div>
        </div>

        <!-- Used Advanced words block -->
        <div class="glass-card" style="text-align: left; padding: 24px; margin-bottom: 20px;">
          <h4 style="font-size:16px; margin-bottom:8px; color:var(--text-primary);">💡 Vocabulary Highlights</h4>
          ${data.usedAdvancedWords.length === 0 ? `
            <p style="font-size:13.5px; color: var(--text-secondary); font-style:italic;">
              No advanced vocabulary words from our curriculum were used in this conversation. Try using words like **Resilient**, **Meticulous**, or **Pragmatic** next time to gain major bonuses!
            </p>
          ` : `
            <p style="font-size:13.5px; color: var(--text-secondary); margin-bottom:12px;">
              Superb job! You successfully used advanced curriculum vocabulary in your natural speech:
            </p>
            <div style="display:flex; gap:8px; flex-wrap:wrap;">
              ${data.usedAdvancedWords.map(w => `
                <span class="badge badge-beginner" style="font-size:12px; background:rgba(6,182,212,0.1); color:var(--accent-cyan); border:1px solid var(--accent-cyan);">${w}</span>
              `).join('')}
            </div>
          `}
        </div>

        <!-- Grammatical Corrections block -->
        <div class="glass-card" style="text-align: left; padding: 24px; margin-bottom: 30px;">
          <h4 style="font-size:16px; margin-bottom:8px; color:var(--text-primary);">🛠️ Grammar Checklist & Coach</h4>
          
          ${data.grammarErrors.length === 0 ? `
            <div style="text-align:center; padding: 15px 0;">
              <span style="font-size:36px; display:block; margin-bottom:6px;">🎉</span>
              <strong style="color:var(--success); display:block; font-size:15px;">Grammar Flawless!</strong>
              <p style="font-size:13px; color: var(--text-secondary); margin-top:4px;">No standard grammatical slips were detected in your speech. Truly fantastic!</p>
            </div>
          ` : `
            <p style="font-size:13.5px; color: var(--text-secondary); margin-bottom:15px;">
              Our AI speaking coach parsed your voice transcript and flagged the following slips. Review them to build perfect habits:
            </p>
            <div class="report-checklist">
              ${data.grammarErrors.map(err => `
                <div class="report-checklist-item">
                  <span style="font-size: 20px; color: var(--error)">⚠️</span>
                  <div class="report-correction-bubble">
                    <div style="font-size: 13.5px; font-weight:700;">
                      <span style="color:var(--error); text-decoration:line-through; margin-right:8px;">You said: "${err.said}"</span>
                      <span style="color:var(--success)">Correction: "${err.correction}"</span>
                    </div>
                    <p style="font-size:12.5px; color:var(--text-secondary); margin-top:4px; font-weight:500;">
                      💡 <em>${err.explanation}</em>
                    </p>
                  </div>
                </div>
              `).join('')}
            </div>
          `}
        </div>

        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px;">
          <button class="btn btn-secondary btn-lg" id="ai-report-lobby-btn" style="border: 3px solid var(--text-primary); border-bottom: 7px solid var(--text-primary); width:100%;">
            Exit Lounge
          </button>
          <button class="btn btn-primary btn-lg" id="ai-report-retry-btn" style="border: 3px solid var(--text-primary); border-bottom: 7px solid var(--text-primary); width:100%;">
            🎙️ Start New Chat
          </button>
        </div>
      </div>
    `;

    document.getElementById('ai-report-lobby-btn').addEventListener('click', () => {
      renderAIChatLobby(container);
    });

    document.getElementById('ai-report-retry-btn').addEventListener('click', () => {
      startAIChatCall(container);
    });
  }

  // ─── Module 1: Shadowing Arena ────────────────────────────

  // ─── Module 1: Shadowing Arena ────────────────────────────

  function renderShadowing(container) {
    const data = APP_DATA.SPEAKING_DRILLS.shadowingSentences;
    
    container.innerHTML = `
      <div class="speaking-grid shadow-arena">
        <div class="glass-card shadow-sentence-list">
          <h3 class="section-title" style="margin-top:0">Select a Practice Phrase</h3>
          <div class="word-list">
            ${data.map((s, idx) => `
              <div class="word-item glass-card shadowing-phrase-item" data-phrase-id="${s.id}" style="padding: 16px;">
                <div class="word-main" style="width: auto;">
                  <div class="word-text" style="font-size:15px">${s.text}</div>
                  <div class="word-pos" style="margin-top:4px">${s.context}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="glass-card shadow-workout-area">
          <div id="active-shadowing-drill">
            <div class="empty-state-small" style="padding: 60px 0;">
              <span style="font-size: 40px">👈</span>
              <p style="margin-top: 10px;">Select a phrase on the left to start shadowing!</p>
            </div>
          </div>
        </div>
      </div>
    `;

    // Click phrase to open practice panel
    container.querySelectorAll('.shadowing-phrase-item').forEach(item => {
      item.addEventListener('click', () => {
        const s = data.find(p => p.id === item.dataset.phraseId);
        openShadowingDrill(s, document.getElementById('active-shadowing-drill'));
      });
    });
  }

  function openShadowingDrill(phrase, container) {
    stopRecordingProcess();
    activeSpeechTarget = phrase.text;

    container.innerHTML = `
      <div class="animate-fade-in text-center" style="display:flex; flex-direction:column; align-items:center;">
        <span class="badge badge-intermediate" style="margin-bottom:12px;">${phrase.context}</span>
        
        <div class="pronunciation-box glass-card" style="width:100%; border-color: rgba(6, 182, 212, 0.2); background: rgba(8,11,32,0.5);">
          <div class="prompt-text" id="target-phrase-display">${phrase.text}</div>
          <span class="prompt-ipa">${phrase.ipa}</span>
          <button class="btn btn-secondary btn-sm" id="tts-speak-btn" style="margin-top: 16px;">
            🔊 Listen to Pronunciation
          </button>
        </div>

        <!-- Recording Viewport -->
        <div class="mic-viewport" id="speak-viewport-card" style="width: 100%;">
          <div class="mic-btn-outer">
            <div class="mic-pulse-ring"></div>
            <button class="mic-btn-main" id="shadow-mic-btn">🎙️</button>
          </div>
          <div class="mic-status-label" id="shadow-mic-status">Tap Microphone to Speak</div>
          <canvas class="waveform-canvas" id="speaking-wave" width="400" height="60"></canvas>
          <div class="realtime-transcription" id="shadow-live-transcript"></div>
        </div>

        <!-- Results Display -->
        <div class="comparison-results" id="shadow-results-card" style="display:none; width: 100%;">
          <div class="glass-card">
            <h4>Accuracy Score</h4>
            <div class="accuracy-badge-container">
              <div class="accuracy-gauge" id="shadow-accuracy-gauge">0%</div>
            </div>
            <div class="comparison-words" id="shadow-comparison-highlight" style="margin-top:20px;"></div>
            <p class="realtime-transcription" id="shadow-final-transcript" style="margin-top:20px; font-weight: 500;"></p>
          </div>
        </div>
      </div>
    `;

    // Event: Listen to speech
    document.getElementById('tts-speak-btn').addEventListener('click', () => {
      speakText(phrase.text);
    });

    const micBtn = document.getElementById('shadow-mic-btn');
    const statusText = document.getElementById('shadow-mic-status');
    const liveTranscript = document.getElementById('shadow-live-transcript');

    micBtn.addEventListener('click', () => {
      if (isRecording) {
        stopRecordingProcess();
      } else {
        document.getElementById('shadow-results-card').style.display = 'none';
        statusText.textContent = 'Listening... Speak now!';
        liveTranscript.textContent = '';

        startRecordingProcess(
          phrase.text,
          (text, isFinal) => {
            liveTranscript.textContent = `"${text}"`;
          },
          () => {
            statusText.textContent = 'Processing pronunciation...';
            setTimeout(() => {
              displayShadowResults(phrase.text, recordedTranscript);
            }, 600);
          }
        );
      }
    });
  }

  function displayShadowResults(target, spoken) {
    const statusText = document.getElementById('shadow-mic-status');
    statusText.textContent = 'Review your results below!';

    const { accuracy, wordResults } = evaluatePronunciation(target, spoken);
    
    // XP rewards
    let xpReward = 0;
    if (accuracy >= 90) xpReward = 15;
    else if (accuracy >= 70) xpReward = 10;
    else if (accuracy >= 40) xpReward = 5;

    if (xpReward > 0) {
      const result = Storage.addXP(xpReward);
      App.showNotification(`+${xpReward} XP for speaking! Accuracy: ${accuracy}%`, 'success');
      Storage.addActivity({ type: 'word_learned', description: `Achieved ${accuracy}% speaking shadowing accuracy`, xp: xpReward });
      App.updateSidebarXP();
    }

    Utils.playBeep(accuracy >= 70);

    // Show panel
    const resultsPanel = document.getElementById('shadow-results-card');
    resultsPanel.style.display = 'block';

    // Update gauge class
    const gauge = document.getElementById('shadow-accuracy-gauge');
    gauge.textContent = `${accuracy}% Match`;
    gauge.className = 'accuracy-gauge';
    if (accuracy >= 85) gauge.classList.add('high');
    else if (accuracy >= 60) gauge.classList.add('med');
    else gauge.classList.add('low');

    // Display highlighted differences
    const highlightBox = document.getElementById('shadow-comparison-highlight');
    highlightBox.innerHTML = wordResults.map(w => `
      <span class="comparison-word ${w.matched ? 'match' : 'mismatch'}">${Utils.escapeHTML(w.word)}</span>
    `).join('');

    document.getElementById('shadow-final-transcript').innerHTML = `
      <span style="color:var(--text-muted)">You spoke:</span> "${Utils.escapeHTML(spoken) || '(...No speech recognized...)'}"
    `;
  }

  // ─── Module 2: Interactive Roleplays ──────────────────────

  function renderRoleplays(container) {
    const roleplays = APP_DATA.SPEAKING_DRILLS.roleplays;
    
    if (activeRoleplayId === null) {
      container.innerHTML = `
        <div class="speaking-grid">
          ${roleplays.map(r => `
            <div class="glass-card speaking-special-card">
              <span class="speaking-special-badge">Interactive Roleplay</span>
              <div class="category-icon" style="margin-top:10px">${r.avatar}</div>
              <div class="speaking-special-title">${r.title}</div>
              <p class="logo-tagline" style="margin-bottom:20px; min-height: 40px;">${r.description}</p>
              <button class="btn btn-primary start-roleplay-btn" data-rp-id="${r.id}">
                🎙️ Start Scenario
              </button>
            </div>
          `).join('')}
        </div>
      `;

      container.querySelectorAll('.start-roleplay-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          activeRoleplayId = btn.dataset.rpId;
          const rp = roleplays.find(r => r.id === activeRoleplayId);
          startRoleplaySession(rp, container);
        });
      });
    }
  }

  function startRoleplaySession(rp, container) {
    roleplayIndex = 0;
    roleplayDialogues = [];
    renderActiveRoleplayPanel(rp, container);
  }

  function renderActiveRoleplayPanel(rp, container) {
    container.innerHTML = `
      <div class="page-enter" style="max-width:800px; margin:0 auto;">
        <div class="page-header-row" style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 24px;">
          <button class="btn btn-secondary btn-sm" id="exit-roleplay-btn">← Exit Scenario</button>
          <h2 class="gradient-text" style="font-size:20px; font-weight:800">${rp.title}</h2>
          <span class="badge badge-beginner">Turn ${roleplayIndex + 1} of ${rp.turns.length}</span>
        </div>

        <div class="glass-card roleplay-chat-box" style="margin-bottom:24px; min-height: 250px; max-height: 400px; overflow-y: auto; padding: 24px;">
          <div class="roleplay-container" id="chat-history-list"></div>
        </div>

        <!-- Roleplay Input Controller -->
        <div class="glass-card" id="roleplay-controller-card" style="border-color: rgba(6,182,212,0.2);">
          <div id="rp-prompt-box" style="margin-bottom: 16px; font-weight:500;">
            <p class="logo-tagline" style="margin-bottom:6px;">Your response prompt:</p>
            <div class="prompt-text" style="font-size: 18px;" id="rp-target-prompt"></div>
          </div>

          <div class="mic-viewport" id="speak-viewport-card" style="padding:20px 0; margin-bottom:0;">
            <div class="mic-btn-outer" style="width:70px; height:70px; margin-bottom:10px;">
              <div class="mic-pulse-ring" style="inset:-10px;"></div>
              <button class="mic-btn-main" id="roleplay-mic-btn" style="font-size:24px;">🎙️</button>
            </div>
            <div class="mic-status-label" id="roleplay-mic-status" style="font-size:14px;">Tap Microphone & Speak Prompt</div>
            <canvas class="waveform-canvas" id="speaking-wave" width="300" height="40" style="height:40px;"></canvas>
            <div class="realtime-transcription" id="roleplay-live-transcript" style="font-size:13px;"></div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('exit-roleplay-btn').addEventListener('click', () => {
      activeRoleplayId = null;
      if (state.activeMilestoneTask) {
        state.activeMilestoneTask = null;
        App.navigate('#dashboard');
      } else {
        App.navigate('#speaking');
      }
    });

    // Load conversation history up to current state
    const activeTurn = rp.turns[roleplayIndex];
    
    // Inject bot dialog first
    roleplayDialogues.push({ speaker: rp.barista, avatar: rp.avatar, text: activeTurn.audioText, bot: true });
    updateRoleplayChatLog();

    // Automatic TTS speak for the bot
    setTimeout(() => {
      speakText(activeTurn.audioText);
    }, 500);

    // Setup active speaking parameters
    document.getElementById('rp-target-prompt').textContent = activeTurn.userPrompt;

    const micBtn = document.getElementById('roleplay-mic-btn');
    const statusText = document.getElementById('roleplay-mic-status');
    const liveTranscript = document.getElementById('roleplay-live-transcript');

    micBtn.addEventListener('click', () => {
      if (isRecording) {
        stopRecordingProcess();
      } else {
        statusText.textContent = `Listening... Answer ${rp.barista} now!`;
        liveTranscript.textContent = '';

        startRecordingProcess(
          activeTurn.userPrompt,
          (text) => {
            liveTranscript.textContent = `"${text}"`;
          },
          () => {
            statusText.textContent = 'Processing speech accuracy...';
            setTimeout(() => {
              evaluateRoleplayTurn(rp, activeTurn, recordedTranscript, container);
            }, 600);
          }
        );
      }
    });
  }

  function evaluateRoleplayTurn(rp, turn, spoken, container) {
    const { accuracy } = evaluatePronunciation(turn.userPrompt, spoken);
    
    // Show user response in chat bubble
    roleplayDialogues.push({ speaker: 'You', avatar: '🗣️', text: spoken || turn.userPrompt, bot: false, accuracy });
    updateRoleplayChatLog();

    // Reward XP
    const xpReward = Math.max(5, Math.round(accuracy / 10) + 5);
    Storage.addXP(xpReward);
    App.updateSidebarXP();

    Utils.playBeep(accuracy >= 55);

    // Check active milestone turn limit
    const task = state.activeMilestoneTask;
    if (task && task.type === 'speaking_roleplay' && task.turnLimit && roleplayIndex >= task.turnLimit - 1) {
      setTimeout(() => {
        triggerScenarioCompleted(rp, container);
      }, 2000);
      return;
    }

    // Go to next turn or finish
    if (roleplayIndex < rp.turns.length - 1) {
      roleplayIndex++;
      setTimeout(() => {
        renderActiveRoleplayPanel(rp, container);
      }, 2500);
    } else {
      // Completed the full conversation!
      setTimeout(() => {
        triggerScenarioCompleted(rp, container);
      }, 2000);
    }
  }

  function triggerScenarioCompleted(rp, container) {
    Utils.playBeep(true);
    Storage.unlockAchievement('roleplay_complete');
    Storage.addActivity({ type: 'roleplay_completed', description: `Completed roleplay scenario: ${rp.title}`, xp: 30 });
    const result = Storage.addXP(30);

    container.innerHTML = `
      <div class="glass-card quiz-result page-enter" style="max-width:550px;">
        <span style="font-size: 64px">🎉</span>
        <h2 class="gradient-text" style="font-size:28px; font-weight:800; margin-top:10px;">Scenario Complete!</h2>
        <p class="logo-tagline" style="margin-bottom:20px;">You navigated the conversation successfully with the ${rp.barista}.</p>
        
        <div class="quiz-score-circle" style="border-top-color: var(--accent-cyan);">
          <div class="quiz-score-text">+30 XP</div>
          <div class="quiz-score-label">Speaking Bonus</div>
        </div>

        <button class="btn btn-primary" id="rp-finish-close-btn" style="width:100%; margin-top:20px;">
          Return to Studio Dashboard
        </button>
      </div>
    `;

    document.getElementById('rp-finish-close-btn').addEventListener('click', () => {
      activeRoleplayId = null;
      if (state.activeMilestoneTask) {
        const taskId = state.activeMilestoneTask.id;
        Storage.completeMilestone(taskId);
        state.activeMilestoneTask = null;
        App.navigate('#dashboard');
      } else {
        App.navigate('#speaking');
      }
    });
  }

  function updateRoleplayChatLog() {
    const list = document.getElementById('chat-history-list');
    if (!list) return;

    list.innerHTML = roleplayDialogues.map(d => `
      <div class="roleplay-bubble ${d.bot ? 'bot' : 'user'}">
        <div class="roleplay-avatar">${d.avatar}</div>
        <div class="roleplay-content-card glass-card" style="box-shadow:none;">
          <strong style="display:block; font-size:12px; margin-bottom:4px; color:var(--text-muted)">${Utils.escapeHTML(d.speaker)}</strong>
          <div>${Utils.escapeHTML(d.text)}</div>
          
          ${d.bot ? `
            <button class="roleplay-audio-btn" onclick="speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance('${Utils.escapeHTML(d.text).replace(/'/g, "\\'")}'); u.lang='en-US'; speechSynthesis.speak(u);">
              🔊 Read Aloud
            </button>
          ` : `
            ${d.accuracy !== undefined ? `
              <span class="badge ${d.accuracy >= 80 ? 'badge-beginner' : d.accuracy >= 50 ? 'badge-intermediate' : 'badge-advanced'}" style="margin-top:6px; display:inline-block;">
                Accuracy: ${d.accuracy}%
              </span>
            ` : ''}
          `}
        </div>
      </div>
    `).join('');

    // Scroll to bottom
    const box = document.querySelector('.roleplay-chat-box');
    if (box) box.scrollTop = box.scrollHeight;
  }

  // ─── Module 3: Minimal Pronunciation Pairs ────────────────

  function renderPairs(container) {
    const data = APP_DATA.SPEAKING_DRILLS.minimalPairs;
    
    container.innerHTML = `
      <div class="page-enter">
        <div class="minimal-pairs-grid">
          ${data.map(p => `
            <div class="glass-card pair-card">
              <span class="badge badge-beginner" style="align-self: flex-start;">${p.focus}</span>
              
              <div class="pair-words-row">
                <div class="pair-word-box voice-tts-trigger" data-text="${p.word1}">
                  <div class="pair-word-text gradient-text">${p.word1}</div>
                  <div class="pair-word-ipa">${p.ipa1}</div>
                </div>
                <div class="pair-word-box voice-tts-trigger" data-text="${p.word2}">
                  <div class="pair-word-text" style="color:var(--accent-cyan)">${p.word2}</div>
                  <div class="pair-word-ipa">${p.ipa2}</div>
                </div>
              </div>

              <div class="pair-card-meta">
                <strong>Focus:</strong> Pronunciation difference of sounds.
                <div class="pair-tip">💡 ${p.tip}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Click words to play pronunciation
    container.querySelectorAll('.voice-tts-trigger').forEach(card => {
      card.addEventListener('click', () => {
        speakText(card.dataset.text);
      });
    });
  }

  // ─── Module 4: Tongue Twisters ────────────────────────────

  function renderTwisters(container) {
    const data = APP_DATA.SPEAKING_DRILLS.tongueTwisters;

    container.innerHTML = `
      <div class="speaking-grid shadow-arena">
        <div class="glass-card shadow-sentence-list">
          <h3 class="section-title" style="margin-top:0">Tongue Twister Drills</h3>
          <div class="word-list">
            ${data.map((tt, idx) => `
              <div class="word-item glass-card tt-item" data-tt-id="${tt.id}" style="padding: 16px;">
                <div class="word-main" style="width: auto;">
                  <div class="word-text" style="font-size:15px">${tt.title}</div>
                  <div class="word-pos" style="margin-top:4px; color:var(--accent-cyan); text-transform:none;">Difficulty: ${tt.difficulty}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="glass-card shadow-workout-area">
          <div id="active-tt-drill">
            <div class="empty-state-small" style="padding: 60px 0;">
              <span style="font-size: 40px">⚡</span>
              <p style="margin-top: 10px;">Select a tongue twister on the left to start the speed test!</p>
            </div>
          </div>
        </div>
      </div>
    `;

    container.querySelectorAll('.tt-item').forEach(item => {
      item.addEventListener('click', () => {
        const tt = data.find(p => p.id === item.dataset.ttId);
        openTwisterDrill(tt, document.getElementById('active-tt-drill'));
      });
    });
  }

  function openTwisterDrill(tt, container) {
    stopRecordingProcess();
    activeSpeechTarget = tt.text;

    container.innerHTML = `
      <div class="animate-fade-in text-center" style="display:flex; flex-direction:column; align-items:center;">
        <span class="badge badge-advanced" style="margin-bottom:12px;">Difficulty: ${tt.difficulty}</span>
        
        <div class="pronunciation-box glass-card" style="width:100%; border-color: rgba(245,158,11,0.2); background: rgba(8,11,32,0.5);">
          <div class="prompt-text" style="font-size: 20px;" id="tt-target-text">${tt.text}</div>
          <button class="btn btn-secondary btn-sm" id="tt-tts-btn" style="margin-top: 16px;">
            🔊 Slow Pronunciation
          </button>
        </div>

        <p class="logo-tagline" style="margin-bottom:16px;">💡 <em>Tip: ${tt.tip}</em></p>

        <!-- Recording Area -->
        <div class="mic-viewport" id="speak-viewport-card" style="width: 100%;">
          <div class="mic-btn-outer">
            <div class="mic-pulse-ring"></div>
            <button class="mic-btn-main" id="tt-mic-btn" style="background:var(--accent-gradient)">🎙️</button>
          </div>
          <div class="mic-status-label" id="tt-mic-status">Tap to Record Speed Drill</div>
          <canvas class="waveform-canvas" id="speaking-wave" width="400" height="60"></canvas>
          <div class="realtime-transcription" id="tt-live-transcript"></div>
        </div>

        <!-- Results Display -->
        <div class="comparison-results" id="tt-results-card" style="display:none; width: 100%;">
          <div class="glass-card">
            <h4>Precision Result</h4>
            <div class="accuracy-badge-container">
              <div class="accuracy-gauge" id="tt-accuracy-gauge">0%</div>
            </div>
            <div class="comparison-words" id="tt-comparison-highlight" style="margin-top:20px;"></div>
            <p class="realtime-transcription" id="tt-final-transcript" style="margin-top:20px; font-weight:500;"></p>
          </div>
        </div>
      </div>
    `;

    document.getElementById('tt-tts-btn').addEventListener('click', () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(tt.text);
        u.lang = 'en-US';
        u.rate = 0.8; // Speak slowly
        window.speechSynthesis.speak(u);
      }
    });

    const micBtn = document.getElementById('tt-mic-btn');
    const statusText = document.getElementById('tt-mic-status');
    const liveTranscript = document.getElementById('tt-live-transcript');

    micBtn.addEventListener('click', () => {
      if (isRecording) {
        stopRecordingProcess();
      } else {
        document.getElementById('tt-results-card').style.display = 'none';
        statusText.textContent = 'Speak rapidly!';
        liveTranscript.textContent = '';

        startRecordingProcess(
          tt.text,
          (text) => {
            liveTranscript.textContent = `"${text}"`;
          },
          () => {
            statusText.textContent = 'Processing speed precision...';
            setTimeout(() => {
              displayTwisterResults(tt.text, recordedTranscript);
            }, 600);
          }
        );
      }
    });
  }

  function displayTwisterResults(target, spoken) {
    const statusText = document.getElementById('tt-mic-status');
    statusText.textContent = 'Speed test evaluated!';

    const { accuracy, wordResults } = evaluatePronunciation(target, spoken);
    
    // Reward XP
    let xpReward = 0;
    if (accuracy >= 80) xpReward = 20;
    else if (accuracy >= 50) xpReward = 10;
    
    if (xpReward > 0) {
      Storage.addXP(xpReward);
      App.showNotification(`+${xpReward} XP earned! Fluency Score: ${accuracy}%`, 'success');
      Storage.addActivity({ type: 'word_learned', description: `Achieved ${accuracy}% fluency in tongue twister`, xp: xpReward });
      App.updateSidebarXP();
    }

    Utils.playBeep(accuracy >= 60);

    const results = document.getElementById('tt-results-card');
    results.style.display = 'block';

    const gauge = document.getElementById('tt-accuracy-gauge');
    gauge.textContent = `${accuracy}% Fluency`;
    gauge.className = 'accuracy-gauge';
    if (accuracy >= 80) gauge.classList.add('high');
    else if (accuracy >= 50) gauge.classList.add('med');
    else gauge.classList.add('low');

    const highlightBox = document.getElementById('tt-comparison-highlight');
    highlightBox.innerHTML = wordResults.map(w => `
      <span class="comparison-word ${w.matched ? 'match' : 'mismatch'}">${Utils.escapeHTML(w.word)}</span>
    `).join('');

    document.getElementById('tt-final-transcript').innerHTML = `
      <span style="color:var(--text-muted)">You pronounced:</span> "${Utils.escapeHTML(spoken) || '(...No voice recognized...)'}"
    `;

    if (state.activeMilestoneTask && state.activeMilestoneTask.type === 'speaking_drills' && accuracy >= 50) {
      // Add milestone complete button
      const actionBtn = document.createElement('button');
      actionBtn.className = 'btn btn-primary';
      actionBtn.style.width = '100%';
      actionBtn.style.marginTop = '20px';
      actionBtn.id = 'tt-milestone-complete-btn';
      actionBtn.textContent = 'Complete Milestone ✓';
      
      const existing = document.getElementById('tt-milestone-complete-btn');
      if (existing) existing.remove();
      
      document.querySelector('#tt-results-card .glass-card').appendChild(actionBtn);
      
      actionBtn.addEventListener('click', () => {
        const taskId = state.activeMilestoneTask.id;
        Storage.completeMilestone(taskId);
        state.activeMilestoneTask = null;
        App.navigate('#dashboard');
      });
    }
  }

  export const SpeakingModule = { render };
