/* Story Quest — Main Application */

// ======== SUPABASE ========
const SUPABASE_URL = "https://qjjvbgtkkedzyrewbohg.supabase.co";
const SUPABASE_KEY = "sb_publishable_vvwesppVCeZQocmRTOvu1g_MYX-yFaf";
const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ======== STATE ========
const state = {
  currentView: "library",
  authView: "login",  // "login" | "register" | "forgot" | "reset"
  user: null,         // alias -> state.kids[state.activeKidIndex]
  kids: [],           // array of kid profiles
  activeKidIndex: 0,
  userId: null,       // server-side user ID
  username: null,     // for display (parent email name)
  currentStory: null,
  currentPage: 0,
  fontSize: "medium",
  lineSpacing: "normal",
  quizState: null,
  readingStartTime: null,
  sidebarOpen: false,
  parentUnlocked: false,
  theme: matchMedia("(prefers-color-scheme:dark)").matches ? "dark" : "light",
  vocabPopup: null,
  filterLevel: "all",
  filterTopic: "all",
  // Phase 2
  voiceRecording: null,     // { isReading, done, liveTranscript, timerOnly, feedback, accuracy, wpm, ... }
  petAnimation: null        // for bounce/wiggle animations
};

// ======== DEFAULT USER ========
function createDefaultUser(name) {
  return {
    name: name,
    xp: 0,
    avatar: { hat: "none", background: "default", companion: "none", face: "😊" },
    storyProgress: {},
    wordsLearned: [],
    badgesEarned: [],
    readingDays: [],
    activityLog: [],
    quizScores: {},
    totalMinutesRead: 0,
    purchasedItems: ["none", "default"],
    theme: "pink",
    birthday: null,  // ISO date string e.g. "2018-05-15"
    // Phase 2
    recordingsCount: 0,
    bestVoiceAccuracy: 0,
    voiceHistory: [],
    pet: null,  // { typeId, name, happiness, xp, feedings, accessory, adoptedAt }
    petFeedingsTotal: 0,
    // Science Lab
    science: {
      elementsLearned: [],
      compoundsDiscovered: [],
      recipesDiscovered: [],
      quizScores: {},
      stateSorterPerfect: false
    },
    // Word Adventure
    english: {
      challengeScores: {},
      totalChallengesCompleted: 0,
      vocabCompleted: 0,
      spellingCompleted: 0,
      grammarCompleted: 0,
      perfectScores: 0,
      totalStars: 0
    },
    // Math Galaxy
    math: {
      lessonsCompleted: 0,
      gamesCompleted: 0,
      perfectGames: 0,
      totalStars: 0,
      gameScores: {},
      completedIds: {}
    }
  };
}

// ======== PERSISTENCE (Supabase-backed) ========
let _saveDebounce = null;
function _doSave() {
  if (!state.userId || state.kids.length === 0) return;
  const payload = { kids: state.kids, activeKidIndex: state.activeKidIndex };
  sb.from("progress")
    .upsert({ id: state.userId, data: payload, updated_at: new Date().toISOString() })
    .then(({ error }) => { if (error) console.warn("Auto-save failed:", error.message); });
}
function saveState() {
  if (!state.userId || state.kids.length === 0) return;
  clearTimeout(_saveDebounce);
  _saveDebounce = setTimeout(_doSave, 800);
}
// Flush immediately — use before kid switch or important milestones
function saveStateNow() {
  if (!state.userId || state.kids.length === 0) return;
  clearTimeout(_saveDebounce);
  _doSave();
}

// ======== HELPERS ========
function getUserLevel() {
  if (!state.user) return LEVELS[0];
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (state.user.xp >= LEVELS[i].xpRequired) return LEVELS[i];
  }
  return LEVELS[0];
}

function getNextLevel() {
  const current = getUserLevel();
  const idx = LEVELS.findIndex(l => l.level === current.level);
  return idx < LEVELS.length - 1 ? LEVELS[idx + 1] : null;
}

function getXpProgress() {
  const current = getUserLevel();
  const next = getNextLevel();
  if (!next) return 100;
  const progress = state.user.xp - current.xpRequired;
  const needed = next.xpRequired - current.xpRequired;
  return Math.min(100, Math.round((progress / needed) * 100));
}

function awardXP(amount, reason, activityKey) {
  state.user.xp += amount;
  logActivity(`Earned ${amount} XP: ${reason}`);
  showToast("⭐", `+${amount} XP`, reason);

  // Pet XP dedup: only give pet XP for first-time activities
  if (activityKey) {
    if (!state.user.completedActivities) state.user.completedActivities = [];
    if (!state.user.completedActivities.includes(activityKey)) {
      state.user.completedActivities.push(activityKey);
      givePetXP(amount);
    }
    // else: repeated activity, skip pet XP
  } else {
    givePetXP(amount);
  }

  checkBadges();
  saveState();
  renderSidebar();
}

