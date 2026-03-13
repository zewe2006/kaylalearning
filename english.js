/* Story Quest — Word Adventure Data
   5 themed worlds, each with Vocabulary, Spelling, and Grammar challenges.
   3 difficulty tiers: easy (age 7), medium (age 8-9), hard (age 10) */

// ======== WORLDS ========
const ENGLISH_WORLDS = [
  { id: "enchanted-forest", name: "Enchanted Forest", icon: "\u{1F333}", color: "#4CAF50",
    description: "Begin your word journey in the magical forest!", unlockStars: 0 },
  { id: "crystal-cave", name: "Crystal Cave", icon: "\u{1F48E}", color: "#9C27B0",
    description: "Descend into sparkling caves of knowledge!", unlockStars: 6 },
  { id: "sky-kingdom", name: "Sky Kingdom", icon: "\u{2601}\u{FE0F}", color: "#2196F3",
    description: "Soar through the clouds and master new words!", unlockStars: 15 },
  { id: "ocean-depths", name: "Ocean Depths", icon: "\u{1F30A}", color: "#00BCD4",
    description: "Dive deep into the ocean of language!", unlockStars: 27 },
  { id: "dragons-peak", name: "Dragon's Peak", icon: "\u{1F525}", color: "#FF5722",
    description: "Reach the summit and become a Word Master!", unlockStars: 42 }
];

