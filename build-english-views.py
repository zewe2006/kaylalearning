content = r'''/* Story Quest — Word Adventure Views
   All render functions for the Word Adventure English game.
   Depends on: english.js (data), app.js (state, awardXP, saveState, render, showToast, navigate) */

// ======== STATE ========
let engState = {
  currentWorld: null,
  currentChallenge: null, // "vocab", "spelling", "grammar"
  questionIndex: 0,
  score: 0,
  totalQuestions: 0,
  answers: [],         // track each answer
  finished: false,
  resultsProcessed: false,
  // Spelling-specific
  spellingInput: "",
  spellingRevealed: false,
  spellingAttempts: 0
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
    spellingInput: "",
    spellingRevealed: false,
    spellingAttempts: 0
  };
}

// ======== HELPERS ========

function initEnglishProgress() {
  if (!state.user) return;
  if (!state.user.english) {
    state.user.english = {
      challengeScores: {},    // { "enchanted-forest-vocab": { score, total, perfect }, ... }
      totalChallengesCompleted: 0,
      vocabCompleted: 0,
      spellingCompleted: 0,
      grammarCompleted: 0,
      perfectScores: 0,
      totalStars: 0
    };
  }
  const e = state.user.english;
  if (!e.challengeScores) e.challengeScores = {};
  if (!e.totalChallengesCompleted) e.totalChallengesCompleted = 0;
  if (!e.vocabCompleted) e.vocabCompleted = 0;
  if (!e.spellingCompleted) e.spellingCompleted = 0;
  if (!e.grammarCompleted) e.grammarCompleted = 0;
  if (!e.perfectScores) e.perfectScores = 0;
  if (!e.totalStars) e.totalStars = 0;
}

function getStarsForScore(score, total) {
  const pct = total > 0 ? (score / total) * 100 : 0;
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
  const e = state.user.english;
  let stars = 0;
  ["vocab", "spelling", "grammar"].forEach(type => {
    const key = getChallengeKey(worldId, type);
    if (e.challengeScores[key]) {
      stars += getStarsForScore(e.challengeScores[key].score, e.challengeScores[key].total);
    }
  });
  return stars;
}

function getTotalStars() {
  initEnglishProgress();
  let total = 0;
  ENGLISH_WORLDS.forEach(w => {
    total += getWorldStars(w.id);
  });
  return total;
}

function isWorldUnlocked(world) {
  return getTotalStars() >= world.unlockStars;
}

function isWorldComplete(worldId) {
  initEnglishProgress();
  const e = state.user.english;
  return ["vocab", "spelling", "grammar"].every(type => {
    const key = getChallengeKey(worldId, type);
    return e.challengeScores[key] && e.challengeScores[key].score > 0;
  });
}

function checkEnglishBadges() {
  if (!state.user) return;
  initEnglishProgress();
  const e = state.user.english;

  ENGLISH_BADGES.forEach(badge => {
    if (state.user.badgesEarned.includes(badge.id)) return;

    let earned = false;
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
        earned = ENGLISH_WORLDS.every(w => isWorldComplete(w.id));
        break;
    }

    if (earned) {
      state.user.badgesEarned.push(badge.id);
      showToast(badge.icon, "Badge Earned!", badge.name);
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
  const totalStars = getTotalStars();
  const maxStars = ENGLISH_WORLDS.length * 9; // 3 challenges * 3 stars each

  container.innerHTML = `
    <div class="eng-home">
      <div class="eng-header">
        <button class="back-btn" onclick="navigate('library')">
          <i data-lucide="arrow-left"></i> Back
        </button>
        <h1>''' + "\u2728" + r''' Word Adventure ''' + "\u2728" + r'''</h1>
        <div class="eng-total-stars">''' + "\u2B50" + r''' ${totalStars} / ${maxStars}</div>
      </div>

      <p class="eng-subtitle">Travel through magical worlds and master vocabulary, spelling, and grammar!</p>

      <div class="eng-world-map">
        ${ENGLISH_WORLDS.map((world, i) => {
          const unlocked = isWorldUnlocked(world);
          const stars = getWorldStars(world.id);
          const complete = isWorldComplete(world.id);
          return `
            <div class="eng-world-card ${unlocked ? '' : 'locked'} ${complete ? 'complete' : ''}"
                 onclick="${unlocked ? `engSelectWorld('${world.id}')` : ''}"
                 style="--world-color: ${world.color}">
              <div class="eng-world-icon">${world.icon}</div>
              <div class="eng-world-info">
                <h3>${world.name}</h3>
                <p>${unlocked ? world.description : '''' + "\U0001F512" + r''' Need ' + world.unlockStars + ' stars to unlock'}</p>
                <div class="eng-world-stars">
                  ${unlocked ? '''' + "\u2B50" + r'''.repeat(stars) + '''' + "\u2606" + r'''.repeat(9 - stars) : ''}
                </div>
              </div>
              ${complete ? '<div class="eng-world-check">''' + "\u2705" + r'''</div>' : ''}
              ${!unlocked ? '<div class="eng-world-lock">''' + "\U0001F512" + r'''</div>' : ''}
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
  if (typeof lucide !== "undefined") lucide.createIcons();
}

// ======== WORLD DETAIL (pick challenge type) ========
function engSelectWorld(worldId) {
  engState.currentWorld = worldId;
  navigate("english-world");
}

function renderEnglishWorld(container) {
  initEnglishProgress();
  const world = ENGLISH_WORLDS.find(w => w.id === engState.currentWorld);
  if (!world) { navigate("english"); return; }

  const challenges = [
    { type: "vocab", name: "Vocabulary Quest", icon: "''' + "\U0001F4D6" + r'''", desc: "Learn new words and their meanings!", data: VOCAB_CHALLENGES[world.id] },
    { type: "spelling", name: "Spelling Spell", icon: "''' + "\u2728" + r'''", desc: "Cast the right spelling!", data: SPELLING_CHALLENGES[world.id] },
    { type: "grammar", name: "Grammar Guardian", icon: "''' + "\U0001F6E1\uFE0F" + r'''", desc: "Defend language with correct grammar!", data: GRAMMAR_CHALLENGES[world.id] }
  ];

  container.innerHTML = `
    <div class="eng-world-detail">
      <div class="eng-header">
        <button class="back-btn" onclick="navigate('english')">
          <i data-lucide="arrow-left"></i> Back
        </button>
        <h1>${world.icon} ${world.name}</h1>
      </div>

      <div class="eng-challenge-cards">
        ${challenges.map(ch => {
          const key = getChallengeKey(world.id, ch.type);
          const saved = state.user.english.challengeScores[key];
          const stars = saved ? getStarsForScore(saved.score, saved.total) : 0;
          const bestPct = saved ? Math.round((saved.score / saved.total) * 100) : 0;
          return `
            <div class="eng-challenge-card" onclick="engStartChallenge('${ch.type}')" style="--world-color: ${world.color}">
              <div class="eng-challenge-icon">${ch.icon}</div>
              <h3>${ch.name}</h3>
              <p>${ch.desc}</p>
              <div class="eng-challenge-meta">
                <span>${ch.data ? ch.data.length : 0} questions</span>
                ${saved ? `<span class="eng-best">Best: ${bestPct}%</span>` : '<span class="eng-new">New!</span>'}
              </div>
              <div class="eng-challenge-stars">
                ${'''' + "\u2B50" + r'''.repeat(stars)}${'''' + "\u2606" + r'''.repeat(3 - stars)}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
  if (typeof lucide !== "undefined") lucide.createIcons();
}