function logActivity(text) {
  if (!state.user) return;
  state.user.activityLog.unshift({
    text: text,
    time: new Date().toLocaleString()
  });
  if (state.user.activityLog.length > 50) state.user.activityLog.pop();
}

function recordReadingDay() {
  const today = new Date().toDateString();
  if (!state.user.readingDays.includes(today)) {
    state.user.readingDays.push(today);
  }
}

function getStreak() {
  if (!state.user || state.user.readingDays.length === 0) return 0;
  const days = state.user.readingDays.map(d => new Date(d).getTime()).sort((a, b) => b - a);
  let streak = 1;
  const ONE_DAY = 86400000;
  for (let i = 0; i < days.length - 1; i++) {
    if (days[i] - days[i + 1] <= ONE_DAY * 1.5) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

function getTopicsRead() {
  if (!state.user) return [];
  const topics = new Set();
  Object.keys(state.user.storyProgress).forEach(id => {
    const story = STORIES.find(s => s.id === id);
    if (story && state.user.storyProgress[id].status === "completed") {
      topics.add(story.topic);
    }
  });
  return [...topics];
}

function getCompletedCount() {
  if (!state.user) return 0;
  return Object.values(state.user.storyProgress).filter(p => p.status === "completed").length;
}

function getRecommendedStory() {
  const completed = Object.keys(state.user.storyProgress).filter(
    id => state.user.storyProgress[id].status === "completed"
  );
  const maxLevel = completed.length === 0 ? 1 :
    Math.max(...completed.map(id => STORIES.find(s => s.id === id)?.level || 1));
  const nextLevel = Math.min(3, maxLevel + (completed.length >= 2 ? 1 : 0));

  return STORIES.find(s =>
    !completed.includes(s.id) && s.level <= nextLevel
  ) || STORIES.find(s => !completed.includes(s.id));
}

// ======== BADGES ========
function checkBadges() {
  if (!state.user) return;
  const completed = getCompletedCount();
  const streak = getStreak();
  const topics = getTopicsRead();
  const maxLevelReached = completed === 0 ? 1 :
    Math.max(...Object.keys(state.user.storyProgress)
      .filter(id => state.user.storyProgress[id].status === "completed")
      .map(id => STORIES.find(s => s.id === id)?.level || 1));
  const hasPerfect = Object.values(state.user.quizScores).some(s => s.perfect);
  const hasFastRead = Object.values(state.user.storyProgress).some(p => p.readTime && p.readTime < 300);

  BADGES.forEach(badge => {
    if (state.user.badgesEarned.includes(badge.id)) return;
    let earned = false;
    switch (badge.requirement.type) {
      case "stories_completed":
        earned = completed >= badge.requirement.count;
        break;
      case "perfect_quiz":
        earned = hasPerfect;
        break;
      case "words_learned":
        earned = state.user.wordsLearned.length >= badge.requirement.count;
        break;
      case "streak":
        earned = streak >= badge.requirement.count;
        break;
      case "level_reached":
        earned = maxLevelReached >= badge.requirement.count;
        break;
      case "fast_read":
        earned = hasFastRead;
        break;
      case "topics_read":
        earned = topics.length >= badge.requirement.count;
        break;
      case "recordings_made":
        earned = (state.user.recordingsCount || 0) >= badge.requirement.count;
        break;
      case "voice_accuracy":
        earned = (state.user.bestVoiceAccuracy || 0) >= badge.requirement.count;
        break;
      case "pet_adopted":
        earned = state.user.pet !== null;
        break;
      case "pet_stage":
        if (state.user.pet) {
          const stageIdx = getPetStageIndex();
          earned = stageIdx >= badge.requirement.count - 1;
        }
        break;
      case "pet_feedings":
        earned = (state.user.petFeedingsTotal || 0) >= badge.requirement.count;
        break;
    }
    if (earned) {
      state.user.badgesEarned.push(badge.id);
      showRewardCelebration(badge.icon, "Badge Earned!", badge.name, "badge");
      logActivity(`Earned badge: ${badge.name}`);
    }
  });
  // Also check science badges
  if (typeof checkScienceBadges === "function") checkScienceBadges();
  if (typeof checkMathBadges === "function") checkMathBadges();
  // Also check English badges
  if (typeof checkEnglishBadges === "function") checkEnglishBadges();
}

// ======== TOAST ========
function showToast(icon, title, message) {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
  `;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add("hiding");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ======== AGE & BIRTHDAY UTILITIES ========
function getUserAge() {
  if (!state.user || !state.user.birthday) return null;
  const bday = new Date(state.user.birthday);
  const today = new Date();
  let age = today.getFullYear() - bday.getFullYear();
  const monthDiff = today.getMonth() - bday.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < bday.getDate())) age--;
  return age;
}

function getAgeGroup() {
  const age = getUserAge();
  if (age === null) return "all"; // No birthday set, show everything
  if (age <= 5)  return "early";        // Pre-K/K: Level 1 stories, beginner science
  if (age <= 7)  return "developing";   // 1st-2nd grade: Level 1-2 stories, beginner science
  if (age <= 9)  return "proficient";   // 3rd-4th grade: Level 1-3 stories, beginner+intermediate science
  return "advanced";                     // 10+: All stories, all science tiers
}

function getStoryLevelsForAge() {
  const group = getAgeGroup();
  switch (group) {
    case "early":      return [1];
    case "developing": return [1, 2];
    case "proficient": return [1, 2, 3];
    case "advanced":   return [1, 2, 3, 4, 5];
    default:           return [1, 2, 3, 4, 5];
  }
}

function getScienceTiersForAge() {
  const group = getAgeGroup();
  switch (group) {
    case "early":      return ["beginner"];
    case "developing": return ["beginner"];
    case "proficient": return ["beginner", "intermediate"];
    case "advanced":   return ["beginner", "intermediate", "advanced"];
    default:           return ["beginner", "intermediate", "advanced"];
  }
}

function getAgeGroupLabel() {
  const group = getAgeGroup();
  const age = getUserAge();
  switch (group) {
    case "early":      return { label: "Early Reader", desc: "Ages 4-5", emoji: "\u{1F423}" };
    case "developing": return { label: "Developing Reader", desc: "Ages 6-7", emoji: "\u{1F4D6}" };
    case "proficient": return { label: "Proficient Reader", desc: "Ages 8-9", emoji: "\u{1F4DA}" };
    case "advanced":   return { label: "Advanced Reader", desc: "Ages 10+", emoji: "\u{1F680}" };
    default:           return { label: "All Levels", desc: "Set birthday to personalize", emoji: "\u{2B50}" };
  }
}

function formatBirthday(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function setBirthday(dateStr) {
  if (!state.user) return;
  state.user.birthday = dateStr || null;
  saveState();
  render();
  if (dateStr) {
    const info = getAgeGroupLabel();
    showToast(info.emoji, "Birthday Saved!", "Content level: " + info.label);
  }
}

// ======== MULTI-KID HELPERS ========

// ======== BIRTHDAY PICKER HELPER ========
function renderBirthdayPicker(idPrefix, existingValue) {
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const currentYear = new Date().getFullYear();
  const minYear = currentYear - 18;
  const maxYear = currentYear - 2;
  let selMonth = "", selDay = "", selYear = "";
  if (existingValue) {
    const parts = existingValue.split("-");
    if (parts.length === 3) { selYear = parts[0]; selMonth = String(parseInt(parts[1])); selDay = String(parseInt(parts[2])); }
  }
  let html = '<div class="birthday-picker" style="display:flex;gap:var(--space-2);justify-content:center;flex-wrap:wrap">';
  // Month
  html += '<select class="welcome-input" id="' + idPrefix + '-month" style="width:auto;flex:1;min-width:100px;text-align:left;padding:var(--space-2) var(--space-3)" onchange="syncBirthdayPicker(\'' + idPrefix + '\')">';
  html += '<option value="">Month</option>';
  months.forEach((m, i) => { html += '<option value="' + (i+1) + '"' + (selMonth === String(i+1) ? ' selected' : '') + '>' + m + '</option>'; });
  html += '</select>';
  // Day
  html += '<select class="welcome-input" id="' + idPrefix + '-day" style="width:auto;flex:0.6;min-width:70px;text-align:left;padding:var(--space-2) var(--space-3)" onchange="syncBirthdayPicker(\'' + idPrefix + '\')">';
  html += '<option value="">Day</option>';
  for (let d = 1; d <= 31; d++) { html += '<option value="' + d + '"' + (selDay === String(d) ? ' selected' : '') + '>' + d + '</option>'; }
  html += '</select>';
  // Year
  html += '<select class="welcome-input" id="' + idPrefix + '-year" style="width:auto;flex:0.7;min-width:80px;text-align:left;padding:var(--space-2) var(--space-3)" onchange="syncBirthdayPicker(\'' + idPrefix + '\')">';
  html += '<option value="">Year</option>';
  for (let y = maxYear; y >= minYear; y--) { html += '<option value="' + y + '"' + (selYear === String(y) ? ' selected' : '') + '>' + y + '</option>'; }
  html += '</select>';
  html += '</div>';
  // Hidden input for the combined value
  html += '<input type="hidden" id="' + idPrefix + '">';
  return html;
}

function syncBirthdayPicker(idPrefix) {
  const m = document.getElementById(idPrefix + "-month");
  const d = document.getElementById(idPrefix + "-day");
  const y = document.getElementById(idPrefix + "-year");
  const hidden = document.getElementById(idPrefix);
  if (!m || !d || !y || !hidden) return;
  if (m.value && d.value && y.value) {
    hidden.value = y.value + "-" + String(m.value).padStart(2,"0") + "-" + String(d.value).padStart(2,"0");
  } else {
    hidden.value = "";
  }
  // If this is the profile birthday, update it live
  if (idPrefix === "profile-birthday" && typeof setBirthday === "function") {
    setBirthday(hidden.value);
  }
}

function migrateToMultiKid(rawData) {
  // Already multi-kid format
  if (rawData && rawData.kids && Array.isArray(rawData.kids)) {
    return rawData;
  }
  // Old single-user format: wrap in kids array
  if (rawData && rawData.name) {
    return { kids: [rawData], activeKidIndex: 0 };
  }
  // No data at all
  return { kids: [], activeKidIndex: 0 };
}

function loadKidsFromData(rawData) {
  const migrated = migrateToMultiKid(rawData);
  state.kids = migrated.kids;
  state.activeKidIndex = migrated.activeKidIndex || 0;
  // Ensure fields on each kid
  state.kids.forEach(kid => {
    if (!kid.theme) kid.theme = "pink";
    if (kid.birthday === undefined) kid.birthday = null;
    if (!kid.avatar) kid.avatar = { hat: "none", background: "default", companion: "none", face: "\u{1F60A}" };
    if (!kid.storyProgress) kid.storyProgress = {};
    if (!kid.wordsLearned) kid.wordsLearned = [];
    if (!kid.badgesEarned) kid.badgesEarned = [];
    if (!kid.readingDays) kid.readingDays = [];
    if (!kid.activityLog) kid.activityLog = [];
    if (!kid.quizScores) kid.quizScores = {};
    if (!kid.purchasedItems) kid.purchasedItems = ["none", "default"];
    if (kid.pet === undefined) kid.pet = null;
    if (!kid.science) kid.science = { elementsLearned: [], compoundsDiscovered: [], recipesDiscovered: [], quizScores: {}, stateSorterPerfect: false };
    if (!kid.english) kid.english = { challengeScores: {}, totalChallengesCompleted: 0, vocabCompleted: 0, spellingCompleted: 0, grammarCompleted: 0, perfectScores: 0, totalStars: 0 };
    if (!kid.math) kid.math = { lessonsCompleted: 0, gamesCompleted: 0, perfectGames: 0, totalStars: 0, gameScores: {}, completedIds: {} };
  });
  if (state.kids.length > 0) {
    state.user = state.kids[state.activeKidIndex];
    applyTheme(state.user.theme);
  } else {
    state.user = null;
  }
}

function switchKid(index) {
  if (index < 0 || index >= state.kids.length) return;
  saveStateNow(); // flush any pending saves before switching
  state.activeKidIndex = index;
  state.user = state.kids[index];
  applyTheme(state.user.theme);
  state.currentView = "library";
  state.parentUnlocked = false;
  saveState();
  render();
  showToast("\u{1F44B}", "Switched!", "Welcome, " + state.user.name + "!");
}

function addKid(name, birthday, theme) {
  const kid = createDefaultUser(name);
  kid.birthday = birthday || null;
  kid.theme = theme || "pink";
  state.kids.push(kid);
  state.activeKidIndex = state.kids.length - 1;
  state.user = state.kids[state.activeKidIndex];
  applyTheme(state.user.theme);
  saveState();
}

function removeKid(index) {
  if (state.kids.length <= 1) return; // Must keep at least one
  state.kids.splice(index, 1);
  if (state.activeKidIndex >= state.kids.length) {
    state.activeKidIndex = state.kids.length - 1;
  }
  state.user = state.kids[state.activeKidIndex];
  applyTheme(state.user.theme);
  saveState();
}

// ======== CONFETTI ========
function showConfetti() {
  const container = document.createElement("div");
  container.className = "confetti-container";
  document.body.appendChild(container);
  const theme = (state.user && state.user.theme) || "pink";
  const colors = theme === "blue"
    ? ["#3a8ec2", "#2bb5a0", "#5aade0", "#42d4be", "#72bde8", "#e0f0fa"]
    : ["#e4637e", "#f0906a", "#f5a882", "#5bb87a", "#f8bb9a", "#fde8ed"];
  for (let i = 0; i < 60; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.style.left = Math.random() * 100 + "%";
    piece.style.setProperty("--fall-duration", (2 + Math.random() * 2) + "s");
    piece.style.setProperty("--fall-delay", Math.random() * 0.5 + "s");
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
    piece.style.width = (6 + Math.random() * 8) + "px";
    piece.style.height = (6 + Math.random() * 8) + "px";
    container.appendChild(piece);
  }
  setTimeout(() => container.remove(), 4000);
}

// ======== THEME ========
function initTheme() {
  document.documentElement.setAttribute("data-theme", state.theme);
}

function toggleTheme() {
  state.theme = state.theme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", state.theme);
  renderSidebar();
}

// ======== SIDEBAR ========
function toggleSidebar() {
  state.sidebarOpen = !state.sidebarOpen;
  document.querySelector(".sidebar").classList.toggle("open", state.sidebarOpen);
  document.querySelector(".sidebar-overlay").classList.toggle("open", state.sidebarOpen);
}

function closeSidebar() {
  state.sidebarOpen = false;
  document.querySelector(".sidebar").classList.remove("open");
  document.querySelector(".sidebar-overlay").classList.remove("open");
}

// ======== NAVIGATION ========
function navigate(view) {
  state.currentView = view;
  state.vocabPopup = null;
  if (typeof stopAllVoice === "function") stopAllVoice();
  state.voiceRecording = null;
  closeSidebar();
  render();
}

// ======== RENDER ENGINE ========
function render() {
  if (!state.user) {
    renderWelcome();
    return;
  }
  renderSidebar();
  const main = document.getElementById("main-content");

  switch (state.currentView) {
    case "library":
      renderLibrary(main);
      break;
    case "reading":
      renderReading(main);
      break;
    case "quiz":
      renderQuiz(main);
      break;
    case "badges":
      renderBadges(main);
      break;
    case "profile":
      renderProfile(main);
      break;
    case "pet":
      renderPet(main);
      break;
    case "parent":
      renderParent(main);
      break;
    // Science Lab views
    case "science":
      initScienceProgress();
      renderScienceHome(main);
      break;
    case "science-elements-beginner":
      initScienceProgress();
      renderElementStudy(main, "beginner");
      break;
    case "science-elements-intermediate":
      initScienceProgress();
      renderElementStudy(main, "intermediate");
      break;
    case "science-elements-advanced":
      initScienceProgress();
      renderElementStudy(main, "advanced");
      break;
    case "science-states":
      initScienceProgress();
      renderStatesOfMatter(main);
      break;
    case "science-compounds":
      initScienceProgress();
      renderCompoundBrowser(main);
      break;
    case "science-quiz-beginner":
      initScienceProgress();
      renderElementQuiz(main, "beginner");
      break;
    case "science-quiz-intermediate":
      initScienceProgress();
      renderElementQuiz(main, "intermediate");
      break;
    case "science-quiz-advanced":
      initScienceProgress();
      renderElementQuiz(main, "advanced");
      break;
    case "science-sorter":
      initScienceProgress();
      renderStateSorter(main);
      break;
    case "science-mixlab":
      initScienceProgress();
      renderMixLab(main);
      break;
    case "science-equation":
      initScienceProgress();
      renderEquationBuilder(main);
      break;
    // Word Adventure views
    case "english":
      initEnglishProgress();
      renderEnglishHome(main);
      break;
    case "english-world":
      initEnglishProgress();
      renderEnglishWorld(main);
      break;
    case "english-challenge":
      initEnglishProgress();
      renderEnglishChallenge(main);
      break;
    // Math Galaxy views
    case "math":
      initMathProgress();
      renderMathHome(main);
      break;
    case "math-lesson":
      initMathProgress();
      renderMathLesson(main);
      break;
    case "math-game":
      initMathProgress();
      renderMathGame(main);
      break;
    default:
      renderLibrary(main);
  }
}

// ======== AUTH SCREENS ========
function renderWelcome() {
  if (state.authView === "register") {
    renderRegister();
  } else if (state.authView === "forgot") {
    renderForgotPassword();
  } else if (state.authView === "reset") {
    renderResetPassword();
  } else {
    renderLogin();
  }
}

function renderLogin() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="welcome-screen">
      <div style="font-size:4rem;margin-bottom:var(--space-4)">📚</div>
      <h1>Welcome to Story Quest!</h1>
      <p>Sign in to continue your reading adventure.</p>
      <div id="auth-error" class="auth-error" style="display:none"></div>
      <input type="email" class="welcome-input" id="login-email" placeholder="Email address" maxlength="100" autocomplete="email">
      <input type="password" class="welcome-input" id="login-password" placeholder="Password" maxlength="50" autocomplete="current-password" style="margin-top:var(--space-2)">
      <br>
      <button class="welcome-btn" id="login-btn" disabled>Sign In</button>
      <p class="auth-switch"><a href="#" id="go-forgot">Forgot password?</a></p>
      <p class="auth-switch">Don\u2019t have an account? <a href="#" id="go-register">Create one</a></p>
    </div>
    <div id="toast-container" class="toast-container"></div>
  `;
  const eInput = document.getElementById("login-email");
  const pInput = document.getElementById("login-password");
  const btn = document.getElementById("login-btn");
  const validate = () => {
    btn.disabled = !eInput.value.trim() || !pInput.value.trim();
  };
  eInput.addEventListener("input", validate);
  pInput.addEventListener("input", validate);
  pInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !btn.disabled) doLogin();
  });
  btn.addEventListener("click", doLogin);
  document.getElementById("go-register").addEventListener("click", (e) => {
    e.preventDefault();
    state.authView = "register";
    renderWelcome();
  });
  document.getElementById("go-forgot").addEventListener("click", (e) => {
    e.preventDefault();
    state.authView = "forgot";
    renderWelcome();
  });
  eInput.focus();
}

