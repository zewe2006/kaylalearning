/* Story Quest — Story Data
   8 stories across 3 levels with vocabulary and comprehension questions */

const STORIES = [
  {
    id: "luna-garden",
    title: "Luna's Secret Garden",
    description: "A girl discovers a hidden garden behind her grandmother's house and learns about patience.",
    level: 1,
    topic: "nature",
    icon: "🌻",
    pages: [
      "Luna visited her grandmother every summer. Grandma Rose lived in a small cottage at the edge of town. Behind the cottage was a tall wooden fence covered in ivy. Luna always wondered what was on the other side.",
      "One morning, Luna found a tiny gate hidden behind the ivy. She pushed it open and gasped. Inside was the most beautiful garden she had ever seen. Flowers of every color grew in neat rows. Butterflies danced from bloom to bloom.",
      "\"I planted this garden when I was your age,\" said Grandma Rose, appearing behind her. \"It took years of patience and care. Every flower here started as a tiny seed.\"",
      "Luna wanted to plant something of her own. Grandma Rose gave her a small packet of sunflower seeds. \"These will grow taller than you,\" she promised. Luna dug small holes in the soil and carefully placed each seed inside.",
      "Every day that summer, Luna watered her seeds and pulled out weeds. At first, nothing happened. She felt discouraged. But Grandma Rose reminded her, \"Good things take time.\"",
      "By the end of summer, Luna's sunflowers were as tall as the fence. Their golden faces turned toward the sun. Luna learned that patience was like a seed — if you nurtured it, something wonderful would grow."
    ],
    vocabulary: [
      { word: "cottage", definition: "A small, cozy house, usually in the countryside", example: "The family stayed in a cottage near the lake." },
      { word: "ivy", definition: "A green plant that climbs up walls and fences", example: "The ivy covered the entire side of the building." },
      { word: "patience", definition: "The ability to wait calmly without getting upset", example: "Learning to ride a bike requires patience." },
      { word: "discouraged", definition: "Feeling like you want to give up", example: "She felt discouraged after losing the game, but she tried again." },
      { word: "nurtured", definition: "Took care of something to help it grow", example: "The mother bird nurtured her babies in the nest." }
    ],
    questions: [
      { text: "What did Luna find behind the ivy?", options: ["A tiny gate", "A lost puppy", "A treasure chest", "A bicycle"], correct: 0 },
      { text: "Who planted the garden originally?", options: ["Luna's mother", "Grandma Rose", "A neighbor", "Luna herself"], correct: 1 },
      { text: "What did Luna plant in the garden?", options: ["Roses", "Tomatoes", "Sunflower seeds", "Apple trees"], correct: 2 },
      { text: "How did Luna feel when nothing grew at first?", options: ["Excited", "Angry", "Discouraged", "Sleepy"], correct: 2 },
      { text: "What is the main lesson of this story?", options: ["Gardens are boring", "Patience helps good things grow", "Summer is the best season", "Fences should be removed"], correct: 1 }
    ]
  },
  {
    id: "ollie-octopus",
    title: "Ollie the Octopus",
    description: "An octopus learns that being different can be a superpower when he helps his ocean friends.",
    level: 1,
    topic: "animals",
    icon: "🐙",
    pages: [
      "Deep in the ocean, there lived an octopus named Ollie. Ollie had eight long arms, and each one seemed to have a mind of its own. While the other sea creatures swam in straight lines, Ollie's arms went in eight different directions.",
      "The fish sometimes giggled at Ollie. \"Why can't you swim like the rest of us?\" asked a clownfish. Ollie felt embarrassed. He wished he could be more like everyone else.",
      "One day, a strong current swept through the reef. The little fish were pushed around by the powerful water. Seashells and seaweed tumbled everywhere. Everyone was confused and scared.",
      "But Ollie was not swept away. His eight strong arms grabbed onto the coral and held tight. He reached out to the smaller fish and pulled them to safety, one by one. He could hold onto many friends at the same time.",
      "\"Ollie, you saved us!\" cheered the fish. The clownfish said, \"Your eight arms are amazing! You're like a superhero!\" Ollie turned a happy shade of pink.",
      "From that day on, Ollie was proud of his eight arms. He learned that the things that make you different can also make you extraordinary."
    ],
    vocabulary: [
      { word: "current", definition: "Moving water that flows in one direction, like a river in the ocean", example: "The boat was carried along by the strong current." },
      { word: "embarrassed", definition: "Feeling shy or uncomfortable because of something", example: "He was embarrassed when he tripped in front of everyone." },
      { word: "reef", definition: "A ridge of rock or coral near the surface of the ocean", example: "Colorful fish swam around the coral reef." },
      { word: "extraordinary", definition: "Very special or unusual in a wonderful way", example: "The sunset was so beautiful it was extraordinary." },
      { word: "tumbled", definition: "Fell or rolled around in a messy way", example: "The blocks tumbled down when the tower fell." }
    ],
    questions: [
      { text: "Why did the fish giggle at Ollie?", options: ["He told jokes", "His arms went in different directions", "He was very small", "He was a funny color"], correct: 1 },
      { text: "What happened when the strong current came?", options: ["Everyone had a party", "The fish were pushed around", "Ollie swam away", "The coral grew bigger"], correct: 1 },
      { text: "How did Ollie help during the current?", options: ["He swam very fast", "He called for help", "He held fish with his eight arms", "He hid in a cave"], correct: 2 },
      { text: "What color did Ollie turn when he was happy?", options: ["Blue", "Green", "Pink", "Yellow"], correct: 2 },
      { text: "What is the main message of this story?", options: ["Octopuses are better than fish", "Being different can be a superpower", "The ocean is dangerous", "Fish should not giggle"], correct: 1 }
    ]
  },
  {
    id: "robot-helper",
    title: "The Robot Who Wanted to Help",
    description: "A small robot named Bolt learns that helping others is the best way to find purpose.",
    level: 1,
    topic: "science",
    icon: "🤖",
    pages: [
      "In a workshop filled with tools and wires, a small robot named Bolt opened his eyes for the first time. He looked around at the shelves of gadgets and gears. \"What am I supposed to do?\" he wondered.",
      "Bolt walked outside and saw people going about their day. A mail carrier struggled with heavy packages. A child could not reach a book on a high shelf. An elderly woman had trouble crossing the busy street.",
      "Bolt decided to help them all. He carried the heavy packages for the mail carrier. He stretched his extendable arm to reach the book for the child. He guided the elderly woman safely across the street.",
      "At the end of the day, Bolt felt a warm glow inside his circuits. The people smiled at him and said, \"Thank you, Bolt! You made our day so much better.\"",
      "Bolt returned to the workshop. The inventor who built him asked, \"Did you figure out what you're supposed to do?\" Bolt nodded happily. \"I'm supposed to help others. That's what makes me feel complete.\""
    ],
    vocabulary: [
      { word: "workshop", definition: "A room or building where things are made or fixed", example: "Dad fixed the chair in his workshop." },
      { word: "gadgets", definition: "Small machines or devices that do useful things", example: "The kitchen was full of clever gadgets." },
      { word: "extendable", definition: "Able to be made longer or stretched out", example: "The extendable ladder reached the roof." },
      { word: "circuits", definition: "Paths that electricity follows inside a machine", example: "The computer's circuits help it think and work." },
      { word: "inventor", definition: "A person who creates or designs new things", example: "The inventor built a machine that could fly." }
    ],
    questions: [
      { text: "Where did Bolt wake up?", options: ["In a park", "In a workshop", "In a school", "In a store"], correct: 1 },
      { text: "What did Bolt do for the child?", options: ["Carried packages", "Crossed the street", "Reached a book on a high shelf", "Fixed a toy"], correct: 2 },
      { text: "What did Bolt feel at the end of the day?", options: ["Tired and cold", "A warm glow inside", "Sad and lonely", "Confused"], correct: 1 },
      { text: "What did Bolt learn was his purpose?", options: ["To build gadgets", "To help others", "To stay in the workshop", "To be fast"], correct: 1 }
    ]
  },
  {
    id: "missing-melody",
    title: "The Missing Melody",
    description: "When the town's music disappears, a brave girl follows clues to bring it back.",
    level: 2,
    topic: "fantasy",
    icon: "🎵",
    pages: [
      "Mia lived in a town called Harmony, where music filled every street. Birds sang melodies from the rooftops. Street musicians played guitars on every corner. Even the wind seemed to hum a tune.",
      "One morning, Mia woke up to silence. The birds had stopped singing. The musicians stared at their instruments in confusion. No one could remember any songs. The town felt empty without its music.",
      "Mia noticed a trail of sparkling notes leading into the forest. They shimmered like tiny stars on the ground. She decided to follow them, even though the forest was dark and unfamiliar.",
      "The trail led her to a cave where she found a small, glowing creature. It looked like a fox made of moonlight. The creature was humming softly — all the town's melodies were swirling around it like ribbons of sound.",
      "\"I didn't mean to take them,\" the creature said in a gentle voice. \"I was lonely. The music kept me company.\" Mia felt sympathy for the creature. She understood what loneliness felt like.",
      "\"You don't have to be lonely,\" Mia said. \"Come live in our town. We have enough music for everyone.\" The creature smiled, and all the melodies floated back toward Harmony like golden butterflies.",
      "When Mia returned with the creature, the town celebrated. Music filled the streets again, louder and more joyful than before. The creature, whom they named Lyric, became the town's most beloved friend. Mia learned that kindness is the most beautiful melody of all."
    ],
    vocabulary: [
      { word: "melody", definition: "A series of musical notes that make a tune", example: "She hummed a cheerful melody while cooking." },
      { word: "harmony", definition: "A pleasant combination of different sounds together; also means agreement", example: "The two singers created beautiful harmony." },
      { word: "shimmered", definition: "Shone with a soft, flickering light", example: "The lake shimmered in the moonlight." },
      { word: "sympathy", definition: "Understanding and caring about someone else's feelings", example: "She felt sympathy for the lost puppy." },
      { word: "unfamiliar", definition: "Not known or recognized; strange and new", example: "The path led through unfamiliar woods." },
      { word: "beloved", definition: "Loved very much by many people", example: "The beloved teacher retired after thirty years." }
    ],
    questions: [
      { text: "What was special about the town of Harmony?", options: ["It had many parks", "Music filled every street", "It was near the ocean", "Everyone was very tall"], correct: 1 },
      { text: "What did Mia follow into the forest?", options: ["A lost dog", "A trail of sparkling notes", "A map", "Footprints"], correct: 1 },
      { text: "Why did the creature take the music?", options: ["It was hungry", "It was angry", "It was lonely", "It wanted to sell it"], correct: 2 },
      { text: "What did Mia invite the creature to do?", options: ["Go away forever", "Come live in their town", "Learn to read", "Build a house"], correct: 1 },
      { text: "What do you think would have happened if Mia had been mean to the creature?", options: ["The music would have come back faster", "The creature might have kept the music", "The town would not care", "Nothing would change"], correct: 1 }
    ]
  },
  {
    id: "time-capsule",
    title: "The Time Capsule Mystery",
    description: "Two friends discover a mysterious box buried in the schoolyard with surprising contents inside.",
    level: 2,
    topic: "school",
    icon: "🔍",
    pages: [
      "Jayden and Sofia were digging in the corner of the schoolyard for a science project about soil. Their shovels hit something hard. They brushed away the dirt and found a metal box wrapped in old cloth.",
      "\"What is it?\" Sofia asked, her eyes wide with curiosity. The box was rusty but had a small engraving on the lid: \"For the future — Class of 1975.\" They had found a time capsule that was over fifty years old!",
      "They brought the box to their teacher, Ms. Chen. The whole class gathered around as she carefully opened the lid. Inside were several items wrapped in newspaper from 1975.",
      "There was a photograph of students standing in front of the school. The school looked different back then — smaller, with a big oak tree in front that was now enormous. There was also a letter, a cassette tape, and a small toy car.",
      "The letter read: \"Dear future friends, we are second graders just like you. We wonder what the world will be like when you read this. Do you have flying cars? Do robots do your homework? We hope the world is a wonderful place.\"",
      "The class laughed at the flying cars question. Sofia said, \"We don't have flying cars yet, but we do have computers in our pockets!\" Jayden added, \"And we found your message. That's pretty amazing.\"",
      "Ms. Chen suggested they create their own time capsule to bury for future students. The class spent the rest of the week deciding what to put inside. They included a class photo, a USB drive with videos, a letter about their lives, and a fidget spinner. They sealed the new capsule and buried it with a note: \"For the future — Class of 2026.\""
    ],
    vocabulary: [
      { word: "curiosity", definition: "A strong desire to learn or know about something", example: "Her curiosity led her to explore the old attic." },
      { word: "engraving", definition: "Words or designs cut into a hard surface", example: "The trophy had an engraving of the winner's name." },
      { word: "capsule", definition: "A small container that holds things inside", example: "The time capsule was buried underground for twenty years." },
      { word: "enormous", definition: "Extremely large; much bigger than normal", example: "The enormous whale swam beneath the boat." },
      { word: "suggested", definition: "Offered an idea for someone to think about", example: "Mom suggested we go to the park after lunch." }
    ],
    questions: [
      { text: "What were Jayden and Sofia doing when they found the box?", options: ["Playing tag", "Digging for a science project", "Planting flowers", "Building a fort"], correct: 1 },
      { text: "How old was the time capsule?", options: ["Ten years old", "Twenty-five years old", "Over fifty years old", "One hundred years old"], correct: 2 },
      { text: "What did the 1975 students wonder about the future?", options: ["If school still existed", "If there were flying cars", "If music still existed", "If trees still grew"], correct: 1 },
      { text: "What did the 2026 class put in their time capsule?", options: ["A cassette tape", "A fidget spinner", "A toy dinosaur", "A bicycle"], correct: 1 },
      { text: "Why do you think people make time capsules?", options: ["To hide treasure", "To share their lives with future people", "Because they are bored", "To win a contest"], correct: 1 }
    ]
  },
  {
    id: "dragon-baker",
    title: "The Dragon Who Loved to Bake",
    description: "A dragon discovers that her fire breath has an unexpected and delightful talent.",
    level: 2,
    topic: "fantasy",
    icon: "🐉",
    pages: [
      "In the land of Drakonia, all dragons were expected to breathe fire for battle practice. Young dragons spent their days scorching targets and melting rocks. But Ember, a small violet dragon, had a secret — she hated battle practice.",
      "While other dragons aimed their fire at targets, Ember would sneak away to the kitchen caves. She loved watching the elder dragons prepare feasts. The sizzle of meat and the aroma of roasting vegetables fascinated her.",
      "One day, Ember discovered a dusty old recipe book hidden behind a stack of cauldrons. The book was filled with pictures of cakes, pies, and pastries — things dragons had never tried to make before. Ember's eyes sparkled with excitement.",
      "She gathered ingredients from the forest: berries, wild honey, ground nuts, and flour from the village mill. Using her gentle fire breath, she heated a stone oven to exactly the right temperature. She mixed, poured, and waited.",
      "The result was a magnificent berry cake with honey glaze. The aroma drifted through the caves. Dragons came from all directions, following the delicious smell. Even the fierce General Blaze came to investigate.",
      "\"What is this extraordinary creation?\" the General demanded. Then he took a bite. His stern expression transformed into pure delight. \"This is... the most wonderful thing I have ever tasted!\"",
      "Soon, Ember opened the first dragon bakery in Drakonia. Dragons traveled from distant mountains to taste her creations. Ember proved that fire breath could create something more powerful than destruction — it could create joy."
    ],
    vocabulary: [
      { word: "scorching", definition: "Burning something with very high heat", example: "The scorching sun made the sand too hot to walk on." },
      { word: "aroma", definition: "A pleasant, noticeable smell", example: "The aroma of fresh bread filled the kitchen." },
      { word: "ingredients", definition: "The different foods or items you mix together to make something", example: "The recipe called for simple ingredients like eggs and flour." },
      { word: "magnificent", definition: "Extremely beautiful or impressive", example: "The castle was a magnificent building with tall towers." },
      { word: "fierce", definition: "Very strong, intense, or aggressive", example: "The fierce wind knocked over the trash cans." },
      { word: "transformed", definition: "Changed completely from one thing into another", example: "The caterpillar transformed into a beautiful butterfly." }
    ],
    questions: [
      { text: "What did Ember dislike about being a dragon?", options: ["Flying", "Sleeping in caves", "Battle practice", "Swimming"], correct: 2 },
      { text: "What did Ember find hidden in the kitchen caves?", options: ["A magic wand", "A recipe book", "A treasure map", "A baby dragon"], correct: 1 },
      { text: "How did Ember heat her oven?", options: ["With matches", "With her gentle fire breath", "With electricity", "With sunlight"], correct: 1 },
      { text: "How did General Blaze react to the cake?", options: ["He was angry", "He was delighted", "He was scared", "He was bored"], correct: 1 },
      { text: "What is the message of this story?", options: ["Dragons should never bake", "Your talents can be used in unexpected ways", "Battle practice is important", "Cakes are better than pies"], correct: 1 }
    ]
  },
  {
    id: "coral-rescue",
    title: "The Great Coral Rescue",
    description: "A team of young scientists works together to save a dying coral reef.",
    level: 3,
    topic: "science",
    icon: "🪸",
    pages: [
      "Dr. Amara was a marine biologist who studied coral reefs. One morning, she received alarming news. The Rainbow Reef, the most colorful reef in the Pacific Ocean, was turning white. The coral was dying.",
      "Coral reefs might look like colorful rocks, but they are actually living creatures. Tiny organisms called polyps build the reef structure. They share their homes with microscopic algae that give coral its brilliant colors. When the ocean water gets too warm, the algae leave, and the coral turns white. This is called coral bleaching.",
      "Dr. Amara assembled a team of young scientists. There was Marco, an expert in ocean temperatures. Lena studied algae and plant life. And Kai was an engineer who could build underwater equipment.",
      "The team traveled to the reef by boat. When they dove underwater, they were shocked. Large sections of the once-vibrant reef were now ghostly white. Fish that depended on the reef for shelter looked confused and lost.",
      "The team worked for weeks. Marco installed sensors to monitor the water temperature. Lena collected healthy algae samples from nearby reefs and developed a way to reintroduce them to the sick coral. Kai built special underwater shelters to protect the recovering coral from direct sunlight.",
      "Months later, patches of color began to return. First a few spots of green, then purple, then the brilliant orange and blue that had made Rainbow Reef famous. Fish returned to their homes. The reef was slowly healing.",
      "Dr. Amara told her team, \"We cannot fix this problem alone. Everyone needs to understand that the choices we make on land affect the ocean. Reducing pollution and protecting our environment helps keep the ocean healthy for all living things.\"",
      "The young scientists shared their story with schools around the world. They inspired thousands of students to learn about marine conservation. Marco, Lena, and Kai proved that young people have the power to make a real difference."
    ],
    vocabulary: [
      { word: "biologist", definition: "A scientist who studies living things like plants and animals", example: "The biologist discovered a new species of frog." },
      { word: "organisms", definition: "Any living thing, from tiny bacteria to huge whales", example: "Microscopic organisms live in every drop of pond water." },
      { word: "microscopic", definition: "So tiny that you need a microscope to see it", example: "Bacteria are microscopic — you cannot see them with your eyes." },
      { word: "bleaching", definition: "Losing color and becoming white", example: "Coral bleaching happens when ocean water gets too warm." },
      { word: "vibrant", definition: "Full of energy and bright colors", example: "The market was vibrant with colorful fruits and loud voices." },
      { word: "conservation", definition: "Protecting nature and natural resources from harm", example: "Conservation efforts helped save the bald eagle from extinction." },
      { word: "pollution", definition: "Harmful substances that damage the air, water, or land", example: "Pollution from factories made the river unsafe for fish." }
    ],
    questions: [
      { text: "What was happening to Rainbow Reef?", options: ["It was growing bigger", "It was turning white", "It was sinking deeper", "It was making noise"], correct: 1 },
      { text: "What causes coral bleaching?", options: ["Cold water", "Too many fish", "Water that is too warm", "Bright sunlight"], correct: 2 },
      { text: "What was Lena's job on the team?", options: ["Building equipment", "Measuring temperature", "Studying algae and plant life", "Driving the boat"], correct: 2 },
      { text: "How did the team help the reef recover?", options: ["They painted it", "They reintroduced algae and built shelters", "They moved the fish away", "They made the water colder"], correct: 1 },
      { text: "What is the main idea of this story?", options: ["Coral reefs are not important", "Young people can help protect the environment", "Scientists never work in teams", "The ocean is too big to help"], correct: 1 }
    ]
  },
  {
    id: "starlight-library",
    title: "The Starlight Library",
    description: "A girl discovers a magical library where books come to life and characters need her help.",
    level: 3,
    topic: "fantasy",
    icon: "📚",
    pages: [
      "Zara loved stories more than anything in the world. She read during breakfast, during recess, and under her covers with a flashlight at night. Her bedroom was stacked floor to ceiling with books. Her mother often joked, \"Zara, you'll disappear into a book one day.\"",
      "One rainy afternoon, Zara visited the old library at the end of Maple Street. She had been there many times, but today something was different. A door she had never noticed before stood at the back of the history section. It was painted midnight blue with silver stars.",
      "Zara turned the handle and stepped through. On the other side was an enormous library that seemed to stretch on forever. The ceiling looked like the night sky, filled with constellations that slowly rotated. Books floated gently through the air like birds.",
      "A kind librarian with silver hair appeared beside her. \"Welcome to the Starlight Library,\" she said. \"Here, every story ever written is alive. But some stories are in trouble. Their pages are fading because children have stopped reading them. Without readers, stories cease to exist.\"",
      "Zara felt determined to help. The librarian handed her a glowing bookmark. \"This will guide you into any story that needs saving. All you need to do is read it with your whole heart.\"",
      "Zara opened the first fading book. As she read, the words grew brighter on the page. Characters who had been frozen mid-sentence began to move and speak again. A knight continued his quest. A lost princess found her way home. A detective solved the final clue.",
      "For hours, Zara traveled from story to story, reading each one with passion and attention. The Starlight Library grew brighter with each book she saved. The floating books hummed with gratitude.",
      "When Zara finally stepped back through the midnight door, she understood something profound. Stories need readers just as much as readers need stories. She made a promise to share her love of reading with everyone she knew — because every time someone opens a book, a story comes alive."
    ],
    vocabulary: [
      { word: "constellations", definition: "Groups of stars that form patterns or shapes in the night sky", example: "She pointed out the constellation that looked like a bear." },
      { word: "cease", definition: "To stop completely", example: "The rain will cease by afternoon." },
      { word: "determined", definition: "Having made a firm decision and being resolved to do something", example: "She was determined to finish the race, even though she was tired." },
      { word: "quest", definition: "A long journey to find or achieve something important", example: "The hero set out on a quest to find the magic stone." },
      { word: "profound", definition: "Very deep and meaningful", example: "The teacher shared a profound idea about kindness." },
      { word: "gratitude", definition: "A feeling of being thankful and appreciative", example: "She was filled with gratitude for her friend's help." }
    ],
    questions: [
      { text: "What was special about the door Zara found?", options: ["It was very large", "It was painted midnight blue with silver stars", "It was made of glass", "It had a lock on it"], correct: 1 },
      { text: "Why were stories fading in the Starlight Library?", options: ["The lights were broken", "Children stopped reading them", "The ink was old", "It was too cold"], correct: 1 },
      { text: "What did the glowing bookmark do?", options: ["It told the time", "It guided Zara into stories that needed saving", "It translated languages", "It played music"], correct: 1 },
      { text: "What happened when Zara read the fading books?", options: ["They disappeared", "The words grew brighter and characters came alive", "They became heavier", "Nothing happened"], correct: 1 },
      { text: "What is the deeper meaning of this story?", options: ["Libraries should be bigger", "Reading gives life to stories and imagination", "Books should float", "Rain makes things magical"], correct: 1 }
    ]
  }
];