// ======== START CHALLENGE ========
function engStartChallenge(challengeType) {
  resetEngState();
  engState.currentChallenge = challengeType;
  const world = ENGLISH_WORLDS.find(w => w.id === (engState.currentWorld || "enchanted-forest"));
  if (!world) return;
  engState.currentWorld = world.id;

  let questions;
  if (challengeType === "vocab") questions = VOCAB_CHALLENGES[world.id];
  else if (challengeType === "spelling") questions = SPELLING_CHALLENGES[world.id];
  else questions = GRAMMAR_CHALLENGES[world.id];

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

  const world = ENGLISH_WORLDS.find(w => w.id === engState.currentWorld);
  if (!world) { navigate("english"); return; }

  const type = engState.currentChallenge;
  let questions;
  if (type === "vocab") questions = VOCAB_CHALLENGES[world.id];
  else if (type === "spelling") questions = SPELLING_CHALLENGES[world.id];
  else questions = GRAMMAR_CHALLENGES[world.id];

  if (!questions || engState.questionIndex >= questions.length) {
    engState.finished = true;
    renderEnglishResults(container);
    return;
  }

  const q = questions[engState.questionIndex];
  const progress = Math.round(((engState.questionIndex) / engState.totalQuestions) * 100);

  if (type === "vocab") renderVocabQuestion(container, q, world, progress);
  else if (type === "spelling") renderSpellingQuestion(container, q, world, progress);
  else renderGrammarQuestion(container, q, world, progress);
}

