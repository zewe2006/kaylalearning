/* Story Quest - Math Galaxy Views
   All render functions for the Math Galaxy module.
   Depends on: math.js (data), app.js (state, awardXP, saveState, render, showToast, navigate) */

// ======== STATE ========
var mathState = {
  currentLesson: null,
  currentGame: null,
  conceptIndex: 0,
  questionIndex: 0,
  score: 0,
  totalQuestions: 0,
  answers: [],
  finished: false,
  resultsProcessed: false,
  showHint: false,
  answered: false
};

function resetMathState() {
  mathState = {
    currentLesson: null,
    currentGame: null,
    conceptIndex: 0,
    questionIndex: 0,
    score: 0,
    totalQuestions: 0,
    answers: [],
    finished: false,
    resultsProcessed: false,
    showHint: false,
    answered: false
  };
}

// ======== HELPERS ========
function initMathProgress() {
  if (!state.user) return;
  if (!state.user.math) {
    state.user.math = {
      lessonsCompleted: 0,
      gamesCompleted: 0,
      perfectGames: 0,
      totalStars: 0,
      gameScores: {},
      completedIds: {}
    };
  }
  var m = state.user.math;
  if (!m.lessonsCompleted) m.lessonsCompleted = 0;
  if (!m.gamesCompleted) m.gamesCompleted = 0;
  if (!m.perfectGames) m.perfectGames = 0;
  if (!m.totalStars) m.totalStars = 0;
  if (!m.gameScores) m.gameScores = {};
  if (!m.completedIds) m.completedIds = {};
}

function getMathStars(score, total) {
  var pct = total > 0 ? (score / total) * 100 : 0;
  if (pct >= 100) return 3;
  if (pct >= 75) return 2;
  if (pct >= 50) return 1;
  return 0;
}

function checkMathBadges() {
  if (typeof MATH_BADGES === "undefined" || !state.user) return;
  if (!state.user.badgesEarned) state.user.badgesEarned = [];
  try {
    MATH_BADGES.forEach(function(badge) {
      if (badge.condition(state.user) && !state.user.badgesEarned.includes(badge.id)) {
        state.user.badgesEarned.push(badge.id);
        showRewardCelebration(badge.icon, "Badge Earned!", badge.name, "badge");
      }
    });
  } catch(e) { console.warn('checkMathBadges error:', e); }
}

