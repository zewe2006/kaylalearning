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