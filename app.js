// Bug Fixing Simulator core SPA logic

const VIEWS = {
  start: document.getElementById('view-start'),
  login: document.getElementById('view-login'),
  language: document.getElementById('view-language'),
  menu: document.getElementById('view-menu'),
  scoreboard: document.getElementById('view-scoreboard'),
  game: document.getElementById('view-game'),
};

const els = {
  // Start
  btnStart: document.getElementById('btn-start'),
  // Login
  loginForm: document.getElementById('login-form'),
  username: document.getElementById('username'),
  btnLoginBack: document.getElementById('btn-login-back'),
  // Language Selection
  btnChooseJavaScript: document.getElementById('btn-choose-javascript'),
  btnChoosePython: document.getElementById('btn-choose-python'),
  btnLanguageBack: document.getElementById('btn-language-back'),
  // Menu
  welcomeName: document.getElementById('welcome-name'),
  levelsGrid: document.getElementById('levels-grid'),
  btnContinue: document.getElementById('btn-continue'),
  btnLogout: document.getElementById('btn-logout'),
  btnResetProgress: document.getElementById('btn-reset-progress'),
  btnViewScoreboard: document.getElementById('btn-view-scoreboard'),
  totalScore: document.getElementById('total-score'),
  levelsCompleted: document.getElementById('levels-completed'),
  avgTime: document.getElementById('avg-time'),
  progressMap: document.getElementById('progress-map'),
  currentLanguageDisplay: document.getElementById('current-language-display'),
  // Scoreboard
  scoreboardBody: document.getElementById('scoreboard-body'),
  scoreboardEmpty: document.getElementById('scoreboard-empty'),
  btnScoreboardBack: document.getElementById('btn-scoreboard-back'),
  filterAll: document.getElementById('filter-all'),
  filterJavaScript: document.getElementById('filter-javascript'),
  filterPython: document.getElementById('filter-python'),
  // Game
  hudLevel: document.getElementById('hud-level'),
  hudTimer: document.getElementById('hud-timer'),
  hudScore: document.getElementById('hud-score'),
  levelTitle: document.getElementById('level-title'),
  codeEditor: document.getElementById('code-editor'),
  btnSubmit: document.getElementById('btn-submit'),
  btnRestart: document.getElementById('btn-restart'),
  feedback: document.getElementById('feedback'),
  btnExitToMenu: document.getElementById('btn-exit-to-menu'),
  // Description and Hints
  descriptionPanel: document.getElementById('description-panel'),
  levelDescription: document.getElementById('level-description'),
  btnShowDesc: document.getElementById('btn-show-desc'),
  btnCloseDesc: document.getElementById('btn-close-desc'),
  hintPanel: document.getElementById('hint-panel'),
  hintText: document.getElementById('hint-text'),
  hintNumber: document.getElementById('hint-number'),
  btnShowHint: document.getElementById('btn-show-hint'),
  btnCloseHint: document.getElementById('btn-close-hint'),
  // Modal
  overlay: document.getElementById('modal-overlay'),
  modalRestart: document.getElementById('modal-restart'),
  modalNext: document.getElementById('modal-next'),
  modalQuit: document.getElementById('modal-quit'),
  modalTimeBonus: document.getElementById('modal-time-bonus'),
  modalLevelScore: document.getElementById('modal-level-score'),
  modalTotalScore: document.getElementById('modal-total-score'),
};

const STORAGE = {
  name: 'bfs_username',
  allUsers: 'bfs_all_users', // Store all user data: { username: { language: { progress } } }
};

const TIMER_DURATION = 60; // seconds per level
const BASE_SCORE = 100;
const TIME_BONUS_MULTIPLIER = 2; // 2 points per second remaining

// Language management
let currentLanguage = 'javascript';
let currentLevels = LEVELS;
const TOTAL_LEVELS = 15;

function getLanguage() {
  const username = getUser();
  if (!username) return 'javascript';
  const userData = getUserData(username);
  return userData.currentLanguage || 'javascript';
}

function setLanguage(lang) {
  const username = getUser();
  if (!username) return;
  const userData = getUserData(username);
  userData.currentLanguage = lang;
  saveUserData(username, userData);
  currentLanguage = lang;
  currentLevels = lang === 'python' ? PYTHON_LEVELS : LEVELS;
}