// ======== HOME VIEW ========
function renderMathHome(container) {
  initMathProgress();
  var m = state.user.math;

  var html = '<div class="math-home">';
  html += '<h2>\u{1F680} Math Galaxy</h2>';
  html += '<p class="math-subtitle">Explore the universe of numbers! Learn math concepts in lessons, then test your skills in games.</p>';

  // Stats bar
  html += '<div class="math-stats-bar">';
  html += '<div class="math-stat-chip"><span class="stat-icon">\u{1F4DA}</span> ' + m.lessonsCompleted + ' Lessons</div>';
  html += '<div class="math-stat-chip"><span class="stat-icon">\u{1F3AE}</span> ' + m.gamesCompleted + ' Games</div>';
  html += '<div class="math-stat-chip"><span class="stat-icon">\u{2B50}</span> ' + m.totalStars + ' Stars</div>';
  html += '<div class="math-stat-chip"><span class="stat-icon">\u{1F31F}</span> ' + m.perfectGames + ' Perfect</div>';
  html += '</div>';

  var tiers = ["beginner", "intermediate", "advanced"];
  var tierLabels = { beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced" };
  var tierDescs = { beginner: "Start your journey with the basics", intermediate: "Level up your math skills", advanced: "Master complex problems" };

  tiers.forEach(function(tier) {
    html += '<div class="math-tier">';
    html += '<div class="math-tier-header">';
    html += '<div class="math-tier-badge ' + tier + '">' + (tier === "beginner" ? "B" : tier === "intermediate" ? "I" : "A") + '</div>';
    html += '<div class="math-tier-info"><h3>' + tierLabels[tier] + '</h3><p>' + tierDescs[tier] + '</p></div>';
    html += '</div>';

    html += '<div class="math-card-grid">';

    // Lessons
    if (typeof MATH_LESSONS !== "undefined" && MATH_LESSONS[tier]) {
      MATH_LESSONS[tier].forEach(function(lesson) {
        var done = m.completedIds[lesson.id];
        html += '<div class="math-card' + (done ? ' completed' : '') + '" onclick="startMathLesson(\'' + lesson.id + '\', \'' + tier + '\')">';
        if (done) html += '<div class="math-card-status">\u{2705}</div>';
        html += '<div class="math-card-icon">' + lesson.icon + '</div>';
        html += '<div class="math-card-title">' + lesson.title + '</div>';
        html += '<div class="math-card-desc">' + lesson.description + '</div>';
        html += '<span class="math-card-tag lesson">Lesson</span>';
        html += '</div>';
      });
    }

    // Games
    if (typeof MATH_GAMES !== "undefined" && MATH_GAMES[tier]) {
      MATH_GAMES[tier].forEach(function(game) {
        var done = m.completedIds[game.id];
        var sc = m.gameScores[game.id];
        html += '<div class="math-card' + (done ? ' completed' : '') + '" onclick="startMathGame(\'' + game.id + '\', \'' + tier + '\')">';
        if (done) html += '<div class="math-card-status">\u{2705}</div>';
        html += '<div class="math-card-icon">' + game.icon + '</div>';
        html += '<div class="math-card-title">' + game.title + '</div>';
        html += '<div class="math-card-desc">' + game.description + '</div>';
        html += '<span class="math-card-tag game">Game</span>';
        if (sc) {
          var pct = Math.round((sc.score / sc.total) * 100);
          html += '<div class="math-card-score">Best: ' + sc.score + '/' + sc.total + ' (' + pct + '%)</div>';
        }
        html += '</div>';
      });
    }

    html += '</div></div>';
  });

  html += '<footer class="app-footer"><a href="https://www.perplexity.ai/computer" target="_blank" rel="noopener noreferrer">Created with Perplexity Computer</a></footer>';
  html += '</div>';

  container.innerHTML = html;
  if (typeof lucide !== "undefined") lucide.createIcons();
}

// ======== START LESSON ========
function startMathLesson(lessonId, tier) {
  resetMathState();
  var lessons = MATH_LESSONS[tier] || [];
  var lesson = lessons.find(function(l) { return l.id === lessonId; });
  if (!lesson) return;
  mathState.currentLesson = lesson;
  mathState.conceptIndex = 0;
  navigate("math-lesson");
}

// ======== RENDER LESSON ========
function renderMathLesson(container) {
  var lesson = mathState.currentLesson;
  if (!lesson) { navigate("math"); return; }

  var concepts = lesson.concepts;
  var idx = mathState.conceptIndex;

  if (idx >= concepts.length) {
    renderMathLessonComplete(container);
    return;
  }

  var concept = concepts[idx];
  var html = '<div class="math-lesson">';
  html += '<div class="math-lesson-header">';
  html += '<h2>' + lesson.icon + ' ' + lesson.title + '</h2>';
  html += '<div class="math-lesson-progress">Concept ' + (idx + 1) + ' of ' + concepts.length + '</div>';
  html += '</div>';

  html += '<div class="math-concept-card">';
  html += '<h3>' + concept.title + '</h3>';
  html += '<div class="math-explanation">' + concept.explanation + '</div>';
  html += '<div class="math-visual-box">' + concept.visual + '</div>';
  if (concept.tip) {
    html += '<div class="math-tip">' + concept.tip + '</div>';
  }
  html += '</div>';

  html += '<div class="math-lesson-nav">';
  if (idx > 0) {
    html += '<button onclick="mathLessonPrev()">Previous</button>';
  } else {
    html += '<button onclick="navigate(\'math\')">\u{2190} Back</button>';
  }
  if (idx < concepts.length - 1) {
    html += '<button class="primary" onclick="mathLessonNext()">Next \u{2192}</button>';
  } else {
    html += '<button class="primary" onclick="mathLessonNext()">Complete \u{2705}</button>';
  }
  html += '</div>';

  html += '</div>';
  container.innerHTML = html;
}

function mathLessonPrev() {
  if (mathState.conceptIndex > 0) {
    mathState.conceptIndex--;
    render();
  }
}

function mathLessonNext() {
  mathState.conceptIndex++;
  render();
}

function renderMathLessonComplete(container) {
  initMathProgress();
  var lesson = mathState.currentLesson;
  if (!lesson) { navigate("math"); return; }

  var m = state.user.math;
  var alreadyDone = m.completedIds[lesson.id];

  if (!alreadyDone) {
    m.completedIds[lesson.id] = true;
    m.lessonsCompleted = (m.lessonsCompleted || 0) + 1;
    awardXP(15, "Math lesson: " + lesson.title, "math-lesson-" + lesson.id);
    state.user.activityLog.unshift({ text: "Completed Math Galaxy lesson: " + lesson.title, time: new Date().toLocaleString() });
    if (typeof saveStateNow === "function") saveStateNow();
    else saveState();
    checkMathBadges();
  }

  var html = '<div class="math-lesson-complete">';
  html += '<div class="math-lesson-complete-icon">\u{1F680}</div>';
  html += '<h2>Lesson Complete!</h2>';
  html += '<p>Great job learning ' + lesson.title + '! Now try the game to test your skills.</p>';
  if (!alreadyDone) {
    html += '<div class="math-xp-badge">+15 XP earned!</div>';
  }
  html += '<div class="math-results-actions">';
  html += '<button onclick="navigate(\'math\')">Back to Math Galaxy</button>';
  html += '</div>';
  html += '</div>';
  container.innerHTML = html;
}

// ======== START GAME ========
function startMathGame(gameId, tier) {
  resetMathState();
  var games = MATH_GAMES[tier] || [];
  var game = games.find(function(g) { return g.id === gameId; });
  if (!game) return;
  mathState.currentGame = game;
  mathState.questionIndex = 0;
  mathState.score = 0;
  mathState.totalQuestions = game.questions.length;
  mathState.answers = [];
  mathState.finished = false;
  mathState.resultsProcessed = false;
  navigate("math-game");
}

// ======== RENDER GAME ========
function renderMathGame(container) {
  var game = mathState.currentGame;
  if (!game) { navigate("math"); return; }

  if (mathState.finished) {
    renderMathResults(container);
    return;
  }

  var questions = game.questions;
  var idx = mathState.questionIndex;
  if (idx >= questions.length) {
    mathState.finished = true;
    renderMathResults(container);
    return;
  }

  var q = questions[idx];
  var progress = Math.round((idx / questions.length) * 100);

  var html = '<div class="math-game">';
  html += '<div class="math-game-header">';
  html += '<h2>' + game.icon + ' ' + game.title + '</h2>';
  html += '</div>';

  html += '<div class="math-progress-bar"><div class="math-progress-fill" style="width:' + progress + '%"></div></div>';

  html += '<div class="math-question-card">';
  html += '<div class="math-question-number">Question ' + (idx + 1) + ' of ' + questions.length + '</div>';
  html += '<div class="math-question-text">' + q.question + '</div>';

  html += '<div class="math-options-grid">';
  q.options.forEach(function(opt, i) {
    var cls = "math-option-btn";
    if (mathState.answered) {
      if (i === q.correct) cls += " correct";
      else if (mathState.answers[idx] === i && i !== q.correct) cls += " wrong";
      else cls += " disabled";
    }
    html += '<button class="' + cls + '" onclick="mathSelectAnswer(' + idx + ',' + i + ')"' + (mathState.answered ? ' disabled' : '') + '>' + opt + '</button>';
  });
  html += '</div>';

  // Hint button
  if (!mathState.showHint && !mathState.answered) {
    html += '<button style="margin-top:var(--space-3);background:none;border:none;color:var(--color-text-secondary);font-size:var(--text-sm);cursor:pointer;text-decoration:underline" onclick="mathShowHint()">Need a hint?</button>';
  }
  if (mathState.showHint) {
    html += '<div class="math-hint-box">' + q.hint + '</div>';
  }

  // Feedback
  if (mathState.answered) {
    var wasCorrect = mathState.answers[idx] === q.correct;
    if (wasCorrect) {
      html += '<div class="math-feedback correct-feedback">\u{2705} Correct! Great job!';
      html += '<br><button class="got-it-btn" onclick="mathNextQuestion()">Next</button>';
      html += '</div>';
    } else {
      html += '<div class="math-feedback wrong-feedback">';
      html += '\u{274C} Not quite. The answer is <strong>' + q.options[q.correct] + '</strong>.';
      html += '<br>' + q.hint;
      html += '<br><button class="got-it-btn" onclick="mathNextQuestion()">Got it!</button>';
      html += '</div>';
    }
  }

  html += '</div></div>';
  container.innerHTML = html;
}

function mathSelectAnswer(qIdx, optIdx) {
  if (mathState.answered) return;
  mathState.answered = true;
  mathState.answers[qIdx] = optIdx;
  var q = mathState.currentGame.questions[qIdx];
  if (optIdx === q.correct) {
    mathState.score++;
  }
  render();
}

function mathShowHint() {
  mathState.showHint = true;
  render();
}

function mathNextQuestion() {
  mathState.questionIndex++;
  mathState.answered = false;
  mathState.showHint = false;
  if (mathState.questionIndex >= mathState.currentGame.questions.length) {
    mathState.finished = true;
  }
  render();
}

// ======== RESULTS ========
function renderMathResults(container) {
  initMathProgress();
  var game = mathState.currentGame;
  if (!game) { navigate("math"); return; }

  var score = mathState.score;
  var total = mathState.totalQuestions;
  var stars = getMathStars(score, total);
  var pct = Math.round((score / total) * 100);
  var m = state.user.math;

  // Process results once
  if (!mathState.resultsProcessed) {
    mathState.resultsProcessed = true;

    var prevScore = m.gameScores[game.id];
    var isNewBest = !prevScore || score > prevScore.score;

    if (isNewBest) {
      m.gameScores[game.id] = { score: score, total: total };
    }

    if (!m.completedIds[game.id]) {
      m.completedIds[game.id] = true;
      m.gamesCompleted = (m.gamesCompleted || 0) + 1;
    }

    if (pct === 100) {
      m.perfectGames = (m.perfectGames || 0) + 1;
    }

    m.totalStars = (m.totalStars || 0) + stars;

    var xp = stars === 3 ? 30 : stars === 2 ? 20 : stars === 1 ? 10 : 5;
    awardXP(xp, "Math game: " + game.title, "math-game-" + game.id);

    state.user.activityLog.unshift({ text: "Completed " + game.title + ": " + score + "/" + total + " (" + pct + "%)", time: new Date().toLocaleString() });

    if (typeof saveStateNow === "function") saveStateNow();
    else saveState();
    checkMathBadges();
  }

  var emoji = pct === 100 ? "\u{1F31F}" : pct >= 75 ? "\u{1F680}" : pct >= 50 ? "\u{2B50}" : "\u{1F30D}";
  var message = pct === 100 ? "Perfect Score! You're a math superstar!" : pct >= 75 ? "Excellent work, astronaut!" : pct >= 50 ? "Good effort! Keep practicing!" : "Keep trying! You'll get there!";

  var html = '<div class="math-results">';
  html += '<div class="math-results-icon">' + emoji + '</div>';
  html += '<h2>' + message + '</h2>';
  html += '<div class="score-display">' + score + ' / ' + total + '</div>';
  html += '<div class="score-label">' + pct + '% correct</div>';

  html += '<div class="math-stars">';
  for (var i = 0; i < 3; i++) {
    html += '<span class="star ' + (i < stars ? 'earned' : '') + '">' + (i < stars ? '\u{2B50}' : '\u{2606}') + '</span>';
  }
  html += '</div>';

  var xpEarned = stars === 3 ? 30 : stars === 2 ? 20 : stars === 1 ? 10 : 5;
  html += '<div class="math-xp-badge">+' + xpEarned + ' XP</div>';

  html += '<div class="math-results-actions">';
  html += '<button onclick="navigate(\'math\')">Back to Math Galaxy</button>';
  html += '<button class="primary" onclick="retryMathGame()">Try Again</button>';
  html += '</div>';
  html += '</div>';
  container.innerHTML = html;
}

function retryMathGame() {
  var game = mathState.currentGame;
  if (!game) { navigate("math"); return; }
  // Find the tier
  var tier = "beginner";
  ["beginner", "intermediate", "advanced"].forEach(function(t) {
    if (MATH_GAMES[t]) {
      MATH_GAMES[t].forEach(function(g) {
        if (g.id === game.id) tier = t;
      });
    }
  });
  startMathGame(game.id, tier);
}