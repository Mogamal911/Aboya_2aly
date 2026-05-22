import { Storage } from './storage.js';

  // High-performance HTML Sanitizer to prevent XSS
  function escapeHTML(str) {
    if (str === null || str === undefined) return '';
    return String(str).replace(/[&<>"']/g, function(match) {
      const escapeMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      };
      return escapeMap[match] || match;
    });
  }

  // standard debouncer to rate-limit inputs (like search query triggers)
  function debounce(fn, delay) {
    let timeoutId;
    return function(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  // Unified beeper
  function playBeep(success) {
    if (!Storage || !Storage.getSettings().soundEffects) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      if (success) {
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else {
        osc.frequency.setValueAtTime(220, ctx.currentTime); // A3
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      }
    } catch(e) {}
  }

  // Unified chime chord for achievements & milestones
  function playSoundChime(success) {
    if (!Storage || !Storage.getSettings().soundEffects) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      if (success) {
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08); // E5
        osc.frequency.setValueAtTime(880.00, ctx.currentTime + 0.16); // A5
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      } else {
        osc.frequency.setValueAtTime(261.63, ctx.currentTime); // C4
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      }
    } catch(e) {}
  }

  // Premium Custom HTML5 Canvas Confetti Particle System
  function celebrateConfetti() {
    try {
      const canvas = document.createElement('canvas');
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
      canvas.style.zIndex = '99999';
      canvas.style.pointerEvents = 'none';
      document.body.appendChild(canvas);
      
      const ctx = canvas.getContext('2d');
      let width = canvas.width = window.innerWidth;
      let height = canvas.height = window.innerHeight;
      
      const handleResize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      };
      
      window.addEventListener('resize', handleResize);
      
      // Cozy coffee-caramel palette colors
      const colors = ['#D27C2C', '#E5A93C', '#FFF3E3', '#4E3629', '#52B788'];
      const particles = [];
      const particleCount = 100;
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * -height - 20,
          r: Math.random() * 5 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          tilt: Math.random() * 10 - 5,
          tiltAngleIncremental: Math.random() * 0.08 + 0.02,
          tiltAngle: Math.random() * Math.PI,
          speed: Math.random() * 3 + 2.5
        });
      }
      
      let animationId;
      function draw() {
        ctx.clearRect(0, 0, width, height);
        let remaining = false;
        
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.tiltAngle += p.tiltAngleIncremental;
          p.y += p.speed;
          p.x += Math.sin(p.tiltAngle) * 0.6;
          p.tilt = Math.sin(p.tiltAngle) * 12;
          
          if (p.y < height + 20) {
            remaining = true;
            ctx.beginPath();
            ctx.lineWidth = p.r;
            ctx.strokeStyle = p.color;
            ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
            ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
            ctx.stroke();
          }
        }
        
        if (remaining) {
          animationId = requestAnimationFrame(draw);
        } else {
          cancelAnimationFrame(animationId);
          window.removeEventListener('resize', handleResize);
          canvas.remove();
        }
      }
      
      draw();
    } catch (e) {
      console.error("Confetti error:", e);
    }
  }

  // Public API
  export const Utils = {
    escapeHTML,
    debounce,
    playBeep,
    playSoundChime,
    celebrateConfetti
  };