function getUser() {
  return localStorage.getItem(STORAGE.name) || '';
}
function setUser(name) {
  localStorage.setItem(STORAGE.name, name);
}
function clearUser() {
  localStorage.removeItem(STORAGE.name);
}

// Get all users data from localStorage
function getAllUsersData() {
  const raw = localStorage.getItem(STORAGE.allUsers);
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

// Save all users data to localStorage
function saveAllUsersData(data) {
  localStorage.setItem(STORAGE.allUsers, JSON.stringify(data));
}

// Get specific user's data
function getUserData(username) {
  const allUsers = getAllUsersData();
  if (!allUsers[username]) {
    allUsers[username] = {
      currentLanguage: 'javascript',
      javascript: { highestUnlocked: 1, lastLevel: 1, totalScore: 0, levelScores: {}, levelTimes: {} },
      python: { highestUnlocked: 1, lastLevel: 1, totalScore: 0, levelScores: {}, levelTimes: {} }
    };
  }
  return allUsers[username];
}

// Save specific user's data
function saveUserData(username, userData) {
  const allUsers = getAllUsersData();
  allUsers[username] = userData;
  saveAllUsersData(allUsers);
}

function getProgress() {
  const username = getUser();
  if (!username) return { highestUnlocked: 1, lastLevel: 1, totalScore: 0, levelScores: {}, levelTimes: {} };
  const userData = getUserData(username);
  const langData = userData[currentLanguage];
  if (!langData) return { highestUnlocked: 1, lastLevel: 1, totalScore: 0, levelScores: {}, levelTimes: {} };
  return {
    highestUnlocked: langData.highestUnlocked || 1,
    lastLevel: langData.lastLevel || 1,
    totalScore: langData.totalScore || 0,
    levelScores: langData.levelScores || {},
    levelTimes: langData.levelTimes || {},
  };
}

function setProgress(p) {
  const username = getUser();
  if (!username) return;
  const userData = getUserData(username);
  userData[currentLanguage] = p;
  saveUserData(username, userData);
}

function resetProgress() {
  const username = getUser();
  if (!username) return;
  const userData = getUserData(username);
  userData[currentLanguage] = { highestUnlocked: 1, lastLevel: 1, totalScore: 0, levelScores: {}, levelTimes: {} };
  saveUserData(username, userData);
}

function showView(name) {
  Object.values(VIEWS).forEach(v => v.classList.add('hidden'));
  VIEWS[name].classList.remove('hidden');
  VIEWS[name].classList.add('active');
}

// Navigation
els.btnStart.addEventListener('click', () => {
  const hasUser = !!getUser();
  if (hasUser) {
    // Load user's language and show menu
    const lang = getLanguage();
    setLanguage(lang);
    renderMenu();
    showView('menu');
  } else {
    showView('login');
  }
});

els.btnLoginBack.addEventListener('click', () => {
  showView('start');
});

els.loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = els.username.value.trim();
  if (!name) return;
  setUser(name);
  // Initialize user data if new user
  getUserData(name);
  // Show language selection page
  showView('language');
});

els.btnLogout.addEventListener('click', () => {
  clearUser();
  currentLanguage = 'javascript';
  currentLevels = LEVELS;
  showView('login');
});

els.btnResetProgress.addEventListener('click', () => {
  if (confirm('Reset your progress?')) {
    resetProgress();
    renderMenu();
  }
});

els.btnContinue.addEventListener('click', () => {
  const { lastLevel } = getProgress();
  startLevel(lastLevel);
});