// ======== VOCABULARY CHALLENGES ========
// Each question: word, definition, options (4 choices), correct index, hint, example sentence
const VOCAB_CHALLENGES = {
  "enchanted-forest": [
    { word: "Brave", definition: "Not afraid of danger", options: ["Scared", "Not afraid of danger", "Very tired", "Moving slowly"], correct: 1, hint: "Think of a knight facing a dragon!", example: "The brave knight entered the dark cave." },
    { word: "Ancient", definition: "Very, very old", options: ["Brand new", "Quite small", "Very, very old", "Extremely fast"], correct: 2, hint: "Dinosaurs lived in ___ times.", example: "The ancient tree was over 500 years old." },
    { word: "Journey", definition: "A long trip from one place to another", options: ["A short nap", "A long trip", "A quick meal", "A loud noise"], correct: 1, hint: "What do adventurers go on?", example: "They began their journey through the forest." },
    { word: "Curious", definition: "Wanting to know or learn about things", options: ["Feeling sleepy", "Wanting to learn", "Being very loud", "Running quickly"], correct: 1, hint: "Cats are famous for being this!", example: "The curious girl asked many questions." },
    { word: "Enormous", definition: "Extremely large in size", options: ["Very tiny", "Extremely large", "Quite round", "Somewhat dark"], correct: 1, hint: "Bigger than big, bigger than huge!", example: "An enormous whale swam past the boat." },
    { word: "Whisper", definition: "To speak very quietly", options: ["To shout loudly", "To sing a song", "To speak very quietly", "To run fast"], correct: 2, hint: "The opposite of shouting.", example: "She had to whisper in the library." },
    { word: "Habitat", definition: "The natural home of an animal or plant", options: ["A type of food", "A natural home", "A kind of hat", "A way to walk"], correct: 1, hint: "Where animals live in the wild.", example: "The forest is a habitat for many creatures." },
    { word: "Imagine", definition: "To form a picture in your mind", options: ["To forget something", "To eat quickly", "To form a picture in your mind", "To sleep deeply"], correct: 2, hint: "Close your eyes and think of something!", example: "Can you imagine flying through the clouds?" }
  ],
  "crystal-cave": [
    { word: "Discover", definition: "To find something for the first time", options: ["To lose forever", "To find for the first time", "To break apart", "To paint colorfully"], correct: 1, hint: "Explorers love to do this!", example: "Scientists discover new species every year." },
    { word: "Brilliant", definition: "Very bright or very clever", options: ["Very dark", "Very bright or clever", "Very slow", "Very heavy"], correct: 1, hint: "Diamonds shine with this quality.", example: "She came up with a brilliant idea." },
    { word: "Trembling", definition: "Shaking because of fear or cold", options: ["Standing still", "Shaking from fear or cold", "Laughing loudly", "Dancing happily"], correct: 1, hint: "What your hands do when you're scared.", example: "The puppy was trembling in the cold rain." },
    { word: "Precious", definition: "Very valuable and important", options: ["Worthless", "Very valuable", "Very common", "Quite boring"], correct: 1, hint: "Gems and gold are this.", example: "The precious jewel glowed in the dark." },
    { word: "Predict", definition: "To say what will happen in the future", options: ["To remember the past", "To say what will happen", "To describe the present", "To ask a question"], correct: 1, hint: "Weather forecasters do this!", example: "Can you predict what happens next in the story?" },
    { word: "Fragile", definition: "Easily broken or damaged", options: ["Very strong", "Easily broken", "Extremely heavy", "Brightly colored"], correct: 1, hint: "Handle with care! Like glass.", example: "Be careful with that fragile vase." },
    { word: "Determined", definition: "Having made a firm decision and not giving up", options: ["Giving up easily", "Not giving up", "Feeling confused", "Being lazy"], correct: 1, hint: "When nothing can stop you!", example: "She was determined to finish the race." },
    { word: "Elegant", definition: "Graceful and stylish in appearance", options: ["Messy and ugly", "Graceful and stylish", "Loud and rough", "Small and round"], correct: 1, hint: "Think of a swan gliding on water.", example: "The elegant dancer moved across the stage." }
  ],
  "sky-kingdom": [
    { word: "Magnificent", definition: "Extremely beautiful or impressive", options: ["Very ugly", "Extremely beautiful", "Somewhat boring", "Slightly warm"], correct: 1, hint: "A grand palace would be this.", example: "The magnificent sunset painted the sky orange." },
    { word: "Cautious", definition: "Being very careful to avoid danger", options: ["Being reckless", "Being very careful", "Being very fast", "Being quite loud"], correct: 1, hint: "Look both ways before crossing!", example: "The cautious deer looked around before crossing." },
    { word: "Commotion", definition: "A lot of noise and confusion", options: ["Perfect silence", "A lot of noise and confusion", "A gentle breeze", "A quiet whisper"], correct: 1, hint: "What happens when a fire alarm goes off.", example: "The escaped hamster caused a commotion in class." },
    { word: "Reluctant", definition: "Not willing to do something", options: ["Very eager", "Not willing", "Extremely happy", "Quite tired"], correct: 1, hint: "How you feel about eating vegetables (maybe!).", example: "He was reluctant to jump into the cold pool." },
    { word: "Transform", definition: "To change completely in form or appearance", options: ["To stay the same", "To change completely", "To move slowly", "To count numbers"], correct: 1, hint: "Caterpillars do this to become butterflies!", example: "The caterpillar will transform into a butterfly." },
    { word: "Investigate", definition: "To examine something carefully to learn the truth", options: ["To ignore completely", "To examine carefully", "To throw away", "To paint over"], correct: 1, hint: "What detectives do at a crime scene.", example: "The detective went to investigate the mystery." },
    { word: "Abundant", definition: "Existing in very large amounts", options: ["Very scarce", "In very large amounts", "Completely empty", "Slightly broken"], correct: 1, hint: "There's more than enough!", example: "The garden had an abundant supply of flowers." },
    { word: "Persevere", definition: "To keep trying even when things are difficult", options: ["To give up quickly", "To keep trying", "To sleep all day", "To complain loudly"], correct: 1, hint: "Never give up, never surrender!", example: "You must persevere even when the work is hard." }
  ],
  "ocean-depths": [
    { word: "Treacherous", definition: "Full of hidden dangers", options: ["Completely safe", "Full of hidden dangers", "Very beautiful", "Quite ordinary"], correct: 1, hint: "A path through a swamp at night.", example: "The treacherous mountain path was covered in ice." },
    { word: "Diligent", definition: "Showing careful and persistent effort", options: ["Very lazy", "Showing careful effort", "Extremely clumsy", "Rather forgetful"], correct: 1, hint: "A student who always does their homework.", example: "The diligent student studied every night." },
    { word: "Consequence", definition: "A result of something that happened before", options: ["The beginning", "A result of something", "A type of food", "A happy feeling"], correct: 1, hint: "What happens because of your actions.", example: "Missing practice was a consequence of sleeping late." },
    { word: "Elaborate", definition: "Involving many carefully arranged parts or details", options: ["Very simple", "Many detailed parts", "Extremely tiny", "Quite boring"], correct: 1, hint: "A fancy, detailed wedding cake.", example: "She made an elaborate plan for the surprise party." },
    { word: "Resilient", definition: "Able to recover quickly from difficulties", options: ["Breaking easily", "Recovering quickly", "Moving slowly", "Feeling angry"], correct: 1, hint: "Like a rubber ball that bounces back!", example: "The resilient community rebuilt after the storm." },
    { word: "Phenomenon", definition: "A remarkable event that can be observed", options: ["A boring day", "A remarkable event", "A small insect", "A quiet room"], correct: 1, hint: "The Northern Lights are a natural one.", example: "A solar eclipse is an amazing phenomenon." },
    { word: "Flourish", definition: "To grow or develop in a healthy way", options: ["To wilt and die", "To grow healthily", "To stay still", "To shrink away"], correct: 1, hint: "What plants do with sunshine and water.", example: "The garden began to flourish in the spring." },
    { word: "Empathy", definition: "The ability to understand how someone else feels", options: ["Not caring at all", "Understanding others' feelings", "Feeling angry", "Being confused"], correct: 1, hint: "Walking in someone else's shoes.", example: "She showed empathy when her friend was sad." }
  ],
  "dragons-peak": [
    { word: "Extraordinary", definition: "Very unusual or remarkable", options: ["Completely ordinary", "Very unusual or remarkable", "Slightly boring", "Somewhat normal"], correct: 1, hint: "Way beyond what's normal!", example: "The magician performed an extraordinary trick." },
    { word: "Inevitable", definition: "Certain to happen and impossible to avoid", options: ["Easy to prevent", "Certain to happen", "Very unlikely", "Completely random"], correct: 1, hint: "Like the sun rising tomorrow.", example: "Change is inevitable as we grow older." },
    { word: "Meticulous", definition: "Showing great attention to detail", options: ["Very careless", "Great attention to detail", "Extremely loud", "Quite forgetful"], correct: 1, hint: "Someone who never misses a tiny detail.", example: "The meticulous artist spent hours on every painting." },
    { word: "Ambiguous", definition: "Having more than one possible meaning", options: ["Very clear", "More than one meaning", "Extremely loud", "Perfectly round"], correct: 1, hint: "When something could mean this OR that.", example: "The ambiguous instructions confused everyone." },
    { word: "Compelling", definition: "So interesting that you have to pay attention", options: ["Very boring", "So interesting you must pay attention", "Quite ugly", "Rather quiet"], correct: 1, hint: "A book you just can't put down!", example: "The movie had a compelling storyline." },
    { word: "Versatile", definition: "Able to adapt or be used for many different things", options: ["Only one use", "Many different uses", "Very fragile", "Quite heavy"], correct: 1, hint: "A Swiss Army knife is this!", example: "She is a versatile musician who plays five instruments." },
    { word: "Contemplating", definition: "Thinking about something deeply and carefully", options: ["Acting without thinking", "Thinking deeply", "Running quickly", "Sleeping soundly"], correct: 1, hint: "Like The Thinker statue.", example: "He sat contemplating the meaning of the poem." },
    { word: "Perspective", definition: "A particular way of thinking about something", options: ["A type of painting", "A way of thinking", "A fast vehicle", "A loud sound"], correct: 1, hint: "Everyone sees the world from their own one.", example: "Try to see things from a different perspective." }
  ]
};