// ======== VOCAB QUESTION ========
function renderVocabQuestion(container, q, world, progress) {
  container.innerHTML = `
    <div class="eng-challenge-screen">
      <div class="eng-challenge-top">
        <button class="back-btn" onclick="engQuitChallenge()">
          <i data-lucide="x"></i> Quit
        </button>
        <div class="eng-progress-bar">
          <div class="eng-progress-fill" style="width: ${progress}%; background: ${world.color}"></div>
        </div>
        <div class="eng-score-display">${engState.score}/${engState.questionIndex}</div>
      </div>

      <div class="eng-question-card">
        <div class="eng-q-badge" style="background: ${world.color}">''' + "\U0001F4D6" + r''' Vocabulary</div>
        <h2 class="eng-q-word">${q.word}</h2>
        <p class="eng-q-prompt">What does this word mean?</p>

        <div class="eng-options">
          ${q.options.map((opt, i) => `
            <button class="eng-option-btn" onclick="engAnswerVocab(${i}, ${q.correct})">
              <span class="eng-opt-letter">${String.fromCharCode(65 + i)}</span>
              <span>${opt}</span>
            </button>
          `).join('')}
        </div>

        <div class="eng-hint-area">
          <button class="eng-hint-btn" onclick="this.nextElementSibling.style.display='block'; this.style.display='none'">
            ''' + "\U0001F4A1" + r''' Show Hint
          </button>
          <p class="eng-hint-text" style="display:none">''' + "\U0001F4A1" + r''' ${q.hint}</p>
        </div>
      </div>

      <div class="eng-q-counter">Question ${engState.questionIndex + 1} of ${engState.totalQuestions}</div>
    </div>
  `;
  if (typeof lucide !== "undefined") lucide.createIcons();
}

// ======== SPELLING QUESTION ========
function renderSpellingQuestion(container, q, world, progress) {
  const letters = q.word.split('');
  // Create scrambled version
  const scrambled = [...letters].sort(() => Math.random() - 0.5);

  container.innerHTML = `
    <div class="eng-challenge-screen">
      <div class="eng-challenge-top">
        <button class="back-btn" onclick="engQuitChallenge()">
          <i data-lucide="x"></i> Quit
        </button>
        <div class="eng-progress-bar">
          <div class="eng-progress-fill" style="width: ${progress}%; background: ${world.color}"></div>
        </div>
        <div class="eng-score-display">${engState.score}/${engState.questionIndex}</div>
      </div>

      <div class="eng-question-card">
        <div class="eng-q-badge" style="background: ${world.color}">''' + "\u2728" + r''' Spelling</div>
        <p class="eng-q-prompt">${q.hint}</p>
        <p class="eng-q-example">"${q.example.replace(q.word, '____').replace('___', '____')}"</p>

        <div class="eng-spelling-input-area">
          <div class="eng-spelling-display" id="spelling-display">
            ${engState.spellingInput ? engState.spellingInput.split('').map((ch, i) => `<span class="eng-spell-letter filled">${ch}</span>`).join('') : ''}
            <span class="eng-spell-cursor">|</span>
          </div>
          <input type="text" id="spelling-input" class="eng-spelling-hidden-input"
                 value="${engState.spellingInput}"
                 oninput="engUpdateSpelling(this.value)"
                 onkeydown="if(event.key==='Enter') engCheckSpelling('${q.word}')"
                 autocomplete="off" autocapitalize="off" spellcheck="false"
                 placeholder="Type the word...">
        </div>

        <div class="eng-spelling-scramble">
          <span class="eng-scramble-label">Letters:</span>
          ${scrambled.map(l => `<span class="eng-scramble-letter">${l.toUpperCase()}</span>`).join('')}
        </div>

        <button class="eng-submit-btn" onclick="engCheckSpelling('${q.word}')" style="background: ${world.color}">
          Check Spelling
        </button>
      </div>

      <div class="eng-q-counter">Question ${engState.questionIndex + 1} of ${engState.totalQuestions}</div>
    </div>
  `;
  // Focus the input
  setTimeout(() => {
    const inp = document.getElementById('spelling-input');
    if (inp) inp.focus();
  }, 100);
  if (typeof lucide !== "undefined") lucide.createIcons();
}