// Menu rendering
function renderMenu() {
  const name = getUser();
  els.welcomeName.textContent = name ? `Hi, ${name}` : '';
  
  // Update language display
  els.currentLanguageDisplay.textContent = currentLanguage === 'javascript' ? 'JavaScript' : 'Python';
  
  const progress = getProgress();
  const { highestUnlocked, lastLevel, totalScore, levelScores, levelTimes } = progress;
  
  // Update stats
  els.totalScore.textContent = totalScore || 0;
  const completedCount = Object.keys(levelScores).length;
  els.levelsCompleted.textContent = `${completedCount}/${TOTAL_LEVELS}`;
  
  // Calculate average time
  const times = Object.values(levelTimes);
  if (times.length > 0) {
    const avgSeconds = Math.floor(times.reduce((sum, t) => sum + t, 0) / times.length);
    els.avgTime.textContent = `${avgSeconds}s`;
  } else {
    els.avgTime.textContent = '--';
  }
  
  // Render progress map
  els.progressMap.innerHTML = '';
  for (let i = 1; i <= TOTAL_LEVELS; i++) {
    const dot = document.createElement('div');
    dot.className = 'progress-dot';
    dot.title = `Level ${i}`;
    
    if (levelScores[i]) {
      dot.classList.add('completed');
    } else if (i === lastLevel) {
      dot.classList.add('current');
    } else if (i > highestUnlocked) {
      dot.classList.add('locked');
    }
    
    els.progressMap.appendChild(dot);
  }
  
  // Render level grid
  els.levelsGrid.innerHTML = '';
  for (let i = 1; i <= TOTAL_LEVELS; i++) {
    const btn = document.createElement('button');
    btn.className = 'level-btn';
    const scoreText = levelScores[i] ? ` (${levelScores[i]})` : '';
    btn.innerHTML = `<span class="level-badge">#${i}</span>Level ${i}${scoreText}`;
    if (i > highestUnlocked) {
      btn.classList.add('locked');
      btn.disabled = true;
    }
    btn.addEventListener('click', () => startLevel(i));
    els.levelsGrid.appendChild(btn);
  }
  els.btnContinue.disabled = !lastLevel;
}

// Game state
let currentLevel = 1;
let timerInterval = null;
let timeRemaining = TIMER_DURATION;
let levelStartTime = 0;
let currentHintIndex = 0;

function startLevel(n) {
  currentLevel = Math.max(1, Math.min(TOTAL_LEVELS, n));
  els.feedback.textContent = '';
  currentHintIndex = 0;
  
  // Reset timer
  if (timerInterval) clearInterval(timerInterval);
  timeRemaining = TIMER_DURATION;
  levelStartTime = Date.now();
  els.btnSubmit.disabled = false;
  
  // Hide panels
  els.descriptionPanel.classList.add('hidden');
  els.hintPanel.classList.add('hidden');
  
  renderLevel();
  startTimer();
  updateHUD();
  showView('game');
}

function renderLevel() {
  const lvl = currentLevels[currentLevel - 1];
  if (!lvl) return;
  els.hudLevel.textContent = `Level ${lvl.id}/${TOTAL_LEVELS}`;
  els.levelTitle.textContent = `${lvl.id}. ${lvl.title}`;
  els.levelDescription.textContent = lvl.description;
  els.codeEditor.value = lvl.buggyCode;
  
  // Update hint button
  updateHintButton();
}

function startTimer() {
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    timeRemaining--;
    updateTimerDisplay();
    
    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      onTimeUp();
    }
  }, 1000);
}

function updateTimerDisplay() {
  els.hudTimer.textContent = `${timeRemaining}s`;
  els.hudTimer.classList.remove('warning', 'danger');
  if (timeRemaining <= 10) {
    els.hudTimer.classList.add('danger');
  } else if (timeRemaining <= 20) {
    els.hudTimer.classList.add('warning');
  }
}

function updateHUD() {
  const progress = getProgress();
  els.hudScore.textContent = progress.totalScore;
}

function onTimeUp() {
  els.feedback.style.color = '#ff5c7a';
  els.feedback.textContent = 'Time\'s up! Try again.';
  els.btnSubmit.disabled = true;
  setTimeout(() => {
    startLevel(currentLevel);
  }, 2000);
}

function normalizeCode(code) {
  // Normalize whitespace and remove trailing spaces for comparison
  return code
    .trim()
    .split('\n')
    .map(line => line.trimEnd())
    .join('\n');
}

function validateCode(userCode, correctCode) {
  const normalized1 = normalizeCode(userCode);
  const normalized2 = normalizeCode(correctCode);
  return normalized1 === normalized2;
}

function updateHintButton() {
  const lvl = currentLevels[currentLevel - 1];
  if (!lvl || !lvl.hints) return;
  
  if (currentHintIndex >= lvl.hints.length) {
    els.btnShowHint.textContent = '💡 No more hints';
    els.btnShowHint.disabled = true;
  } else {
    els.btnShowHint.textContent = `💡 Get Hint (${currentHintIndex}/${lvl.hints.length})`;
    els.btnShowHint.disabled = false;
  }
}