function renderRegister() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="welcome-screen">
      <div style="font-size:4rem;margin-bottom:var(--space-4)">📚</div>
      <h1>Create Your Account</h1>
      <p>Set up your reading profile to save your progress.</p>
      <div id="auth-error" class="auth-error" style="display:none"></div>
      <input type="text" class="welcome-input" id="reg-display" placeholder="Child\u2019s name (shown in app)" maxlength="30" autocomplete="off">
      <input type="email" class="welcome-input" id="reg-email" placeholder="Parent\u2019s email address" maxlength="100" autocomplete="email" style="margin-top:var(--space-2)">
      <input type="password" class="welcome-input" id="reg-password" placeholder="Choose a password (6+ characters)" maxlength="50" autocomplete="new-password" style="margin-top:var(--space-2)">
      <input type="password" class="welcome-input" id="reg-password2" placeholder="Confirm password" maxlength="50" autocomplete="new-password" style="margin-top:var(--space-2)">
      <div style="margin-top:var(--space-3)">
        <label style="font-size:var(--text-sm);color:var(--color-text-muted);display:block;margin-bottom:var(--space-2)">Child's birthday (helps us pick the right content level)</label>
        ${renderBirthdayPicker("reg-birthday", "")}
      </div>
      <br>
      <button class="welcome-btn" id="reg-btn" disabled>Create Account</button>
      <p class="auth-switch">Already have an account? <a href="#" id="go-login">Sign in</a></p>
    </div>
    <div id="toast-container" class="toast-container"></div>
  `;
  const dInput = document.getElementById("reg-display");
  const eInput = document.getElementById("reg-email");
  const pInput = document.getElementById("reg-password");
  const p2Input = document.getElementById("reg-password2");
  const btn = document.getElementById("reg-btn");
  const validate = () => {
    btn.disabled = !dInput.value.trim() || !eInput.value.trim() || pInput.value.length < 6 || pInput.value !== p2Input.value;
  };
  [dInput, eInput, pInput, p2Input].forEach(inp => inp.addEventListener("input", validate));
  p2Input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !btn.disabled) doRegister();
  });
  btn.addEventListener("click", doRegister);
  document.getElementById("go-login").addEventListener("click", (e) => {
    e.preventDefault();
    state.authView = "login";
    renderWelcome();
  });
  dInput.focus();
}

function showAuthError(msg) {
  const el = document.getElementById("auth-error");
  if (el) { el.textContent = msg; el.style.display = "block"; }
}

async function doLogin() {
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;
  const btn = document.getElementById("login-btn");
  btn.disabled = true;
  btn.textContent = "Signing in...";
  try {
    const { data, error } = await sb.auth.signInWithPassword({ email, password });
    if (error) {
      showAuthError("Invalid email or password");
      btn.disabled = false;
      btn.textContent = "Sign In";
      return;
    }
    const user = data.user;
    state.userId = user.id;
    state.username = user.user_metadata.display_name || email.split("@")[0];
    // Load progress
    const { data: prog } = await sb.from("progress").select("data").eq("id", user.id).single();
    loadKidsFromData(prog ? prog.data : null);
    if (state.kids.length === 0) {
      // Brand new account — go to add-kid flow
      state.currentView = "add-first-kid";
      renderAddFirstKid();
    } else if (state.kids.length === 1) {
      // Single kid — go straight in
      recordReadingDay();
      saveState();
      enterApp();
    } else {
      // Multiple kids — show picker
      renderKidPicker();
    }
  } catch (e) {
    showAuthError("Could not connect. Please try again.");
    btn.disabled = false;
    btn.textContent = "Sign In";
  }
}

async function doRegister() {
  const display_name = document.getElementById("reg-display").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const password = document.getElementById("reg-password").value;
  const password2 = document.getElementById("reg-password2").value;
  if (password !== password2) { showAuthError("Passwords don\u2019t match."); return; }
  if (password.length < 6) { showAuthError("Password must be at least 6 characters."); return; }

  const btn = document.getElementById("reg-btn");
  btn.disabled = true;
  btn.textContent = "Creating account...";
  try {
    const { data, error } = await sb.auth.signUp({
      email,
      password,
      options: {
        data: { display_name }
      }
    });
    if (error) {
      showAuthError(error.message || "Registration failed");
      btn.disabled = false;
      btn.textContent = "Create Account";
      return;
    }
    const user = data.user;
    state.userId = user.id;
    state.username = display_name;
    // Create first kid profile
    const birthdayVal = document.getElementById("reg-birthday") ? document.getElementById("reg-birthday").value : "";
    addKid(display_name, birthdayVal, "pink");
    recordReadingDay();
    // Small delay to let trigger create the rows
    await new Promise(r => setTimeout(r, 500));
    saveState();
    enterApp();
  } catch (e) {
    showAuthError("Could not connect. Please try again.");
    btn.disabled = false;
    btn.textContent = "Create Account";
  }
}

// ======== KID PICKER SCREEN ========
function renderKidPicker() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="welcome-screen" style="max-width:600px">
      <div style="font-size:3rem;margin-bottom:var(--space-3)">\u{1F46A}</div>
      <h1 style="font-size:var(--text-xl);margin-bottom:var(--space-2)">Who's learning today?</h1>
      <p style="color:var(--color-text-muted);margin-bottom:var(--space-6)">Pick your profile to continue.</p>
      <div class="kid-picker-grid">
        ${state.kids.map((kid, i) => {
          const bgItem = AVATAR_ITEMS.backgrounds.find(b => b.id === kid.avatar.background);
          const bgStyle = bgItem ? bgItem.color : "#a8d8a8";
          return `
            <button class="kid-picker-card" onclick="selectKid(${i})">
              <div class="kid-picker-avatar" style="background:${bgStyle}">
                ${kid.avatar.hat !== "none" ? '<span class="avatar-hat">' + (AVATAR_ITEMS.hats.find(h => h.id === kid.avatar.hat) || {}).emoji + '</span>' : ''}
                <span>${kid.avatar.face}</span>
              </div>
              <div class="kid-picker-name">${kid.name}</div>
              <div class="kid-picker-info">${kid.birthday ? getAgeGroupLabelForKid(kid).label : 'No birthday set'}</div>
            </button>
          `;
        }).join("")}
        <button class="kid-picker-card kid-picker-add" onclick="showAddKidForm()">
          <div class="kid-picker-avatar" style="background:var(--color-surface-2);border:2px dashed var(--color-border)">
            <span style="font-size:2rem;color:var(--color-text-muted)">+</span>
          </div>
          <div class="kid-picker-name" style="color:var(--color-text-muted)">Add Kid</div>
        </button>
      </div>
      <button class="theme-toggle-btn" style="margin-top:var(--space-6)" onclick="doLogout()">
        <i data-lucide="log-out" style="width:16px;height:16px"></i>
        <span>Sign Out</span>
      </button>
    </div>
    <div id="toast-container" class="toast-container"></div>
  `;
  lucide.createIcons();
}