// Badge definitions
const BADGES = [
  { id: "first-story", name: "First Story", description: "Complete your first story", icon: "⭐", requirement: { type: "stories_completed", count: 1 } },
  { id: "bookworm", name: "Bookworm", description: "Complete 3 stories", icon: "📖", requirement: { type: "stories_completed", count: 3 } },
  { id: "story-master", name: "Story Master", description: "Complete all stories", icon: "👑", requirement: { type: "stories_completed", count: 8 } },
  { id: "quiz-star", name: "Quiz Star", description: "Get a perfect score on any quiz", icon: "🌟", requirement: { type: "perfect_quiz", count: 1 } },
  { id: "vocab-explorer", name: "Vocab Explorer", description: "Learn 10 vocabulary words", icon: "🔤", requirement: { type: "words_learned", count: 10 } },
  { id: "vocab-master", name: "Word Wizard", description: "Learn 25 vocabulary words", icon: "🧙", requirement: { type: "words_learned", count: 25 } },
  { id: "streak-3", name: "Reading Streak", description: "Read 3 days in a row", icon: "🔥", requirement: { type: "streak", count: 3 } },
  { id: "streak-5", name: "Super Streak", description: "Read 5 days in a row", icon: "💫", requirement: { type: "streak", count: 5 } },
  { id: "level-2", name: "Level Up!", description: "Reach Level 2 stories", icon: "🚀", requirement: { type: "level_reached", count: 2 } },
  { id: "level-3", name: "Advanced Reader", description: "Reach Level 3 stories", icon: "🏆", requirement: { type: "level_reached", count: 3 } },
  { id: "speed-reader", name: "Speed Reader", description: "Complete a story in under 5 minutes", icon: "⚡", requirement: { type: "fast_read", count: 1 } },
  { id: "explorer", name: "Explorer", description: "Read stories from 3 different topics", icon: "🗺️", requirement: { type: "topics_read", count: 3 } },
  { id: "first-recording", name: "First Recording", description: "Record yourself reading aloud for the first time", icon: "🎤", requirement: { type: "recordings_made", count: 1 } },
  { id: "voice-star", name: "Voice Star", description: "Get 90%+ accuracy on a read-aloud", icon: "🌟", requirement: { type: "voice_accuracy", count: 90 } },
  { id: "pet-parent", name: "Pet Parent", description: "Adopt your first virtual pet", icon: "🐾", requirement: { type: "pet_adopted", count: 1 } },
  { id: "pet-grower", name: "Pet Grower", description: "Grow your pet to the adult stage", icon: "🌱", requirement: { type: "pet_stage", count: 3 } },
  { id: "pet-feeder", name: "Pet Feeder", description: "Feed your pet 10 times", icon: "🍽️", requirement: { type: "pet_feedings", count: 10 } }
];