// ======== SPELLING CHALLENGES ========
// Each: word, scrambled letters, hint, difficulty
const SPELLING_CHALLENGES = {
  "enchanted-forest": [
    { word: "friend", hint: "Someone you like to spend time with", example: "My best ___ lives next door." },
    { word: "believe", hint: "To think something is true", example: "I ___ you can do it!" },
    { word: "because", hint: "For the reason that", example: "I stayed inside ___ it was raining." },
    { word: "enough", hint: "As much as needed", example: "Do we have ___ cookies for everyone?" },
    { word: "special", hint: "Better than ordinary", example: "Today is a ___ day." },
    { word: "people", hint: "Human beings in general", example: "Many ___ came to the party." },
    { word: "thought", hint: "An idea in your mind", example: "She ___ about her answer carefully." },
    { word: "through", hint: "Moving in one side and out the other", example: "The train went ___ the tunnel." }
  ],
  "crystal-cave": [
    { word: "beautiful", hint: "Very pleasing to look at", example: "The sunset was ___." },
    { word: "different", hint: "Not the same as another", example: "Each snowflake is ___." },
    { word: "important", hint: "Having great value or meaning", example: "It is ___ to eat healthy food." },
    { word: "disappear", hint: "To go out of sight", example: "The magician made the rabbit ___." },
    { word: "adventure", hint: "An exciting experience", example: "Going camping was a great ___." },
    { word: "knowledge", hint: "Facts and information you have learned", example: "Reading builds your ___." },
    { word: "necessary", hint: "Needed; must be done", example: "Water is ___ for all living things." },
    { word: "celebrate", hint: "To do something fun for a special occasion", example: "We ___ birthdays with cake!" }
  ],
  "sky-kingdom": [
    { word: "temperature", hint: "How hot or cold something is", example: "The ___ outside is very cold today." },
    { word: "environment", hint: "The world around us", example: "We should protect our ___." },
    { word: "experience", hint: "Something that happens to you", example: "Visiting the zoo was a great ___." },
    { word: "communicate", hint: "To share information with others", example: "We ___ through speaking and writing." },
    { word: "imagination", hint: "The ability to create pictures in your mind", example: "Use your ___ to write a story." },
    { word: "independent", hint: "Able to do things on your own", example: "She is very ___ and does chores herself." },
    { word: "opportunity", hint: "A chance to do something", example: "This is a great ___ to learn." },
    { word: "responsible", hint: "Being trusted to do the right thing", example: "She is very ___ with her homework." }
  ],
  "ocean-depths": [
    { word: "extraordinary", hint: "Very unusual or amazing", example: "The acrobat did an ___ flip." },
    { word: "occasionally", hint: "Sometimes, but not often", example: "We ___ go to the beach." },
    { word: "unfortunately", hint: "Sadly; it is bad that", example: "___, the game was cancelled." },
    { word: "immediately", hint: "Right now, without waiting", example: "Please come here ___!" },
    { word: "accomplishment", hint: "Something achieved successfully", example: "Finishing the book was a big ___." },
    { word: "approximately", hint: "Close to an exact amount", example: "There were ___ 50 people there." },
    { word: "determination", hint: "The quality of not giving up", example: "Her ___ helped her win the race." },
    { word: "encyclopedia", hint: "A book with information about many topics", example: "She looked up facts in the ___." }
  ],
  "dragons-peak": [
    { word: "acknowledgment", hint: "Accepting that something is true", example: "He gave an ___ of his mistake." },
    { word: "miscellaneous", hint: "A mixture of different types", example: "The drawer was full of ___ items." },
    { word: "exaggeration", hint: "Making something seem bigger than it really is", example: "Saying he ate a million cookies is an ___." },
    { word: "circumstances", hint: "The conditions around an event", example: "Under the ___, we made the best choice." },
    { word: "pronunciation", hint: "The way a word is spoken", example: "Practice the ___ of difficult words." },
    { word: "sophisticated", hint: "Complex and advanced", example: "The robot had ___ technology." },
    { word: "questionnaire", hint: "A set of written questions", example: "Please fill out this ___." },
    { word: "Mediterranean", hint: "A sea between Europe and Africa", example: "They sailed across the ___." }
  ]
};