function getAgeGroupLabelForKid(kid) {
  if (!kid.birthday) return { label: "All Levels", desc: "Set birthday to personalize", emoji: "\u{2B50}" };
  const bday = new Date(kid.birthday);
  const today = new Date();
  let age = today.getFullYear() - bday.getFullYear();
  const monthDiff = today.getMonth() - bday.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < bday.getDate())) age--;
  if (age <= 5)  return { label: "Early Reader (age " + age + ")", emoji: "\u{1F423}" };
  if (age <= 7)  return { label: "Developing Reader (age " + age + ")", emoji: "\u{1F4D6}" };
  if (age <= 9)  return { label: "Proficient Reader (age " + age + ")", emoji: "\u{1F4DA}" };
  return { label: "Advanced Reader (age " + age + ")", emoji: "\u{1F680}" };
}

function selectKid(index) {
  state.activeKidIndex = index;
  state.user = state.kids[index];
  applyTheme(state.user.theme);
  recordReadingDay();
  saveState();
  enterApp();
}

// ======== ADD FIRST KID (new accounts) ========
function renderAddFirstKid() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="welcome-screen">
      <div style="font-size:3rem;margin-bottom:var(--space-3)">\u{1F389}</div>
      <h1 style="font-size:var(--text-xl)">Welcome! Let's set up a profile.</h1>
      <p style="color:var(--color-text-muted)">Create a profile for your child to get started.</p>
      <div id="auth-error" class="auth-error" style="display:none"></div>
      <input type="text" class="welcome-input" id="kid-name" placeholder="Child's name" maxlength="30" autocomplete="off">
      <div style="margin-top:var(--space-3)">
        <label style="font-size:var(--text-sm);color:var(--color-text-muted);display:block;margin-bottom:var(--space-2)">Birthday (helps pick the right content level)</label>
        ${renderBirthdayPicker("kid-birthday", "")}
      </div>
      <div style="margin-top:var(--space-3)">
        <label style="font-size:var(--text-sm);color:var(--color-text-muted);display:block;margin-bottom:var(--space-2)">Color Theme</label>
        <div class="theme-options">
          <button class="theme-option selected" id="theme-pink" onclick="pickThemeOption('pink')">
            <div class="theme-swatch"><span style="background:#e4637e"></span><span style="background:#f0906a"></span><span style="background:#fde8ed"></span></div>
            <span class="theme-option-label">Pink & Coral</span>
          </button>
          <button class="theme-option" id="theme-blue" onclick="pickThemeOption('blue')">
            <div class="theme-swatch"><span style="background:#3a8ec2"></span><span style="background:#2bb5a0"></span><span style="background:#e0f0fa"></span></div>
            <span class="theme-option-label">Blue & Teal</span>
          </button>
        </div>
      </div>
      <br>
      <button class="welcome-btn" id="add-kid-btn" disabled onclick="doAddKid()">Create Profile</button>
    </div>
    <div id="toast-container" class="toast-container"></div>
  `;
  const nameInput = document.getElementById("kid-name");
  nameInput.addEventListener("input", () => {
    document.getElementById("add-kid-btn").disabled = !nameInput.value.trim();
  });
  nameInput.focus();
  window._selectedTheme = "pink";
}

function pickThemeOption(theme) {
  window._selectedTheme = theme;
  document.getElementById("theme-pink").classList.toggle("selected", theme === "pink");
  document.getElementById("theme-blue").classList.toggle("selected", theme === "blue");
}

function doAddKid() {
  const name = document.getElementById("kid-name").value.trim();
  if (!name) return;
  const birthday = document.getElementById("kid-birthday") ? document.getElementById("kid-birthday").value : "";
  const theme = window._selectedTheme || "pink";
  addKid(name, birthday, theme);
  recordReadingDay();
  saveState();
  enterApp();
}

function showAddKidFromDashboard() {
  // Same as showAddKidForm but returns to dashboard instead of picker
  showAddKidForm(true);
}

// ======== ADD KID FORM (from picker / sidebar) ========
function showAddKidForm(fromDashboard) {
  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="welcome-screen">
      <div style="font-size:3rem;margin-bottom:var(--space-3)">\u{2795}</div>
      <h1 style="font-size:var(--text-xl)">Add a New Kid</h1>
      <p style="color:var(--color-text-muted)">Create a new profile with their own progress and theme.</p>
      <input type="text" class="welcome-input" id="kid-name" placeholder="Child's name" maxlength="30" autocomplete="off">
      <div style="margin-top:var(--space-3)">
        <label style="font-size:var(--text-sm);color:var(--color-text-muted);display:block;margin-bottom:var(--space-2)">Birthday</label>
        ${renderBirthdayPicker("kid-birthday", "")}
      </div>
      <div style="margin-top:var(--space-3)">
        <label style="font-size:var(--text-sm);color:var(--color-text-muted);display:block;margin-bottom:var(--space-2)">Color Theme</label>
        <div class="theme-options">
          <button class="theme-option selected" id="theme-pink" onclick="pickThemeOption('pink')">
            <div class="theme-swatch"><span style="background:#e4637e"></span><span style="background:#f0906a"></span><span style="background:#fde8ed"></span></div>
            <span class="theme-option-label">Pink & Coral</span>
          </button>
          <button class="theme-option" id="theme-blue" onclick="pickThemeOption('blue')">
            <div class="theme-swatch"><span style="background:#3a8ec2"></span><span style="background:#2bb5a0"></span><span style="background:#e0f0fa"></span></div>
            <span class="theme-option-label">Blue & Teal</span>
          </button>
        </div>
      </div>
      <br>
      <button class="welcome-btn" id="add-kid-btn" disabled onclick="doAddKid()">Create Profile</button>
      <p class="auth-switch"><a href="#" id="back-to-picker" onclick="event.preventDefault(); ${fromDashboard ? 'enterApp(); navigate(\"parent\");' : 'renderKidPicker();'}">${fromDashboard ? 'Back to Dashboard' : 'Back to profiles'}</a></p>
    </div>
    <div id="toast-container" class="toast-container"></div>
  `;
  const nameInput = document.getElementById("kid-name");
  nameInput.addEventListener("input", () => {
    document.getElementById("add-kid-btn").disabled = !nameInput.value.trim();
  });
  nameInput.focus();
  window._selectedTheme = "pink";
}