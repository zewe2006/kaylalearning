/* Story Quest - Word Adventure Views
   All render functions for the Word Adventure English game.
   Depends on: english.js (data), app.js (state, awardXP, saveState, render, showToast, navigate) */

// ======== STATE ========
let engState = {
  currentWorld: null,
  currentChallenge: null,
  questionIndex: 0,
  score: 0,
  totalQuestions: 0,
  answers: [],
  finished: false,
  resultsProcessed: false,
  spellingInput: ""
};

function resetEngState() {
  engState = {
    currentWorld: null,
    currentChallenge: null,
    questionIndex: 0,
    score: 0,
    totalQuestions: 0,
    answers: [],
    finished: false,
    resultsProcessed: false,
    spellingInput: ""
  };
}

// ======== HELPERS ========

function initEnglishProgress() {
  if (!state.user) return;
  if (!state.user.english) {
    state.user.english = {
      challengeScores: {},
      totalChallengesCompleted: 0,
      vocabCompleted: 0,
      spellingCompleted: 0,
      grammarCompleted: 0,
      perfectScores: 0,
      totalStars: 0
    };
  }
  var e = state.user.english;
  if (!e.challengeScores) e.challengeScores = {};
  if (!e.totalChallengesCompleted) e.totalChallengesCompleted = 0;
  if (!e.vocabCompleted) e.vocabCompleted = 0;
  if (!e.spellingCompleted) e.spellingCompleted = 0;
  if (!e.grammarCompleted) e.grammarCompleted = 0;
  if (!e.perfectScores) e.perfectScores = 0;
  if (!e.totalStars) e.totalStars = 0;
}

function getStarsForScore(score, total) {
  var pct = total > 0 ? (score / total) * 100 : 0;
  if (pct >= 100) return 3;
  if (pct >= 75) return 2;
  if (pct >= 50) return 1;
  return 0;
}

function getChallengeKey(worldId, challengeType) {
  return worldId + "-" + challengeType;
}

function getWorldStars(worldId) {
  initEnglishProgress();
  var e = state.user.english;
  var stars = 0;
  ["vocab", "spelling", "grammar"].forEach(function(type) {
    var key = getChallengeKey(worldId, type);
    if (e.challengeScores[key]) {
      stars += getStarsForScore(e.challengeScores[key].score, e.challengeScores[key].total);
    }
  });
  return stars;
}

function getTotalStars() {
  initEnglishProgress();
  var total = 0;
  ENGLISH_WORLDS.forEach(function(w) {
    total += getWorldStars(w.id);
  });
  return total;
}

function isWorldUnlocked(world) {
  return getTotalStars() >= world.unlockStars;
}

function isWorldComplete(worldId) {
  initEnglishProgress();
  var e = state.user.english;
  return ["vocab", "spelling", "grammar"].every(function(type) {
    var key = getChallengeKey(worldId, type);
    return e.challengeScores[key] && e.challengeScores[key].score > 0;
  });
}

function checkEnglishBadges() {
  if (!state.user) return;
  initEnglishProgress();
  var e = state.user.english;

  ENGLISH_BADGES.forEach(function(badge) {
    if (state.user.badgesEarned.includes(badge.id)) return;

    var earned = false;
    switch (badge.requirement.type) {
      case "eng_challenges_completed":
        earned = e.totalChallengesCompleted >= badge.requirement.count;
        break;
      case "eng_vocab_completed":
        earned = e.vocabCompleted >= badge.requirement.count;
        break;
      case "eng_spelling_completed":
        earned = e.spellingCompleted >= badge.requirement.count;
        break;
      case "eng_grammar_completed":
        earned = e.grammarCompleted >= badge.requirement.count;
        break;
      case "eng_perfect":
        earned = e.perfectScores >= badge.requirement.count;
        break;
      case "eng_world_complete":
        earned = isWorldComplete(badge.requirement.world);
        break;
      case "eng_all_worlds":
        earned = ENGLISH_WORLDS.every(function(w) { return isWorldComplete(w.id); });
        break;
    }

    if (earned) {
      state.user.badgesEarned.push(badge.id);
      showRewardCelebration(badge.icon, "Badge Earned!", badge.name, "badge");
      saveState();
    }
  });
}

