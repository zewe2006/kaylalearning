/* Story Quest — Science Lab Views
   All render functions for the Science Lab feature.
   Depends on: science.js (data), app.js (state, awardXP, saveState, render, showToast, navigate) */

// ======== HELPERS ========

function initScienceProgress() {
  if (!state.user) return;
  if (!state.user.science) {
    state.user.science = {
      elementsLearned: [],
      compoundsDiscovered: [],
      recipesDiscovered: [],
      quizScores: {},
      stateSorterPerfect: false
    };
  }
  const s = state.user.science;
  if (!s.elementsLearned) s.elementsLearned = [];
  if (!s.compoundsDiscovered) s.compoundsDiscovered = [];
  if (!s.recipesDiscovered) s.recipesDiscovered = [];
  if (!s.quizScores) s.quizScores = {};
}

function checkScienceBadges() {
  if (!state.user) return;
  initScienceProgress();
  const s = state.user.science;

  SCIENCE_BADGES.forEach(badge => {
    if (state.user.badgesEarned.includes(badge.id)) return;

    let earned = false;
    switch (badge.requirement.type) {
      case "elements_learned":
        earned = s.elementsLearned.length >= badge.requirement.count;
        break;
      case "compounds_discovered":
        earned = s.compoundsDiscovered.length >= badge.requirement.count;
        break;
      case "science_perfect_quiz":
        earned = Object.values(s.quizScores).some(sc => sc === 10);
        break;
      case "recipes_discovered":
        earned = s.recipesDiscovered.length >= badge.requirement.count;
        break;
      case "state_sorter_perfect":
        earned = s.stateSorterPerfect === true;
        break;
    }

    if (earned) {
      state.user.badgesEarned.push(badge.id);
      showToast(badge.icon, "Badge Earned!", badge.name);
      saveState();
    }
  });
}