// Avatar customization items
const AVATAR_ITEMS = {
  hats: [
    { id: "none", name: "No Hat", cost: 0, emoji: "" },
    { id: "crown", name: "Crown", cost: 50, emoji: "👑" },
    { id: "wizard", name: "Wizard Hat", cost: 75, emoji: "🧙" },
    { id: "flower", name: "Flower Crown", cost: 40, emoji: "🌸" },
    { id: "cap", name: "Baseball Cap", cost: 30, emoji: "🧢" },
    { id: "bow", name: "Hair Bow", cost: 25, emoji: "🎀" }
  ],
  backgrounds: [
    { id: "default", name: "Meadow", cost: 0, color: "#a8d8a8" },
    { id: "sunset", name: "Sunset", cost: 30, color: "#f4a261" },
    { id: "ocean", name: "Ocean", cost: 40, color: "#6db6d6" },
    { id: "space", name: "Space", cost: 60, color: "#2d1b69" },
    { id: "rainbow", name: "Rainbow", cost: 80, color: "linear-gradient(135deg, #ff9a9e, #fad0c4, #a8edea, #d4fc79)" },
    { id: "stars", name: "Starry Night", cost: 50, color: "#1a1a2e" }
  ],
  companions: [
    { id: "none", name: "No Companion", cost: 0, emoji: "" },
    { id: "cat", name: "Cat", cost: 60, emoji: "🐱" },
    { id: "dog", name: "Puppy", cost: 60, emoji: "🐶" },
    { id: "owl", name: "Owl", cost: 70, emoji: "🦉" },
    { id: "bunny", name: "Bunny", cost: 50, emoji: "🐰" },
    { id: "dragon", name: "Baby Dragon", cost: 100, emoji: "🐲" }
  ]
};