// ======== NAV ========
function engNav(view) {
  navigate("english-" + view);
}

// ======== WORLD MAP ========
function renderEnglishHome(container) {
  initEnglishProgress();
  var totalStars = getTotalStars();
  var maxStars = ENGLISH_WORLDS.length * 9;

  container.innerHTML =
    '<div class="eng-home">' +
      '<div class="eng-header">' +
        '<button class="back-btn" onclick="navigate(\'library\')">' +
          '<i data-lucide="arrow-left"></i> Back' +
        '</button>' +
        '<h1>\u2728 Word Adventure \u2728</h1>' +
        '<div class="eng-total-stars">\u2B50 ' + totalStars + ' / ' + maxStars + '</div>' +
      '</div>' +
      '<p class="eng-subtitle">Travel through magical worlds and master vocabulary, spelling, and grammar!</p>' +
      '<div class="eng-world-map">' +
        ENGLISH_WORLDS.map(function(world) {
          var unlocked = isWorldUnlocked(world);
          var stars = getWorldStars(world.id);
          var complete = isWorldComplete(world.id);
          var starStr = "";
          for (var s = 0; s < stars; s++) starStr += "\u2B50";
          for (var s = 0; s < 9 - stars; s++) starStr += "\u2606";
          return '<div class="eng-world-card ' + (unlocked ? '' : 'locked') + ' ' + (complete ? 'complete' : '') + '"' +
            ' onclick="' + (unlocked ? "engSelectWorld('" + world.id + "')" : '') + '"' +
            ' style="--world-color: ' + world.color + '">' +
            '<div class="eng-world-icon">' + world.icon + '</div>' +
            '<div class="eng-world-info">' +
              '<h3>' + world.name + '</h3>' +
              '<p>' + (unlocked ? world.description : '\uD83D\uDD12 Need ' + world.unlockStars + ' stars to unlock') + '</p>' +
              '<div class="eng-world-stars">' + (unlocked ? starStr : '') + '</div>' +
            '</div>' +
            (complete ? '<div class="eng-world-check">\u2705</div>' : '') +
            (!unlocked ? '<div class="eng-world-lock">\uD83D\uDD12</div>' : '') +
          '</div>';
        }).join('') +
      '</div>' +
    '</div>';
  if (typeof lucide !== "undefined") lucide.createIcons();
}

// ======== WORLD DETAIL ========
function engSelectWorld(worldId) {
  engState.currentWorld = worldId;
  navigate("english-world");
}