// ======== GRAMMAR CHALLENGES ========
// Each: sentence with blank, options, correct index, rule explanation
const GRAMMAR_CHALLENGES = {
  "enchanted-forest": [
    { sentence: "The dog ___ playing in the park.", options: ["is", "are", "am", "be"], correct: 0, rule: "Use 'is' with singular subjects (one thing).", category: "Subject-Verb Agreement" },
    { sentence: "She ___ to the store yesterday.", options: ["go", "goes", "went", "going"], correct: 2, rule: "'Yesterday' means past tense. 'Go' becomes 'went' in past tense.", category: "Past Tense" },
    { sentence: "The cats ___ sleeping on the couch.", options: ["is", "are", "am", "was"], correct: 1, rule: "Use 'are' with plural subjects (more than one).", category: "Subject-Verb Agreement" },
    { sentence: "I ___ a book every night before bed.", options: ["read", "reads", "reading", "readed"], correct: 0, rule: "Use the base form 'read' with 'I'.", category: "Subject-Verb Agreement" },
    { sentence: "He has ___ his homework already.", options: ["do", "did", "done", "doing"], correct: 2, rule: "With 'has/have', use the past participle: 'done'.", category: "Past Participle" },
    { sentence: "They ___ going to the zoo tomorrow.", options: ["is", "are", "am", "was"], correct: 1, rule: "Use 'are' with 'they' (plural).", category: "Subject-Verb Agreement" },
    { sentence: "The bird ___ in the tree right now.", options: ["sing", "sings", "sang", "singed"], correct: 1, rule: "Use 'sings' for he/she/it (singular present tense, add -s).", category: "Present Tense" },
    { sentence: "We ___ pizza for dinner last night.", options: ["eat", "eats", "ate", "eaten"], correct: 2, rule: "'Last night' means past tense. 'Eat' becomes 'ate'.", category: "Past Tense" }
  ],
  "crystal-cave": [
    { sentence: "The children played ___ in the garden.", options: ["happy", "happily", "happier", "happiness"], correct: 1, rule: "Use an adverb (-ly) to describe HOW something is done.", category: "Adverbs" },
    { sentence: "This is the ___ movie I have ever seen.", options: ["good", "better", "best", "most good"], correct: 2, rule: "Use 'best' when comparing three or more things (superlative).", category: "Comparatives" },
    { sentence: "Neither the cat ___ the dog wanted to go outside.", options: ["or", "nor", "and", "but"], correct: 1, rule: "'Neither' always pairs with 'nor'.", category: "Correlative Conjunctions" },
    { sentence: "She ran ___ than her brother in the race.", options: ["fast", "faster", "fastest", "more fast"], correct: 1, rule: "Use '-er' when comparing two things (comparative).", category: "Comparatives" },
    { sentence: "The teacher asked, ___ wants to answer the question?", options: ["Who", "Whom", "Which", "What"], correct: 0, rule: "Use 'who' when asking about a person doing an action.", category: "Pronouns" },
    { sentence: "I could ___ believe what I saw!", options: ["hard", "hardly", "harder", "hardest"], correct: 1, rule: "'Hardly' means 'almost not' \u2014 it's an adverb.", category: "Adverbs" },
    { sentence: "Each of the students ___ to bring a pencil.", options: ["need", "needs", "needing", "needed"], correct: 1, rule: "'Each' is singular, so use 'needs' (add -s).", category: "Subject-Verb Agreement" },
    { sentence: "The flowers smell ___.", options: ["sweet", "sweetly", "sweeter", "sweetness"], correct: 0, rule: "After 'smell/taste/look/feel', use an adjective (not adverb).", category: "Linking Verbs" }
  ],
  "sky-kingdom": [
    { sentence: "If I ___ a bird, I would fly to the mountains.", options: ["am", "was", "were", "is"], correct: 2, rule: "In 'if' wishes (subjunctive mood), always use 'were'.", category: "Subjunctive Mood" },
    { sentence: "The team celebrated ___ victory with a party.", options: ["their", "there", "they're", "its"], correct: 0, rule: "'Their' shows possession (belonging to them).", category: "Homophones" },
    { sentence: "She ___ the piano since she was five years old.", options: ["plays", "played", "has played", "is playing"], correct: 2, rule: "'Since' signals present perfect tense: 'has played'.", category: "Present Perfect" },
    { sentence: "___ going to rain this afternoon.", options: ["Its", "It's", "Its'", "They're"], correct: 1, rule: "'It's' is short for 'it is'. 'Its' (no apostrophe) means belonging to it.", category: "Homophones" },
    { sentence: "The book, ___ was written in 1960, is still popular.", options: ["who", "which", "whom", "what"], correct: 1, rule: "Use 'which' for things, 'who' for people.", category: "Relative Pronouns" },
    { sentence: "Not only did she sing, ___ she also danced.", options: ["and", "but", "or", "so"], correct: 1, rule: "'Not only... but also' is a fixed pair.", category: "Correlative Conjunctions" },
    { sentence: "By the time we arrived, the movie ___.", options: ["started", "has started", "had started", "starts"], correct: 2, rule: "'Had started' (past perfect) shows something happened before another past event.", category: "Past Perfect" },
    { sentence: "The number of students ___ increased this year.", options: ["have", "has", "are", "were"], correct: 1, rule: "'The number of' is singular and takes 'has'.", category: "Subject-Verb Agreement" }
  ],
  "ocean-depths": [
    { sentence: "The report must be submitted ___ Friday.", options: ["by", "until", "since", "for"], correct: 0, rule: "'By' means 'no later than' a deadline.", category: "Prepositions" },
    { sentence: "She speaks French ___ than her sister.", options: ["more fluent", "more fluently", "most fluently", "fluent"], correct: 1, rule: "Comparing two people: use 'more + adverb' (more fluently).", category: "Comparative Adverbs" },
    { sentence: "The students, ___ finished early, helped others.", options: ["who", "whom", "which", "whose"], correct: 0, rule: "'Who' is for people performing an action.", category: "Relative Pronouns" },
    { sentence: "___ the rain, the game continued as planned.", options: ["Despite", "Although", "Because", "Unless"], correct: 0, rule: "'Despite' is followed by a noun phrase (not a clause).", category: "Concession" },
    { sentence: "She would have won if she ___ harder.", options: ["tried", "had tried", "has tried", "tries"], correct: 1, rule: "Third conditional (past unreal): 'if + had + past participle'.", category: "Conditionals" },
    { sentence: "The evidence ___ that the theory is correct.", options: ["suggest", "suggests", "suggesting", "are suggesting"], correct: 1, rule: "'Evidence' is an uncountable singular noun, takes 'suggests'.", category: "Subject-Verb Agreement" },
    { sentence: "I wish I ___ more time to finish the project.", options: ["have", "has", "had", "having"], correct: 2, rule: "'Wish' for present situations uses past tense: 'had'.", category: "Subjunctive Mood" },
    { sentence: "The painting was ___ beautiful that everyone stopped to look.", options: ["so", "such", "very", "too"], correct: 0, rule: "'So + adjective + that' shows result.", category: "Intensifiers" }
  ],
  "dragons-peak": [
    { sentence: "Had I known about the test, I ___ studied more.", options: ["will have", "would have", "should", "could"], correct: 1, rule: "Inverted conditional: 'Had I known... I would have...'", category: "Inverted Conditionals" },
    { sentence: "The committee ___ divided on the issue.", options: ["is", "are", "was", "were"], correct: 3, rule: "When a collective noun refers to individual members acting separately, use plural.", category: "Collective Nouns" },
    { sentence: "She insisted that he ___ on time.", options: ["is", "be", "was", "will be"], correct: 1, rule: "After 'insist/recommend/suggest', use the base form (subjunctive).", category: "Subjunctive Mood" },
    { sentence: "Not until the bell rang ___ the students leave.", options: ["do", "did", "does", "done"], correct: 1, rule: "Negative adverbials at the start invert the subject and auxiliary.", category: "Inversion" },
    { sentence: "The more you practice, the ___ you become.", options: ["good", "better", "best", "more good"], correct: 1, rule: "'The more... the better' is a comparative correlation.", category: "Comparative Correlatives" },
    { sentence: "She asked whether the assignment ___ been submitted.", options: ["has", "have", "had", "having"], correct: 2, rule: "Reported speech shifts tense back: 'has been' becomes 'had been'.", category: "Reported Speech" },
    { sentence: "The athletes, each of ___ trained hard, performed well.", options: ["who", "whom", "which", "them"], correct: 1, rule: "'Whom' is the object form \u2014 'each of whom' (not 'who').", category: "Relative Pronouns" },
    { sentence: "Rarely ___ such a talented musician perform here.", options: ["do", "does", "did", "has"], correct: 1, rule: "'Rarely' at the start causes inversion: 'Rarely does...'", category: "Inversion" }
  ]
};