// Submit and restart
els.btnSubmit.addEventListener('click', () => {
  const lvl = currentLevels[currentLevel - 1];
  const userCode = els.codeEditor.value;
  
  if (!userCode.trim()) {
    els.feedback.style.color = '#ffcc66';
    els.feedback.textContent = 'Please write some code first!';
    return;
  }
  
  if (validateCode(userCode, lvl.correctCode)) {
    clearInterval(timerInterval);
    const timeTaken = Math.floor((Date.now() - levelStartTime) / 1000);
    els.feedback.style.color = '#25d0a6';
    els.feedback.textContent = '✅ Correct! Bug fixed successfully!';
    onLevelComplete(timeTaken);
  } else {
    els.feedback.style.color = '#ff5c7a';
    els.feedback.textContent = '❌ Not quite right. Keep trying or use a hint!';
  }
});

els.btnRestart.addEventListener('click', () => {
  if (timerInterval) clearInterval(timerInterval);
  startLevel(currentLevel);
});

function onLevelComplete(timeTaken) {
  // Calculate score
  const timeBonus = Math.max(0, timeRemaining * TIME_BONUS_MULTIPLIER);
  const levelScore = BASE_SCORE + timeBonus;
  
  // Update progress
  const progress = getProgress();
  const highestUnlocked = Math.max(progress.highestUnlocked || 1, currentLevel + 1, 1);
  const lastLevel = currentLevel;
  
  // Update level-specific data
  progress.levelScores[currentLevel] = levelScore;
  progress.levelTimes[currentLevel] = timeTaken;
  
  // Recalculate total score
  progress.totalScore = Object.values(progress.levelScores).reduce((sum, s) => sum + s, 0);
  
  setProgress({ 
    highestUnlocked: Math.min(TOTAL_LEVELS, highestUnlocked), 
    lastLevel,
    totalScore: progress.totalScore,
    levelScores: progress.levelScores,
    levelTimes: progress.levelTimes,
  });

  // Update modal
  els.modalTimeBonus.textContent = `+${timeBonus}`;
  els.modalLevelScore.textContent = `+${BASE_SCORE}`;
  els.modalTotalScore.textContent = progress.totalScore;
  
  // Configure modal actions visibility
  els.modalNext.disabled = currentLevel >= TOTAL_LEVELS;

  // Show modal
  els.overlay.classList.remove('hidden');
}

// Modal buttons
els.modalRestart.addEventListener('click', () => {
  els.overlay.classList.add('hidden');
  if (timerInterval) clearInterval(timerInterval);
  startLevel(currentLevel);
});
els.modalNext.addEventListener('click', () => {
  els.overlay.classList.add('hidden');
  if (timerInterval) clearInterval(timerInterval);
  if (currentLevel < TOTAL_LEVELS) startLevel(currentLevel + 1);
});
els.modalQuit.addEventListener('click', () => {
  els.overlay.classList.add('hidden');
  if (timerInterval) clearInterval(timerInterval);
  renderMenu();
  showView('menu');
});

// Description and Hint handlers
els.btnShowDesc.addEventListener('click', () => {
  els.descriptionPanel.classList.toggle('hidden');
  els.hintPanel.classList.add('hidden');
});

els.btnCloseDesc.addEventListener('click', () => {
  els.descriptionPanel.classList.add('hidden');
});

els.btnShowHint.addEventListener('click', () => {
  const lvl = currentLevels[currentLevel - 1];
  if (!lvl || !lvl.hints || currentHintIndex >= lvl.hints.length) return;
  
  els.hintText.textContent = lvl.hints[currentHintIndex];
  els.hintNumber.textContent = `${currentHintIndex + 1}/${lvl.hints.length}`;
  els.hintPanel.classList.remove('hidden');
  els.descriptionPanel.classList.add('hidden');
  
  currentHintIndex++;
  updateHintButton();
});

els.btnCloseHint.addEventListener('click', () => {
  els.hintPanel.classList.add('hidden');
});

// Exit to menu
els.btnExitToMenu.addEventListener('click', () => {
  if (timerInterval) clearInterval(timerInterval);
  renderMenu();
  showView('menu');
});

// Language selector removed - users choose language on language selection page

// Language selection page handlers
els.btnChooseJavaScript.addEventListener('click', () => {
  setLanguage('javascript');
  renderMenu();
  showView('menu');
});

els.btnChoosePython.addEventListener('click', () => {
  setLanguage('python');
  renderMenu();
  showView('menu');
});