function renderEnglishWorld(container) {
  initEnglishProgress();
  var world = ENGLISH_WORLDS.find(function(w) { return w.id === engState.currentWorld; });
  if (!world) { navigate("english"); return; }

  var challenges = [
    { type: "vocab", name: "Vocabulary Quest", icon: "\uD83D\uDCD6", desc: "Learn new words and their meanings!", data: VOCAB_CHALLENGES[world.id] },
    { type: "spelling", name: "Spelling Spell", icon: "\u2728", desc: "Cast the right spelling!", data: SPELLING_CHALLENGES[world.id] },
    { type: "grammar", name: "Grammar Guardian", icon: "\uD83D\uDEE1\uFE0F", desc: "Defend language with correct grammar!", data: GRAMMAR_CHALLENGES[world.id] }
  ];

  container.innerHTML =
    '<div class="eng-world-detail">' +
      '<div class="eng-header">' +
        '<button class="back-btn" onclick="navigate(\'english\')">' +
          '<i data-lucide="arrow-left"></i> Back' +
        '</button>' +
        '<h1>' + world.icon + ' ' + world.name + '</h1>' +
      '</div>' +
      '<div class="eng-challenge-cards">' +
        challenges.map(function(ch) {
          var key = getChallengeKey(world.id, ch.type);
          var saved = state.user.english.challengeScores[key];
          var stars = saved ? getStarsForScore(saved.score, saved.total) : 0;
          var bestPct = saved ? Math.round((saved.score / saved.total) * 100) : 0;
          var starStr = "";
          for (var s = 0; s < stars; s++) starStr += "\u2B50";
          for (var s = 0; s < 3 - stars; s++) starStr += "\u2606";
          return '<div class="eng-challenge-card" onclick="engStartChallenge(\'' + ch.type + '\')" style="--world-color: ' + world.color + '">' +
            '<div class="eng-challenge-icon">' + ch.icon + '</div>' +
            '<h3>' + ch.name + '</h3>' +
            '<p>' + ch.desc + '</p>' +
            '<div class="eng-challenge-meta">' +
              '<span>' + (ch.data ? ch.data.length : 0) + ' questions</span>' +
              (saved ? '<span class="eng-best">Best: ' + bestPct + '%</span>' : '<span class="eng-new">New!</span>') +
            '</div>' +
            '<div class="eng-challenge-stars">' + starStr + '</div>' +
          '</div>';
        }).join('') +
      '</div>' +
    '</div>';
  if (typeof lucide !== "undefined") lucide.createIcons();
}

// ======== START CHALLENGE ========
function engStartChallenge(challengeType) {
  var worldId = engState.currentWorld || "enchanted-forest";
  resetEngState();
  engState.currentWorld = worldId;
  engState.currentChallenge = challengeType;

  var questions;
  if (challengeType === "vocab") questions = VOCAB_CHALLENGES[worldId];
  else if (challengeType === "spelling") questions = SPELLING_CHALLENGES[worldId];
  else questions = GRAMMAR_CHALLENGES[worldId];

  engState.totalQuestions = questions ? questions.length : 0;
  navigate("english-challenge");
}

// ======== CHALLENGE SCREEN ========
function renderEnglishChallenge(container) {
  initEnglishProgress();

  if (engState.finished) {
    renderEnglishResults(container);
    return;
  }

  var world = ENGLISH_WORLDS.find(function(w) { return w.id === engState.currentWorld; });
  if (!world) { navigate("english"); return; }

  var type = engState.currentChallenge;
  var questions;
  if (type === "vocab") questions = VOCAB_CHALLENGES[world.id];
  else if (type === "spelling") questions = SPELLING_CHALLENGES[world.id];
  else questions = GRAMMAR_CHALLENGES[world.id];

  if (!questions || engState.questionIndex >= questions.length) {
    engState.finished = true;
    renderEnglishResults(container);
    return;
  }

  var q = questions[engState.questionIndex];
  var progress = Math.round(((engState.questionIndex) / engState.totalQuestions) * 100);

  if (type === "vocab") renderVocabQuestion(container, q, world, progress);
  else if (type === "spelling") renderSpellingQuestion(container, q, world, progress);
  else renderGrammarQuestion(container, q, world, progress);
}

// ======== SHUFFLE OPTIONS ========
function engShuffleOptions(options, correctIndex) {
  var indices = options.map(function(_, i) { return i; });
  for (var i = indices.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = indices[i]; indices[i] = indices[j]; indices[j] = tmp;
  }
  var shuffled = indices.map(function(idx) { return options[idx]; });
  var newCorrect = indices.indexOf(correctIndex);
  return { options: shuffled, correct: newCorrect };
}

