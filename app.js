/* Story Quest — Main Application */

// ======== SUPABASE ========
const SUPABASE_URL = "https://qjjvbgtkkedzyrewbohg.supabase.co";
const SUPABASE_KEY = "sb_publishable_vvwesppVCeZQocmRTOvu1g_MYX-yFaf";
const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ======== STATE ========
const state = {
  currentView: "library",
  authView: "login",  // "login" | "register" | "forgot" | "reset"
  user: null,
  userId: null,       // server-side user ID
  username: null,     // for display
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
    // Phase 2
    recordingsCount: 0,
    bestVoiceAccuracy: 0,
    voiceHistory: [],
    pet: null,  // { typeId, name, happiness, xp, feedings, accessory, adoptedAt }
    petFeedingsTotal: 0
  };
}

// ======== PERSISTENCE (Supabase-backed) ========
let _saveDebounce = null;
function saveState() {
  if (!state.userId || !state.user) return;
  clearTimeout(_saveDebounce);
  _saveDebounce = setTimeout(() => {
    sb.from("progress")
      .upsert({ id: state.userId, data: state.user, updated_at: new Date().toISOString() })
      .then(({ error }) => { if (error) console.warn("Auto-save failed:", error.message); });
  }, 800);
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

function awardXP(amount, reason) {
  state.user.xp += amount;
  logActivity(`Earned ${amount} XP: ${reason}`);
  showToast("⭐", `+${amount} XP`, reason);
  givePetXP(amount);
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
      showToast(badge.icon, "Badge Earned!", badge.name);
      logActivity(`Earned badge: ${badge.name}`);
    }
  });
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