els.btnLanguageBack.addEventListener('click', () => {
  clearUser();
  showView('login');
});

// Scoreboard navigation
els.btnViewScoreboard.addEventListener('click', () => {
  renderScoreboard('all');
  showView('scoreboard');
});

els.btnScoreboardBack.addEventListener('click', () => {
  renderMenu();
  showView('menu');
});

// Scoreboard filters
let currentFilter = 'all';

els.filterAll.addEventListener('click', () => {
  currentFilter = 'all';
  updateFilterButtons();
  renderScoreboard('all');
});

els.filterJavaScript.addEventListener('click', () => {
  currentFilter = 'javascript';
  updateFilterButtons();
  renderScoreboard('javascript');
});

els.filterPython.addEventListener('click', () => {
  currentFilter = 'python';
  updateFilterButtons();
  renderScoreboard('python');
});

function updateFilterButtons() {
  els.filterAll.classList.toggle('active', currentFilter === 'all');
  els.filterJavaScript.classList.toggle('active', currentFilter === 'javascript');
  els.filterPython.classList.toggle('active', currentFilter === 'python');
}

// Scoreboard rendering
function renderScoreboard(filter = 'all') {
  const allUsers = getAllUsersData();
  const scoreboardData = [];
  
  // Collect all user scores for each language
  Object.keys(allUsers).forEach(username => {
    const userData = allUsers[username];
    
    // JavaScript scores
    if (filter === 'all' || filter === 'javascript') {
      const jsData = userData.javascript;
      if (jsData && jsData.totalScore > 0) {
        const completedLevels = Object.keys(jsData.levelScores || {}).length;
        const times = Object.values(jsData.levelTimes || {});
        const avgTime = times.length > 0 ? Math.floor(times.reduce((sum, t) => sum + t, 0) / times.length) : 0;
        
        scoreboardData.push({
          username,
          language: 'javascript',
          score: jsData.totalScore,
          completedLevels,
          avgTime
        });
      }
    }
    
    // Python scores
    if (filter === 'all' || filter === 'python') {
      const pyData = userData.python;
      if (pyData && pyData.totalScore > 0) {
        const completedLevels = Object.keys(pyData.levelScores || {}).length;
        const times = Object.values(pyData.levelTimes || {});
        const avgTime = times.length > 0 ? Math.floor(times.reduce((sum, t) => sum + t, 0) / times.length) : 0;
        
        scoreboardData.push({
          username,
          language: 'python',
          score: pyData.totalScore,
          completedLevels,
          avgTime
        });
      }
    }
  });
  
  // Sort by score (descending)
  scoreboardData.sort((a, b) => b.score - a.score);
  
  // Render scoreboard
  const currentUser = getUser();
  els.scoreboardBody.innerHTML = '';
  
  if (scoreboardData.length === 0) {
    els.scoreboardEmpty.classList.remove('hidden');
    document.querySelector('.scoreboard-table').style.display = 'none';
  } else {
    els.scoreboardEmpty.classList.add('hidden');
    document.querySelector('.scoreboard-table').style.display = 'table';
    
    scoreboardData.forEach((entry, index) => {
      const rank = index + 1;
      const row = document.createElement('tr');
      
      // Highlight current user's row
      if (entry.username === currentUser && entry.language === currentLanguage) {
        row.classList.add('current-user');
      }
      
      // Rank badge
      let rankBadgeClass = '';
      if (rank === 1) rankBadgeClass = 'gold';
      else if (rank === 2) rankBadgeClass = 'silver';
      else if (rank === 3) rankBadgeClass = 'bronze';
      
      row.innerHTML = `
        <td class="rank-col">
          <div class="rank-badge ${rankBadgeClass}">${rank}</div>
        </td>
        <td class="name-col">${entry.username}</td>
        <td class="language-col">
          <span class="language-badge ${entry.language}">${entry.language}</span>
        </td>
        <td class="score-col">${entry.score}</td>
        <td class="levels-col">${entry.completedLevels}/${TOTAL_LEVELS}</td>
        <td class="time-col">${entry.avgTime}s</td>
      `;
      
      els.scoreboardBody.appendChild(row);
    });
  }
}

// Bootstrap
(function init() {
  // Initialize language
  const savedLang = getLanguage();
  setLanguage(savedLang);
  
  const name = getUser();
  if (name) {
    renderMenu();
    showView('menu');
  } else {
    showView('start');
  }
})();