// ======== GRAMMAR QUESTION ========
function renderGrammarQuestion(container, q, world, progress) {
  container.innerHTML = `
    <div class="eng-challenge-screen">
      <div class="eng-challenge-top">
        <button class="back-btn" onclick="engQuitChallenge()">
          <i data-lucide="x"></i> Quit
        </button>
        <div class="eng-progress-bar">
          <div class="eng-progress-fill" style="width: ${progress}%; background: ${world.color}"></div>
        </div>
        <div class="eng-score-display">${engState.score}/${engState.questionIndex}</div>
      </div>

      <div class="eng-question-card">
        <div class="eng-q-badge" style="background: ${world.color}">''' + "\U0001F6E1\uFE0F" + r''' Grammar</div>
        <p class="eng-q-category">${q.category}</p>
        <h2 class="eng-q-sentence">${q.sentence.replace('___', '<span class="eng-blank">___</span>')}</h2>
        <p class="eng-q-prompt">Choose the correct word to fill the blank:</p>

        <div class="eng-options">
          ${q.options.map((opt, i) => `
            <button class="eng-option-btn" onclick="engAnswerGrammar(${i}, ${q.correct})">
              <span class="eng-opt-letter">${String.fromCharCode(65 + i)}</span>
              <span>${opt}</span>
            </button>
          `).join('')}
        </div>
      </div>

      <div class="eng-q-counter">Question ${engState.questionIndex + 1} of ${engState.totalQuestions}</div>
    </div>
  `;
  if (typeof lucide !== "undefined") lucide.createIcons();
}

// ======== ANSWER HANDLERS ========
function engAnswerVocab(selected, correct) {
  const isCorrect = selected === correct;
  engState.answers.push({ correct: isCorrect, selected });
  if (isCorrect) {
    engState.score++;
    awardXP(10, "Vocabulary answer");
  }
  engShowFeedback(isCorrect, () => {
    engState.questionIndex++;
    render();
  });
}

function engAnswerGrammar(selected, correct) {
  const isCorrect = selected === correct;
  engState.answers.push({ correct: isCorrect, selected });
  if (isCorrect) {
    engState.score++;
    awardXP(10, "Grammar answer");
  }

  // Show explanation
  const world = ENGLISH_WORLDS.find(w => w.id === engState.currentWorld);
  const questions = GRAMMAR_CHALLENGES[world.id];
  const q = questions[engState.questionIndex];

  engShowGrammarFeedback(isCorrect, q, () => {
    engState.questionIndex++;
    render();
  });
}

function engUpdateSpelling(val) {
  engState.spellingInput = val.toLowerCase();
  const display = document.getElementById('spelling-display');
  if (display) {
    display.innerHTML = val.split('').map(ch => `<span class="eng-spell-letter filled">${ch}</span>`).join('') + '<span class="eng-spell-cursor">|</span>';
  }
}

function engCheckSpelling(correctWord) {
  const input = engState.spellingInput.trim().toLowerCase();
  const isCorrect = input === correctWord.toLowerCase();

  engState.answers.push({ correct: isCorrect, typed: input, expected: correctWord });
  if (isCorrect) {
    engState.score++;
    awardXP(15, "Spelling answer");
  }

  engShowSpellingFeedback(isCorrect, correctWord, () => {
    engState.spellingInput = "";
    engState.questionIndex++;
    render();
  });
}

// ======== FEEDBACK OVERLAYS ========
function engShowFeedback(isCorrect, callback) {
  const overlay = document.createElement('div');
  overlay.className = `eng-feedback-overlay ${isCorrect ? 'correct' : 'wrong'}`;
  overlay.innerHTML = `
    <div class="eng-feedback-card">
      <div class="eng-feedback-icon">${isCorrect ? '''' + "\u2705" + r'''' : '''' + "\u274C" + r''''}</div>
      <h3>${isCorrect ? 'Correct!' : 'Not quite!'}</h3>
      ${isCorrect ? '<p>Great job! +10 XP</p>' : '<p>Keep trying, you\'ll get it next time!</p>'}
    </div>
  `;
  document.body.appendChild(overlay);
  setTimeout(() => {
    overlay.remove();
    callback();
  }, 1200);
}