// ======== VOCAB QUESTION ========
function renderVocabQuestion(container, q, world, progress) {
  var sh = engShuffleOptions(q.options, q.correct);
  container.innerHTML =
    '<div class="eng-challenge-screen">' +
      '<div class="eng-challenge-top">' +
        '<button class="back-btn" onclick="engQuitChallenge()">' +
          '<i data-lucide="x"></i> Quit' +
        '</button>' +
        '<div class="eng-progress-bar">' +
          '<div class="eng-progress-fill" style="width:' + progress + '%;background:' + world.color + '"></div>' +
        '</div>' +
        '<div class="eng-score-display">' + engState.score + '/' + engState.questionIndex + '</div>' +
      '</div>' +
      '<div class="eng-question-card">' +
        '<div class="eng-q-badge" style="background:' + world.color + '">\uD83D\uDCD6 Vocabulary</div>' +
        '<h2 class="eng-q-word">' + q.word + '</h2>' +
        '<p class="eng-q-prompt">What does this word mean?</p>' +
        '<div class="eng-options">' +
          sh.options.map(function(opt, i) {
            return '<button class="eng-option-btn" onclick="engAnswerVocab(' + i + ',' + sh.correct + ')">' +
              '<span class="eng-opt-letter">' + String.fromCharCode(65 + i) + '</span>' +
              '<span>' + opt + '</span>' +
            '</button>';
          }).join('') +
        '</div>' +
        '<div class="eng-hint-area">' +
          '<button class="eng-hint-btn" onclick="this.nextElementSibling.style.display=\'block\';this.style.display=\'none\'">' +
            '\uD83D\uDCA1 Show Hint' +
          '</button>' +
          '<p class="eng-hint-text" style="display:none">\uD83D\uDCA1 ' + q.hint + '</p>' +
        '</div>' +
      '</div>' +
      '<div class="eng-q-counter">Question ' + (engState.questionIndex + 1) + ' of ' + engState.totalQuestions + '</div>' +
    '</div>';
  if (typeof lucide !== "undefined") lucide.createIcons();
}