function scienceNav(view) {
  state.currentView = view;
  render();
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ======== 1. SCIENCE HOME ========

function renderScienceHome(container) {
  initScienceProgress();
  const s = state.user.science;

  const lessonCards = [
    { tier: "beginner", emoji: "🔬", title: "My First Elements", desc: "Learn 10 basic elements like Hydrogen, Oxygen, and Gold!", view: "science-elements-beginner", level: "Beginner",
      progress: () => { const learned = ELEMENTS.beginner.filter(e => s.elementsLearned.includes(e.symbol)).length; return `${learned}/10`; } },
    { tier: "intermediate", emoji: "🧪", title: "More Elements", desc: "Discover Sodium, Chlorine, Silicon, and more!", view: "science-elements-intermediate", level: "Intermediate",
      progress: () => { const learned = ELEMENTS.intermediate.filter(e => s.elementsLearned.includes(e.symbol)).length; return `${learned}/10`; } },
    { tier: "intermediate", emoji: "🧊", title: "States of Matter", desc: "Learn about solids, liquids, and gases!", view: "science-states", level: "Intermediate",
      progress: () => "Lesson" },
    { tier: "advanced", emoji: "💎", title: "Cool Elements", desc: "Explore Platinum, Titanium, Neon, and more rare elements!", view: "science-elements-advanced", level: "Advanced",
      progress: () => { const learned = ELEMENTS.advanced.filter(e => s.elementsLearned.includes(e.symbol)).length; return `${learned}/10`; } },
    { tier: "advanced", emoji: "⚗️", title: "How Things Combine", desc: "See how elements join together to make water, salt, and more!", view: "science-compounds", level: "Advanced",
      progress: () => { return `${s.compoundsDiscovered.length}/12`; } }
  ];

  const gameCards = [
    { emoji: "🧠", title: "Element Explorer", desc: "Test your element knowledge with a fun quiz!", view: "science-quiz-beginner", level: "Beginner",
      progress: () => s.quizScores.beginner != null ? `Best: ${s.quizScores.beginner}/10` : "Not played" },
    { emoji: "🎯", title: "State Sorter", desc: "Sort items into Solid, Liquid, or Gas!", view: "science-sorter", level: "Beginner",
      progress: () => s.stateSorterPerfect ? "Perfect!" : "Not played" },
    { emoji: "🧠", title: "Element Quiz 2", desc: "Intermediate element quiz — trickier questions!", view: "science-quiz-intermediate", level: "Intermediate",
      progress: () => s.quizScores.intermediate != null ? `Best: ${s.quizScores.intermediate}/10` : "Not played" },
    { emoji: "🌋", title: "Mix Lab", desc: "Mix ingredients in a beaker and see what happens!", view: "science-mixlab", level: "Intermediate",
      progress: () => `${s.recipesDiscovered.length}/${MIX_RECIPES.length} recipes` },
    { emoji: "🧠", title: "Element Quiz 3", desc: "Advanced element quiz for science superstars!", view: "science-quiz-advanced", level: "Advanced",
      progress: () => s.quizScores.advanced != null ? `Best: ${s.quizScores.advanced}/10` : "Not played" },
    { emoji: "⚛️", title: "Equation Builder", desc: "Build compounds from elements like a real chemist!", view: "science-equation", level: "Advanced",
      progress: () => `${s.compoundsDiscovered.length}/${COMPOUNDS.length} found` }
  ];

  function levelColor(level) {
    if (level === "Beginner") return "#4CAF50";
    if (level === "Intermediate") return "#FFB300";
    return "#FF7043";
  }

  // Age-based filtering
  const allowedTiers = (typeof getScienceTiersForAge === "function") ? getScienceTiersForAge() : ["beginner", "intermediate", "advanced"];
  const tierMap = { "Beginner": "beginner", "Intermediate": "intermediate", "Advanced": "advanced" };
  const filteredLessonCards = lessonCards.filter(c => {
    const t = c.tier || tierMap[c.level] || "beginner";
    return allowedTiers.includes(t);
  });
  const filteredGameCards = gameCards.filter(c => {
    const t = c.tier || tierMap[c.level] || "beginner";
    return allowedTiers.includes(t);
  });

  function renderCards(cards) {
    return cards.map(c => `
      <div class="sci-card" onclick="scienceNav('${c.view}')" style="cursor:pointer">
        <div class="sci-card-emoji">${c.emoji}</div>
        <div class="sci-card-body">
          <div class="sci-card-header">
            <span class="sci-card-title">${c.title}</span>
            <span class="sci-level-badge" style="background:${levelColor(c.level)}">${c.level}</span>
          </div>
          <p class="sci-card-desc">${c.desc}</p>
          <div class="sci-card-progress">${c.progress()}</div>
        </div>
      </div>
    `).join("");
  }

  container.innerHTML = `
    <div class="page-header">
      <h2>🧪 Science Lab</h2>
      <p>Explore elements, mix potions, and discover how the world works!</p>
    </div>

    <div class="sci-section">
      <h3 class="sci-section-title">📚 Lessons</h3>
      <div class="sci-grid">${renderCards(filteredLessonCards)}</div>
    </div>

    <div class="sci-section">
      <h3 class="sci-section-title">🎮 Games</h3>
      <div class="sci-grid">${renderCards(filteredGameCards)}</div>
    </div>
  `;
  lucide.createIcons();
}

// ======== 2. ELEMENT STUDY ========

function renderElementStudy(container, tier) {
  initScienceProgress();
  const s = state.user.science;
  const elements = ELEMENTS[tier];
  if (!elements) return;

  const tierLabel = tier.charAt(0).toUpperCase() + tier.slice(1);
  const learnedCount = elements.filter(e => s.elementsLearned.includes(e.symbol)).length;

  container.innerHTML = `
    <div class="sci-back-bar">
      <button class="sci-back-btn" onclick="scienceNav('science')">
        <i data-lucide="arrow-left"></i> Back to Science Lab
      </button>
      <div class="sci-progress-pill">${learnedCount}/10 learned ⭐</div>
    </div>

    <div class="page-header">
      <h2>${tier === "beginner" ? "🔬 My First Elements" : tier === "intermediate" ? "🧪 More Elements" : "💎 Cool Elements"}</h2>
      <p>${tierLabel} Elements — Tap the star to mark them as learned!</p>
    </div>

    <div class="sci-progress-bar-wrap">
      <div class="sci-progress-bar">
        <div class="sci-progress-fill" style="width:${(learnedCount / 10) * 100}%"></div>
      </div>
    </div>

    <div class="sci-elements-grid">
      ${elements.map(el => {
        const isLearned = s.elementsLearned.includes(el.symbol);
        return `
          <div class="sci-element-card ${isLearned ? "sci-element-learned" : ""}">
            <div class="sci-element-top">
              <span class="sci-element-number">#${el.number}</span>
              <button class="sci-star-btn ${isLearned ? "sci-star-active" : ""}" onclick="toggleElementLearned('${el.symbol}', '${tier}')">
                ${isLearned ? "⭐" : "☆"}
              </button>
            </div>
            <div class="sci-element-emoji">${el.emoji}</div>
            <div class="sci-element-symbol">${el.symbol}</div>
            <div class="sci-element-name">${el.name}</div>
            <div class="sci-element-pronunciation">${el.pronunciation}</div>
            <p class="sci-element-desc">${el.description}</p>
            <div class="sci-element-find">
              <strong>Where you find it:</strong>
              <div class="sci-element-find-list">${el.findIt.join(" &nbsp; ")}</div>
            </div>
            <div class="sci-element-origin">
              <strong>Name origin:</strong> ${el.origin}
            </div>
          </div>
        `;
      }).join("")}
    </div>
  `;
  lucide.createIcons();
}

function toggleElementLearned(symbol, tier) {
  initScienceProgress();
  const s = state.user.science;
  const idx = s.elementsLearned.indexOf(symbol);
  if (idx >= 0) {
    s.elementsLearned.splice(idx, 1);
  } else {
    s.elementsLearned.push(symbol);
    showToast("⚛️", "Element Learned!", `You learned ${symbol}!`);
    if (s.elementsLearned.length === 1) {
      awardXP(5, "Learned your first element!");
    }
  }
  checkScienceBadges();
  saveState();
  renderElementStudy(document.getElementById("main-content"), tier);
}

// ======== 3. STATES OF MATTER ========

function renderStatesOfMatter(container) {
  initScienceProgress();

  container.innerHTML = `
    <div class="sci-back-bar">
      <button class="sci-back-btn" onclick="scienceNav('science')">
        <i data-lucide="arrow-left"></i> Back to Science Lab
      </button>
    </div>

    <div class="page-header">
      <h2>🧊 States of Matter</h2>
      <p>Everything around you is either a solid, liquid, or gas!</p>
    </div>

    <div class="sci-states-grid">
      ${STATES_OF_MATTER.map(s => `
        <div class="sci-state-card" style="border-top: 4px solid ${s.color}">
          <div class="sci-state-emoji">${s.emoji}</div>
          <h3 class="sci-state-title">${s.title}</h3>
          <p class="sci-state-desc">${s.description}</p>
          <div class="sci-state-examples">
            ${s.examples.map(ex => `<span class="sci-state-example">${ex}</span>`).join("")}
          </div>
          <div class="sci-state-funfact">
            <strong>Fun Fact:</strong> ${s.funFact}
          </div>
        </div>
      `).join("")}
    </div>

    <div class="sci-section">
      <h3 class="sci-section-title">🔄 How Things Change State</h3>
      <p class="sci-section-subtitle">When you heat or cool something, it can change from one state to another!</p>
      <div class="sci-changes-grid">
        ${STATE_CHANGES.map(c => `
          <div class="sci-change-card">
            <div class="sci-change-emoji">${c.emoji}</div>
            <div class="sci-change-name">${c.name}</div>
            <div class="sci-change-label">${c.from} → ${c.to}</div>
            <p class="sci-change-example">${c.example}</p>
          </div>
        `).join("")}
      </div>
    </div>
  `;
  lucide.createIcons();
}

// ======== 4. COMPOUND BROWSER ========

function renderCompoundBrowser(container) {
  initScienceProgress();
  const s = state.user.science;

  if (state.scienceCompoundIndex == null) state.scienceCompoundIndex = 0;
  const idx = state.scienceCompoundIndex;
  const compound = COMPOUNDS[idx];
  const total = COMPOUNDS.length;

  // Mark as discovered when viewed
  if (!s.compoundsDiscovered.includes(compound.name)) {
    s.compoundsDiscovered.push(compound.name);
    checkScienceBadges();
    saveState();
  }

  // Build element visual: show each element symbol joining together
  const uniqueElements = [];
  const elementCounts = {};
  compound.elements.forEach(sym => {
    elementCounts[sym] = (elementCounts[sym] || 0) + 1;
    if (!uniqueElements.includes(sym)) uniqueElements.push(sym);
  });

  const elementVisual = uniqueElements.map(sym => {
    const count = elementCounts[sym];
    // Try to find element data for the emoji
    let emoji = "⚛️";
    for (const tier of ["beginner", "intermediate", "advanced"]) {
      const found = ELEMENTS[tier].find(e => e.symbol === sym);
      if (found) { emoji = found.emoji; break; }
    }
    return `<div class="sci-compound-element">
      <span class="sci-compound-el-emoji">${emoji}</span>
      <span class="sci-compound-el-symbol">${sym}</span>
      ${count > 1 ? `<span class="sci-compound-el-count">×${count}</span>` : ""}
    </div>`;
  }).join(`<span class="sci-compound-plus">+</span>`);

  container.innerHTML = `
    <div class="sci-back-bar">
      <button class="sci-back-btn" onclick="state.scienceCompoundIndex = 0; scienceNav('science')">
        <i data-lucide="arrow-left"></i> Back to Science Lab
      </button>
      <div class="sci-progress-pill">${idx + 1} / ${total}</div>
    </div>

    <div class="page-header">
      <h2>⚗️ How Things Combine</h2>
      <p>See how elements join together to make amazing compounds!</p>
    </div>

    <div class="sci-compound-viewer">
      <div class="sci-compound-card-big">
        <div class="sci-compound-name-big">${compound.emoji} ${compound.name}</div>
        <div class="sci-compound-formula-big">${compound.formula}</div>

        <div class="sci-compound-visual">
          ${elementVisual}
          <span class="sci-compound-arrow">➡️</span>
          <div class="sci-compound-result">
            <span class="sci-compound-result-emoji">${compound.emoji}</span>
            <span class="sci-compound-result-name">${compound.name}</span>
          </div>
        </div>

        <div class="sci-compound-explanation">
          ${compound.explanation}
        </div>
      </div>

      <div class="sci-compound-nav">
        <button class="sci-btn sci-btn-secondary" onclick="browseCompound(${idx - 1})" ${idx === 0 ? "disabled" : ""}>
          ◀ Previous
        </button>
        <button class="sci-btn sci-btn-primary" onclick="browseCompound(${idx + 1})" ${idx === total - 1 ? "disabled" : ""}>
          Next ▶
        </button>
      </div>
    </div>
  `;
  lucide.createIcons();
}

function browseCompound(idx) {
  if (idx < 0 || idx >= COMPOUNDS.length) return;
  state.scienceCompoundIndex = idx;
  renderCompoundBrowser(document.getElementById("main-content"));
}

// ======== 5. ELEMENT QUIZ ========

function renderElementQuiz(container, tier) {
  initScienceProgress();

  // Initialize quiz state if starting fresh
  if (!state.scienceQuizState || state.scienceQuizState.tier !== tier) {
    const questions = shuffleArray(ELEMENT_QUIZ[tier]).slice(0, 10);
    state.scienceQuizState = {
      tier: tier,
      questions: questions,
      current: 0,
      score: 0,
      answered: false,
      selectedAnswer: null,
      finished: false
    };
  }

  const qs = state.scienceQuizState;
  const tierLabel = tier.charAt(0).toUpperCase() + tier.slice(1);

  if (qs.finished) {
    renderQuizResults(container, qs);
    return;
  }

  const q = qs.questions[qs.current];

  container.innerHTML = `
    <div class="sci-back-bar">
      <button class="sci-back-btn" onclick="state.scienceQuizState = null; scienceNav('science')">
        <i data-lucide="arrow-left"></i> Back to Science Lab
      </button>
      <div class="sci-progress-pill">Question ${qs.current + 1} / ${qs.questions.length}</div>
    </div>

    <div class="page-header">
      <h2>🧠 Element Explorer — ${tierLabel}</h2>
    </div>

    <div class="sci-quiz-progress-bar">
      <div class="sci-quiz-progress-fill" style="width:${((qs.current) / qs.questions.length) * 100}%"></div>
    </div>

    <div class="sci-quiz-card">
      <div class="sci-quiz-score">Score: ${qs.score} / ${qs.questions.length}</div>
      <div class="sci-quiz-question">${q.q}</div>
      <div class="sci-quiz-options">
        ${q.options.map((opt, i) => {
          let cls = "sci-quiz-option";
          if (qs.answered) {
            if (i === q.correct) cls += " sci-quiz-correct";
            else if (i === qs.selectedAnswer && i !== q.correct) cls += " sci-quiz-wrong";
          }
          return `<button class="${cls}" onclick="answerScienceQuiz(${i})" ${qs.answered ? "disabled" : ""}>${opt}</button>`;
        }).join("")}
      </div>
      ${qs.answered ? `
        <div class="sci-quiz-feedback ${qs.selectedAnswer === q.correct ? "sci-quiz-feedback-correct" : "sci-quiz-feedback-wrong"}">
          ${qs.selectedAnswer === q.correct ? "✅ Correct! Great job!" : `❌ Not quite! The answer is: ${q.options[q.correct]}`}
        </div>
        <button class="sci-btn sci-btn-primary sci-quiz-next-btn" onclick="nextScienceQuizQuestion()">
          ${qs.current < qs.questions.length - 1 ? "Next Question ▶" : "See Results 🎉"}
        </button>
      ` : ""}
    </div>
  `;
  lucide.createIcons();
}

function answerScienceQuiz(idx) {
  const qs = state.scienceQuizState;
  if (!qs || qs.answered) return;
  qs.answered = true;
  qs.selectedAnswer = idx;
  if (idx === qs.questions[qs.current].correct) {
    qs.score++;
  }
  renderElementQuiz(document.getElementById("main-content"), qs.tier);
}

function nextScienceQuizQuestion() {
  const qs = state.scienceQuizState;
  if (!qs || qs.finished) return;
  qs.current++;
  qs.answered = false;
  qs.selectedAnswer = null;
  if (qs.current >= qs.questions.length) {
    qs.finished = true;
    // Save best score
    initScienceProgress();
    const s = state.user.science;
    const prev = s.quizScores[qs.tier] || 0;
    if (qs.score > prev) {
      s.quizScores[qs.tier] = qs.score;
    }
    const xp = Math.max(5, qs.score * 3);
    awardXP(xp, `Element Explorer (${qs.tier}) \u2014 ${qs.score}/10`);
    checkScienceBadges();
    saveState();
    renderElementQuiz(document.getElementById("main-content"), qs.tier);
    return; // Don't render twice
  }
  renderElementQuiz(document.getElementById("main-content"), qs.tier);
}

function renderQuizResults(container, qs) {
  const tierLabel = qs.tier.charAt(0).toUpperCase() + qs.tier.slice(1);
  const perfect = qs.score === qs.questions.length;
  const emoji = perfect ? "🎉" : qs.score >= 7 ? "🌟" : qs.score >= 4 ? "👍" : "💪";

  container.innerHTML = `
    <div class="sci-back-bar">
      <button class="sci-back-btn" onclick="state.scienceQuizState = null; scienceNav('science')">
        <i data-lucide="arrow-left"></i> Back to Science Lab
      </button>
    </div>

    <div class="sci-quiz-results">
      <div class="sci-quiz-results-emoji">${emoji}</div>
      <h2 class="sci-quiz-results-title">${perfect ? "PERFECT SCORE!" : "Quiz Complete!"}</h2>
      <div class="sci-quiz-results-score">${qs.score} / ${qs.questions.length}</div>
      <p class="sci-quiz-results-message">
        ${perfect ? "Amazing! You got every single question right! You're a science superstar! 🌟" :
          qs.score >= 7 ? "Great job! You really know your elements!" :
          qs.score >= 4 ? "Good effort! Keep studying and you'll do even better next time!" :
          "Keep learning! Every scientist starts somewhere. Try studying the elements and come back!"}
      </p>
      ${perfect ? `<div class="sci-confetti">🎊🎉🥳🎊🎉🥳🎊🎉</div>` : ""}
      <div class="sci-quiz-results-actions">
        <button class="sci-btn sci-btn-primary" onclick="state.scienceQuizState = null; renderElementQuiz(document.getElementById('main-content'), '${qs.tier}')">
          Play Again 🔄
        </button>
        <button class="sci-btn sci-btn-secondary" onclick="state.scienceQuizState = null; scienceNav('science')">
          Back to Science Lab
        </button>
      </div>
    </div>
  `;
  lucide.createIcons();
}

// ======== 6. STATE SORTER ========

function renderStateSorter(container) {
  initScienceProgress();

  // Initialize game state
  if (!state.scienceSorterState) {
    const items = shuffleArray(STATE_SORTER_ITEMS).slice(0, 10);
    state.scienceSorterState = {
      items: items,
      current: 0,
      score: 0,
      answered: false,
      lastCorrect: null,
      finished: false
    };
  }

  const gs = state.scienceSorterState;

  if (gs.finished) {
    renderSorterResults(container, gs);
    return;
  }

  const item = gs.items[gs.current];
  const states = ["solid", "liquid", "gas"];
  const stateEmojis = { solid: "🧊", liquid: "💧", gas: "💨" };

  container.innerHTML = `
    <div class="sci-back-bar">
      <button class="sci-back-btn" onclick="state.scienceSorterState = null; scienceNav('science')">
        <i data-lucide="arrow-left"></i> Back to Science Lab
      </button>
      <div class="sci-progress-pill">${gs.current + 1} / ${gs.items.length}</div>
    </div>

    <div class="page-header">
      <h2>🎯 State Sorter</h2>
      <p>Is it a solid, liquid, or gas? Tap the right answer!</p>
    </div>

    <div class="sci-quiz-progress-bar">
      <div class="sci-quiz-progress-fill" style="width:${(gs.current / gs.items.length) * 100}%"></div>
    </div>

    <div class="sci-sorter-card">
      <div class="sci-quiz-score">Score: ${gs.score} / ${gs.items.length}</div>
      <div class="sci-sorter-item-emoji">${item.emoji}</div>
      <div class="sci-sorter-item-name">${item.name}</div>

      <div class="sci-sorter-buttons">
        ${states.map(s => {
          let cls = "sci-sorter-btn";
          if (gs.answered) {
            if (s === item.state) cls += " sci-quiz-correct";
            else if (s === gs.lastAnswer && s !== item.state) cls += " sci-quiz-wrong";
          }
          return `<button class="${cls}" onclick="answerStateSorter('${s}')" ${gs.answered ? "disabled" : ""}>
            ${stateEmojis[s]} ${s.charAt(0).toUpperCase() + s.slice(1)}
          </button>`;
        }).join("")}
      </div>

      ${gs.answered ? `
        <div class="sci-quiz-feedback ${gs.lastCorrect ? "sci-quiz-feedback-correct" : "sci-quiz-feedback-wrong"}">
          ${gs.lastCorrect ? `✅ Correct! ${item.name} is a ${item.state}!` : `❌ Nope! ${item.name} is a ${item.state}!`}
        </div>
        <button class="sci-btn sci-btn-primary sci-quiz-next-btn" onclick="nextSorterItem()">
          ${gs.current < gs.items.length - 1 ? "Next Item ▶" : "See Results 🎉"}
        </button>
      ` : ""}
    </div>
  `;
  lucide.createIcons();
}

function answerStateSorter(answer) {
  const gs = state.scienceSorterState;
  if (!gs || gs.answered) return;
  gs.answered = true;
  gs.lastAnswer = answer;
  const correct = answer === gs.items[gs.current].state;
  gs.lastCorrect = correct;
  if (correct) gs.score++;
  renderStateSorter(document.getElementById("main-content"));
}

function nextSorterItem() {
  const gs = state.scienceSorterState;
  if (!gs || gs.finished) return;
  gs.current++;
  gs.answered = false;
  gs.lastCorrect = null;
  gs.lastAnswer = null;
  if (gs.current >= gs.items.length) {
    gs.finished = true;
    initScienceProgress();
    const s = state.user.science;
    if (gs.score === gs.items.length) {
      s.stateSorterPerfect = true;
    }
    const xp = Math.max(5, gs.score * 2);
    awardXP(xp, `State Sorter \u2014 ${gs.score}/10`);
    checkScienceBadges();
    saveState();
    renderStateSorter(document.getElementById("main-content"));
    return;
  }
  renderStateSorter(document.getElementById("main-content"));
}

function renderSorterResults(container, gs) {
  const perfect = gs.score === gs.items.length;
  const emoji = perfect ? "🎉" : gs.score >= 7 ? "🌟" : gs.score >= 4 ? "👍" : "💪";

  container.innerHTML = `
    <div class="sci-back-bar">
      <button class="sci-back-btn" onclick="state.scienceSorterState = null; scienceNav('science')">
        <i data-lucide="arrow-left"></i> Back to Science Lab
      </button>
    </div>

    <div class="sci-quiz-results">
      <div class="sci-quiz-results-emoji">${emoji}</div>
      <h2 class="sci-quiz-results-title">${perfect ? "PERFECT SORT!" : "Sorting Done!"}</h2>
      <div class="sci-quiz-results-score">${gs.score} / ${gs.items.length}</div>
      <p class="sci-quiz-results-message">
        ${perfect ? "You sorted every item perfectly! You really know your states of matter! 🧊💧💨" :
          gs.score >= 7 ? "Great sorting! You know most of the states!" :
          gs.score >= 4 ? "Good try! Review the States of Matter lesson and come back!" :
          "Keep learning! Check out the States of Matter lesson for help!"}
      </p>
      ${perfect ? `<div class="sci-confetti">🎊🎉🥳🎊🎉🥳🎊🎉</div>` : ""}
      <div class="sci-quiz-results-actions">
        <button class="sci-btn sci-btn-primary" onclick="state.scienceSorterState = null; renderStateSorter(document.getElementById('main-content'))">
          Play Again 🔄
        </button>
        <button class="sci-btn sci-btn-secondary" onclick="state.scienceSorterState = null; scienceNav('science')">
          Back to Science Lab
        </button>
      </div>
    </div>
  `;
  lucide.createIcons();
}

// ======== 7. MIX LAB ========

function renderMixLab(container) {
  initScienceProgress();
  const s = state.user.science;

  if (!state.scienceMixState) {
    state.scienceMixState = {
      beaker: [],        // ingredient ids in beaker
      result: null,      // matched recipe or null
      showResult: false
    };
  }

  const ms = state.scienceMixState;

  // Check for recipe match
  function findRecipe(ingredientIds) {
    const sorted = [...ingredientIds].sort();
    return MIX_RECIPES.find(r => {
      const rSorted = [...r.ingredients].sort();
      return rSorted.length === sorted.length && rSorted.every((v, i) => v === sorted[i]);
    });
  }

  // Recipe book
  const recipeBook = MIX_RECIPES.map(r => {
    const discovered = s.recipesDiscovered.includes(r.name);
    return `
      <div class="sci-recipe-item ${discovered ? "sci-recipe-discovered" : "sci-recipe-hidden"}">
        <span class="sci-recipe-emoji">${discovered ? r.emoji : "❓"}</span>
        <span class="sci-recipe-name">${discovered ? r.name : "???"}</span>
        ${discovered ? `<span class="sci-recipe-check">✅</span>` : ""}
      </div>
    `;
  }).join("");

  container.innerHTML = `
    <div class="sci-back-bar">
      <button class="sci-back-btn" onclick="state.scienceMixState = null; scienceNav('science')">
        <i data-lucide="arrow-left"></i> Back to Science Lab
      </button>
      <div class="sci-progress-pill">${s.recipesDiscovered.length}/${MIX_RECIPES.length} recipes</div>
    </div>

    <div class="page-header">
      <h2>🌋 Mix Lab</h2>
      <p>Pick ingredients and mix them in the beaker! What will happen?</p>
    </div>

    <div class="sci-mixlab-layout">
      <div class="sci-mixlab-shelf">
        <h3 class="sci-mixlab-shelf-title">🧪 Ingredients</h3>
        <div class="sci-mixlab-ingredients">
          ${MIX_INGREDIENTS.map(ing => {
            const inBeaker = ms.beaker.includes(ing.id);
            return `
              <button class="sci-ingredient-btn ${inBeaker ? "sci-ingredient-selected" : ""}"
                onclick="addToBeaker('${ing.id}')" ${inBeaker || ms.beaker.length >= 3 || ms.showResult ? "disabled" : ""}>
                <span class="sci-ingredient-emoji">${ing.emoji}</span>
                <span class="sci-ingredient-name">${ing.name}</span>
              </button>
            `;
          }).join("")}
        </div>
      </div>

      <div class="sci-mixlab-beaker-area">
        <div class="sci-beaker">
          <div class="sci-beaker-label">🧪 Beaker</div>
          <div class="sci-beaker-contents">
            ${ms.beaker.length === 0 ? `<div class="sci-beaker-empty">Tap ingredients to add them!</div>` :
              ms.beaker.map(id => {
                const ing = MIX_INGREDIENTS.find(i => i.id === id);
                return `<div class="sci-beaker-item" style="background:${ing.color}">
                  ${ing.emoji} ${ing.name}
                  ${!ms.showResult ? `<button class="sci-beaker-remove" onclick="removeFromBeaker('${id}')">✕</button>` : ""}
                </div>`;
              }).join("")}
          </div>
          ${!ms.showResult && ms.beaker.length >= 2 ? `
            <button class="sci-btn sci-btn-primary sci-mix-btn" onclick="doMix()">
              Mix! 🧪
            </button>
          ` : ""}
          ${!ms.showResult && ms.beaker.length > 0 && ms.beaker.length < 2 ? `
            <div class="sci-mix-hint">Add at least 2 ingredients!</div>
          ` : ""}
        </div>

        ${ms.showResult ? `
          <div class="sci-mix-result ${ms.result ? "sci-mix-success" : "sci-mix-fail"}">
            ${ms.result ? `
              <div class="sci-mix-result-emoji">${ms.result.emoji}</div>
              <div class="sci-mix-result-name">${ms.result.name}!</div>
              <div class="sci-mix-result-reaction">${ms.result.reaction}</div>
              <div class="sci-mix-result-science">
                <strong>🔬 The Science:</strong> ${ms.result.science}
              </div>
            ` : `
              <div class="sci-mix-result-emoji">🤔</div>
              <div class="sci-mix-result-name">Nothing happened!</div>
              <div class="sci-mix-result-reaction">These ingredients don't react together. Try a different combination!</div>
            `}
            <button class="sci-btn sci-btn-primary" onclick="resetMix()">Try Again 🔄</button>
          </div>
        ` : ""}
      </div>
    </div>

    <div class="sci-section">
      <h3 class="sci-section-title">📖 Recipe Book</h3>
      <p class="sci-section-subtitle">Discover all ${MIX_RECIPES.length} recipes!</p>
      <div class="sci-recipe-book">
        ${recipeBook}
      </div>
    </div>
  `;
  lucide.createIcons();
}

function addToBeaker(id) {
  const ms = state.scienceMixState;
  if (!ms || ms.beaker.length >= 3 || ms.beaker.includes(id) || ms.showResult) return;
  ms.beaker.push(id);
  renderMixLab(document.getElementById("main-content"));
}

function removeFromBeaker(id) {
  const ms = state.scienceMixState;
  if (!ms || ms.showResult) return;
  ms.beaker = ms.beaker.filter(i => i !== id);
  renderMixLab(document.getElementById("main-content"));
}

function doMix() {
  const ms = state.scienceMixState;
  if (!ms || ms.beaker.length < 2) return;

  const sorted = [...ms.beaker].sort();
  const recipe = MIX_RECIPES.find(r => {
    const rSorted = [...r.ingredients].sort();
    return rSorted.length === sorted.length && rSorted.every((v, i) => v === sorted[i]);
  });

  ms.result = recipe || null;
  ms.showResult = true;

  if (recipe) {
    initScienceProgress();
    const s = state.user.science;
    if (!s.recipesDiscovered.includes(recipe.name)) {
      s.recipesDiscovered.push(recipe.name);
      awardXP(15, `Discovered ${recipe.name} in Mix Lab!`);
      checkScienceBadges();
      saveState();
    }
  }

  renderMixLab(document.getElementById("main-content"));
}

function resetMix() {
  state.scienceMixState = {
    beaker: [],
    result: null,
    showResult: false
  };
  renderMixLab(document.getElementById("main-content"));
}

// ======== 8. EQUATION BUILDER ========

function renderEquationBuilder(container) {
  initScienceProgress();
  const s = state.user.science;

  if (!state.scienceEquationState) {
    state.scienceEquationState = {
      compoundIndex: 0,
      selectedElements: [],
      showHint: false,
      result: null  // null = not checked, "correct", "wrong"
    };
  }

  const es = state.scienceEquationState;
  const compound = COMPOUNDS[es.compoundIndex];

  // Gather all unique element symbols across all tiers for the button palette
  const allSymbols = [];
  ["beginner", "intermediate", "advanced"].forEach(tier => {
    ELEMENTS[tier].forEach(el => {
      if (!allSymbols.includes(el.symbol)) allSymbols.push(el.symbol);
    });
  });

  // Build the player's current formula display
  const formulaDisplay = es.selectedElements.length === 0
    ? `<span class="sci-eq-placeholder">Tap elements below to build the formula!</span>`
    : es.selectedElements.map((sym, i) => `<span class="sci-eq-selected">${sym}</span>`).join(" + ");

  container.innerHTML = `
    <div class="sci-back-bar">
      <button class="sci-back-btn" onclick="state.scienceEquationState = null; scienceNav('science')">
        <i data-lucide="arrow-left"></i> Back to Science Lab
      </button>
      <div class="sci-progress-pill">${s.compoundsDiscovered.length}/${COMPOUNDS.length} discovered</div>
    </div>

    <div class="page-header">
      <h2>⚛️ Equation Builder</h2>
      <p>Can you figure out which elements make each compound?</p>
    </div>

    ${es.result !== "correct" ? `
      <div class="sci-eq-challenge">
        <div class="sci-eq-compound-name">${compound.emoji} ${compound.name}</div>
        <div class="sci-eq-hint-toggle">
          <button class="sci-btn sci-btn-small" onclick="toggleEquationHint()">
            ${es.showHint ? "Hide Hint 🙈" : "Show Hint 💡"}
          </button>
        </div>
        ${es.showHint ? `<div class="sci-eq-hint">${compound.hint}</div>` : ""}

        <div class="sci-eq-formula-area">
          <div class="sci-eq-label">Your formula:</div>
          <div class="sci-eq-formula">${formulaDisplay}</div>
          ${es.selectedElements.length > 0 && es.result !== "correct" ? `
            <button class="sci-eq-undo" onclick="undoEquationElement()">Undo ↩️</button>
          ` : ""}
        </div>

        ${es.result === "wrong" ? `
          <div class="sci-quiz-feedback sci-quiz-feedback-wrong">
            ❌ That's not quite right! Try a different combination of elements.
          </div>
        ` : ""}

        <div class="sci-eq-elements-palette">
          ${allSymbols.map(sym => {
            // Find the element to get its emoji
            let emoji = "";
            for (const tier of ["beginner", "intermediate", "advanced"]) {
              const found = ELEMENTS[tier].find(e => e.symbol === sym);
              if (found) { emoji = found.emoji; break; }
            }
            return `<button class="sci-eq-element-btn" onclick="addEquationElement('${sym}')" ${es.result === "correct" ? "disabled" : ""}>
              <span class="sci-eq-el-emoji">${emoji}</span>
              <span class="sci-eq-el-sym">${sym}</span>
            </button>`;
          }).join("")}
        </div>

        <div class="sci-eq-actions">
          <button class="sci-btn sci-btn-primary" onclick="checkEquation()" ${es.selectedElements.length === 0 ? "disabled" : ""}>
            Combine! ⚗️
          </button>
          <button class="sci-btn sci-btn-secondary" onclick="clearEquation()">
            Clear 🗑️
          </button>
        </div>
      </div>
    ` : `
      <div class="sci-eq-success">
        <div class="sci-eq-success-emoji">${compound.emoji}</div>
        <h3 class="sci-eq-success-title">You made ${compound.name}!</h3>
        <div class="sci-eq-success-formula">${compound.formula}</div>
        <div class="sci-eq-success-explanation">
          ${compound.explanation}
        </div>
        <div class="sci-eq-success-actions">
          ${es.compoundIndex < COMPOUNDS.length - 1 ? `
            <button class="sci-btn sci-btn-primary" onclick="nextEquationCompound()">
              Next Compound ▶
            </button>
          ` : `
            <div class="sci-eq-all-done">
              🎉 You've done all the compounds! Amazing!
            </div>
          `}
          <button class="sci-btn sci-btn-secondary" onclick="state.scienceEquationState = null; scienceNav('science')">
            Back to Science Lab
          </button>
        </div>
      </div>
    `}
  `;
  lucide.createIcons();
}

function addEquationElement(symbol) {
  const es = state.scienceEquationState;
  if (!es || es.result === "correct") return;
  // Reset wrong state when adding new element
  if (es.result === "wrong") es.result = null;
  es.selectedElements.push(symbol);
  renderEquationBuilder(document.getElementById("main-content"));
}

function undoEquationElement() {
  const es = state.scienceEquationState;
  if (!es || es.selectedElements.length === 0) return;
  es.selectedElements.pop();
  es.result = null;
  renderEquationBuilder(document.getElementById("main-content"));
}

function clearEquation() {
  const es = state.scienceEquationState;
  if (!es) return;
  es.selectedElements = [];
  es.result = null;
  renderEquationBuilder(document.getElementById("main-content"));
}

function toggleEquationHint() {
  const es = state.scienceEquationState;
  if (!es) return;
  es.showHint = !es.showHint;
  renderEquationBuilder(document.getElementById("main-content"));
}

function checkEquation() {
  const es = state.scienceEquationState;
  if (!es || es.selectedElements.length === 0) return;

  const compound = COMPOUNDS[es.compoundIndex];

  // Compare: sort both arrays and check match
  const playerSorted = [...es.selectedElements].sort();
  const answerSorted = [...compound.elements].sort();

  const correct = playerSorted.length === answerSorted.length &&
    playerSorted.every((v, i) => v === answerSorted[i]);

  if (correct) {
    es.result = "correct";
    initScienceProgress();
    const s = state.user.science;
    if (!s.compoundsDiscovered.includes(compound.name)) {
      s.compoundsDiscovered.push(compound.name);
      awardXP(20, `Built ${compound.name} in Equation Builder!`);
      checkScienceBadges();
      saveState();
    }
  } else {
    es.result = "wrong";
  }

  renderEquationBuilder(document.getElementById("main-content"));
}

function nextEquationCompound() {
  const es = state.scienceEquationState;
  if (!es) return;
  es.compoundIndex++;
  es.selectedElements = [];
  es.showHint = false;
  es.result = null;
  if (es.compoundIndex >= COMPOUNDS.length) {
    es.compoundIndex = 0;
  }
  renderEquationBuilder(document.getElementById("main-content"));
}