function engShowGrammarFeedback(isCorrect, question, callback) {
  const overlay = document.createElement('div');
  overlay.className = `eng-feedback-overlay ${isCorrect ? 'correct' : 'wrong'}`;
  overlay.innerHTML = `
    <div class="eng-feedback-card">
      <div class="eng-feedback-icon">${isCorrect ? '''' + "\u2705" + r'''' : '''' + "\u274C" + r''''}</div>
      <h3>${isCorrect ? 'Correct!' : 'Not quite!'}</h3>
      <p class="eng-feedback-rule">''' + "\U0001F4A1" + r''' ${question.rule}</p>
      ${isCorrect ? '<p>+10 XP</p>' : `<p>The answer was: <strong>${question.options[question.correct]}</strong></p>`}
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', () => {
    overlay.remove();
    callback();
  });
  setTimeout(() => {
    if (document.body.contains(overlay)) {
      overlay.remove();
      callback();
    }
  }, 3000);
}

function engShowSpellingFeedback(isCorrect, correctWord, callback) {
  const overlay = document.createElement('div');
  overlay.className = `eng-feedback-overlay ${isCorrect ? 'correct' : 'wrong'}`;
  overlay.innerHTML = `
    <div class="eng-feedback-card">
      <div class="eng-feedback-icon">${isCorrect ? '''' + "\u2705" + r'''' : '''' + "\u274C" + r''''}</div>
      <h3>${isCorrect ? 'Perfect Spelling!' : 'Not quite right'}</h3>
      ${isCorrect ? '<p>+15 XP</p>' : `<p>The correct spelling is: <strong>${correctWord}</strong></p>`}
    </div>
  `;
  document.body.appendChild(overlay);
  setTimeout(() => {
    overlay.remove();
    callback();
  }, isCorrect ? 1200 : 2000);
}

// ======== RESULTS SCREEN ========
function renderEnglishResults(container) {
  initEnglishProgress();
  const world = ENGLISH_WORLDS.find(w => w.id === engState.currentWorld);
  if (!world) { navigate("english"); return; }

  const score = engState.score;
  const total = engState.totalQuestions;
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  const stars = getStarsForScore(score, total);
  const perfect = score === total;

  // Process results only once
  if (!engState.resultsProcessed) {
    engState.resultsProcessed = true;

    const key = getChallengeKey(engState.currentWorld, engState.currentChallenge);
    const e = state.user.english;
    const prev = e.challengeScores[key];

    // Only update if new score is better
    if (!prev || score > prev.score) {
      const oldStars = prev ? getStarsForScore(prev.score, prev.total) : 0;
      e.challengeScores[key] = { score, total, perfect };
      const newStars = stars;
      e.totalStars = getTotalStars();
    }

    // Track completion counts (only first time completing)
    if (!prev || prev.score === 0) {
      e.totalChallengesCompleted++;
      if (engState.currentChallenge === "vocab") e.vocabCompleted++;
      else if (engState.currentChallenge === "spelling") e.spellingCompleted++;
      else if (engState.currentChallenge === "grammar") e.grammarCompleted++;
    }

    if (perfect) e.perfectScores++;

    // Bonus XP for completion
    awardXP(stars * 15, "Challenge completion bonus");

    checkEnglishBadges();
    saveState();
  }

  const challengeNames = { vocab: "Vocabulary Quest", spelling: "Spelling Spell", grammar: "Grammar Guardian" };

  container.innerHTML = `
    <div class="eng-results-screen">
      <div class="eng-results-card">
        <div class="eng-results-header" style="background: ${world.color}">
          <h2>${world.icon} ${challengeNames[engState.currentChallenge]}</h2>
          <p>${world.name}</p>
        </div>

        <div class="eng-results-body">
          <div class="eng-results-stars">
            ${'''' + "\u2B50" + r'''.repeat(stars)}${'''' + "\u2606" + r'''.repeat(3 - stars)}
          </div>

          <div class="eng-results-score">
            <div class="eng-score-circle" style="--pct: ${pct}; --color: ${world.color}">
              <span>${pct}%</span>
            </div>
            <p>${score} out of ${total} correct</p>
          </div>

          ${perfect ? '<div class="eng-perfect-banner">''' + "\U0001F31F" + r''' Perfect Score! ''' + "\U0001F31F" + r'''</div>' : ''}

          <div class="eng-results-review">
            <h3>Your Answers</h3>
            ${engState.answers.map((a, i) => `
              <div class="eng-review-item ${a.correct ? 'correct' : 'wrong'}">
                <span>${a.correct ? '''' + "\u2705" + r'''' : '''' + "\u274C" + r''''}</span>
                <span>Question ${i + 1}</span>
              </div>
            `).join('')}
          </div>

          <div class="eng-results-actions">
            <button class="eng-btn primary" onclick="engRetryChallenge()" style="background: ${world.color}">
              ''' + "\U0001F504" + r''' Try Again
            </button>
            <button class="eng-btn secondary" onclick="navigate('english-world')">
              ''' + "\U0001F30D" + r''' Back to World
            </button>
            <button class="eng-btn secondary" onclick="navigate('english')">
              ''' + "\U0001F5FA\uFE0F" + r''' World Map
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function engRetryChallenge() {
  const worldId = engState.currentWorld;
  const challengeType = engState.currentChallenge;
  resetEngState();
  engState.currentWorld = worldId;
  engState.currentChallenge = challengeType;

  let questions;
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
'''

with open('/home/user/workspace/story-quest/english-views.js', 'w', encoding='utf-8') as f:
    f.write(content)
print("english-views.js written successfully:", len(content), "bytes")