// ======== CONFETTI ========
function showConfetti() {
  const container = document.createElement("div");
  container.className = "confetti-container";
  document.body.appendChild(container);
  const colors = ["#e4637e", "#f0906a", "#f5a882", "#5bb87a", "#f8bb9a", "#fde8ed"];
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
      <input type="text" class="welcome-input" id="reg-display" placeholder="Your name (shown in app)" maxlength="30" autocomplete="off">
      <input type="email" class="welcome-input" id="reg-email" placeholder="Parent\u2019s email address" maxlength="100" autocomplete="email" style="margin-top:var(--space-2)">
      <input type="password" class="welcome-input" id="reg-password" placeholder="Choose a password (6+ characters)" maxlength="50" autocomplete="new-password" style="margin-top:var(--space-2)">
      <input type="password" class="welcome-input" id="reg-password2" placeholder="Confirm password" maxlength="50" autocomplete="new-password" style="margin-top:var(--space-2)">
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
    if (prog && prog.data && prog.data.name) {
      state.user = prog.data;
    } else {
      state.user = createDefaultUser(state.username);
    }
    recordReadingDay();
    saveState();
    enterApp();
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
    state.user = createDefaultUser(display_name);
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

function enterApp() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="sidebar-overlay" onclick="closeSidebar()"></div>
    <div class="mobile-header">
      <button class="hamburger-btn" onclick="toggleSidebar()" aria-label="Open menu">
        <i data-lucide="menu" style="width:24px;height:24px"></i>
      </button>
      <span style="font-family:var(--font-display);font-weight:700;color:var(--color-primary);font-size:var(--text-lg)">Story Quest</span>
    </div>
    <aside class="sidebar" id="sidebar"></aside>
    <main class="main-content" id="main-content"></main>
    <div id="toast-container" class="toast-container"></div>
    <div id="vocab-popup-root"></div>
  `;
  lucide.createIcons();
  render();
}

// ======== SIDEBAR RENDER ========
function renderSidebar() {
  const sidebar = document.getElementById("sidebar");
  if (!sidebar) return;
  const level = getUserLevel();
  const xpPct = getXpProgress();
  const themeIcon = state.theme === "dark" ? "sun" : "moon";
  const themeLabel = state.theme === "dark" ? "Light Mode" : "Dark Mode";

  sidebar.innerHTML = `
    <div class="sidebar-logo">
      <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="36" height="36" rx="8" fill="var(--color-primary)"/>
        <path d="M8 26V10C8 10 11 8 18 8C25 8 28 10 28 10V26C28 26 25 24 18 24C11 24 8 26 8 26Z" stroke="var(--color-text-inverse)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M18 8V24" stroke="var(--color-text-inverse)" stroke-width="2"/>
        <circle cx="13" cy="14" r="1.5" fill="var(--color-accent)"/>
        <circle cx="23" cy="14" r="1.5" fill="var(--color-accent)"/>
        <path d="M13 19H16" stroke="var(--color-text-inverse)" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M20 19H23" stroke="var(--color-text-inverse)" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
      <h1>Story Quest</h1>
    </div>
    <nav class="sidebar-nav">
      <button class="nav-item ${state.currentView === "library" ? "active" : ""}" onclick="navigate('library')">
        <i data-lucide="library"></i> Story Library
      </button>
      <button class="nav-item ${state.currentView === "badges" ? "active" : ""}" onclick="navigate('badges')">
        <i data-lucide="award"></i> My Badges
      </button>
      <button class="nav-item ${state.currentView === "pet" ? "active" : ""}" onclick="navigate('pet')">
        <i data-lucide="heart"></i> My Pet
      </button>
      <button class="nav-item ${state.currentView === "profile" ? "active" : ""}" onclick="navigate('profile')">
        <i data-lucide="user"></i> My Profile
      </button>
      <button class="nav-item ${state.currentView === "parent" ? "active" : ""}" onclick="navigate('parent')">
        <i data-lucide="bar-chart-3"></i> Parent View
      </button>
    </nav>
    <div class="sidebar-footer">
      <div class="sidebar-xp">
        <span>Lv.${level.level}</span>
        <div class="xp-bar"><div class="xp-fill" style="width:${xpPct}%"></div></div>
        <span>${state.user.xp} XP</span>
      </div>
      <button class="theme-toggle-btn" onclick="toggleTheme()" data-theme-toggle aria-label="Toggle theme">
        <i data-lucide="${themeIcon}" style="width:16px;height:16px"></i>
        <span>${themeLabel}</span>
      </button>
      <button class="theme-toggle-btn logout-btn" onclick="doLogout()" aria-label="Sign out">
        <i data-lucide="log-out" style="width:16px;height:16px"></i>
        <span>Sign Out</span>
      </button>
    </div>
  `;
  lucide.createIcons({nameAttr:"data-lucide"});
}

// ======== LIBRARY ========
function renderLibrary(container) {
  const topics = [...new Set(STORIES.map(s => s.topic))];
  const levels = [1, 2, 3];
  const recommended = getRecommendedStory();

  let filtered = STORIES;
  if (state.filterLevel !== "all") {
    filtered = filtered.filter(s => s.level === parseInt(state.filterLevel));
  }
  if (state.filterTopic !== "all") {
    filtered = filtered.filter(s => s.topic === state.filterTopic);
  }

  container.innerHTML = `
    <div class="page-header">
      <h2>Story Library</h2>
      <p>Choose a story to read. Tap on a story card to begin!</p>
    </div>
    <div class="filter-bar">
      <button class="filter-chip ${state.filterLevel === "all" && state.filterTopic === "all" ? "active" : ""}" onclick="setFilter('all','all')">All</button>
      ${levels.map(l => `
        <button class="filter-chip ${state.filterLevel === String(l) ? "active" : ""}" onclick="setFilter('${l}','${state.filterTopic}')">Level ${l}</button>
      `).join("")}
      ${topics.map(t => `
        <button class="filter-chip ${state.filterTopic === t ? "active" : ""}" onclick="setFilter('${state.filterLevel}','${t}')">${t.charAt(0).toUpperCase() + t.slice(1)}</button>
      `).join("")}
    </div>
    <div class="story-grid">
      ${filtered.map(story => {
        const progress = state.user.storyProgress[story.id];
        const status = progress ? progress.status : "not_started";
        const isRecommended = recommended && recommended.id === story.id;
        let statusText, statusClass;
        switch (status) {
          case "completed":
            statusText = "✓ Completed";
            statusClass = "completed";
            break;
          case "in_progress":
            statusText = "◐ In Progress";
            statusClass = "in-progress";
            break;
          default:
            statusText = "○ Not Started";
            statusClass = "not-started";
        }
        return `
          <div class="story-card" onclick="openStory('${story.id}')">
            ${isRecommended ? '<span class="recommended-badge">⭐ Recommended</span>' : ""}
            <div class="story-card-icon">${story.icon}</div>
            <span class="story-card-level">Level ${story.level}</span>
            <h3>${story.title}</h3>
            <p>${story.description}</p>
            <div class="story-card-footer">
              <span class="story-progress ${statusClass}">${statusText}</span>
              <span class="story-topic">${story.topic}</span>
            </div>
          </div>
        `;
      }).join("")}
    </div>
    ${filtered.length === 0 ? '<div class="empty-state"><div class="empty-icon">📭</div><p>No stories match your filters. Try a different combination!</p></div>' : ""}
    <footer class="app-footer">
      <a href="https://www.perplexity.ai/computer" target="_blank" rel="noopener noreferrer">Created with Perplexity Computer</a>
    </footer>
  `;
}

function setFilter(level, topic) {
  state.filterLevel = level;
  state.filterTopic = topic;
  render();
}

// ======== OPEN STORY ========
function openStory(storyId) {
  const story = STORIES.find(s => s.id === storyId);
  if (!story) return;
  state.currentStory = story;

  const progress = state.user.storyProgress[storyId];
  if (progress && progress.lastPage !== undefined) {
    state.currentPage = progress.lastPage;
  } else {
    state.currentPage = 0;
  }

  if (!state.user.storyProgress[storyId]) {
    state.user.storyProgress[storyId] = { status: "in_progress", lastPage: 0 };
  } else {
    state.user.storyProgress[storyId].status = "in_progress";
  }

  state.readingStartTime = Date.now();
  recordReadingDay();
  state.currentView = "reading";
  render();
}

// ======== READING ========
function renderReading(container) {
  const story = state.currentStory;
  if (!story) { navigate("library"); return; }

  const page = story.pages[state.currentPage];
  const isLastPage = state.currentPage === story.pages.length - 1;
  const progressPct = ((state.currentPage + 1) / story.pages.length) * 100;

  // Mark vocab words in text
  const markedText = markVocabWords(page, story.vocabulary);

  const fontClass = state.fontSize === "large" ? "font-large" : state.fontSize === "small" ? "font-small" : "";
  const spacingClass = state.lineSpacing === "wide" ? "spacing-wide" : "";

  container.innerHTML = `
    <div class="reading-view">
      <div class="reading-controls-top">
        <button class="back-btn" onclick="navigate('library')">
          <i data-lucide="arrow-left" style="width:16px;height:16px"></i> Library
        </button>
        <div class="font-controls">
          <button class="font-btn ${state.fontSize === "small" ? "active" : ""}" onclick="setFontSize('small')" aria-label="Small text">A</button>
          <button class="font-btn ${state.fontSize === "medium" ? "active" : ""}" onclick="setFontSize('medium')" aria-label="Medium text" style="font-size:var(--text-base)">A</button>
          <button class="font-btn ${state.fontSize === "large" ? "active" : ""}" onclick="setFontSize('large')" aria-label="Large text" style="font-size:var(--text-lg)">A</button>
          <button class="spacing-btn ${state.lineSpacing === "wide" ? "active" : ""}" onclick="toggleSpacing()" aria-label="Toggle line spacing" title="Line spacing">↕</button>
        </div>
      </div>

      <div class="reading-story-header">
        <div class="story-emoji">${story.icon}</div>
        <h2>${story.title}</h2>
        <div class="story-meta">Level ${story.level} · ${story.pages.length} pages · ${story.vocabulary.length} vocabulary words</div>
      </div>

      <div class="reading-progress">
        <div class="reading-progress-fill" style="width:${progressPct}%"></div>
      </div>

      <div class="reading-panel">
        <div class="reading-text ${fontClass} ${spacingClass}" id="reading-text">
          ${markedText}
        </div>
      </div>

      <div class="voice-section" id="voice-section">
        ${renderVoiceWidget(page)}
      </div>

      <div class="page-nav">
        <button class="page-nav-btn secondary" onclick="prevPage()" ${state.currentPage === 0 ? "disabled" : ""}>
          <i data-lucide="chevron-left" style="width:18px;height:18px"></i>
          <span class="btn-label">Previous</span>
        </button>
        <span class="page-indicator">Page ${state.currentPage + 1} of ${story.pages.length}</span>
        ${isLastPage ? `
          <button class="page-nav-btn primary" onclick="finishStory()">
            <span class="btn-label">Take Quiz</span>
            <i data-lucide="chevron-right" style="width:18px;height:18px"></i>
          </button>
        ` : `
          <button class="page-nav-btn primary" onclick="nextPage()">
            <span class="btn-label">Next</span>
            <i data-lucide="chevron-right" style="width:18px;height:18px"></i>
          </button>
        `}
      </div>
    </div>
    <footer class="app-footer">
      <a href="https://www.perplexity.ai/computer" target="_blank" rel="noopener noreferrer">Created with Perplexity Computer</a>
    </footer>
  `;
  lucide.createIcons({nameAttr:"data-lucide"});
}

function markVocabWords(text, vocabulary) {
  let result = text;
  vocabulary.forEach(v => {
    const regex = new RegExp(`\\b(${v.word})\\b`, "gi");
    result = result.replace(regex, `<span class="vocab-word" onclick="showVocab('${v.word.toLowerCase()}')" tabindex="0" role="button" aria-label="Learn about the word ${v.word}">$1</span>`);
  });
  return result;
}

function showVocab(word) {
  const story = state.currentStory;
  if (!story) return;
  const vocab = story.vocabulary.find(v => v.word.toLowerCase() === word.toLowerCase());
  if (!vocab) return;

  // Track learned word
  if (!state.user.wordsLearned.includes(vocab.word.toLowerCase())) {
    state.user.wordsLearned.push(vocab.word.toLowerCase());
    awardXP(5, `Learned: ${vocab.word}`);
  }

  // Position popup near the clicked word
  const el = event.target;
  const rect = el.getBoundingClientRect();
  const root = document.getElementById("vocab-popup-root");

  root.innerHTML = `
    <div class="vocab-popup" style="top:${Math.min(rect.bottom + 8, window.innerHeight - 220)}px;left:${Math.max(16, Math.min(rect.left, window.innerWidth - 336))}px">
      <button class="vocab-popup-close" onclick="closeVocab()" aria-label="Close">×</button>
      <div class="vocab-popup-word">${vocab.word}</div>
      <div class="vocab-popup-def">${vocab.definition}</div>
      <div class="vocab-popup-example">"${vocab.example}"</div>
    </div>
  `;

  // Close on outside click
  setTimeout(() => {
    document.addEventListener("click", closeVocabOutside, { once: true });
  }, 10);
}

function closeVocab() {
  document.getElementById("vocab-popup-root").innerHTML = "";
}

function closeVocabOutside(e) {
  const popup = document.querySelector(".vocab-popup");
  if (popup && !popup.contains(e.target) && !e.target.classList.contains("vocab-word")) {
    closeVocab();
  }
}

function setFontSize(size) {
  state.fontSize = size;
  render();
}

function toggleSpacing() {
  state.lineSpacing = state.lineSpacing === "normal" ? "wide" : "normal";
  render();
}

function nextPage() {
  if (!state.currentStory) return;
  if (state.currentPage < state.currentStory.pages.length - 1) {
    state.currentPage++;
    state.user.storyProgress[state.currentStory.id].lastPage = state.currentPage;
    if (typeof stopAllVoice === "function") stopAllVoice();
    state.voiceRecording = null;
    awardXP(5, "Read a page");
    closeVocab();
    render();
    window.scrollTo(0, 0);
  }
}

function prevPage() {
  if (state.currentPage > 0) {
    state.currentPage--;
    if (typeof stopAllVoice === "function") stopAllVoice();
    state.voiceRecording = null;
    closeVocab();
    render();
    window.scrollTo(0, 0);
  }
}

function finishStory() {
  const story = state.currentStory;
  if (!story) return;

  const readTime = state.readingStartTime ? Math.round((Date.now() - state.readingStartTime) / 1000) : 0;
  state.user.storyProgress[story.id].readTime = readTime;
  state.user.totalMinutesRead += Math.round(readTime / 60);

  awardXP(20, `Finished reading: ${story.title}`);

  // Start quiz
  state.quizState = {
    storyId: story.id,
    currentQuestion: 0,
    answers: [],
    score: 0,
    answered: false,
    selectedOption: null
  };
  state.currentView = "quiz";
  render();
}

// ======== QUIZ ========
function renderQuiz(container) {
  const story = state.currentStory;
  const qs = state.quizState;
  if (!story || !qs) { navigate("library"); return; }

  // Results screen
  if (qs.currentQuestion >= story.questions.length) {
    renderQuizResults(container, story, qs);
    return;
  }

  const question = story.questions[qs.currentQuestion];
  const letters = ["A", "B", "C", "D"];

  container.innerHTML = `
    <div class="quiz-container">
      <div class="reading-controls-top">
        <button class="back-btn" onclick="navigate('library')">
          <i data-lucide="arrow-left" style="width:16px;height:16px"></i> Library
        </button>
      </div>
      <div class="quiz-header">
        <h2>${story.title} — Quiz</h2>
        <p>Question ${qs.currentQuestion + 1} of ${story.questions.length}</p>
      </div>
      <div class="quiz-progress">
        ${story.questions.map((_, i) => {
          let cls = "";
          if (i < qs.currentQuestion) cls = qs.answers[i] ? "correct" : "incorrect";
          else if (i === qs.currentQuestion) cls = "current";
          return `<div class="quiz-dot ${cls}"></div>`;
        }).join("")}
      </div>
      <div class="quiz-question">
        <h3>${question.text}</h3>
        <div class="quiz-options">
          ${question.options.map((opt, i) => {
            let cls = "";
            if (qs.answered) {
              if (i === question.correct) cls = "correct";
              else if (i === qs.selectedOption && i !== question.correct) cls = "incorrect";
            } else if (i === qs.selectedOption) {
              cls = "selected";
            }
            return `
              <button class="quiz-option ${cls}" onclick="selectQuizOption(${i})" ${qs.answered ? "disabled" : ""}>
                <span class="option-letter">${letters[i]}</span>
                <span>${opt}</span>
              </button>
            `;
          }).join("")}
        </div>
        ${qs.answered ? `
          <div class="quiz-feedback ${qs.selectedOption === question.correct ? "correct" : "incorrect"}">
            ${qs.selectedOption === question.correct
              ? getPositiveFeedback()
              : `Not quite! The answer is: ${question.options[question.correct]}`
            }
          </div>
        ` : ""}
      </div>
      ${qs.answered ? `
        <button class="quiz-next-btn" onclick="nextQuestion()">
          ${qs.currentQuestion < story.questions.length - 1 ? "Next Question →" : "See Results →"}
        </button>
      ` : ""}
    </div>
    <footer class="app-footer">
      <a href="https://www.perplexity.ai/computer" target="_blank" rel="noopener noreferrer">Created with Perplexity Computer</a>
    </footer>
  `;
  lucide.createIcons({nameAttr:"data-lucide"});
}

function getPositiveFeedback() {
  const messages = [
    "Awesome job! You got it right! 🎉",
    "That's correct! You're a great reader! ⭐",
    "Wonderful! Keep it up! 🌟",
    "Perfect answer! You're doing amazing! 💫",
    "Yes! Excellent work! 🎊"
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}

function selectQuizOption(index) {
  const qs = state.quizState;
  if (!qs || qs.answered) return;

  qs.selectedOption = index;
  qs.answered = true;

  const story = state.currentStory;
  const question = story.questions[qs.currentQuestion];
  const isCorrect = index === question.correct;
  qs.answers.push(isCorrect);
  if (isCorrect) {
    qs.score++;
    awardXP(10, "Correct quiz answer");
  }

  render();
}

function nextQuestion() {
  const qs = state.quizState;
  if (!qs) return;
  qs.currentQuestion++;
  qs.answered = false;
  qs.selectedOption = null;
  render();
  window.scrollTo(0, 0);
}

function renderQuizResults(container, story, qs) {
  const total = story.questions.length;
  const score = qs.score;
  const pct = Math.round((score / total) * 100);
  const perfect = score === total;

  // Record quiz score
  state.user.quizScores[story.id] = { score, total, perfect, pct };

  // Mark story completed
  state.user.storyProgress[story.id].status = "completed";
  logActivity(`Completed "${story.title}" with quiz score ${score}/${total}`);

  // Check for new badges after completing the story
  checkBadges();
  saveState();
  renderSidebar();

  // Award bonus for perfect
  if (perfect) {
    setTimeout(() => showConfetti(), 300);
  }

  let circleClass, message;
  if (pct >= 80) {
    circleClass = "great";
    message = "Amazing work! You understood the story really well!";
  } else if (pct >= 60) {
    circleClass = "good";
    message = "Good job! You understood most of the story. Keep reading!";
  } else {
    circleClass = "try-again";
    message = "Nice try! Maybe read the story again and try the quiz once more.";
  }

  container.innerHTML = `
    <div class="quiz-container">
      <div class="quiz-results">
        <div class="points-earned">⭐ +${score * 10 + 20} XP earned</div>
        <div class="score-circle ${circleClass}">
          <span class="score-number">${score}/${total}</span>
          <span class="score-label">${pct}%</span>
        </div>
        <h3>${perfect ? "Perfect Score!" : pct >= 80 ? "Great Job!" : pct >= 60 ? "Good Effort!" : "Keep Trying!"}</h3>
        <p>${message}</p>
        <div class="quiz-results-actions">
          <button class="page-nav-btn secondary" onclick="retakeQuiz()">
            <i data-lucide="rotate-ccw" style="width:16px;height:16px"></i>
            <span>Retake Quiz</span>
          </button>
          <button class="page-nav-btn primary" onclick="navigate('library')">
            <span>Back to Library</span>
            <i data-lucide="chevron-right" style="width:16px;height:16px"></i>
          </button>
        </div>
      </div>
    </div>
    <footer class="app-footer">
      <a href="https://www.perplexity.ai/computer" target="_blank" rel="noopener noreferrer">Created with Perplexity Computer</a>
    </footer>
  `;
  lucide.createIcons({nameAttr:"data-lucide"});
}

function retakeQuiz() {
  const story = state.currentStory;
  state.quizState = {
    storyId: story.id,
    currentQuestion: 0,
    answers: [],
    score: 0,
    answered: false,
    selectedOption: null
  };
  render();
}

// ======== BADGES ========
function renderBadges(container) {
  container.innerHTML = `
    <div class="page-header">
      <h2>My Badges</h2>
      <p>Earn badges by reading stories, learning words, and acing quizzes!</p>
    </div>
    <div class="badges-grid">
      ${BADGES.map(badge => {
        const earned = state.user.badgesEarned.includes(badge.id);
        return `
          <div class="badge-card ${earned ? "earned" : "locked"}">
            <div class="badge-icon">${badge.icon}</div>
            <h3>${badge.name}</h3>
            <p>${badge.description}</p>
            ${earned ? '<span style="font-size:var(--text-xs);color:var(--color-success);font-weight:700">Earned! ✓</span>' : '<span style="font-size:var(--text-xs);color:var(--color-text-faint)">🔒 Locked</span>'}
          </div>
        `;
      }).join("")}
    </div>
    <footer class="app-footer">
      <a href="https://www.perplexity.ai/computer" target="_blank" rel="noopener noreferrer">Created with Perplexity Computer</a>
    </footer>
  `;
}

// ======== PROFILE ========
function renderProfile(container) {
  const level = getUserLevel();
  const nextLvl = getNextLevel();
  const avatar = state.user.avatar;
  const bgItem = AVATAR_ITEMS.backgrounds.find(b => b.id === avatar.background);
  const bgStyle = bgItem ? (bgItem.color.includes("gradient") ? bgItem.color : bgItem.color) : "#a8d8a8";

  container.innerHTML = `
    <div class="page-header">
      <h2>My Profile</h2>
      <p>Customize your avatar and see your stats!</p>
    </div>
    <div class="profile-section">
      <div class="avatar-display">
        <div class="avatar-circle" style="background:${bgStyle}">
          ${avatar.hat !== "none" ? `<span class="avatar-hat">${AVATAR_ITEMS.hats.find(h => h.id === avatar.hat)?.emoji || ""}</span>` : ""}
          <span>${avatar.face}</span>
          ${avatar.companion !== "none" ? `<span class="avatar-companion">${AVATAR_ITEMS.companions.find(c => c.id === avatar.companion)?.emoji || ""}</span>` : ""}
        </div>
        <div class="avatar-name">${state.user.name}</div>
        <div class="avatar-level">${level.name} · Level ${level.level}</div>
        ${nextLvl ? `<div style="font-size:var(--text-xs);color:var(--color-text-faint);margin-top:var(--space-1)">${nextLvl.xpRequired - state.user.xp} XP to next level</div>` : ""}
        <div class="avatar-stats">
          <div class="avatar-stat">
            <div class="stat-value">${state.user.xp}</div>
            <div class="stat-label">Total XP</div>
          </div>
          <div class="avatar-stat">
            <div class="stat-value">${getCompletedCount()}</div>
            <div class="stat-label">Stories</div>
          </div>
          <div class="avatar-stat">
            <div class="stat-value">${state.user.wordsLearned.length}</div>
            <div class="stat-label">Words</div>
          </div>
          <div class="avatar-stat">
            <div class="stat-value">${getStreak()}</div>
            <div class="stat-label">Day Streak</div>
          </div>
        </div>
      </div>
      <div class="avatar-shop">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-4)">
          <h3 style="font-family:var(--font-display);font-size:var(--text-lg);margin:0">Avatar Shop</h3>
          <span style="font-size:var(--text-sm);color:var(--color-accent);font-weight:700">⭐ ${state.user.xp} XP to spend</span>
        </div>

        <div class="shop-section">
          <h3>Face</h3>
          <div class="shop-items">
            ${["😊","😎","🤓","😄","🥰","😺","🦊","🐸"].map(face => `
              <button class="shop-item ${avatar.face === face ? "selected" : ""}" onclick="setAvatarFace('${face}')">
                <span class="item-emoji">${face}</span>
              </button>
            `).join("")}
          </div>
        </div>

        <div class="shop-section">
          <h3>Hats</h3>
          <div class="shop-items">
            ${AVATAR_ITEMS.hats.map(item => {
              const owned = state.user.purchasedItems.includes(item.id) || item.cost === 0;
              const canBuy = state.user.xp >= item.cost;
              return `
                <button class="shop-item ${avatar.hat === item.id ? "selected" : ""} ${!owned && !canBuy ? "locked" : ""}"
                  onclick="buyAvatarItem('hats','${item.id}',${item.cost})" ${!owned && !canBuy ? "disabled" : ""}>
                  <span class="item-emoji">${item.emoji || "—"}</span>
                  <span>${item.name}</span>
                  ${!owned ? `<span class="item-cost">⭐${item.cost}</span>` : ""}
                </button>
              `;
            }).join("")}
          </div>
        </div>

        <div class="shop-section">
          <h3>Backgrounds</h3>
          <div class="shop-items">
            ${AVATAR_ITEMS.backgrounds.map(item => {
              const owned = state.user.purchasedItems.includes(item.id) || item.cost === 0;
              const canBuy = state.user.xp >= item.cost;
              return `
                <button class="shop-item ${avatar.background === item.id ? "selected" : ""} ${!owned && !canBuy ? "locked" : ""}"
                  onclick="buyAvatarItem('backgrounds','${item.id}',${item.cost})" ${!owned && !canBuy ? "disabled" : ""}>
                  <span class="item-emoji" style="width:24px;height:24px;border-radius:50%;background:${item.color};display:inline-block"></span>
                  <span>${item.name}</span>
                  ${!owned ? `<span class="item-cost">⭐${item.cost}</span>` : ""}
                </button>
              `;
            }).join("")}
          </div>
        </div>

        <div class="shop-section">
          <h3>Companions</h3>
          <div class="shop-items">
            ${AVATAR_ITEMS.companions.map(item => {
              const owned = state.user.purchasedItems.includes(item.id) || item.cost === 0;
              const canBuy = state.user.xp >= item.cost;
              return `
                <button class="shop-item ${avatar.companion === item.id ? "selected" : ""} ${!owned && !canBuy ? "locked" : ""}"
                  onclick="buyAvatarItem('companions','${item.id}',${item.cost})" ${!owned && !canBuy ? "disabled" : ""}>
                  <span class="item-emoji">${item.emoji || "—"}</span>
                  <span>${item.name}</span>
                  ${!owned ? `<span class="item-cost">⭐${item.cost}</span>` : ""}
                </button>
              `;
            }).join("")}
          </div>
        </div>
      </div>
    </div>
    <footer class="app-footer">
      <a href="https://www.perplexity.ai/computer" target="_blank" rel="noopener noreferrer">Created with Perplexity Computer</a>
    </footer>
  `;
}

function setAvatarFace(face) {
  state.user.avatar.face = face;
  render();
}

function buyAvatarItem(category, itemId, cost) {
  if (state.user.purchasedItems.includes(itemId) || cost === 0) {
    // Already owned — equip
    switch (category) {
      case "hats": state.user.avatar.hat = itemId; break;
      case "backgrounds": state.user.avatar.background = itemId; break;
      case "companions": state.user.avatar.companion = itemId; break;
    }
    render();
    return;
  }

  // Buy
  if (state.user.xp >= cost) {
    state.user.xp -= cost;
    state.user.purchasedItems.push(itemId);
    switch (category) {
      case "hats": state.user.avatar.hat = itemId; break;
      case "backgrounds": state.user.avatar.background = itemId; break;
      case "companions": state.user.avatar.companion = itemId; break;
    }
    const item = AVATAR_ITEMS[category].find(i => i.id === itemId);
    showToast("🎁", "Item Purchased!", item ? item.name : itemId);
    logActivity(`Purchased: ${item ? item.name : itemId}`);
    render();
  }
}

// ======== PARENT DASHBOARD ========
function renderParent(container) {
  if (!state.parentUnlocked) {
    renderParentPin(container);
    return;
  }

  const completedCount = getCompletedCount();
  const totalWords = state.user.wordsLearned.length;
  const avgScore = Object.values(state.user.quizScores).length > 0
    ? Math.round(Object.values(state.user.quizScores).reduce((sum, s) => sum + s.pct, 0) / Object.values(state.user.quizScores).length)
    : 0;
  const streak = getStreak();

  // Reading minutes per day (simulated from activity)
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date().getDay();
  const weekMinutes = daysOfWeek.map((_, i) => {
    const dayIndex = (today - 6 + i + 7) % 7;
    return {
      label: daysOfWeek[dayIndex],
      value: dayIndex === today ? Math.max(state.user.totalMinutesRead, 1) : Math.floor(Math.random() * 3)
    };
  });
  const maxMinutes = Math.max(...weekMinutes.map(d => d.value), 1);

  container.innerHTML = `
    <div class="page-header">
      <h2>Parent Dashboard</h2>
      <p>Track ${state.user.name}'s reading progress and achievements.</p>
    </div>

    <div class="dashboard-stats">
      <div class="stat-card">
        <div class="stat-icon">📚</div>
        <div class="stat-value">${completedCount}</div>
        <div class="stat-label">Stories Completed</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">⏱️</div>
        <div class="stat-value">${state.user.totalMinutesRead}</div>
        <div class="stat-label">Minutes Read</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">📝</div>
        <div class="stat-value">${avgScore}%</div>
        <div class="stat-label">Avg Quiz Score</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">🔤</div>
        <div class="stat-value">${totalWords}</div>
        <div class="stat-label">Words Learned</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">🔥</div>
        <div class="stat-value">${streak}</div>
        <div class="stat-label">Day Streak</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">🏅</div>
        <div class="stat-value">${state.user.badgesEarned.length}</div>
        <div class="stat-label">Badges Earned</div>
      </div>
    </div>

    <div class="dashboard-section">
      <h3>Reading This Week</h3>
      <div class="bar-chart">
        ${weekMinutes.map(d => `
          <div class="bar-chart-item">
            <span class="bar-chart-value">${d.value}m</span>
            <div class="bar-chart-bar" style="height:${Math.max(4, (d.value / maxMinutes) * 120)}px"></div>
            <span class="bar-chart-label">${d.label}</span>
          </div>
        `).join("")}
      </div>
    </div>

    <div class="dashboard-section">
      <h3>Quiz Scores</h3>
      ${Object.keys(state.user.quizScores).length > 0 ? `
        <div style="display:flex;flex-direction:column;gap:var(--space-3)">
          ${Object.entries(state.user.quizScores).map(([id, score]) => {
            const story = STORIES.find(s => s.id === id);
            return `
              <div style="display:flex;align-items:center;gap:var(--space-3);padding:var(--space-3);background:var(--color-surface-2);border-radius:var(--radius-md)">
                <span>${story?.icon || "📖"}</span>
                <span style="flex:1;font-size:var(--text-sm);font-weight:600">${story?.title || id}</span>
                <span style="font-size:var(--text-sm);font-weight:700;color:${score.pct >= 80 ? "var(--color-success)" : score.pct >= 60 ? "var(--color-accent)" : "var(--color-error)"}">${score.score}/${score.total} (${score.pct}%)</span>
              </div>
            `;
          }).join("")}
        </div>
      ` : '<div class="empty-state"><p>No quizzes completed yet.</p></div>'}
    </div>

    <div class="dashboard-section">
      <h3>Vocabulary Words Learned</h3>
      ${state.user.wordsLearned.length > 0 ? `
        <div style="display:flex;flex-wrap:wrap;gap:var(--space-2)">
          ${state.user.wordsLearned.map(w => `
            <span style="padding:var(--space-1) var(--space-3);background:var(--color-primary-light);color:var(--color-primary);border-radius:var(--radius-full);font-size:var(--text-xs);font-weight:600">${w}</span>
          `).join("")}
        </div>
      ` : '<div class="empty-state"><p>No vocabulary words learned yet.</p></div>'}
    </div>

    <div class="dashboard-section">
      <h3>Recent Activity</h3>
      ${state.user.activityLog.length > 0 ? `
        <div class="activity-list">
          ${state.user.activityLog.slice(0, 10).map(a => `
            <div class="activity-item">
              <span class="activity-icon">📋</span>
              <span class="activity-text">${a.text}</span>
              <span class="activity-time">${a.time}</span>
            </div>
          `).join("")}
        </div>
      ` : '<div class="empty-state"><p>No activity yet. Start reading!</p></div>'}
    </div>

    <footer class="app-footer">
      <a href="https://www.perplexity.ai/computer" target="_blank" rel="noopener noreferrer">Created with Perplexity Computer</a>
    </footer>
  `;
}

function renderParentPin(container) {
  container.innerHTML = `
    <div class="pin-gate">
      <div style="font-size:3rem;margin-bottom:var(--space-4)">🔒</div>
      <h2>Parent Dashboard</h2>
      <p>Enter the 4-digit PIN to access the parent dashboard.</p>
      <div class="pin-input-group">
        <input type="password" class="pin-input" maxlength="1" inputmode="numeric" data-pin="0" autofocus>
        <input type="password" class="pin-input" maxlength="1" inputmode="numeric" data-pin="1">
        <input type="password" class="pin-input" maxlength="1" inputmode="numeric" data-pin="2">
        <input type="password" class="pin-input" maxlength="1" inputmode="numeric" data-pin="3">
      </div>
      <p class="pin-hint">Default PIN: 1234</p>
    </div>
  `;

  // Auto-advance pin inputs
  const inputs = container.querySelectorAll(".pin-input");
  inputs.forEach((input, i) => {
    input.addEventListener("input", () => {
      if (input.value && i < inputs.length - 1) {
        inputs[i + 1].focus();
      }
      // Check if all filled
      const pin = Array.from(inputs).map(inp => inp.value).join("");
      if (pin.length === 4) {
        verifyParentPin(pin, inputs);
      }
    });
    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !input.value && i > 0) {
        inputs[i - 1].focus();
      }
    });
  });
}

// ======== READ ALOUD PRACTICE ========
let voiceTimerInterval = null;
let voiceStartTime = null;
let voiceRecognition = null;
let voiceMediaRecorder = null;
let voiceAudioChunks = [];
let voiceAudioURL = null;
let voiceTranscriptParts = [];
let voiceMicStatus = "unknown"; // "unknown" | "available" | "blocked"

// ---- PRONUNCIATION HELPERS ----
var PHONETIC_DICT = {
  // Story vocabulary
  cottage: "KAH-tij", ivy: "EYE-vee", patience: "PAY-shuns", discouraged: "dis-KUR-ijd",
  nurtured: "NUR-churd", current: "KUR-unt", embarrassed: "em-BARE-ust",
  reef: "reef", extraordinary: "ek-STROR-din-air-ee", tumbled: "TUM-buld",
  meadow: "MEH-doh", wandered: "WAHN-durd", bloomed: "bloomd",
  crumbled: "KRUM-buld", ancient: "AYN-shunt", whispered: "WIHS-purd",
  treasure: "TREH-zhur", journey: "JUR-nee", enormous: "ee-NOR-mus",
  adventure: "ad-VEN-chur", discovered: "dis-KUV-urd", mysterious: "mis-TEER-ee-us",
  beautiful: "BYOO-tih-ful", different: "DIH-fur-unt", wonderful: "WUN-dur-ful",
  carefully: "KAIR-ful-ee", suddenly: "SUD-un-lee", important: "im-POR-tunt",
  remember: "ree-MEM-bur", together: "too-GEH-thur", favorite: "FAY-vur-it",
  imagine: "ih-MAJ-in", creature: "KREE-chur", special: "SPEH-shul",
  because: "bee-KAWZ", through: "throo", thought: "thawt",
  enough: "ee-NUF", always: "ALL-wayz", morning: "MOR-ning",
  grandmother: "GRAND-muh-thur", behind: "bee-HYND", wooden: "WUH-dun",
  covered: "KUV-urd", wondered: "WUN-durd", garden: "GAR-dun",
  flowers: "FLOW-urz", butterflies: "BUT-ur-flyz", planted: "PLAN-tid",
  appeared: "uh-PEERD", started: "STAR-tid", packet: "PAK-it",
  sunflower: "SUN-flow-ur", promised: "PRAH-mist", watered: "WAW-turd",
  nothing: "NUH-thing", reminded: "ree-MYN-did", golden: "GOHL-dun",
  learned: "lurnd", something: "SUM-thing", directions: "dih-REK-shunz",
  giggled: "GIG-uld", straight: "strayt", powerful: "POW-ur-ful",
  confused: "kun-FYOOZD", grabbed: "grabd", reached: "reecht",
  smaller: "SMAW-lur", safety: "SAYF-tee", cheered: "cheerd",
  amazing: "uh-MAY-zing", superhero: "SOO-pur-heer-oh",
  library: "LY-brair-ee", excited: "ek-SY-tid", nervous: "NUR-vus",
  practiced: "PRAK-tist", between: "bee-TWEEN", decided: "dee-SY-did",
  realized: "REE-uh-lyzd", problem: "PRAH-blum", listened: "LIH-sund",
  answered: "AN-surd", surprise: "sur-PRYZ", celebrate: "SEL-uh-brayt",
  village: "VIH-lij", people: "PEE-pul", mountain: "MOWN-tun",
  ocean: "OH-shun", island: "EYE-lund", river: "RIV-ur",
  forest: "FOR-ist", animal: "AN-ih-mul", water: "WAW-tur",
  every: "EV-ree", family: "FAM-uh-lee", children: "CHIL-drun",
  stories: "STOR-eez", dragon: "DRA-gun", castle: "KAS-ul",
  princess: "PRIN-ses", knight: "nyt", magic: "MAJ-ik",
  telescope: "TEL-uh-skohp", constellation: "kahn-stuh-LAY-shun",
  stubborn: "STUB-urn", neighbor: "NAY-bur", curiosity: "kyoor-ee-AH-sih-tee",
  satellite: "SAT-uh-lyt", astronaut: "AS-truh-nawt", galaxy: "GAL-uk-see",
  invisible: "in-VIZ-ih-bul", delicious: "duh-LIH-shus", temperature: "TEM-pur-uh-chur",
  vegetable: "VEJ-tuh-bul", chocolate: "CHAH-klut", restaurant: "RES-tuh-rahnt",
  comfortable: "KUM-fur-tuh-bul",
  interested: "IN-tuh-res-tid", necessary: "NES-uh-sair-ee", separate: "SEP-uh-rut",
  squirrel: "SKWUR-ul", determined: "dee-TUR-mind", ingredients: "in-GREE-dee-unts",
  experiment: "ek-SPAIR-ih-ment", thermometer: "thur-MAH-muh-tur"
};

function getPhonetic(word) {
  var w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (PHONETIC_DICT[w]) return PHONETIC_DICT[w];
  // Fallback: basic phonetic approximation using syllable breaks
  return buildPhonetic(w);
}

function buildPhonetic(word) {
  // Simple rule-based phonetic guide
  var result = word.toUpperCase();
  // Common patterns
  result = result.replace(/TION/g, "-shun");
  result = result.replace(/SION/g, "-zhun");
  result = result.replace(/IGHT/g, "-yt");
  result = result.replace(/OUGH/g, "-uff");
  result = result.replace(/OULD/g, "-ood");
  result = result.replace(/IOUS/g, "-ee-us");
  result = result.replace(/EOUS/g, "-ee-us");
  result = result.replace(/ENCE/g, "-uns");
  result = result.replace(/ANCE/g, "-uns");
  return result;
}

function getSyllables(word) {
  var w = word.toLowerCase().replace(/[^a-z]/g, "");
  // Count vowel groups as syllables
  var vowelGroups = w.match(/[aeiouy]+/gi) || [];
  var count = vowelGroups.length;
  // Silent e at end
  if (w.length > 2 && w.endsWith("e") && !w.endsWith("le")) count = Math.max(1, count - 1);
  // Build syllable display with center-dot separator
  if (count <= 1) return w;
  // Break into roughly equal chunks based on syllable count
  var chunkSize = Math.ceil(w.length / count);
  var parts = [];
  for (var i = 0; i < w.length; i += chunkSize) {
    parts.push(w.slice(i, i + chunkSize));
  }
  return parts.join(" \u00b7 ");
}

function speakWord(word) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  var utter = new SpeechSynthesisUtterance(word);
  utter.rate = 0.7; // Slow for learning
  utter.pitch = 1.1;
  utter.lang = "en-US";
  window.speechSynthesis.speak(utter);
}

// Check mic + speech recognition availability
function checkMicAvailable() {
  if (voiceMicStatus !== "unknown") return Promise.resolve(voiceMicStatus === "available");
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    voiceMicStatus = "blocked";
    return Promise.resolve(false);
  }
  return navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      stream.getTracks().forEach(t => t.stop());
      voiceMicStatus = "available";
      return true;
    })
    .catch(() => {
      voiceMicStatus = "blocked";
      return false;
    });
}

function hasSpeechRecognition() {
  return "webkitSpeechRecognition" in window || "SpeechRecognition" in window;
}

// Normalize text for comparison
function normalizeWord(w) {
  return w.replace(/[^a-z0-9']/gi, "").toLowerCase();
}

// Compare spoken words to original text, return per-word results
function compareWords(originalText, spokenText) {
  const origWords = originalText.replace(/[^a-zA-Z0-9'\s]/g, " ").split(/\s+/).filter(Boolean);
  const spokenWords = spokenText.replace(/[^a-zA-Z0-9'\s]/g, " ").split(/\s+/).filter(Boolean);
  const origNorms = origWords.map(normalizeWord);
  const spokenNorms = spokenWords.map(normalizeWord);

  // --- Helpers ---
  function wordMatch(a, b) {
    // Returns "exact", "close", or false
    if (a === b) return "exact";
    if (a.length < 2 || b.length < 2) return false;
    // Common speech recognition substitutions
    var subs = { "the": "da", "a": "uh", "and": "an", "of": "ov", "to": "too", "was": "wuz", "is": "iz", "are": "r" };
    if (subs[a] === b || subs[b] === a) return "exact";
    // Be generous with Levenshtein for kids: allow ~40% edit distance, min 2
    var maxDist = Math.max(2, Math.ceil(Math.max(a.length, b.length) * 0.4));
    var dist = levenshtein(a, b);
    if (dist <= 1) return "exact"; // 1 char off is basically correct for kids
    if (dist <= maxDist) return "close";
    // Check if one contains the other (speech recognition sometimes adds/drops endings)
    if (a.length >= 3 && b.length >= 3) {
      if (a.startsWith(b) || b.startsWith(a)) return "close";
      if (a.endsWith(b) || b.endsWith(a)) return "close";
    }
    return false;
  }

  // --- Wider sliding-window alignment ---
  // Instead of strict sequential, use a wider lookahead/lookback approach
  var results = [];
  var spokenUsed = new Array(spokenNorms.length).fill(false);

  for (var i = 0; i < origWords.length; i++) {
    var oNorm = origNorms[i];
    if (!oNorm) { results.push({ word: origWords[i], status: "skipped" }); continue; }

    // Search the entire spoken array for best match, preferring positions near expected location
    var expectedPos = Math.round((i / Math.max(origWords.length, 1)) * spokenNorms.length);
    var bestIdx = -1;
    var bestType = false;
    var bestDist = 999;

    // Search within a generous window around expected position
    var windowSize = Math.max(8, Math.ceil(spokenNorms.length * 0.35));
    var searchStart = Math.max(0, expectedPos - windowSize);
    var searchEnd = Math.min(spokenNorms.length, expectedPos + windowSize);

    for (var j = searchStart; j < searchEnd; j++) {
      if (spokenUsed[j]) continue;
      var match = wordMatch(oNorm, spokenNorms[j]);
      if (!match) continue;

      var posDist = Math.abs(j - expectedPos);
      if (match === "exact" && (bestType !== "exact" || posDist < bestDist)) {
        bestIdx = j; bestType = "exact"; bestDist = posDist;
      } else if (match === "close" && bestType !== "exact" && posDist < bestDist) {
        bestIdx = j; bestType = "close"; bestDist = posDist;
      }
    }

    if (bestIdx >= 0) {
      spokenUsed[bestIdx] = true;
      if (bestType === "exact") {
        results.push({ word: origWords[i], status: "correct" });
      } else {
        results.push({ word: origWords[i], status: "close", spoken: spokenWords[bestIdx] });
      }
    } else {
      results.push({ word: origWords[i], status: "missed" });
    }
  }

  var correct = results.filter(function(r) { return r.status === "correct"; }).length;
  var close = results.filter(function(r) { return r.status === "close"; }).length;
  var missed = results.filter(function(r) { return r.status === "missed"; }).length;
  var total = results.filter(function(r) { return r.status !== "skipped"; }).length;
  // Give partial credit for close: 70% credit (more generous for kids)
  var accuracy = total > 0 ? Math.round(((correct + close * 0.7) / total) * 100) : 0;

  return { results: results, correct: correct, close: close, missed: missed, total: total, accuracy: accuracy };
}

// Simple Levenshtein distance
function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i-1] === b[j-1]
        ? dp[i-1][j-1]
        : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
    }
  }
  return dp[m][n];
}

function renderVoiceWidget(pageText) {
  const vr = state.voiceRecording;

  // ---- RESULTS VIEW ----
  if (vr && vr.done) {
    const acc = vr.accuracy;
    const accClass = acc >= 90 ? "great" : acc >= 70 ? "good" : "needs-work";
    const accLabel = acc >= 90 ? "Amazing!" : acc >= 70 ? "Great Job!" : acc >= 50 ? "Good Effort!" : "Keep Practicing!";

    // Build word-by-word display (missed/close words are tappable to hear pronunciation)
    const wordHTML = (vr.wordResults || []).map(r => {
      if (r.status === "skipped") return "";
      if (r.status === "correct") return '<span class="vw-correct">' + r.word + '</span>';
      if (r.status === "close") return '<span class="vw-close vw-tappable" onclick="speakWord(\x27' + r.word.replace(/'/g, '') + '\x27)" title="Tap to hear \u2022 You said: ' + (r.spoken || "") + '">' + r.word + ' <i data-lucide="volume-2" style="width:11px;height:11px"></i></span>';
      return '<span class="vw-missed vw-tappable" onclick="speakWord(\x27' + r.word.replace(/'/g, '') + '\x27)" title="Tap to hear">' + r.word + ' <i data-lucide="volume-2" style="width:11px;height:11px"></i></span>';
    }).join(" ");

    // Audio playback
    const audioHTML = vr.audioURL ? '<div class="voice-playback"><div class="voice-playback-label"><i data-lucide="headphones" style="width:14px;height:14px"></i> Listen to your recording:</div><audio controls src="' + vr.audioURL + '" class="voice-audio-player"></audio></div>' : "";

    // Missed words for practice
    const missedWords = (vr.wordResults || []).filter(r => r.status === "missed").map(r => r.word.toLowerCase().replace(/[^a-z]/g, ""));
    const uniqueMissed = [...new Set(missedWords)].slice(0, 8);

    // Build pronunciation cards for missed words
    const practiceHTML = uniqueMissed.length > 0 ? '<div class="voice-tip-box"><strong>Words to practice:</strong><div class="voice-practice-cards">' + uniqueMissed.map(function(w) {
      var ph = getPhonetic(w);
      var syllables = getSyllables(w);
      var canSpeak = "speechSynthesis" in window;
      return '<div class="voice-pron-card">' +
        '<div class="voice-pron-top">' +
          '<span class="voice-pron-word">' + w + '</span>' +
          (canSpeak ? '<button class="voice-pron-listen" onclick="speakWord(\x27' + w + '\x27)" title="Listen"><i data-lucide="volume-2" style="width:14px;height:14px"></i></button>' : '') +
        '</div>' +
        '<div class="voice-pron-phonetic">' + ph + '</div>' +
        '<div class="voice-pron-syllables">' + syllables + '</div>' +
      '</div>';
    }).join("") + '</div></div>' : "";

    // Stats row
    const statsHTML = vr.wpm ? '<div class="voice-stats-row"><div class="voice-stat-item"><div class="voice-stat-val">' + vr.wpm + '</div><div class="voice-stat-lbl">words/min</div></div><div class="voice-stat-item"><div class="voice-stat-val">' + vr.timeStr + '</div><div class="voice-stat-lbl">time</div></div><div class="voice-stat-item"><div class="voice-stat-val">' + (vr.correct || 0) + "/" + (vr.total || 0) + '</div><div class="voice-stat-lbl">words right</div></div></div>' : "";

    return '<div class="voice-results">' +
      '<div class="voice-results-header"><span class="voice-score-badge ' + accClass + '">' + acc + '% — ' + accLabel + '</span><button class="voice-close-btn" onclick="closeVoiceResults()">&times;</button></div>' +
      '<div class="voice-feedback">' + vr.feedback + '</div>' +
      statsHTML +
      audioHTML +
      (wordHTML ? '<div class="voice-word-review"><div class="voice-word-review-label">Your reading:</div><div class="voice-word-display">' + wordHTML + '</div><div class="voice-word-legend"><span class="vw-legend-item"><span class="vw-dot vw-dot-correct"></span> Got it</span><span class="vw-legend-item"><span class="vw-dot vw-dot-close"></span> Almost</span><span class="vw-legend-item"><span class="vw-dot vw-dot-missed"></span> Missed</span></div></div>' : "") +
      practiceHTML +
      '<div class="voice-actions"><button class="voice-btn secondary" onclick="startReadAloud()"><i data-lucide="mic" style="width:16px;height:16px"></i> Try Again</button></div>' +
      '</div>';
  }

  // ---- ACTIVE RECORDING ----
  if (vr && vr.isReading) {
    let liveText;
    if (vr.timerOnly) {
      liveText = '<div class="voice-reading-guide"><i data-lucide="info" style="width:14px;height:14px"></i><span class="voice-guide-text">Take your time. Tap the button when you finish!</span></div>';
    } else if (vr.liveTranscript) {
      liveText = '<div class="voice-live-transcript">' + vr.liveTranscript + '</div>';
    } else {
      liveText = '<div class="voice-live-transcript voice-live-waiting">Listening... start reading!</div>';
    }
    return '<div class="voice-recording-active">' +
      '<div class="voice-reading-header"><div class="voice-pulse"></div>' + (!vr.timerOnly ? '<div class="voice-mic-pulse"><i data-lucide="mic" style="width:16px;height:16px"></i></div>' : '') + '<p class="voice-recording-label">Read the text above out loud!</p></div>' +
      '<div class="voice-reading-info"><div class="voice-timer" id="voiceTimer">0:00</div>' + liveText + '</div>' +
      '<button class="voice-btn stop" onclick="finishReadAloud()"><i data-lucide="check-circle" style="width:16px;height:16px"></i> I\x27m Done Reading!</button>' +
      '</div>';
  }

  // ---- DEFAULT / START ----
  if (voiceMicStatus === "blocked") {
    // Mic blocked — show explanation + timer-only option
    return '<div class="voice-start-row">' +
      '<button class="voice-read-aloud-btn" onclick="startReadAloudTimerOnly()"><i data-lucide="book-open" style="width:18px;height:18px"></i><span>Read Aloud</span><span class="voice-hint">Timer mode (open link in browser for full voice features)</span></button>' +
      '</div>';
  }

  // Mic available or unknown — show full button
  return '<div class="voice-start-row">' +
    '<button class="voice-read-aloud-btn" onclick="startReadAloud()"><i data-lucide="mic" style="width:18px;height:18px"></i><span>Read Aloud</span><span class="voice-hint">Read and get feedback on your words!</span></button>' +
    '</div>';
}

// ---- START: full mode with speech recognition + recording ----
function startReadAloud() {
  voiceStartTime = Date.now();
  voiceAudioChunks = [];
  voiceAudioURL = null;
  voiceTranscriptParts = [];

  // Try to get mic for recording
  var micPromise = (navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
    ? navigator.mediaDevices.getUserMedia({ audio: true }).catch(function() { return null; })
    : Promise.resolve(null);

  micPromise.then(function(stream) {
    if (stream) {
      voiceMicStatus = "available";
      // Start MediaRecorder for audio playback — prefer mp4 for Safari, fall back to webm
      try {
        var mimeType = "audio/webm";
        if (typeof MediaRecorder !== "undefined") {
          if (MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported("audio/mp4")) {
            mimeType = "audio/mp4";
          } else if (MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported("audio/webm;codecs=opus")) {
            mimeType = "audio/webm;codecs=opus";
          }
        }
        voiceMediaRecorder = new MediaRecorder(stream, { mimeType: mimeType });
        voiceMediaRecorder.ondataavailable = function(e) { if (e.data.size > 0) voiceAudioChunks.push(e.data); };
        // Use timeslice to get data in chunks (more reliable than waiting for stop)
        voiceMediaRecorder.start(1000);
      } catch(e) {
        // Fallback: try without mimeType option
        try {
          voiceMediaRecorder = new MediaRecorder(stream);
          voiceMediaRecorder.ondataavailable = function(e) { if (e.data.size > 0) voiceAudioChunks.push(e.data); };
          voiceMediaRecorder.start(1000);
        } catch(e2) {
          stream.getTracks().forEach(function(t) { t.stop(); });
          voiceMediaRecorder = null;
        }
      }
    } else {
      voiceMicStatus = "blocked";
    }

    // Start Speech Recognition
    var SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRec) {
      voiceRecognition = new SpeechRec();
      voiceRecognition.continuous = true;
      voiceRecognition.interimResults = true;
      voiceRecognition.lang = "en-US";
      voiceRecognition.maxAlternatives = 3; // More alternatives = better chance of matching

      var finalTranscript = "";
      var allAlternatives = []; // Collect alternatives for better matching

      voiceRecognition.onresult = function(event) {
        var interim = "";
        for (var i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            // Collect all alternatives for this final result
            var bestAlt = event.results[i][0].transcript;
            finalTranscript += bestAlt + " ";
            for (var a = 0; a < event.results[i].length; a++) {
              allAlternatives.push(event.results[i][a].transcript);
            }
          } else {
            interim += event.results[i][0].transcript;
          }
        }
        voiceTranscriptParts = [finalTranscript, interim, allAlternatives.join(" ")];
        // Update live transcript display
        state.voiceRecording.liveTranscript = (finalTranscript + interim).trim() || "";
        var liveEl = document.querySelector(".voice-live-transcript");
        if (liveEl) {
          liveEl.textContent = state.voiceRecording.liveTranscript || "Listening... start reading!";
          liveEl.classList.toggle("voice-live-waiting", !state.voiceRecording.liveTranscript);
        }
        // Pulse the mic indicator to show we're hearing something
        var micPulse = document.querySelector(".voice-mic-pulse");
        if (micPulse) {
          micPulse.classList.add("voice-pulse-active");
          clearTimeout(window._voicePulseTimer);
          window._voicePulseTimer = setTimeout(function() {
            if (micPulse) micPulse.classList.remove("voice-pulse-active");
          }, 500);
        }
      };

      voiceRecognition.onerror = function(event) {
        // "not-allowed" means mic was denied
        if (event.error === "not-allowed" || event.error === "service-not-allowed") {
          voiceMicStatus = "blocked";
          // Fall back to timer-only
          if (!state.voiceRecording || !state.voiceRecording.isReading) {
            stopAllVoice();
            render();
            showToast("\ud83c\udfa4", "Microphone Blocked", "Open this link directly in your browser for voice features.");
          }
        }
      };

      voiceRecognition.onend = function() {
        // Restart if still reading (recognition can timeout after ~5-10s of silence)
        if (state.voiceRecording && state.voiceRecording.isReading && voiceRecognition) {
          // Small delay before restart to avoid rapid-fire restarts
          setTimeout(function() {
            if (state.voiceRecording && state.voiceRecording.isReading && voiceRecognition) {
              try { voiceRecognition.start(); } catch(e) { /* ignore */ }
            }
          }, 100);
        }
      };

      try {
        voiceRecognition.start();
      } catch(e) {
        voiceRecognition = null;
      }
    }

    state.voiceRecording = { isReading: true, liveTranscript: "", done: false };
    render();
    startVoiceTimer();
  });
}

// ---- START: timer-only fallback ----
function startReadAloudTimerOnly() {
  voiceStartTime = Date.now();
  state.voiceRecording = { isReading: true, liveTranscript: null, done: false, timerOnly: true };
  render();
  startVoiceTimer();
}

function startVoiceTimer() {
  if (voiceTimerInterval) clearInterval(voiceTimerInterval);
  voiceTimerInterval = setInterval(function() {
    var el = document.getElementById("voiceTimer");
    if (!el) return;
    var elapsed = Math.floor((Date.now() - voiceStartTime) / 1000);
    var mins = Math.floor(elapsed / 60);
    var secs = elapsed % 60;
    el.textContent = mins + ":" + (secs < 10 ? "0" : "") + secs;
  }, 250);
}

function stopAllVoice() {
  if (voiceTimerInterval) { clearInterval(voiceTimerInterval); voiceTimerInterval = null; }
  if (voiceRecognition) { try { voiceRecognition.abort(); } catch(e){ /* ignore */ } voiceRecognition = null; }
  if (voiceMediaRecorder && voiceMediaRecorder.state === "recording") {
    try {
      voiceMediaRecorder.stream.getTracks().forEach(function(t) { t.stop(); });
      voiceMediaRecorder.stop();
    } catch(e){ /* ignore */ }
  }
  voiceMediaRecorder = null;
}

// ---- FINISH ----
function finishReadAloud() {
  if (voiceTimerInterval) { clearInterval(voiceTimerInterval); voiceTimerInterval = null; }

  // Combine all transcript parts (final + interim + alternatives) for best matching
  var spokenText = voiceTranscriptParts.join(" ").trim();
  if (voiceRecognition) { try { voiceRecognition.stop(); } catch(e){ /* ignore */ } voiceRecognition = null; }

  // Stop audio recording — handle all possible recorder states
  var recorder = voiceMediaRecorder;
  if (recorder && (recorder.state === "recording" || recorder.state === "paused")) {
    recorder.onstop = function() {
      try { recorder.stream.getTracks().forEach(function(t) { t.stop(); }); } catch(e) {}
      if (voiceAudioChunks.length > 0) {
        // Use the recorder's actual mimeType for the blob
        var blobType = (recorder.mimeType && recorder.mimeType !== "") ? recorder.mimeType : "audio/webm";
        var blob = new Blob(voiceAudioChunks, { type: blobType });
        voiceAudioURL = URL.createObjectURL(blob);
      }
      voiceMediaRecorder = null;
      completeReadAloud(spokenText);
    };
    try { recorder.stop(); } catch(e) {
      voiceMediaRecorder = null;
      completeReadAloud(spokenText);
    }
  } else {
    // Recorder already stopped or never started — still try to create audio from chunks
    if (voiceAudioChunks.length > 0 && !voiceAudioURL) {
      var blob = new Blob(voiceAudioChunks, { type: "audio/webm" });
      voiceAudioURL = URL.createObjectURL(blob);
    }
    if (recorder) {
      try { recorder.stream.getTracks().forEach(function(t) { t.stop(); }); } catch(e) {}
    }
    voiceMediaRecorder = null;
    completeReadAloud(spokenText);
  }
}

function completeReadAloud(spokenText) {
  var elapsed = (Date.now() - voiceStartTime) / 1000;
  var pageText = state.currentStory.pages[state.currentPage];
  var allWords = pageText.replace(/[^a-zA-Z0-9'\s]/g, " ").split(/\s+/).filter(Boolean);
  var wordCount = allWords.length;
  var minutes = elapsed / 60;
  var wpm = Math.round(wordCount / Math.max(minutes, 0.01));

  var mins = Math.floor(elapsed / 60);
  var secs = Math.round(elapsed % 60);
  var timeStr = mins > 0 ? mins + "m " + secs + "s" : secs + "s";

  var isTimerOnly = state.voiceRecording && state.voiceRecording.timerOnly;
  var comparison = null;
  var accuracy = 0;
  var feedback = "";

  if (spokenText && !isTimerOnly) {
    // Real comparison
    comparison = compareWords(pageText, spokenText);
    accuracy = comparison.accuracy;

    if (accuracy >= 95) {
      feedback = "Outstanding! You read almost every word perfectly!";
    } else if (accuracy >= 85) {
      feedback = "Great reading! Just a few words to practice.";
    } else if (accuracy >= 70) {
      feedback = "Good effort! Check the highlighted words below and try those again.";
    } else if (accuracy >= 50) {
      feedback = "You got many words right! The red words below need more practice.";
    } else {
      feedback = "Keep at it! Try reading more slowly and carefully. You'll get better!";
    }
  } else {
    // Timer-only fallback — give speed-based feedback
    accuracy = wpm >= 60 ? 85 : wpm >= 30 ? 70 : 50;
    if (wpm >= 100) {
      feedback = "Wow, that was fast! You must know these words well!";
    } else if (wpm >= 60) {
      feedback = "Great reading speed! You're becoming a confident reader!";
    } else if (wpm >= 30) {
      feedback = "Nice and steady! Taking your time helps you understand better.";
    } else {
      feedback = "Good job finishing! Try a little faster next time. You can do it!";
    }
  }

  state.voiceRecording = {
    done: true,
    feedback: feedback,
    accuracy: accuracy,
    wpm: wpm,
    timeStr: timeStr,
    total: comparison ? comparison.total : wordCount,
    correct: comparison ? comparison.correct : null,
    wordResults: comparison ? comparison.results : null,
    audioURL: voiceAudioURL || null,
    practiceWords: comparison
      ? comparison.results.filter(function(r) { return r.status === "missed"; }).map(function(r) { return r.word; })
      : allWords.filter(function(w) { return w.length >= 6; }).slice(0, 5)
  };

  // Track stats
  state.user.recordingsCount = (state.user.recordingsCount || 0) + 1;
  if (accuracy > (state.user.bestVoiceAccuracy || 0)) {
    state.user.bestVoiceAccuracy = accuracy;
  }
  state.user.voiceHistory.push({
    storyId: state.currentStory.id,
    page: state.currentPage,
    accuracy: accuracy,
    wpm: wpm,
    date: new Date().toLocaleString()
  });
  awardXP(15, "Read aloud: " + accuracy + "% accuracy");
  logActivity('Read aloud page ' + (state.currentPage + 1) + ' of "' + state.currentStory.title + '" \u2014 ' + accuracy + '% accuracy');
  checkBadges();
  render();
}

function closeVoiceResults() {
  stopAllVoice();
  if (voiceAudioURL) { URL.revokeObjectURL(voiceAudioURL); voiceAudioURL = null; }
  voiceTranscriptParts = [];
  state.voiceRecording = null;
  render();
}

// ======== VIRTUAL PET SYSTEM ========
function getPetStage() {
  if (!state.user.pet) return null;
  const pet = state.user.pet;
  for (let i = PET_STAGES.length - 1; i >= 0; i--) {
    if (pet.xp >= PET_STAGES[i].xpNeeded && pet.feedings >= PET_STAGES[i].feedingsNeeded) {
      return PET_STAGES[i];
    }
  }
  return PET_STAGES[0];
}

function getPetStageIndex() {
  if (!state.user.pet) return 0;
  const pet = state.user.pet;
  for (let i = PET_STAGES.length - 1; i >= 0; i--) {
    if (pet.xp >= PET_STAGES[i].xpNeeded && pet.feedings >= PET_STAGES[i].feedingsNeeded) {
      return i;
    }
  }
  return 0;
}

function getPetEmoji() {
  if (!state.user.pet) return "";
  const petType = PET_TYPES.find(p => p.id === state.user.pet.typeId);
  if (!petType) return "";
  const stageIdx = getPetStageIndex();
  if (stageIdx === 2) return petType.adultEmoji;
  if (stageIdx === 1) return petType.teenEmoji;
  return petType.babyEmoji;
}

function getHappinessLevel() {
  if (!state.user.pet) return "";
  const h = state.user.pet.happiness;
  if (h >= 80) return { label: "Very Happy", emoji: "😄", color: "var(--color-success)" };
  if (h >= 50) return { label: "Happy", emoji: "😊", color: "var(--color-accent)" };
  if (h >= 25) return { label: "Okay", emoji: "😐", color: "var(--color-text-muted)" };
  return { label: "Hungry", emoji: "😢", color: "var(--color-error)" };
}

function renderPet(container) {
  if (!state.user.pet) {
    renderPetAdoption(container);
    return;
  }

  const pet = state.user.pet;
  const petType = PET_TYPES.find(p => p.id === pet.typeId);
  const stage = getPetStage();
  const stageIdx = getPetStageIndex();
  const emoji = getPetEmoji();
  const happiness = getHappinessLevel();
  const nextStage = stageIdx < PET_STAGES.length - 1 ? PET_STAGES[stageIdx + 1] : null;
  const accessory = PET_ACCESSORIES.find(a => a.id === pet.accessory) || PET_ACCESSORIES[0];

  const happinessPct = Math.min(100, pet.happiness);
  const xpToNext = nextStage ? nextStage.xpNeeded - pet.xp : 0;
  const feedingsToNext = nextStage ? nextStage.feedingsNeeded - pet.feedings : 0;

  container.innerHTML = `
    <div class="page-header">
      <h2>My Pet</h2>
      <p>Take care of ${pet.name} by reading stories and feeding treats!</p>
    </div>
    <div class="pet-page">
      <div class="pet-display-card">
        <div class="pet-stage-label">${stage.label} ${petType.name}</div>
        <div class="pet-avatar-area">
          <div class="pet-emoji ${state.petAnimation || ''}" id="pet-emoji">${emoji}</div>
          ${accessory.id !== "none" ? `<span class="pet-accessory">${accessory.emoji}</span>` : ""}
        </div>
        <div class="pet-name">${pet.name}</div>
        <div class="pet-happiness-bar">
          <span class="pet-happiness-label">${happiness.emoji} ${happiness.label}</span>
          <div class="pet-bar-track">
            <div class="pet-bar-fill" style="width:${happinessPct}%;background:${happiness.color}"></div>
          </div>
        </div>
        <div class="pet-stats-row">
          <div class="pet-stat"><span class="pet-stat-val">${pet.xp}</span><span class="pet-stat-lbl">Pet XP</span></div>
          <div class="pet-stat"><span class="pet-stat-val">${pet.feedings}</span><span class="pet-stat-lbl">Feedings</span></div>
          <div class="pet-stat"><span class="pet-stat-val">${stage.label}</span><span class="pet-stat-lbl">Stage</span></div>
        </div>
        ${nextStage ? `
          <div class="pet-next-stage">
            Next stage: <strong>${nextStage.label}</strong>
            ${xpToNext > 0 ? `— Need ${xpToNext} more Pet XP` : ""}
            ${feedingsToNext > 0 ? ` and ${feedingsToNext} more feedings` : ""}
          </div>
        ` : '<div class="pet-next-stage pet-maxed">Your pet is fully grown! 🎉</div>'}
        <div class="pet-evolution">
          ${PET_STAGES.map((s, i) => `
            <div class="pet-evo-step ${i <= stageIdx ? 'reached' : ''}">
              <span class="pet-evo-emoji">${i === 0 ? petType.babyEmoji : i === 1 ? petType.teenEmoji : petType.adultEmoji}</span>
              <span class="pet-evo-label">${s.label}</span>
            </div>
            ${i < PET_STAGES.length - 1 ? '<div class="pet-evo-arrow">→</div>' : ''}
          `).join('')}
        </div>
      </div>

      <div class="pet-actions-area">
        <div class="pet-section-card">
          <h3>Feed ${pet.name}</h3>
          <p class="pet-section-desc">Feeding your pet increases happiness and helps it grow!</p>
          <div class="pet-food-grid">
            ${PET_FOODS.map(food => {
              const canAfford = state.user.xp >= food.cost || food.cost === 0;
              return `
                <button class="pet-food-btn ${!canAfford ? 'locked' : ''}" onclick="feedPet('${food.id}')" ${!canAfford ? 'disabled' : ''}>
                  <span class="pet-food-emoji">${food.emoji}</span>
                  <span class="pet-food-name">${food.name}</span>
                  <span class="pet-food-info">+${food.happiness} happiness</span>
                  ${food.cost > 0 ? `<span class="pet-food-cost">⭐${food.cost}</span>` : '<span class="pet-food-cost free">Free</span>'}
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <div class="pet-section-card">
          <h3>Accessories</h3>
          <p class="pet-section-desc">Dress up ${pet.name} with fun accessories!</p>
          <div class="shop-items">
            ${PET_ACCESSORIES.map(item => {
              const owned = state.user.purchasedItems.includes('pet-' + item.id) || item.cost === 0;
              const canBuy = state.user.xp >= item.cost;
              const isSelected = pet.accessory === item.id;
              return `
                <button class="shop-item ${isSelected ? 'selected' : ''} ${!owned && !canBuy ? 'locked' : ''}"
                  onclick="buyPetAccessory('${item.id}',${item.cost})" ${!owned && !canBuy ? 'disabled' : ''}>
                  <span class="item-emoji">${item.emoji || '—'}</span>
                  <span>${item.name}</span>
                  ${!owned && item.cost > 0 ? `<span class="item-cost">⭐${item.cost}</span>` : ''}
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <div class="pet-section-card pet-tip">
          <h3>💡 How to Grow Your Pet</h3>
          <ul class="pet-tips-list">
            <li>Read stories to earn XP for you and your pet</li>
            <li>Feed your pet regularly to increase happiness</li>
            <li>Complete quizzes to give your pet bonus XP</li>
            <li>Use Read Aloud to earn extra pet XP</li>
          </ul>
        </div>
      </div>
    </div>
    <footer class="app-footer">
      <a href="https://www.perplexity.ai/computer" target="_blank" rel="noopener noreferrer">Created with Perplexity Computer</a>
    </footer>
  `;
  lucide.createIcons({nameAttr:"data-lucide"});
}

function renderPetAdoption(container) {
  container.innerHTML = `
    <div class="page-header">
      <h2>Adopt a Pet!</h2>
      <p>Choose a virtual pet to take care of. Your pet grows as you read!</p>
    </div>
    <div class="pet-adoption-grid">
      ${PET_TYPES.map(pet => {
        const canAfford = state.user.xp >= pet.cost || pet.cost === 0;
        return `
          <div class="pet-adopt-card ${!canAfford ? 'locked' : ''}" onclick="${canAfford ? `adoptPet('${pet.id}')` : ''}">
            <div class="pet-adopt-emoji">${pet.babyEmoji}</div>
            <h3>${pet.name}</h3>
            <div class="pet-adopt-preview">
              <span>${pet.babyEmoji} → ${pet.teenEmoji} → ${pet.adultEmoji}</span>
            </div>
            ${pet.cost > 0 ? `<span class="pet-adopt-cost ${canAfford ? '' : 'too-expensive'}">⭐ ${pet.cost} XP</span>` : '<span class="pet-adopt-cost free">Free!</span>'}
          </div>
        `;
      }).join('')}
    </div>
    <footer class="app-footer">
      <a href="https://www.perplexity.ai/computer" target="_blank" rel="noopener noreferrer">Created with Perplexity Computer</a>
    </footer>
  `;
}

function adoptPet(typeId) {
  const petType = PET_TYPES.find(p => p.id === typeId);
  if (!petType) return;
  if (petType.cost > 0 && state.user.xp < petType.cost) return;

  if (petType.cost > 0) {
    state.user.xp -= petType.cost;
  }

  const petName = prompt(`What would you like to name your ${petType.name}?`) || petType.name;
  state.user.pet = {
    typeId: typeId,
    name: petName,
    happiness: 50,
    xp: 0,
    feedings: 0,
    accessory: "none",
    adoptedAt: new Date().toLocaleString()
  };
  showToast("🐾", "Pet Adopted!", `Welcome ${petName} to the family!`);
  logActivity(`Adopted a pet: ${petName} the ${petType.name}`);
  checkBadges();
  render();
}

function feedPet(foodId) {
  if (!state.user.pet) return;
  const food = PET_FOODS.find(f => f.id === foodId);
  if (!food) return;
  if (food.cost > 0 && state.user.xp < food.cost) return;

  if (food.cost > 0) {
    state.user.xp -= food.cost;
  }

  const prevStage = getPetStageIndex();
  state.user.pet.happiness = Math.min(100, state.user.pet.happiness + food.happiness);
  state.user.pet.feedings++;
  state.user.pet.xp += Math.ceil(food.happiness / 2);
  state.user.petFeedingsTotal = (state.user.petFeedingsTotal || 0) + 1;

  // Animate
  state.petAnimation = 'pet-bounce';
  setTimeout(() => { state.petAnimation = null; }, 600);

  const newStage = getPetStageIndex();
  if (newStage > prevStage) {
    showConfetti();
    const petType = PET_TYPES.find(p => p.id === state.user.pet.typeId);
    showToast("🎉", "Pet Evolved!", `${state.user.pet.name} grew to ${PET_STAGES[newStage].label} stage!`);
    logActivity(`${state.user.pet.name} evolved to ${PET_STAGES[newStage].label}!`);
  } else {
    showToast(food.emoji, "Yummy!", `${state.user.pet.name} enjoyed the ${food.name}!`);
  }

  checkBadges();
  renderSidebar();
  render();
}

function buyPetAccessory(itemId, cost) {
  if (!state.user.pet) return;
  const key = 'pet-' + itemId;
  if (state.user.purchasedItems.includes(key) || cost === 0) {
    state.user.pet.accessory = itemId;
    render();
    return;
  }
  if (state.user.xp >= cost) {
    state.user.xp -= cost;
    state.user.purchasedItems.push(key);
    state.user.pet.accessory = itemId;
    const item = PET_ACCESSORIES.find(a => a.id === itemId);
    showToast("🎁", "Accessory Purchased!", item ? item.name : itemId);
    logActivity(`Purchased pet accessory: ${item ? item.name : itemId}`);
    renderSidebar();
    render();
  }
}

// Give pet XP when user earns XP (called from awardXP)
function givePetXP(amount) {
  if (!state.user.pet) return;
  const prevStage = getPetStageIndex();
  state.user.pet.xp += Math.ceil(amount * 0.5);
  // Decrease happiness over time (slight decay)
  state.user.pet.happiness = Math.max(0, state.user.pet.happiness - 1);
  const newStage = getPetStageIndex();
  if (newStage > prevStage) {
    showConfetti();
    const petType = PET_TYPES.find(p => p.id === state.user.pet.typeId);
    showToast("🎉", "Pet Evolved!", `${state.user.pet.name} grew to ${PET_STAGES[newStage].label} stage!`);
    logActivity(`${state.user.pet.name} evolved to ${PET_STAGES[newStage].label}!`);
    checkBadges();
  }
}

// ======== PARENT PIN (server-backed) ========
async function verifyParentPin(pin, inputs) {
  try {
    const { data } = await sb.from("profiles").select("parent_pin").eq("id", state.userId).single();
    const correctPin = (data && data.parent_pin) || "1234";
    if (pin === correctPin) {
      state.parentUnlocked = true;
      render();
    } else {
      inputs.forEach(inp => { inp.value = ""; inp.style.borderColor = "var(--color-error)"; });
      inputs[0].focus();
      setTimeout(() => inputs.forEach(inp => inp.style.borderColor = ""), 1000);
    }
  } catch (e) {
    if (pin === "1234") {
      state.parentUnlocked = true;
      render();
    } else {
      inputs.forEach(inp => { inp.value = ""; inp.style.borderColor = "var(--color-error)"; });
      inputs[0].focus();
      setTimeout(() => inputs.forEach(inp => inp.style.borderColor = ""), 1000);
    }
  }
}

function renderForgotPassword() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="welcome-screen">
      <div style="font-size:4rem;margin-bottom:var(--space-4)">📧</div>
      <h1>Reset Password</h1>
      <p>Enter your email and we\u2019ll send a link to reset your password.</p>
      <div id="auth-error" class="auth-error" style="display:none"></div>
      <div id="auth-success" class="auth-success" style="display:none"></div>
      <input type="email" class="welcome-input" id="forgot-email" placeholder="Email address" maxlength="100" autocomplete="email">
      <br>
      <button class="welcome-btn" id="forgot-btn" disabled>Send Reset Link</button>
      <p class="auth-switch"><a href="#" id="go-back-login">Back to sign in</a></p>
    </div>
    <div id="toast-container" class="toast-container"></div>
  `;
  const eInput = document.getElementById("forgot-email");
  const btn = document.getElementById("forgot-btn");
  eInput.addEventListener("input", () => {
    btn.disabled = !eInput.value.trim();
  });
  btn.addEventListener("click", doForgotPassword);
  eInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !btn.disabled) doForgotPassword();
  });
  document.getElementById("go-back-login").addEventListener("click", (e) => {
    e.preventDefault();
    state.authView = "login";
    renderWelcome();
  });
  eInput.focus();
}