// ======== SPELLING QUESTION ========
function renderSpellingQuestion(container, q, world, progress) {
  var letters = q.word.split('');
  var scrambled = letters.slice().sort(function() { return Math.random() - 0.5; });

  var displayHtml = '';
  if (engState.spellingInput) {
    engState.spellingInput.split('').forEach(function(ch) {
      displayHtml += '<span class="eng-spell-letter filled">' + ch + '</span>';
    });
  }
  displayHtml += '<span class="eng-spell-cursor">|</span>';

  var exampleSafe = q.example.replace(new RegExp(q.word, 'gi'), '____');

  container.innerHTML =
    '<div class="eng-challenge-screen">' +
      '<div class="eng-challenge-top">' +
        '<button class="back-btn" onclick="engQuitChallenge()">' +
          '<i data-lucide="x"></i> Quit' +
        '</button>' +
        '<div class="eng-progress-bar">' +
          '<div class="eng-progress-fill" style="width:' + progress + '%;background:' + world.color + '"></div>' +
        '</div>' +
        '<div class="eng-score-display">' + engState.score + '/' + engState.questionIndex + '</div>' +
      '</div>' +
      '<div class="eng-question-card">' +
        '<div class="eng-q-badge" style="background:' + world.color + '">\u2728 Spelling</div>' +
        '<p class="eng-q-prompt">' + q.hint + '</p>' +
        '<p class="eng-q-example">"' + exampleSafe + '"</p>' +
        '<div class="eng-spelling-input-area">' +
          '<input type="text" id="spelling-input" class="eng-spelling-input"' +
            ' value="' + engState.spellingInput + '"' +
            ' oninput="engUpdateSpelling(this.value)"' +
            ' onkeydown="if(event.key===\'Enter\')engCheckSpelling(\'' + q.word.replace(/'/g, "\\'") + '\')"' +
            ' autocomplete="off" autocapitalize="off" spellcheck="false"' +
            ' placeholder="Type the word...">' +
        '</div>' +
        '<div class="eng-spelling-scramble">' +
          '<span class="eng-scramble-label">Letters: </span>' +
          scrambled.map(function(l) {
            return '<span class="eng-scramble-letter">' + l.toUpperCase() + '</span>';
          }).join('') +
        '</div>' +
        '<button class="eng-submit-btn" onclick="engCheckSpelling(\'' + q.word.replace(/'/g, "\\'") + '\')" style="background:' + world.color + '">' +
          'Check Spelling' +
        '</button>' +
      '</div>' +
      '<div class="eng-q-counter">Question ' + (engState.questionIndex + 1) + ' of ' + engState.totalQuestions + '</div>' +
    '</div>';
  setTimeout(function() {
    var inp = document.getElementById('spelling-input');
    if (inp) inp.focus();
  }, 100);
  if (typeof lucide !== "undefined") lucide.createIcons();
}

// ======== GRAMMAR QUESTION ========
function renderGrammarQuestion(container, q, world, progress) {
  var sh = engShuffleOptions(q.options, q.correct);
  var sentenceHtml = q.sentence.replace('___', '<span class="eng-blank">___</span>');

  container.innerHTML =
    '<div class="eng-challenge-screen">' +
      '<div class="eng-challenge-top">' +
        '<button class="back-btn" onclick="engQuitChallenge()">' +
          '<i data-lucide="x"></i> Quit' +
        '</button>' +
        '<div class="eng-progress-bar">' +
          '<div class="eng-progress-fill" style="width:' + progress + '%;background:' + world.color + '"></div>' +
        '</div>' +
        '<div class="eng-score-display">' + engState.score + '/' + engState.questionIndex + '</div>' +
      '</div>' +
      '<div class="eng-question-card">' +
        '<div class="eng-q-badge" style="background:' + world.color + '">\uD83D\uDEE1\uFE0F Grammar</div>' +
        '<p class="eng-q-category">' + q.category + '</p>' +
        '<h2 class="eng-q-sentence">' + sentenceHtml + '</h2>' +
        '<p class="eng-q-prompt">Choose the correct word to fill the blank:</p>' +
        '<div class="eng-options">' +
          sh.options.map(function(opt, i) {
            return '<button class="eng-option-btn" onclick="engAnswerGrammar(' + i + ',' + sh.correct + ')">' +
              '<span class="eng-opt-letter">' + String.fromCharCode(65 + i) + '</span>' +
              '<span>' + opt + '</span>' +
            '</button>';
          }).join('') +
        '</div>' +
      '</div>' +
      '<div class="eng-q-counter">Question ' + (engState.questionIndex + 1) + ' of ' + engState.totalQuestions + '</div>' +
    '</div>';
  if (typeof lucide !== "undefined") lucide.createIcons();
}

// ======== ANSWER HANDLERS ========
function engAnswerVocab(selected, correct) {
  var isCorrect = selected === correct;
  engState.answers.push({ correct: isCorrect, selected: selected });
  if (isCorrect) {
    engState.score++;
    awardXP(10, "Vocabulary answer", "eng-vocab-" + engState.currentWorld + "-q" + engState.questionIndex);
  }
  engShowFeedback(isCorrect, null, function() {
    engState.questionIndex++;
    render();
  });
}

function engAnswerGrammar(selected, correct) {
  var isCorrect = selected === correct;
  engState.answers.push({ correct: isCorrect, selected: selected });
  if (isCorrect) {
    engState.score++;
    awardXP(10, "Grammar answer", "eng-grammar-" + engState.currentWorld + "-q" + engState.questionIndex);
  }

  var world = ENGLISH_WORLDS.find(function(w) { return w.id === engState.currentWorld; });
  var questions = GRAMMAR_CHALLENGES[world.id];
  var q = questions[engState.questionIndex];

  engShowFeedback(isCorrect, q, function() {
    engState.questionIndex++;
    render();
  });
}

function engUpdateSpelling(val) {
  engState.spellingInput = val.toLowerCase();
}

function engCheckSpelling(correctWord) {
  var input = engState.spellingInput.trim().toLowerCase();
  var isCorrect = input === correctWord.toLowerCase();

  engState.answers.push({ correct: isCorrect, typed: input, expected: correctWord });
  if (isCorrect) {
    engState.score++;
    awardXP(15, "Spelling answer", "eng-spell-" + engState.currentWorld + "-q" + engState.questionIndex);
  }

  engShowSpellingFeedback(isCorrect, correctWord, function() {
    engState.spellingInput = "";
    engState.questionIndex++;
    render();
  });
}

// ======== FEEDBACK OVERLAYS ========
function engShowFeedback(isCorrect, grammarQ, callback) {
  var overlay = document.createElement('div');
  overlay.className = 'eng-feedback-overlay ' + (isCorrect ? 'correct' : 'wrong');
  var inner = '<div class="eng-feedback-card">' +
    '<div class="eng-feedback-icon">' + (isCorrect ? '\u2705' : '\u274C') + '</div>' +
    '<h3>' + (isCorrect ? 'Correct!' : 'Not quite!') + '</h3>';

  if (grammarQ) {
    inner += '<p class="eng-feedback-rule">\uD83D\uDCA1 ' + grammarQ.rule + '</p>';
    if (!isCorrect) {
      inner += '<p>The answer was: <strong>' + grammarQ.options[grammarQ.correct] + '</strong></p>';
      inner += '<button class="eng-feedback-gotit">Got it!</button>';
    } else {
      inner += '<p>+10 XP</p>';
    }
  } else {
    inner += isCorrect ? '<p>Great job! +10 XP</p>' : '<p>Keep trying, you will get it next time!</p>';
  }

  inner += '</div>';
  overlay.innerHTML = inner;
  document.body.appendChild(overlay);

  var dismissed = false;

  function dismiss() {
    if (dismissed) return;
    dismissed = true;
    overlay.remove();
    callback();
  }

  // Wrong grammar answers: only dismiss on button tap (no auto-dismiss)
  // Everything else: auto-dismiss after a short delay, or tap to dismiss early
  if (grammarQ && !isCorrect) {
    var gotItBtn = overlay.querySelector('.eng-feedback-gotit');
    if (gotItBtn) gotItBtn.addEventListener('click', function(e) { e.stopPropagation(); dismiss(); });
  } else {
    var delay = grammarQ ? 2000 : 1200;
    overlay.addEventListener('click', dismiss);
    setTimeout(dismiss, delay);
  }
}

function engShowSpellingFeedback(isCorrect, correctWord, callback) {
  var overlay = document.createElement('div');
  overlay.className = 'eng-feedback-overlay ' + (isCorrect ? 'correct' : 'wrong');
  overlay.innerHTML = '<div class="eng-feedback-card">' +
    '<div class="eng-feedback-icon">' + (isCorrect ? '\u2705' : '\u274C') + '</div>' +
    '<h3>' + (isCorrect ? 'Perfect Spelling!' : 'Not quite right') + '</h3>' +
    (isCorrect ? '<p>+15 XP</p>' : '<p>The correct spelling is: <strong>' + correctWord + '</strong></p>') +
  '</div>';
  document.body.appendChild(overlay);

  var dismissed = false;
  function dismiss() {
    if (dismissed) return;
    dismissed = true;
    overlay.remove();
    callback();
  }
  overlay.addEventListener('click', dismiss);
  setTimeout(dismiss, isCorrect ? 1200 : 2000);
}

// ======== RESULTS SCREEN ========
function renderEnglishResults(container) {
  initEnglishProgress();
  var world = ENGLISH_WORLDS.find(function(w) { return w.id === engState.currentWorld; });
  if (!world) { navigate("english"); return; }

  var score = engState.score;
  var total = engState.totalQuestions;
  var pct = total > 0 ? Math.round((score / total) * 100) : 0;
  var stars = getStarsForScore(score, total);
  var perfect = score === total;

  // Process results only once
  if (!engState.resultsProcessed) {
    engState.resultsProcessed = true;

    var key = getChallengeKey(engState.currentWorld, engState.currentChallenge);
    var e = state.user.english;
    var prev = e.challengeScores[key];

    // Only update if new score is better
    if (!prev || score > prev.score) {
      e.challengeScores[key] = { score: score, total: total, perfect: perfect };
    }

    // Track completion counts (only first time having any score)
    if (!prev || prev.score === 0) {
      e.totalChallengesCompleted++;
      if (engState.currentChallenge === "vocab") e.vocabCompleted++;
      else if (engState.currentChallenge === "spelling") e.spellingCompleted++;
      else if (engState.currentChallenge === "grammar") e.grammarCompleted++;
    }

    if (perfect && (!prev || !prev.perfect)) e.perfectScores++;

    e.totalStars = getTotalStars();

    // Bonus XP for completion
    awardXP(stars * 15, "Challenge completion bonus", "eng-complete-" + engState.currentWorld + "-" + engState.currentChallenge);

    checkEnglishBadges();
    if (typeof saveStateNow === 'function') saveStateNow(); else saveState();
  }

  var challengeNames = { vocab: "Vocabulary Quest", spelling: "Spelling Spell", grammar: "Grammar Guardian" };
  var starStr = "";
  for (var s = 0; s < stars; s++) starStr += "\u2B50";
  for (var s = 0; s < 3 - stars; s++) starStr += "\u2606";

  container.innerHTML =
    '<div class="eng-results-screen">' +
      '<div class="eng-results-card">' +
        '<div class="eng-results-header" style="background:' + world.color + '">' +
          '<h2>' + world.icon + ' ' + challengeNames[engState.currentChallenge] + '</h2>' +
          '<p>' + world.name + '</p>' +
        '</div>' +
        '<div class="eng-results-body">' +
          '<div class="eng-results-stars">' + starStr + '</div>' +
          '<div class="eng-results-score">' +
            '<div class="eng-score-circle" style="--pct:' + pct + ';--color:' + world.color + '">' +
              '<span>' + pct + '%</span>' +
            '</div>' +
            '<p>' + score + ' out of ' + total + ' correct</p>' +
          '</div>' +
          (perfect ? '<div class="eng-perfect-banner">\uD83C\uDF1F Perfect Score! \uD83C\uDF1F</div>' : '') +
          '<div class="eng-results-review">' +
            '<h3>Your Answers</h3>' +
            engState.answers.map(function(a, i) {
              return '<div class="eng-review-item ' + (a.correct ? 'correct' : 'wrong') + '">' +
                '<span>' + (a.correct ? '\u2705' : '\u274C') + '</span>' +
                '<span>Question ' + (i + 1) + '</span>' +
              '</div>';
            }).join('') +
          '</div>' +
          '<div class="eng-results-actions">' +
            '<button class="eng-btn primary" onclick="engRetryChallenge()" style="background:' + world.color + '">' +
              '\uD83D\uDD04 Try Again' +
            '</button>' +
            '<button class="eng-btn secondary" onclick="navigate(\'english-world\')">' +
              '\uD83C\uDF0D Back to World' +
            '</button>' +
            '<button class="eng-btn secondary" onclick="navigate(\'english\')">' +
              '\uD83D\uDDFA\uFE0F World Map' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
}

function engRetryChallenge() {
  var worldId = engState.currentWorld;
  var challengeType = engState.currentChallenge;
  resetEngState();
  engState.currentWorld = worldId;
  engState.currentChallenge = challengeType;

  var questions;
  if (challengeType === "vocab") questions = VOCAB_CHALLENGES[worldId];
  else if (challengeType === "spelling") questions = SPELLING_CHALLENGES[worldId];
  else questions = GRAMMAR_CHALLENGES[worldId];

  engState.totalQuestions = questions ? questions.length : 0;
  render();
}

function engQuitChallenge() {
  resetEngState();
  navigate("english-world");
}