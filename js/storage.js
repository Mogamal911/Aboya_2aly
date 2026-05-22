import { Utils } from './utils.js';
import { APP_DATA } from './data.js';


  const STORAGE_KEYS = {
    XP: 'lb_xp',
    STREAK: 'lb_streak',
    WORDS: 'lb_words',
    LESSONS: 'lb_lessons',
    QUIZZES: 'lb_quizzes',
    ACHIEVEMENTS: 'lb_achievements',
    SETTINGS: 'lb_settings',
    ACTIVITY: 'lb_activity',
    DAILY: 'lb_daily',
    MILESTONE: 'lb_milestone',
    HEARTS: 'lb_hearts',
    AI_BRAIN: 'lb_ai_brain'
  };

  function getJSON(key, fallback) {
    try {
      const val = localStorage.getItem(key);
      return val ? JSON.parse(val) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function setJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function getToday() {
    return new Date().toISOString().split('T')[0];
  }

  function daysBetween(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diff = Math.abs(d2 - d1);
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  // ─── XP & Level ───────────────────────────────────────────

  function getXP() {
    return getJSON(STORAGE_KEYS.XP, 0);
  }

  function getLevel() {
    const xp = getXP();
    let level = 1;
    let totalRequired = 0;
    while (totalRequired + level * 100 <= xp) {
      totalRequired += level * 100;
      level++;
    }
    const currentLevelXP = xp - totalRequired;
    const requiredForNext = level * 100;
    return {
      level: level,
      currentXP: currentLevelXP,
      requiredXP: requiredForNext,
      totalXP: xp,
      progress: (currentLevelXP / requiredForNext) * 100
    };
  }

  function addXP(amount) {
    const oldLevel = getLevel().level;
    const newXP = getXP() + amount;
    setJSON(STORAGE_KEYS.XP, newXP);
    const newLevel = getLevel().level;
    return {
      newXP: newXP,
      newLevel: newLevel,
      leveledUp: newLevel > oldLevel
    };
  }

  // ─── Streaks ──────────────────────────────────────────────

  function getStreak() {
    return getJSON(STORAGE_KEYS.STREAK, { current: 0, best: 0, lastDate: null });
  }

  function updateStreak() {
    const streak = getStreak();
    const today = getToday();

    if (streak.lastDate === today) {
      return { current: streak.current, best: streak.best, isNew: false };
    }

    let newCurrent;
    if (streak.lastDate && daysBetween(streak.lastDate, today) === 1) {
      newCurrent = streak.current + 1;
    } else if (streak.lastDate && daysBetween(streak.lastDate, today) === 0) {
      newCurrent = streak.current;
    } else {
      newCurrent = 1;
    }

    const newBest = Math.max(newCurrent, streak.best);
    const newStreak = { current: newCurrent, best: newBest, lastDate: today };
    setJSON(STORAGE_KEYS.STREAK, newStreak);
    return { current: newCurrent, best: newBest, isNew: true };
  }

  // ─── Duolingo Progressive Milestone Unlocks ──────────────

  function getCurrentMilestone() {
    return getJSON(STORAGE_KEYS.MILESTONE, 1); // Starts at milestone 1
  }

  function completeMilestone(milestoneIndex) {
    const current = getCurrentMilestone();
    if (milestoneIndex >= current) {
      setJSON(STORAGE_KEYS.MILESTONE, milestoneIndex + 1);
      
      // Cyber-neon celebration feedback!
      if (Utils) {
        Utils.playSoundChime(true);
        Utils.celebrateConfetti();
      }
      
      return true; // Milestone progressed!
    }
    return false;
  }

  // ─── Stamina / Cup Hearts Management ──────────────────────

  function getHearts() {
    return getJSON(STORAGE_KEYS.HEARTS, 5); // Max 5 cup hearts by default
  }

  function loseHeart() {
    const current = getHearts();
    if (current > 0) {
      setJSON(STORAGE_KEYS.HEARTS, current - 1);
      return current - 1;
    }
    return 0;
  }

  function refillHearts() {
    setJSON(STORAGE_KEYS.HEARTS, 5);
  }

  // ─── Vocabulary ───────────────────────────────────────────

  function getAllWordStates() {
    return getJSON(STORAGE_KEYS.WORDS, {});
  }

  function getWordState(wordId) {
    const words = getAllWordStates();
    return words[wordId] || { state: 'new', nextReview: null, favorite: false, lastReviewed: null };
  }

  function setWordState(wordId, updates) {
    const words = getAllWordStates();
    const current = words[wordId] || { state: 'new', nextReview: null, favorite: false, lastReviewed: null };
    words[wordId] = { ...current, ...updates };
    setJSON(STORAGE_KEYS.WORDS, words);
  }

  function getLearnedWordsCount() {
    const words = getAllWordStates();
    return Object.values(words).filter(w => w.state === 'learning' || w.state === 'mastered').length;
  }

  function getMasteredWordsCount() {
    const words = getAllWordStates();
    return Object.values(words).filter(w => w.state === 'mastered').length;
  }

  function getWordsToReview() {
    const words = getAllWordStates();
    const today = getToday();
    const reviewIds = [];
    for (const [id, state] of Object.entries(words)) {
      if (state.state === 'learning' && state.nextReview && state.nextReview <= today) {
        reviewIds.push(id);
      }
    }
    return reviewIds;
  }

  function getFavoriteWords() {
    const words = getAllWordStates();
    return Object.entries(words).filter(([_, s]) => s.favorite).map(([id]) => id);
  }

  function getLearnedCategories() {
    const words = getAllWordStates();
    const data = APP_DATA;
    if (!data) return [];
    const categories = new Set();
    for (const [id, state] of Object.entries(words)) {
      if (state.state !== 'new') {
        const word = data.VOCABULARY.find(w => w.id === id);
        if (word) categories.add(word.category);
      }
    }
    return Array.from(categories);
  }

  // ─── Grammar ──────────────────────────────────────────────

  function getAllLessonProgress() {
    return getJSON(STORAGE_KEYS.LESSONS, {});
  }

  function getLessonProgress(lessonId) {
    const lessons = getAllLessonProgress();
    return lessons[lessonId] || { completed: false, score: 0, bestScore: 0, attempts: 0 };
  }

  function setLessonProgress(lessonId, data) {
    const lessons = getAllLessonProgress();
    const current = lessons[lessonId] || { completed: false, score: 0, bestScore: 0, attempts: 0 };
    const updated = { ...current, ...data };
    updated.bestScore = Math.max(updated.bestScore, updated.score);
    updated.attempts = (current.attempts || 0) + 1;
    lessons[lessonId] = updated;
    setJSON(STORAGE_KEYS.LESSONS, lessons);
  }

  function getCompletedLessonsCount() {
    const lessons = getAllLessonProgress();
    return Object.values(lessons).filter(l => l.completed).length;
  }

  function getCompletedLessonsByLevel(level) {
    const lessons = getAllLessonProgress();
    const data = APP_DATA;
    if (!data) return 0;
    return data.GRAMMAR_LESSONS.filter(l => l.level === level && lessons[l.id]?.completed).length;
  }

  // ─── Quizzes ──────────────────────────────────────────────

  function getQuizHistory() {
    return getJSON(STORAGE_KEYS.QUIZZES, []);
  }

  function addQuizResult(result) {
    const history = getQuizHistory();
    history.push({
      ...result,
      date: result.date || new Date().toISOString()
    });
    if (history.length > 100) history.splice(0, history.length - 100);
    setJSON(STORAGE_KEYS.QUIZZES, history);
  }

  function getAverageQuizScore() {
    const history = getQuizHistory();
    if (history.length === 0) return 0;
    const total = history.reduce((sum, q) => sum + (q.score / q.total) * 100, 0);
    return Math.round(total / history.length);
  }

  function getTotalQuizzes() {
    return getQuizHistory().length;
  }

  // ─── Achievements ─────────────────────────────────────────

  function getUnlockedAchievements() {
    return getJSON(STORAGE_KEYS.ACHIEVEMENTS, []);
  }

  function unlockAchievement(id) {
    const unlocked = getUnlockedAchievements();
    if (unlocked.includes(id)) return false;
    unlocked.push(id);
    setJSON(STORAGE_KEYS.ACHIEVEMENTS, unlocked);
    return true;
  }

  function checkAchievements() {
    const newlyUnlocked = [];
    const unlocked = getUnlockedAchievements();
    const data = APP_DATA;
    if (!data) return newlyUnlocked;

    const learned = getLearnedWordsCount();
    const quizzes = getTotalQuizzes();
    const streak = getStreak();
    const completedLessons = getCompletedLessonsCount();
    const learnedCats = getLearnedCategories();
    const quizHistory = getQuizHistory();
    const hour = new Date().getHours();

    const checks = {
      'first_word': learned >= 1,
      'ten_words': learned >= 10,
      'fifty_words': learned >= 50,
      'hundred_words': learned >= 100,
      'first_quiz': quizzes >= 1,
      'perfect_quiz': quizHistory.some(q => q.score === q.total),
      'ten_quizzes': quizzes >= 10,
      'first_lesson': completedLessons >= 1,
      'all_beginner': getCompletedLessonsByLevel('beginner') >= 4,
      'streak_3': streak.current >= 3,
      'streak_7': streak.current >= 7,
      'streak_30': streak.current >= 30,
      'all_categories': learnedCats.length >= 6,
      'night_owl': hour >= 0 && hour < 5,
      'speed_demon': quizHistory.some(q => q.duration && q.duration < 60)
    };

    for (const [id, condition] of Object.entries(checks)) {
      if (condition && !unlocked.includes(id)) {
        if (unlockAchievement(id)) {
          const achievement = data.ACHIEVEMENTS.find(a => a.id === id);
          if (achievement) newlyUnlocked.push(achievement);
        }
      }
    }

    return newlyUnlocked;
  }

  // ─── Daily Goal ───────────────────────────────────────────

  function getDailyGoal() {
    const settings = getSettings();
    const daily = getJSON(STORAGE_KEYS.DAILY, { date: null, progress: 0 });
    const today = getToday();

    if (daily.date !== today) {
      return { target: settings.dailyGoal || 10, progress: 0, completed: false };
    }
    return {
      target: settings.dailyGoal || 10,
      progress: daily.progress,
      completed: daily.progress >= (settings.dailyGoal || 10)
    };
  }

  function addDailyProgress(minutes) {
    const today = getToday();
    const daily = getJSON(STORAGE_KEYS.DAILY, { date: null, progress: 0 });

    if (daily.date !== today) {
      setJSON(STORAGE_KEYS.DAILY, { date: today, progress: minutes });
    } else {
      setJSON(STORAGE_KEYS.DAILY, { date: today, progress: daily.progress + minutes });
    }
  }

  // ─── Activity Feed ────────────────────────────────────────

  function addActivity(activity) {
    const activities = getJSON(STORAGE_KEYS.ACTIVITY, []);
    activities.unshift({
      ...activity,
      date: activity.date || new Date().toISOString()
    });
    if (activities.length > 50) activities.length = 50;
    setJSON(STORAGE_KEYS.ACTIVITY, activities);
  }

  function getRecentActivity(limit = 10) {
    const activities = getJSON(STORAGE_KEYS.ACTIVITY, []);
    return activities.slice(0, limit);
  }

  // ─── Settings ─────────────────────────────────────────────

  function getSettings() {
    return getJSON(STORAGE_KEYS.SETTINGS, {
      theme: 'dark',
      dailyGoal: 10,
      soundEffects: true
    });
  }

  function updateSettings(updates) {
    const current = getSettings();
    const updated = { ...current, ...updates };
    setJSON(STORAGE_KEYS.SETTINGS, updated);
    return updated;
  }

  // ─── AI Brain (CEFR & Adaptive) ───────────────────────────

  function getAIBrain() {
    const defaultBrain = {
      cefrLevel: 'A2',
      difficultyScore: 25,
      skills: { speaking: 30, grammar: 30, vocabulary: 30 },
      weakTopics: {},
      vocabSRS: {},
      errorHistory: []
    };
    return getJSON(STORAGE_KEYS.AI_BRAIN, defaultBrain);
  }

  function saveAIBrain(brain) {
    setJSON(STORAGE_KEYS.AI_BRAIN, brain);
  }

  function updateAIBrainDifficulty(successPercent, timeMs = 8000, complexity = 2) {
    const brain = getAIBrain();
    let difficulty = brain.difficultyScore || 25;
    
    // Calculate raw performance metric based on accuracy, speed, complexity
    const accuracyMod = successPercent >= 80 ? 3 : successPercent <= 50 ? -4 : 0;
    const speedMod = timeMs < 4000 ? 1 : timeMs > 15000 ? -1 : 0;
    const complexityMod = complexity >= 3 ? 1 : complexity <= 1 ? -1 : 0;
    
    const delta = accuracyMod + speedMod + complexityMod;
    difficulty = Math.max(0, Math.min(100, difficulty + delta));
    
    // Resolve numeric difficulty to CEFR tiers
    let newCEFR = "A1";
    if (difficulty >= 91) newCEFR = "C2";
    else if (difficulty >= 76) newCEFR = "C1";
    else if (difficulty >= 56) newCEFR = "B2";
    else if (difficulty >= 36) newCEFR = "B1";
    else if (difficulty >= 16) newCEFR = "A2";
    
    const oldCEFR = brain.cefrLevel || 'A2';
    brain.difficultyScore = difficulty;
    brain.cefrLevel = newCEFR;
    
    saveAIBrain(brain);
    
    if (newCEFR !== oldCEFR) {
      if (window.App && typeof window.App.showNotification === 'function') {
        window.App.showNotification(`🚀 CEFR Level Adapted: ${oldCEFR} ➔ ${newCEFR}!`, 'info');
      }
    }
    return brain;
  }

  function updateSRSVocabQueue(word, success) {
    const brain = getAIBrain();
    if (!brain.vocabSRS) brain.vocabSRS = {};
    
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    
    let record = brain.vocabSRS[word];
    if (!record) {
      record = { intervalDays: 1, nextReviewDate: todayStr, successes: 0, easeFactor: 2.5 };
    }
    
    if (success) {
      record.successes += 1;
      if (record.successes === 1) {
        record.intervalDays = 1;
      } else if (record.successes === 2) {
        record.intervalDays = 3;
      } else {
        record.intervalDays = Math.round(record.intervalDays * record.easeFactor);
      }
      record.easeFactor = Math.max(1.3, record.easeFactor + 0.1);
    } else {
      record.successes = 0;
      record.intervalDays = 1;
      record.easeFactor = Math.max(1.3, record.easeFactor - 0.2);
    }
    
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + record.intervalDays);
    record.nextReviewDate = nextDate.toISOString().split('T')[0];
    
    brain.vocabSRS[word] = record;
    saveAIBrain(brain);
    return record;
  }

  function getSRSDueWords() {
    const brain = getAIBrain();
    if (!brain.vocabSRS) return [];
    const todayStr = new Date().toISOString().split('T')[0];
    return Object.entries(brain.vocabSRS)
      .filter(([_, record]) => record.nextReviewDate <= todayStr)
      .map(([word]) => word);
  }

  // ─── Reset ────────────────────────────────────────────────

  function resetAll() {
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
  }

  // ─── Public API ───────────────────────────────────────────

  export const Storage = {
    getXP, addXP, getLevel,
    getStreak, updateStreak,
    getCurrentMilestone, completeMilestone,
    getHearts, loseHeart, refillHearts,
    getAllWordStates, getWordState, setWordState,
    getLearnedWordsCount, getMasteredWordsCount,
    getWordsToReview, getFavoriteWords, getLearnedCategories,
    getAllLessonProgress, getLessonProgress, setLessonProgress,
    getCompletedLessonsCount, getCompletedLessonsByLevel,
    getQuizHistory, addQuizResult, getAverageQuizScore, getTotalQuizzes,
    getUnlockedAchievements, unlockAchievement, checkAchievements,
    getDailyGoal, addDailyProgress,
    addActivity, getRecentActivity,
    getSettings, updateSettings,
    getAIBrain, saveAIBrain, updateAIBrainDifficulty, updateSRSVocabQueue, getSRSDueWords,
    resetAll
  };