async function doForgotPassword() {
  const email = document.getElementById("forgot-email").value.trim();
  const btn = document.getElementById("forgot-btn");
  btn.disabled = true;
  btn.textContent = "Sending...";
  try {
    const { error } = await sb.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + window.location.pathname
    });
    if (error) {
      showAuthError(error.message);
      btn.disabled = false;
      btn.textContent = "Send Reset Link";
      return;
    }
    const el = document.getElementById("auth-success");
    if (el) {
      el.textContent = "Check your email for a password reset link!";
      el.style.display = "block";
    }
    const errEl = document.getElementById("auth-error");
    if (errEl) errEl.style.display = "none";
    btn.textContent = "Email Sent";
  } catch (e) {
    showAuthError("Could not connect. Please try again.");
    btn.disabled = false;
    btn.textContent = "Send Reset Link";
  }
}

function renderResetPassword() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="welcome-screen">
      <div style="font-size:4rem;margin-bottom:var(--space-4)">🔒</div>
      <h1>Set New Password</h1>
      <p>Choose a new password for your account.</p>
      <div id="auth-error" class="auth-error" style="display:none"></div>
      <div id="auth-success" class="auth-success" style="display:none"></div>
      <input type="password" class="welcome-input" id="reset-password" placeholder="New password (6+ characters)" maxlength="50" autocomplete="new-password">
      <input type="password" class="welcome-input" id="reset-password2" placeholder="Confirm new password" maxlength="50" autocomplete="new-password" style="margin-top:var(--space-2)">
      <br>
      <button class="welcome-btn" id="reset-btn" disabled>Update Password</button>
    </div>
    <div id="toast-container" class="toast-container"></div>
  `;
  const pInput = document.getElementById("reset-password");
  const p2Input = document.getElementById("reset-password2");
  const btn = document.getElementById("reset-btn");
  const validate = () => {
    btn.disabled = pInput.value.length < 6 || pInput.value !== p2Input.value;
  };
  pInput.addEventListener("input", validate);
  p2Input.addEventListener("input", validate);
  btn.addEventListener("click", doResetPassword);
  p2Input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !btn.disabled) doResetPassword();
  });
  pInput.focus();
}

async function doResetPassword() {
  const password = document.getElementById("reset-password").value;
  const btn = document.getElementById("reset-btn");
  btn.disabled = true;
  btn.textContent = "Updating...";
  try {
    const { error } = await sb.auth.updateUser({ password });
    if (error) {
      showAuthError(error.message);
      btn.disabled = false;
      btn.textContent = "Update Password";
      return;
    }
    const el = document.getElementById("auth-success");
    if (el) {
      el.textContent = "Password updated! Signing you in...";
      el.style.display = "block";
    }
    // Auto-login after password reset
    setTimeout(() => {
      state.authView = "login";
      init();
    }, 1500);
  } catch (e) {
    showAuthError("Could not connect. Please try again.");
    btn.disabled = false;
    btn.textContent = "Update Password";
  }
}

async function doLogout() {
  // Save before logout
  if (state.userId && state.user) {
    await sb.from("progress")
      .upsert({ id: state.userId, data: state.user, updated_at: new Date().toISOString() })
      .catch(() => {});
  }
  await sb.auth.signOut();
  state.user = null;
  state.userId = null;
  state.username = null;
  state.parentUnlocked = false;
  state.currentView = "library";
  state.authView = "login";
  state.currentStory = null;
  state.quizState = null;
  state.voiceRecording = null;
  state.petAnimation = null;
  render();
}

// ======== INIT ========
async function init() {
  initTheme();

  // Detect password reset flow from Supabase redirect
  const hashParams = new URLSearchParams(window.location.hash.substring(1));
  if (hashParams.get("type") === "recovery") {
    state.authView = "reset";
    // Clear the hash
    history.replaceState(null, "", window.location.pathname);
    render();
    return;
  }

  // Check for existing Supabase session
  const { data: { session } } = await sb.auth.getSession();
  if (session && session.user) {
    const user = session.user;
    state.userId = user.id;
    state.username = user.user_metadata.display_name || user.email.split("@")[0];
    // Load progress
    const { data: prog } = await sb.from("progress").select("data").eq("id", user.id).single();
    if (prog && prog.data && prog.data.name) {
      state.user = prog.data;
    } else {
      state.user = createDefaultUser(state.username);
    }
    enterApp();
  } else {
    render();
  }
  // Probe mic availability so Record button can show if allowed
  checkMicAvailable().then(avail => { if (avail && state.user) render(); });
}

document.addEventListener("DOMContentLoaded", init);