// Virtual Pet definitions
const PET_TYPES = [
  { id: "cat", name: "Kitty", emoji: "🐱", babyEmoji: "🐱", teenEmoji: "😺", adultEmoji: "😸", cost: 0 },
  { id: "dog", name: "Puppy", emoji: "🐶", babyEmoji: "🐶", teenEmoji: "🐕", adultEmoji: "🦮", cost: 0 },
  { id: "bunny", name: "Bunny", emoji: "🐰", babyEmoji: "🐰", teenEmoji: "🐇", adultEmoji: "🐇", cost: 50 },
  { id: "owl", name: "Owlet", emoji: "🦉", babyEmoji: "🐣", teenEmoji: "🦉", adultEmoji: "🦅", cost: 75 },
  { id: "dragon", name: "Dragon", emoji: "🐲", babyEmoji: "🥚", teenEmoji: "🦎", adultEmoji: "🐉", cost: 120 },
  { id: "unicorn", name: "Unicorn", emoji: "🦄", babyEmoji: "🐴", teenEmoji: "🦄", adultEmoji: "🦄", cost: 150 }
];

const PET_STAGES = [
  { stage: "baby", label: "Baby", xpNeeded: 0, feedingsNeeded: 0 },
  { stage: "teen", label: "Growing", xpNeeded: 100, feedingsNeeded: 5 },
  { stage: "adult", label: "Grown Up", xpNeeded: 300, feedingsNeeded: 15 }
];

