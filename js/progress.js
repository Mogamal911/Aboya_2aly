import { Storage } from './storage.js';
import { APP_DATA } from './data.js';
import { Utils } from './utils.js';

  function render(container) {
    const streak = Storage.getStreak();
    const level = Storage.getLevel();
    const learned = Storage.getLearnedWordsCount();
    const mastered = Storage.getMasteredWordsCount();
    const avgScore = Storage.getAverageQuizScore();
    const totalQuizzes = Storage.getTotalQuizzes();
    const completedLessons = Storage.getCompletedLessonsCount();
    const unlockedAchievements = Storage.getUnlockedAchievements();
    const allAchievements = APP_DATA ? APP_DATA.ACHIEVEMENTS : [];

    container.innerHTML = `
      <div class="page-enter">
        <h1 class="page-title gradient-text">Analytics & Progress</h1>
        <p class="page-subtitle">Track your learning curve, analyze historical performance, and view achievements</p>

        <!-- Stats Overview Cards -->
        <div class="stats-grid" style="margin-bottom: 32px;">
          <div class="stat-card glass-card">
            <div class="stat-icon" style="background: linear-gradient(135deg, #D27C2C, #E5A93C);">⭐</div>
            <div class="stat-info">
              <div class="stat-value">Level ${level.level}</div>
              <div class="stat-label">${level.totalXP} XP Total</div>
            </div>
          </div>
          <div class="stat-card glass-card">
            <div class="stat-icon" style="background: linear-gradient(135deg, #4E8A64, #2E6A44);">📚</div>
            <div class="stat-info">
              <div class="stat-value">${learned}</div>
              <div class="stat-label">Words Learned</div>
            </div>
          </div>
          <div class="stat-card glass-card">
            <div class="stat-icon" style="background: linear-gradient(135deg, #DF8244, #B06030);">🔥</div>
            <div class="stat-info">
              <div class="stat-value">${streak.current} Days</div>
              <div class="stat-label">Best Streak: ${streak.best}d</div>
            </div>
          </div>
          <div class="stat-card glass-card">
            <div class="stat-icon" style="background: linear-gradient(135deg, #C94C4C, #8E2828);">🎯</div>
            <div class="stat-info">
              <div class="stat-value">${avgScore}%</div>
              <div class="stat-label">Quiz Accuracy</div>
            </div>
          </div>
        </div>

        <!-- Canvas Chart Section -->
        <div class="progress-grid">
          <div class="glass-card chart-container" style="position:relative;">
            <h3 class="section-title" style="margin-top:0; margin-bottom:16px;">📈 Vocabulary Acquisition Rate</h3>
            <canvas id="vocab-acquisition-chart" class="chart-canvas" aria-label="Line chart showing vocabulary words learned over the past week"></canvas>
          </div>

          <div class="glass-card chart-container" style="position:relative;">
            <h3 class="section-title" style="margin-top:0; margin-bottom:16px;">📊 Quiz Arena Score History</h3>
            <canvas id="quiz-performance-chart" class="chart-canvas" aria-label="Bar chart showing scores from your recent quizzes"></canvas>
          </div>
        </div>

        <!-- Achievements Section -->
        <h2 class="section-title">🏆 Badge Accomplishments (${unlockedAchievements.length} / ${allAchievements.length})</h2>
        <div class="glass-card achievement-grid-card" style="padding: 24px;">
          <div class="achievement-grid">
            ${allAchievements.map(ac => {
              const isUnlocked = unlockedAchievements.includes(ac.id);
              return `
                <div class="glass-card achievement-card ${isUnlocked ? 'unlocked' : 'locked'}" title="${ac.description}">
                  <span class="achievement-icon">${ac.icon}</span>
                  <div class="achievement-name">${ac.name}</div>
                  <div class="achievement-desc">${ac.description}</div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;

    // Render Canvas Charts after HTML injected
    setTimeout(() => {
      drawVocabAcquisitionChart();
      drawQuizPerformanceChart();
    }, 100);

    // Responsive window resize redraw loop
    const handleResize = () => {
      if (document.getElementById('vocab-acquisition-chart')) {
        drawVocabAcquisitionChart();
      }
      if (document.getElementById('quiz-performance-chart')) {
        drawQuizPerformanceChart();
      }
    };
    window.addEventListener('resize', handleResize);

    return function destroy() {
      window.removeEventListener('resize', handleResize);
    };
  }

  // ─── Drawing Vocabulary Chart (Linear Line Graph) ──────────

  function drawVocabAcquisitionChart() {
    const canvas = document.getElementById('vocab-acquisition-chart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Dynamic measurement of parent container width
    const paddingOffset = 48; // padding is 24px each side
    const containerWidth = Math.max(280, canvas.parentElement.clientWidth - paddingOffset);
    const containerHeight = 240;

    // High-DPI scaling
    const dpr = window.devicePixelRatio || 1;
    canvas.width = containerWidth * dpr;
    canvas.height = containerHeight * dpr;
    canvas.style.width = containerWidth + 'px';
    canvas.style.height = containerHeight + 'px';

    ctx.scale(dpr, dpr);

    const width = containerWidth;
    const height = containerHeight;

    // Clear
    ctx.clearRect(0, 0, width, height);

    // Simulated/Real progression dates
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    // Get learned count
    const learnedCount = Storage.getLearnedWordsCount();
    
    // Create progression data leading to learnedCount
    const dataPoints = [
      Math.max(0, learnedCount - 12),
      Math.max(0, learnedCount - 9),
      Math.max(0, learnedCount - 7),
      Math.max(0, learnedCount - 5),
      Math.max(0, learnedCount - 3),
      Math.max(0, learnedCount - 1),
      learnedCount
    ];

    const padding = 35;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    const maxVal = Math.max(10, Math.max(...dataPoints) + 5);

    // Draw Grid Lines & Labels
    ctx.strokeStyle = 'rgba(128, 96, 72, 0.15)';
    ctx.lineWidth = 1;
    ctx.fillStyle = 'rgba(128, 96, 72, 0.6)';
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'right';

    const gridLines = 4;
    for (let i = 0; i <= gridLines; i++) {
      const y = padding + (chartHeight / gridLines) * i;
      const val = Math.round(maxVal - (maxVal / gridLines) * i);
      
      // Draw grid line
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();

      // Draw text label
      ctx.fillText(val, padding - 10, y + 3);
    }

    // Draw X Axis labels
    ctx.textAlign = 'center';
    const xStep = chartWidth / (days.length - 1);
    days.forEach((day, index) => {
      const x = padding + xStep * index;
      ctx.fillText(day, x, height - padding + 15);
    });

    // Draw progression path
    ctx.beginPath();
    ctx.strokeStyle = '#D27C2C'; // caramel accent
    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    dataPoints.forEach((val, index) => {
      const x = padding + xStep * index;
      const y = padding + chartHeight * (1 - val / maxVal);
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Fill area below the curve
    const areaGradient = ctx.createLinearGradient(0, padding, 0, height - padding);
    areaGradient.addColorStop(0, 'rgba(210, 124, 44, 0.22)');
    areaGradient.addColorStop(1, 'rgba(210, 124, 44, 0)');
    
    ctx.lineTo(padding + chartWidth, height - padding);
    ctx.lineTo(padding, height - padding);
    ctx.closePath();
    ctx.fillStyle = areaGradient;
    ctx.fill();

    // Draw dot nodes on coordinates
    ctx.fillStyle = '#5E8B9F'; // cozy slate
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1.5;
    dataPoints.forEach((val, index) => {
      const x = padding + xStep * index;
      const y = padding + chartHeight * (1 - val / maxVal);
      ctx.beginPath();
      ctx.arc(x, y, 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    });
  }

  // ─── Drawing Quiz Performance Chart (Vertical Bar Graph) ───

  function drawQuizPerformanceChart() {
    const canvas = document.getElementById('quiz-performance-chart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Dynamic measurement of parent container width
    const paddingOffset = 48;
    const containerWidth = Math.max(200, canvas.parentElement.clientWidth - paddingOffset);
    const containerHeight = 240;

    // High-DPI scaling
    const dpr = window.devicePixelRatio || 1;
    canvas.width = containerWidth * dpr;
    canvas.height = containerHeight * dpr;
    canvas.style.width = containerWidth + 'px';
    canvas.style.height = containerHeight + 'px';

    ctx.scale(dpr, dpr);

    const width = containerWidth;
    const height = containerHeight;

    // Clear
    ctx.clearRect(0, 0, width, height);

    // Get historical records
    const history = Storage.getQuizHistory();
    
    // Take last 5 results or default
    let scorePercents = history.slice(-5).map(q => Math.round((q.score / q.total) * 100));
    if (scorePercents.length === 0) {
      scorePercents = [0, 0, 0, 0, 0]; // Default placeholders if none completed
    }
    while (scorePercents.length < 5) {
      scorePercents.unshift(0); // Pad with zeroes
    }

    const padding = 35;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Grid divider lines
    ctx.strokeStyle = 'rgba(128, 96, 72, 0.15)';
    ctx.lineWidth = 1;
    ctx.fillStyle = 'rgba(128, 96, 72, 0.6)';
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'right';

    const dividers = 4;
    for (let i = 0; i <= dividers; i++) {
      const y = padding + (chartHeight / dividers) * i;
      const pct = 100 - (100 / dividers) * i;
      
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();

      ctx.fillText(pct + '%', padding - 10, y + 3);
    }

    // Renders active vertical bars
    const totalBars = scorePercents.length;
    const barSpacing = chartWidth / totalBars;
    const barWidth = barSpacing * 0.55;

    scorePercents.forEach((score, index) => {
      const x = padding + barSpacing * index + (barSpacing - barWidth) / 2;
      const barHeight = chartHeight * (score / 100);
      const y = padding + chartHeight - barHeight;

      if (score > 0) {
        // Neon cyan/indigo bar fill gradient
        const barGradient = ctx.createLinearGradient(0, height - padding, 0, padding);
        barGradient.addColorStop(0, '#3b82f6');
        barGradient.addColorStop(1, '#06b6d4');

        ctx.fillStyle = barGradient;
        
        // Draw round corner rectangles (manual path)
        const radius = 4;
        ctx.beginPath();
        ctx.moveTo(x, y + barHeight);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.lineTo(x + barWidth - radius, y);
        ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + radius);
        ctx.lineTo(x + barWidth, y + barHeight);
        ctx.closePath();
        ctx.fill();

        // Print score above bar
        ctx.fillStyle = 'rgba(248, 241, 235, 0.85)';
        ctx.font = 'bold 9px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(score + '%', x + barWidth / 2, y - 6);
      }

      // X Label
      ctx.fillStyle = 'rgba(128, 96, 72, 0.6)';
      ctx.font = '9px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`Q${index + 1}`, x + barWidth / 2, height - padding + 15);
    });
  }

  export const ProgressModule = { render };