// ======== BADGES ========
const ENGLISH_BADGES = [
  { id: "eng-first-quest", name: "First Quest", description: "Complete your first Word Adventure challenge", icon: "\u{2B50}", requirement: { type: "eng_challenges_completed", count: 1 } },
  { id: "eng-vocab-hero", name: "Vocab Hero", description: "Complete 5 Vocabulary challenges", icon: "\u{1F4D6}", requirement: { type: "eng_vocab_completed", count: 5 } },
  { id: "eng-spelling-bee", name: "Spelling Bee", description: "Complete 5 Spelling challenges", icon: "\u{1F41D}", requirement: { type: "eng_spelling_completed", count: 5 } },
  { id: "eng-grammar-guru", name: "Grammar Guru", description: "Complete 5 Grammar challenges", icon: "\u{1F4DD}", requirement: { type: "eng_grammar_completed", count: 5 } },
  { id: "eng-perfect-score", name: "Perfect Score", description: "Get 100% on any challenge", icon: "\u{1F31F}", requirement: { type: "eng_perfect", count: 1 } },
  { id: "eng-world-1", name: "Forest Explorer", description: "Complete all Enchanted Forest challenges", icon: "\u{1F333}", requirement: { type: "eng_world_complete", world: "enchanted-forest" } },
  { id: "eng-world-3", name: "Sky Rider", description: "Complete all Sky Kingdom challenges", icon: "\u{2601}\u{FE0F}", requirement: { type: "eng_world_complete", world: "sky-kingdom" } },
  { id: "eng-world-5", name: "Dragon Slayer", description: "Conquer all of Dragon's Peak", icon: "\u{1F525}", requirement: { type: "eng_world_complete", world: "dragons-peak" } },
  { id: "eng-word-master", name: "Word Master", description: "Complete all 5 worlds", icon: "\u{1F451}", requirement: { type: "eng_all_worlds" } }
];