const PET_FOODS = [
  { id: "apple", name: "Apple", emoji: "🍎", happiness: 5, cost: 0 },
  { id: "cookie", name: "Cookie", emoji: "🍪", happiness: 10, cost: 15 },
  { id: "cake", name: "Cake", emoji: "🎂", happiness: 20, cost: 30 },
  { id: "star-treat", name: "Star Treat", emoji: "⭐", happiness: 35, cost: 50 }
];

const PET_ACCESSORIES = [
  { id: "none", name: "None", emoji: "", cost: 0 },
  { id: "bow", name: "Bow Tie", emoji: "🎀", cost: 20 },
  { id: "scarf", name: "Scarf", emoji: "🧣", cost: 25 },
  { id: "glasses", name: "Glasses", emoji: "👓", cost: 30 },
  { id: "cape", name: "Cape", emoji: "🦸", cost: 50 },
  { id: "tiara", name: "Tiara", emoji: "👸", cost: 60 },
  { id: "magic-wand", name: "Magic Wand", emoji: "✨", cost: 80 }
];

// Level thresholds
const LEVELS = [
  { level: 1, name: "Beginner Reader", xpRequired: 0 },
  { level: 2, name: "Story Explorer", xpRequired: 200 },
  { level: 3, name: "Book Adventurer", xpRequired: 500 },
  { level: 4, name: "Reading Champion", xpRequired: 1000 },
  { level: 5, name: "Story Master", xpRequired: 1800 },
  { level: 6, name: "Legend of the Library", xpRequired: 3000 }
];
