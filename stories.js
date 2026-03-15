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
  },
  {
    id: "the-mars-greenhouse",
    title: "The Mars Greenhouse",
    description: "A team of young scientists on a Mars simulation must design a greenhouse to grow food in the harshest conditions imaginable.",
    level: 4,
    topic: "science",
    icon: "🌱",
    pages: [
      "The red dust of the Atacama Desert stretched in every direction, and twelve-year-old Priya squinted through her helmet visor at the barren landscape. This was \"Mars Base Ares\" — not the real Mars, but a simulation station run by a global youth science program. For the next thirty days, Priya and five teammates would live as if they were truly 300 million miles from Earth. Their mission was serious: design and build a working greenhouse that could feed a crew of six.",
      "Priya gathered her teammates inside the base\'s common room for their first planning session. There was Diego, who loved engineering and could build almost anything from spare parts. Amara was the team\'s biology expert and had already read every book she could find about growing plants in hostile environments. Then there was Kenji, quiet but brilliant, who could run calculations in his head faster than most people could type. Rounding out the group were twins Fatima and Lars, both passionate about chemistry and soil science. Together, they needed to collaborate — to combine all of their skills into one working plan.",
      "\"The main problem,\" Amara explained, pointing to her data tablet, \"is that simulated Martian soil contains almost no nutrients plants need to survive. Real Martian regolith — that\'s the scientific word for the loose rock and dust on the surface — is full of perchlorates, which are actually toxic to most plants.\" Diego whistled softly. \"So we can\'t just dig up dirt and stick seeds in it,\" he said. Priya nodded. \"Exactly. That\'s our first hypothesis to test: can we neutralize the toxic compounds and add enough organic material to make the soil usable?\"",
      "The team spent the first week running experiments. Fatima and Lars mixed different combinations of composted material, bacteria cultures, and water into small trays of simulated Martian soil. They tested each mixture carefully, recording every result in their shared lab notebook. Most of their early attempts failed — the plants either refused to sprout or wilted within two days. Priya found it frustrating, but she reminded herself that every failed experiment was still an experiment. \"Failure is just data we didn\'t expect,\" she told the group one evening.",
      "On day nine, Kenji noticed something interesting in their data. \"Look at tray seven,\" he said, spreading the numbers across the wall screen. \"The seedlings in that mix grew three centimeters in four days — that\'s twice as fast as any other tray.\" Amara leaned in, her eyes wide. \"That\'s the mix with the nitrogen-fixing bacteria added on day two. They must be converting nitrogen from the air into a form the plants can actually absorb!\" The room erupted in excited chatter. They had found something that worked, and now they needed to understand exactly why.",
      "Building the greenhouse itself presented a new set of challenges. The structure had to withstand simulated Martian conditions: intense ultraviolet radiation, temperature swings of more than 100 degrees between day and night, and almost no atmospheric pressure. Diego sketched design after design, crumpling paper and starting over. He finally landed on a dome-shaped frame made of lightweight aluminum tubes, covered with layers of special UV-filtering plastic sheeting. \"The dome shape distributes stress evenly,\" he explained to the group. \"No single point takes all the force.\"",
      "Inside the dome, the team constructed raised planting beds filled with their improved soil mixture. They rigged a drip irrigation system using recycled water from the base\'s humidity collectors. Kenji programmed a small computer to control the grow lights, mimicking a fourteen-hour \"Martian day\" cycle. Every detail had to be engineered carefully, because on real Mars, there would be no hardware store to visit and no supply ship arriving for months. Priya felt a deep sense of responsibility — this was exactly the kind of careful, innovative thinking that future Mars explorers would need.",
      "By day twenty, the first radishes and lettuce sprouted through the dark soil, their small green leaves unfurling under the artificial light. Priya pressed her hand against the warm plastic wall of the dome and felt a surge of pride unlike anything she had experienced before. \"We actually grew food on \'Mars,\'\" she whispered. Amara stood beside her, equally amazed. \"Fourteen days from seed to sprout. If we can replicate this at larger scale, a real Mars crew could be largely self-sufficient within a year.\"",
      "The final week was dedicated to documenting everything. Each team member wrote up their section of the research report — the soil experiments, the greenhouse design, the irrigation system, the lighting program. They reviewed each other\'s writing and caught each other\'s mistakes, improving the report together. Priya realized that this, too, was a form of collaboration: not just building things side by side, but thinking together, sharing knowledge, and making each other\'s work better.",
      "On the last day of the simulation, a video call connected them to scientists and educators watching from around the world. Priya presented their findings with confidence, explaining how bacteria could transform unusable soil into a growing medium, how dome architecture provided structural strength, and how precise programming could replace natural sunlight. One scientist asked, \"What was the hardest part?\" Priya thought for only a moment. \"Accepting that failing was part of succeeding,\" she said. \"Every experiment that didn\'t work taught us something we needed to know.\" The greenhouse behind her was full of green, living plants — proof that with curiosity, teamwork, and determination, even the most impossible problems had solutions."
    ],
    vocabulary: [
      { word: "hypothesis", definition: "A testable idea or explanation that scientists use as a starting point for an experiment.", example: "Priya\'s hypothesis was that adding bacteria to the soil would help the plants grow." },
      { word: "collaborate", definition: "To work together with others toward a shared goal.", example: "The six teammates had to collaborate and combine all of their different skills." },
      { word: "regolith", definition: "The layer of loose dust, rock, and broken material covering the surface of a planet or moon.", example: "Martian regolith contains toxic chemicals that make it hard to grow plants." },
      { word: "neutralize", definition: "To make something harmless by counteracting its effect.", example: "The team needed to neutralize the toxic perchlorates in the soil before planting." },
      { word: "innovation", definition: "A new idea, method, or invention that solves a problem in a creative way.", example: "The dome greenhouse was an innovation that could help real astronauts on Mars." },
      { word: "simulate", definition: "To imitate or recreate real conditions in a controlled setting for practice or study.", example: "The desert station was designed to simulate life on the surface of Mars." },
      { word: "self-sufficient", definition: "Able to provide everything you need without relying on outside help.", example: "If the greenhouse worked at larger scale, a Mars crew could become self-sufficient." },
      { word: "replicate", definition: "To repeat or copy something exactly in order to test whether the results are consistent.", example: "The scientists wanted to replicate the successful soil mixture in larger planting beds." }
    ],
    questions: [
      { text: "What is the main goal of Priya\'s team during the Mars simulation?", options: ["To travel to real Mars", "To design a greenhouse that can grow food in harsh conditions", "To study Martian rocks and minerals", "To build a new base station in the desert"], correct: 1 },
      { text: "Why can\'t the team simply plant seeds in the simulated Martian soil?", options: ["The soil is too wet and muddy", "The soil contains toxic perchlorates that harm plants", "The soil is too cold for seeds to sprout", "There is not enough sunlight inside the base"], correct: 1 },
      { text: "What discovery did Kenji notice in the experiment data on day nine?", options: ["Tray seven had the fastest-growing seedlings because of nitrogen-fixing bacteria", "The soil in tray three had the most nutrients", "Ultraviolet light was damaging all the plants equally", "The drip irrigation system was leaking"], correct: 0 },
      { text: "In this story, what does the word \"collaborate\" most closely mean?", options: ["To compete against other teams", "To work independently without help", "To work together toward a shared goal", "To document results in a notebook"], correct: 2 },
      { text: "What lesson does Priya share with the watching scientists at the end of the story?", options: ["That Mars is too dangerous for humans to ever visit", "That dome shapes are the strongest architectural design", "That accepting failure as part of the learning process is essential to success", "That nitrogen-fixing bacteria are the most important discovery in science"], correct: 2 }
    ]
  },
  {
    id: "the-mapmakers-apprentice",
    title: "The Mapmaker\'s Apprentice",
    description: "In the Age of Exploration, a young apprentice helps a famous cartographer map an uncharted island and uncovers an ancient civilization.",
    level: 4,
    topic: "history",
    icon: "🗺️",
    pages: [
      "In the year 1502, the port city of Lisbon buzzed with the noise of ships and sailors, spice merchants and storytellers. Twelve-year-old Marco had lived his whole life in the shadow of the great harbor, watching vessels sail toward the horizon and dreaming of what lay beyond it. When the royal cartographer, Master Henrique Dias, chose Marco as his new apprentice, Marco could barely believe his fortune. A cartographer was a mapmaker — someone who turned raw exploration into knowledge that the whole world could use.",
      "Master Dias was a stern but fair teacher. On Marco\'s first morning in the workshop, the old man handed him a quill and a sheet of parchment. \"Before you can navigate the world,\" Dias said, his dark eyes serious, \"you must learn to read it. A map is not just lines and colors. It is a promise to every sailor who holds it — a promise that what you have drawn is true.\" Marco studied the beautiful maps that covered the workshop walls, tracing the coastlines of Africa, India, and the newly discovered lands of the west with his fingertip.",
      "Their chance for a great adventure came in the spring, when a ship captain named Rodrigues arrived at the workshop with a puzzling story. He had sailed far south of the known shipping lanes and spotted an island that appeared on no existing map. The island was large — perhaps as large as Portugal itself — with towering green mountains visible from the sea. Captain Rodrigues needed someone to document it properly. Master Dias accepted the commission immediately, and Marco began packing his instruments: compasses, astrolabes, measuring chains, and dozens of blank pages of fine parchment.",
      "The voyage took three weeks through open ocean. Marco spent his days learning to use the astrolabe, an ancient instrument that measured the angle of the sun above the horizon to determine how far north or south a ship had traveled. He learned that every measurement had to be taken at exactly the same time of day to be accurate. \"The sea does not forgive careless mathematics,\" Master Dias told him. Marco practiced over and over, comparing his readings to the master\'s until the numbers matched perfectly.",
      "When the island finally appeared through the morning mist, Marco\'s breath caught in his throat. The coastline was unlike anything he had seen on any map — dramatic cliffs of black volcanic rock dropping straight into turquoise water, with dense green forest covering everything above. Captain Rodrigues anchored the ship in a natural harbor, and the mapping crew went ashore. Marco\'s job was to walk the coastline counting paces, while Master Dias took compass bearings and recorded the angles between landmarks. Together, they would stitch these measurements into an accurate outline of the island\'s shape.",
      "On the third day of surveying, Marco pushed through a thick wall of ferns and stumbled into a clearing that stopped him cold. Before him stood the remains of stone buildings — walls and archways and a central plaza, all built from perfectly fitted blocks of dark stone. The craftsmanship was extraordinary. Some of the stones were carved with spiraling symbols and images of animals Marco had never seen. He ran back to fetch Master Dias, his heart hammering. \"Someone built this,\" Marco said breathlessly. \"Someone who knew geometry and engineering. Someone who was here long before us.\"",
      "Master Dias examined the ruins carefully, sketching the layout of every building into his notebook. \"This is an ancient civilization,\" he said quietly. \"Perhaps hundreds or even thousands of years old. These people understood architecture as well as any builder in Lisbon.\" Marco helped measure the buildings and record the symbols, treating each stone as carefully as if it were a page in a precious book. He felt a powerful sense of responsibility. If this civilization was truly lost, then the only way to preserve their story was to document it perfectly.",
      "As they continued mapping the island over the following days, Marco grew to appreciate the landscape with new eyes. He noticed how the ancient settlement was positioned — near a freshwater river, sheltered from ocean storms by a ridge of hills, close to a natural harbor. \"They chose this location with great intelligence,\" he said to Master Dias. The old cartographer smiled for the first time. \"Yes. They were solving the same problems every explorer solves: how to find shelter, water, and food. Geography is the same puzzle for every civilization, in every age.\"",
      "When they finally sailed back to Lisbon, Marco helped Master Dias draw the finished map. It took six weeks of careful ink work, and Marco\'s hand cramped more than once. But the result was magnificent — a precise chart of the island\'s coastline, rivers, hills, and forests, with a detailed inset showing the ancient ruins and a careful reproduction of the carved symbols. Master Dias submitted the map to the royal court, and Marco\'s name appeared in the corner as assistant cartographer. It was the first time his name had ever been written in any official document.",
      "Years later, Marco would become a cartographer in his own right, teaching his own apprentices the art of turning raw exploration into knowledge. He never forgot the lesson Master Dias had taught him on that island: that every civilization, no matter how distant in time or place, had solved problems, built things of beauty, and left traces in the land. Each of those civilizations had shown resilience — enduring storms, droughts, and hardship to persist across generations. To map a place, Marco believed, was to honor everyone who had ever called it home."
    ],
    vocabulary: [
      { word: "cartographer", definition: "A person who makes maps, often by exploring and measuring new places.", example: "Master Dias was the royal cartographer, responsible for mapping newly discovered lands." },
      { word: "navigate", definition: "To plan and follow a route to travel from one place to another, especially by sea.", example: "Marco learned to use an astrolabe so he could navigate using the position of the sun." },
      { word: "astrolabe", definition: "An ancient scientific instrument used by sailors to measure the position of stars and the sun to determine location.", example: "Marco practiced with the astrolabe every day until his measurements matched the master\'s." },
      { word: "commission", definition: "An official request to do a specific job, often for pay.", example: "Captain Rodrigues gave Master Dias a commission to map the uncharted island." },
      { word: "civilization", definition: "A complex, organized society with its own culture, buildings, government, and way of life.", example: "The ruins Marco discovered were proof of an ancient civilization that had lived on the island." },
      { word: "document", definition: "To record information carefully in writing, drawings, or measurements so it is not forgotten.", example: "The team worked to document the ruins before sailing back to Lisbon." },
      { word: "preserve", definition: "To protect something so that it survives and is not lost or damaged over time.", example: "Marco felt a responsibility to preserve the story of the ancient civilization through careful mapping." },
      { word: "resilience", definition: "The ability to keep going and adapt even when things are difficult or go wrong.", example: "The ancient builders showed great resilience in surviving on a remote island with only natural resources." }
    ],
    questions: [
      { text: "What is a cartographer\'s main job?", options: ["To sail ships across the ocean", "To make maps that record accurate geographic information", "To trade spices and goods between countries", "To study ancient languages and symbols"], correct: 1 },
      { text: "What surprising discovery does Marco make while surveying the island?", options: ["A hidden cave filled with gold coins", "The ruins of an ancient civilization with carved stone buildings", "A new species of tropical bird", "A second ship anchored on the other side of the island"], correct: 1 },
      { text: "Why does Master Dias say \"the sea does not forgive careless mathematics\"?", options: ["Because sailors who make errors in calculation can become dangerously lost", "Because math tests on the ship are graded very strictly", "Because the ocean currents only follow mathematical patterns", "Because the astrolabe breaks if used incorrectly"], correct: 0 },
      { text: "What does Marco conclude about the ancient people\'s choice of where to build their settlement?", options: ["They chose the location by chance", "They built there because it was the only flat land on the island", "They chose it intelligently, near water, shelter, and a harbor", "They were forced to settle there by another civilization"], correct: 2 },
      { text: "What is the main theme of this story?", options: ["Competition between European explorers for new lands", "The importance of documenting and honoring civilizations from the past", "Why mathematics is more important than art", "How to build a ship for long ocean voyages"], correct: 1 }
    ]
  },
  {
    id: "the-comeback-game",
    title: "The Comeback Game",
    description: "A soccer team that has never won a match learns about strategy, teamwork, and perseverance to compete in the championship.",
    level: 4,
    topic: "sports",
    icon: "⚽",
    pages: [
      "The Riverside Rockets had a record that was hard to brag about: zero wins, twelve losses, and three ties across two full seasons of play. Most teams in the Maplewood Youth Soccer League had at least a handful of victories, but the Rockets seemed to find a way to fall short every single time. The players weren\'t bad athletes — twelve-year-old striker Zoe could run faster than almost anyone on the field, and her best friend and goalkeeper Marcus had lightning reflexes. The problem, as their new coach Ms. Chen explained on the first day of practice, was not talent. It was strategy.",
      "\"You\'ve been playing like twelve individuals who happen to be wearing the same jersey,\" Ms. Chen said, her clipboard tucked under her arm. \"Soccer is a game of systems. Every pass, every run, every defensive position — it all has to connect.\" She drew a diagram on her whiteboard showing how players\' movements created spaces for each other on the field. Zoe stared at the diagram, slowly understanding something she had never considered before. She had always tried to win the ball herself and drive toward the goal. She had never thought about creating space for her teammates.",
      "The first week of training under Ms. Chen was exhausting but exciting. She introduced the team to the concept of \"pressing\" — a tactic where all the field players work together to trap the opposing team in their own half by cutting off passing lanes simultaneously. It required every player to move at the same moment, like gears in a machine. When they got it right, the opponent had nowhere to go. When one player was out of position, the whole system collapsed. \"Communication is everything,\" Ms. Chen repeated. \"You have to talk to each other, constantly.\"",
      "Zoe struggled at first. She was used to relying on her speed to solve problems — she would just run harder when things went wrong. But pressing required her to think, not just sprint. She had to read the positions of her teammates before she moved, anticipate where the ball was going rather than just chasing it, and call out instructions to the players beside her. It felt strange and slow at first, like learning to write with her non-dominant hand. It would take perseverance to master. But Ms. Chen was patient, breaking each piece of the tactic down into small, manageable steps that the team could practice one at a time.",
      "Their first game of the new season was against the Elmwood Eagles, last year\'s second-place finishers. The Rockets started nervously, losing possession in the first five minutes. But Ms. Chen called a timeout and reminded them: \"Forget the scoreboard. Focus on the system.\" Zoe took a deep breath and looked at her teammates. She called Marcus\'s name, pointed to the left flank, and started the press. It worked. The Eagles\' defender, caught by two Rockets closing from different angles, panicked and kicked the ball out of bounds. The Rockets celebrated as if they had scored a goal.",
      "By halftime, the game was tied at zero. In the second half, Zoe received a pass on the right side of the penalty area. Instead of shooting immediately, she looked up and spotted her teammate Brianna making a diagonal run through the center. Zoe slid the ball into the space in front of Brianna — not to Brianna\'s feet, but to where Brianna was going to be. Brianna arrived at exactly the right moment, took one touch to control the ball, and slotted it past the goalkeeper. The Rockets scored their first goal of the season. The bench erupted. Zoe\'s instinct had been to shoot, but she had chosen to collaborate instead.",
      "The Rockets won that game 2-1. They did not win every game after that — there were still defeats and frustrating draws. But something had changed inside the team. They were no longer twelve individuals; they were a unit. They argued less and communicated more. They celebrated each other\'s successes and picked each other up after mistakes. Marcus made a save in one game that he would never have attempted before, because he trusted his defenders to recover their positions behind him. That trust, Zoe realized, was the most important thing Ms. Chen had taught them. It was a form of resilience that no individual player could have found alone.",
      "As the season progressed, the Rockets climbed the standings. By the final week of the regular season, they had accumulated enough points to qualify for the championship tournament — the first time the team had ever done so. The news spread quickly through the school. Players who had never watched a Rockets game before started showing up to practice. Zoe felt a mix of pride and pressure. \"What if we lose in the first round?\" Brianna asked quietly before their semifinal. Zoe shrugged. \"Then we learn from it. That\'s what Ms. Chen taught us, right?\"",
      "The championship semifinal was the toughest match the Rockets had ever played. Their opponents, the Northside Navigators, were faster, stronger, and more experienced. The Rockets fell behind 1-0 at halftime. In the locker room, Ms. Chen did not yell or lecture. She simply pointed to the whiteboard, where she had drawn the pressing diagram from their very first training session. \"This is who you are now,\" she said. \"Trust the system. Trust each other.\" The Rockets went back onto the field with quiet determination.",
      "In the final ten minutes, a corner kick from Zoe curled perfectly into the penalty area. Marcus — who had run all the way from his goalkeeper position for the set piece — rose above two defenders and headed the ball into the net. The score was tied. The game went to a penalty shootout, and each conversion — each successfully slotted penalty kick — brought the Rockets one step closer to victory. They converted four of five kicks to win. When the final penalty went in, Zoe stood in the center of the field with her arms wide open, looking at the teammates who had believed in a system, a coach, and each other. They had not become champions because they became more talented. They had become champions because they had learned to play together."
    ],
    vocabulary: [
      { word: "strategy", definition: "A careful plan for achieving a goal, especially one that involves thinking ahead.", example: "Ms. Chen said the team\'s biggest problem was not talent but strategy." },
      { word: "perseverance", definition: "Continuing to work hard and not giving up, even when things are difficult.", example: "The Rockets showed perseverance by practicing the new system even after early defeats." },
      { word: "tactic", definition: "A specific action or method used to carry out part of a larger strategy.", example: "Pressing was a tactic that required all the players to move at exactly the same moment." },
      { word: "collaborate", definition: "To work together with others toward a shared goal.", example: "Zoe chose to collaborate by passing to Brianna instead of taking the shot herself." },
      { word: "anticipate", definition: "To think ahead and predict what is going to happen before it does.", example: "Zoe learned to anticipate where the ball was going rather than just chasing it." },
      { word: "resilience", definition: "The strength to recover quickly from setbacks and keep moving forward.", example: "After every loss, the team showed resilience by returning to practice with renewed focus." },
      { word: "navigate", definition: "To find the best path through a difficult situation.", example: "The Rockets had to navigate the pressure of the championship tournament without losing focus." },
      { word: "conversion", definition: "Successfully completing a scoring opportunity, such as a penalty kick in soccer.", example: "The Rockets converted four of five penalty kicks to win the shootout." }
    ],
    questions: [
      { text: "What does Ms. Chen identify as the Rockets\' main problem at the start of the story?", options: ["The players are not athletic enough", "The team lacks a strategy and plays as individuals rather than a unit", "The goalkeeper makes too many mistakes", "The team does not practice enough hours per week"], correct: 1 },
      { text: "What is \"pressing\" in soccer?", options: ["Kicking the ball as hard as possible toward the goal", "A tactic where all field players move together to trap the opponent in their own half", "A defensive strategy where players stay behind the ball at all times", "A method of passing the ball backward to the goalkeeper"], correct: 1 },
      { text: "How does Zoe score the team\'s first goal of the season?", options: ["She dribbles past three defenders and shoots", "She takes a free kick from outside the penalty area", "She passes to Brianna in the space ahead of her rather than shooting herself", "She scores from a corner kick"], correct: 2 },
      { text: "What does the word \"anticipate\" mean as used in this story?", options: ["To celebrate after scoring a goal", "To sprint as fast as possible toward the ball", "To think ahead and predict what is going to happen", "To argue with the referee about a decision"], correct: 2 },
      { text: "What is the most important lesson the Rockets learn over the course of the season?", options: ["That winning is the only thing that matters in sports", "That individual talent is more valuable than teamwork", "That trust and communication are the foundations of a successful team", "That practicing penalty kicks is the key to winning championships"], correct: 2 }
    ]
  },
  {
    id: "the-cipher-of-rosewood-manor",
    title: "The Cipher of Rosewood Manor",
    description: "A sharp-minded young detective uses logic and cryptography to unravel a century-old mystery hidden within the walls of a crumbling mansion.",
    level: 5,
    topic: "mystery",
    icon: "🔍",
    pages: [
      "The iron gates of Rosewood Manor had not opened in eleven years, and most people in the town of Harwick preferred it that way. The old mansion sat at the end of Elm Crescent like a bad memory — its windows dark, its gardens overgrown, its stone facade stained by decades of rain. When thirteen-year-old Sylvie Chen received a handwritten letter informing her that she had inherited the estate from a great-aunt she had never met, she arrived at the manor with two things: a worn leather notebook and an insatiable curiosity that had already earned her a reputation as the sharpest problem-solver at Harwick Middle School.",
      "The letter from the estate lawyer, Mr. Pemberton, had included a peculiar addendum. Great-Aunt Isolde had died without a will, but she had left behind a single instruction: \"The real inheritance is not the house. It is what the house remembers.\" Mr. Pemberton had no idea what this meant. Neither did Sylvie — at first. But as she moved through the manor\'s dusty rooms on her first morning, she noticed something that the lawyers had apparently overlooked: nearly every room contained a framed piece of embroidery, each one depicting a different scene, and each one signed not with a name but with a sequence of numbers.",
      "Sylvie photographed every embroidery panel and spread the images across the parlor floor. There were twelve panels in total. Each depicted a scene from daily life — a woman reading by a fire, a man carrying a lantern through a fog, children playing beside a river — but the imagery was too precise and too deliberate to be merely decorative. The number sequences beneath each image varied in length from four to nine digits. This, Sylvie recognized immediately, was a cipher — a coded message designed to conceal information within an apparently innocent surface. Someone had hidden something in this house, and these embroideries were the key.",
      "Sylvie had read extensively about cryptography — the science of creating and breaking secret codes — and she knew that the first step in solving any cipher was identifying the encoding system used. She considered several possibilities. The numbers could represent letters by their position in the alphabet, a system called a simple substitution cipher. They could be coordinates pointing to locations in the house. Or they could be page-and-word references to a specific book that served as a codebook. Each hypothesis required testing, and Sylvie approached the problem with the methodical patience of a scientist rather than the impatient urgency of someone looking for treasure.",
      "The breakthrough came on the third day. While searching the manor\'s library, Sylvie found a copy of a nineteenth-century botanical encyclopedia with its spine cracked open to page forty-seven. The margins were filled with penciled annotations in a careful, feminine hand. When Sylvie cross-referenced the page numbers from the embroidery sequences against the encyclopedia, the words at the annotated positions spelled out fragments of coherent sentences. \"In the east wing, behind the portrait of the admiral, the passage remembers everything.\" Sylvie set the book down slowly. The cipher had broken open.",
      "The east wing portrait concealed exactly what the message promised: a hidden door, its edges invisible beneath decades of wallpaper, swinging inward on counterweighted hinges to reveal a narrow stone staircase descending into the manor\'s foundations. At the bottom, Sylvie found a sealed room no larger than a closet, its walls lined floor-to-ceiling with leather-bound journals. Each journal bore a date ranging from 1887 to 1923, and the name on the covers read: \"Isolde Ashford-Chen.\" Great-Aunt Isolde, Sylvie realized with a start, had been keeping these journals since she was a young woman — and Sylvie\'s own family name was there, woven into the manor\'s history all along.",
      "The journals told an extraordinary story. Isolde had been a scientist in an era when women were rarely permitted to work as scientists. She had conducted botanical research at Rosewood Manor for nearly forty years, documenting the medicinal properties of over two hundred plant species found in the surrounding countryside. Her work challenged the prevailing paradigm that serious science was exclusively the domain of men. Her work was meticulous — precise measurements, controlled experiments, detailed observations — but it had never been published because no scientific journal of her time would accept papers authored by women. She had embedded her most significant findings into the embroidered panels, using the cipher as a safeguard against her work being dismissed or stolen.",
      "Sylvie spent two weeks reading the journals and cross-referencing Isolde\'s findings against modern botanical science. The dilemma she faced was profound: Isolde\'s research was genuinely significant. Several of her documented plant compounds appeared in no modern scientific database, and her methods were rigorous enough to be considered credible even by contemporary standards. Publishing the findings could advance botanical medicine. But the journals were also deeply personal — they contained Isolde\'s private thoughts, her grief, her loneliness, and her anger at a world that had refused to see her. Did Sylvie have the right to share them?",
      "After long conversations with her mother, her science teacher, and a university botanist who came to examine the journals, Sylvie made a decision that she believed honored both the scientific and personal dimensions of what she had found. She would work with the university to publish Isolde\'s botanical research as a formal scientific paper — crediting Isolde as sole author — while keeping the personal journals sealed and donating them to a university archive accessible only to family descendants and credentialed historians. The inheritance, Sylvie decided, was not money or property. It was the responsibility to do right by someone whose voice had been silenced.",
      "The paper was published the following spring under the title \"Botanical Observations of the Harwick Countryside, 1887-1923, by Isolde Ashford-Chen.\" Sylvie was listed in the acknowledgments as the researcher who recovered the work. When a journalist asked her how she had cracked the cipher, Sylvie answered honestly: \"I didn\'t crack it by being clever. I cracked it by being patient, and by refusing to assume I already understood what I was looking at.\" She tucked her leather notebook under her arm and walked back through Rosewood Manor\'s newly polished gates, already thinking about what the east wing\'s second staircase — the one the lawyers still hadn\'t found — might contain."
    ],
    vocabulary: [
      { word: "cipher", definition: "A secret code or system for disguising a message so that only someone with the key can read it.", example: "Sylvie recognized the number sequences as a cipher designed to conceal Isolde\'s research." },
      { word: "cryptography", definition: "The science of creating, analyzing, and breaking secret codes and encoded messages.", example: "Sylvie\'s knowledge of cryptography helped her identify the type of code Isolde had used." },
      { word: "dilemma", definition: "A difficult situation in which a person must choose between two options, each of which has significant consequences.", example: "Sylvie faced a dilemma about whether to publish Isolde\'s deeply personal journals." },
      { word: "meticulous", definition: "Showing great attention to detail and care to avoid mistakes.", example: "Isolde\'s research was meticulous, with precise measurements and detailed observations." },
      { word: "hypothesis", definition: "A proposed explanation or educated guess that can be tested through investigation.", example: "Sylvie considered several hypotheses about what encoding system Isolde had used before testing each one." },
      { word: "paradigm", definition: "A typical example or established pattern of thinking that shapes how people understand the world.", example: "Isolde\'s work challenged the paradigm that women could not be serious scientists." },
      { word: "methodical", definition: "Done in a careful, logical, step-by-step way.", example: "Sylvie approached the cipher in a methodical manner, testing each possibility before moving to the next." },
      { word: "credentialed", definition: "Having official qualifications or recognized expertise in a particular field.", example: "The sealed journals would only be accessible to credentialed historians and family descendants." },
      { word: "addendum", definition: "An extra piece of information added to the end of a document.", example: "The estate lawyer\'s letter included a peculiar addendum with Isolde\'s only instruction." }
    ],
    questions: [
      { text: "What first alerts Sylvie that the manor may contain a hidden message?", options: ["A secret door she finds in the library", "Embroidered panels in each room, each signed with a number sequence", "A letter hidden inside the botanical encyclopedia", "Mr. Pemberton\'s warning about a hidden room"], correct: 1 },
      { text: "How does Sylvie ultimately decode the cipher?", options: ["She finds the answer in a book about secret codes at the library", "She uses page and word references in a botanical encyclopedia annotated by Isolde", "She counts the letters in each embroidered scene", "She asks Mr. Pemberton for the combination to the hidden door"], correct: 1 },
      { text: "What dilemma does Sylvie face after reading Isolde\'s journals?", options: ["Whether to sell the manor or keep it in the family", "Whether to share the scientific findings in journals that also contain very private thoughts", "Whether to tell the lawyer about the hidden room or keep it secret", "Whether to give the journals to a museum or destroy them"], correct: 1 },
      { text: "What does the word \"meticulous\" suggest about Isolde\'s scientific work?", options: ["That her experiments were conducted very quickly under pressure", "That she worked carelessly but still produced interesting results", "That she was extremely careful and precise in her methods and documentation", "That she preferred working alone rather than with a team"], correct: 2 },
      { text: "What is the central theme of \"The Cipher of Rosewood Manor\"?", options: ["The importance of keeping secrets safe from untrustworthy people", "How scientific knowledge is less valuable than personal history", "The responsibility to recover, honor, and fairly share knowledge from the past", "Why old houses should always be demolished to protect hidden dangers"], correct: 2 }
    ]
  },
  {
    id: "the-last-glacier",
    title: "The Last Glacier",
    description: "A climate science expedition sends a young researcher to document a dying glacier, where the team must wrestle with how — and whether — to share their alarming findings with the world.",
    level: 5,
    topic: "science",
    icon: "🏔️",
    pages: [
      "The Karakoram glacier known as Mir Yakh — \"the ice mirror\" in the local Wakhi language — had been retreating for forty years. In 1985, it had stretched for twenty-two kilometers down a high mountain valley in northern Pakistan. By the time thirteen-year-old Nadia Osman arrived as the youngest member of the International Youth Climate Fellows expedition, it had shrunk to less than eleven kilometers. Nadia had studied those numbers for months before the trip, but nothing in her data sheets had prepared her for the scale of what she would see: a wall of ancient blue-white ice two hundred meters high, capped with meltwater pools that shimmered like mirrors in the thin mountain air.",
      "The expedition team had been assembled from seven countries. Besides Nadia, who had been selected after winning a national science competition in her home country of Canada, there was Viktor from Norway, who had grown up watching his local fjords change; Amina from Kenya, whose research focused on how glacial melt affected downstream river communities; and Dr. Saito, a Japanese climatologist in her fifties who had been studying Mir Yakh for two decades. Their shared task was to conduct the most comprehensive survey of the glacier ever attempted — measuring its dimensions, sampling its ice cores, and recording its meltwater flow rates — and to publish their findings in a report that would go to the United Nations climate panel.",
      "The science of glaciology — the study of glaciers and ice formations — demanded both physical endurance and intellectual rigor. Every morning before dawn, the team hiked to different measurement stations on the glacier\'s surface and margins, driving survey stakes into the ice and recording GPS coordinates to track how far the edge had moved since the previous year. Nadia was responsible for operating the ice core drill, a device that extracted long cylindrical samples of ice from deep within the glacier. Each core was a time capsule: the bubbles of ancient air trapped inside contained samples of Earth\'s atmosphere from decades or centuries ago, allowing scientists to reconstruct past climate conditions with extraordinary precision.",
      "On the sixth day of the expedition, Dr. Saito called the team together at the base camp with an expression Nadia had not seen on her face before — a mixture of controlled alarm and something that looked almost like grief. The measurements they had collected were significantly worse than the projections in even the most pessimistic scientific models, shattering the existing paradigm about how quickly the glacier could deteriorate. The glacier was retreating not at the expected rate of twelve meters per year, but at nearly thirty-one meters. The meltwater flow had doubled in volume since the previous survey. \"If this rate holds,\" Dr. Saito said quietly, \"Mir Yakh will be gone in eighteen to twenty-two years. Not fifty. Not thirty. Twenty-two.\"",
      "The implications were staggering. The glacier fed eleven rivers that provided drinking water and irrigation to over two million people in three countries. When Mir Yakh disappeared, those water sources would experience catastrophic disruption — first flooding as the meltwater surged, then severe drought as the ice reserve was exhausted. Entire agricultural systems, built over generations, would collapse. Nadia thought about the data she had been collecting for days, the numbers she had fed into spreadsheets without fully processing what they meant in human terms. Now, sitting in the thin mountain air with Dr. Saito\'s words hanging over the camp, the abstraction became viscerally real.",
      "The team\'s first instinct was straightforward: publish the data immediately. Science existed to produce knowledge, and knowledge of this urgency needed to reach policymakers as fast as possible. But Viktor raised a concern that stopped the conversation cold. \"If we publish raw data before it\'s been peer-reviewed and independently verified, and our methodology is criticized — even unfairly — the findings could be dismissed,\" he said. \"Climate skeptics have done it before. They pick apart one number and use it to discredit the whole picture.\" Nadia understood the dilemma viscerally. Speed could save time. Caution could save credibility. Both mattered.",
      "Amina offered a perspective that shifted the discussion. She had spent a day speaking with Gulnara, a Wakhi farmer whose family had irrigated the same terraced fields for six generations using meltwater from Mir Yakh. \"Gulnara already knows the glacier is shrinking,\" Amina told the team. \"She has watched it her whole life. The people downstream are not waiting for a scientific paper to tell them something is wrong. They need resources and planning support, not just data.\" This, Nadia realized, was the other dimension of the dilemma: the difference between communicating with scientists and communicating with communities whose lives were already being disrupted.",
      "After two days of debate, the team reached a consensus built on a principle Dr. Saito articulated clearly: \"Our responsibility is not just to the scientific record. It is to the people the science is about.\" They would pursue two parallel tracks. The formal scientific paper would go through the standard peer-review process to establish credibility before submission to the UN panel — a process estimated to take four to six months. Simultaneously, a plain-language summary of their findings, translated into three regional languages, would be shared immediately with local government agencies and community leaders in the affected areas, along with a direct contact for follow-up.",
      "During the last two days of the expedition, Nadia returned to the glacier alone each morning just before sunrise. She photographed Mir Yakh\'s surface in every light and shadow, recording its blue-white crevasses, its melt pools, its ancient stratigraphy — the visible layers of compressed snow marking each passing year like rings in a tree. She was, she understood, creating a visual record of something the next generation might only be able to read about. There was something elegiac about it, but also, she decided, something urgent and meaningful. To bear witness to a thing passing from the world was a form of honoring it.",
      "The expedition\'s scientific paper was published eight months later and sparked significant discussion in international climate policy circles. Three of the river communities downstream of Mir Yakh received early-planning grants from regional governments to begin developing alternative water infrastructure before the crisis arrived. Nadia was asked to speak at a youth climate conference in Geneva, where she told the audience something that surprised them: \"The hardest part of the expedition was not the science. It was deciding how to be responsible with what the science told us — responsible to the truth, responsible to the process, and responsible to the people living inside the data.\" She paused, and added: \"All three at the same time.\"",
      "The last photograph Nadia had taken of Mir Yakh sat framed on her desk at home — the ice wall catching the first light of dawn, its blue depths luminous against the dark rock of the valley walls. She had titled it simply: \"The Last Glacier, Day 12, 6:14 AM.\" It was not the last glacier on Earth, of course. But it was the one she had promised to remember, and in doing so, to keep fighting for all the others that remained."
    ],
    vocabulary: [
      { word: "glaciology", definition: "The scientific study of glaciers, ice sheets, and their effects on the landscape and climate.", example: "The science of glaciology required both physical endurance and intellectual rigor from the expedition team." },
      { word: "stratigraphy", definition: "The study of layers of material — in geology or glaciology — to understand history over time.", example: "Nadia photographed the glacier\'s stratigraphy, which revealed each year of snowfall like rings in a tree." },
      { word: "peer-review", definition: "The process of having scientific work checked and evaluated by other experts in the same field before it is published.", example: "The team decided their findings needed to go through peer-review before submission to the UN panel." },
      { word: "visceral", definition: "Felt deeply and instinctively, in a way that is hard to ignore or explain away.", example: "When she understood the human consequences of the data, the impact became viscerally real to Nadia." },
      { word: "paradigm", definition: "A widely accepted framework or model that shapes how people understand a subject.", example: "The expedition\'s findings challenged the paradigm that glacial retreat would remain slow and predictable." },
      { word: "elegiac", definition: "Having a tone of gentle sadness about something that is passing or being lost.", example: "Nadia\'s morning photographs of the glacier had an elegiac quality, like a farewell to something disappearing." },
      { word: "consensus", definition: "A general agreement reached by a group after discussion and consideration of different viewpoints.", example: "After two days of debate, the team reached a consensus on how to share their findings." },
      { word: "implications", definition: "The likely consequences or effects that follow from a fact, action, or decision.", example: "The implications of the accelerated melt rate were staggering for the millions of people downstream." },
      { word: "credibility", definition: "The quality of being trusted and believed because of accuracy, honesty, and sound methods.", example: "Viktor warned that publishing unverified data could damage the findings\' credibility with skeptics." }
    ],
    questions: [
      { text: "Why does the team hesitate to publish their findings immediately, even though the data is alarming?", options: ["They are afraid of being arrested for trespassing on the glacier", "Publishing unverified data could allow critics to dismiss the findings and undermine their credibility", "Dr. Saito does not believe the measurements are accurate enough to share", "The UN climate panel has already rejected their application"], correct: 1 },
      { text: "What important perspective does Amina contribute to the team\'s debate about sharing findings?", options: ["That the scientific paper should be published in as many languages as possible", "That the local communities already know about the change and need resources, not just data", "That the glacier is less important than other climate issues in Africa", "That the expedition should stay longer to collect more measurements"], correct: 1 },
      { text: "What does the ice core drilling reveal about the glacier?", options: ["The glacier contains valuable minerals that could be mined", "Ancient air bubbles in the ice allow scientists to reconstruct past climate conditions", "The glacier is much younger than scientists previously believed", "The ice is so polluted that the meltwater is unsafe to drink"], correct: 1 },
      { text: "What does the word \"elegiac\" suggest about the tone of Nadia\'s morning photographs?", options: ["That they are technically impressive and scientifically precise", "That they are angry and confrontational about climate inaction", "That they carry a gentle sadness about something being lost", "That they are optimistic about the glacier\'s chances of recovery"], correct: 2 },
      { text: "According to Dr. Saito, what is the team\'s full responsibility?", options: ["Only to the scientific record and the peer-review process", "To publish as quickly as possible regardless of methodology concerns", "To the scientific record and to the people the science directly affects", "To the governments funding the expedition, not to communities downstream"], correct: 2 }
    ]
  },
  {
    id: "the-underground-railroad-of-stories",
    title: "The Underground Railroad of Stories",
    description: "When books are banned in a fictional future city, a group of kids memorize and secretly share forbidden stories to keep knowledge and imagination alive.",
    level: 5,
    topic: "adventure",
    icon: "📖",
    pages: [
      "In the city of Verantum, the burning had begun on a Tuesday. The Bureau of Clarity — the government agency responsible for \"managing public information\" — had announced the new policy in calm, official language: books containing \"unverified narratives, speculative ideas, or unauthorized emotional content\" would be collected and destroyed. The policy had seemed like an abstraction at first, a headline that people read and then turned the page from. But Fourteen-year-old Orla Voss understood it was not abstract at all when she arrived at the public library on Thursday morning to find its windows dark and a white notice pasted to the locked door: CLOSED BY ORDER OF THE BUREAU.",
      "Orla had grown up in that library. She had read her first novel there at age six, curled into a beanbag chair in the children\'s section with a flashlight even though the lights were perfectly good. The library had been her laboratory, her sanctuary, her proof that the world was larger than the small apartment where she lived with her grandmother. Standing on the steps with her breath fogging in the cold morning air, Orla felt something shift inside her — a transition from sadness to something harder and more purposeful. If the books were gone, she thought, the stories could not be gone. Stories lived in people\'s minds, not on shelves.",
      "She brought the idea to the others that evening: her best friend Dayo, who had a photographic memory and could recite entire chapters he had read only once; quiet, analytical Reyna, whose father had been a literature professor before the Bureau reassigned him to data processing; and Marcus, who lived above his family\'s print shop and had managed to conceal a cache of forty-seven books beneath the floorboards before the collectors arrived. They met in the print shop\'s basement, the concealed books stacked around them like a paper fortress, and Orla laid out the idea with careful deliberateness: they would become the books. They would memorize stories and pass them from person to person in secret, building what she called the Underground Railroad of Stories.",
      "The logistics were more complex than Orla had initially envisioned. Memorizing a full novel was not simply a matter of reading it repeatedly — it required active encoding, the kind of deep processing that transformed words on a page into a living structure in the mind. Dayo taught the group techniques drawn from the ancient art of memory: the method of loci, in which a memorizer mentally walks through a familiar place and attaches each section of a story to a specific location, making it retrievable in sequence. Orla imagined her grandmother\'s apartment, room by room, and placed each chapter of the novel she was memorizing — a nineteenth-century story about a girl who builds a ship — into a different corner and shelf.",
      "The work of sharing was equally intricate. They could not meet openly. They developed a system of signals and hand-offs: a folded piece of paper left inside a library book at the secondhand bookshop — which still operated because it sold only pre-approved texts — told a recipient when and where to meet. The storyteller would recite passages while the listener wrote them down in a private shorthand, then memorized them before destroying the written copy. It was slow, inefficient, and occasionally wrong — memories distorted details, substituted words, smoothed over rough passages. Orla came to see this not as a flaw but as an intrinsic characteristic of living knowledge — distortion was not a bug but a feature of the human mind making meaning. Every telling was also an interpretation.",
      "The Bureau was not unaware that resistance existed, and they were not lenient. A classmate named Theo had been reported to the Bureau by a neighbor for keeping a poetry collection under his mattress. He was not arrested — the Bureau preferred administrative consequences to dramatic ones — but he lost his scholarship to the advanced science program, and his family was audited for six months. Orla felt the weight of this when she thought about what she was asking of her friends. The word for what they were doing was not, in the Bureau\'s vocabulary, \"heroic.\" The Bureau called it \"information hoarding\" and \"civic disruption.\" Orla called it something that had no single word: the obligation to refuse the erasure of thought.",
      "What sustained them, beyond the ingenuity of their methods and the genuine pleasure of the stories themselves, was the symbiosis that developed between the memorizers. They did not simply exchange stories; they exchanged interpretations, arguments, emotional responses, and questions. When Reyna recited her memorized sections of a history of the Industrial Revolution, Marcus challenged her on whether the author had been fair to the factory workers or too focused on the inventors. Their debate — conducted in fierce whispers in the print shop basement — was more alive than any classroom discussion Orla could remember. The stories were not containers for facts. They were invitations to think.",
      "The network grew slowly. By midwinter, there were eleven memorizers, organized in a cell structure so that no single person knew the identity of more than three others. It had required perseverance — cold nights, cautious silences, and the constant low hum of fear. They had collectively preserved sixteen texts — novels, poems, scientific histories, a collection of folk tales from six different cultures. They had also developed a clandestine lending system: a memorizer would recite their text to a new person over the course of several sessions, essentially reprinting a book inside another person\'s mind. Orla kept a coded ledger of what had been preserved and who held each piece, stored in a notation system she had invented that resembled musical notation enough to pass casual inspection.",
      "The crisis came in late February, when the Bureau conducted an inspection of the print shop after receiving an anonymous report. Marcus\'s family was questioned for three hours, but the floorboard cache was not discovered — Marcus had moved the books three weeks earlier to a new location after Reyna\'s systematic analysis of Bureau inspection patterns had predicted the visit within a margin of two weeks. Afterward, sitting in the cold print shop long after the Bureau officers had left, Orla looked at her friends\' faces — tired, shaken, but not broken — and felt a clarity she could only describe as the sensation of knowing exactly who she was and what she was for.",
      "Spring came, and with it, unexpected news: the Bureau of Clarity had been suspended pending a national legislative review. The policy had been challenged in court by a coalition of educators, scientists, and journalists, and a judge had ruled that the book collection program violated constitutional protections for intellectual freedom. The libraries would reopen. The books that had been collected — most of them, at least — had been stored in a government warehouse rather than destroyed, their physical survival a bureaucratic accident the Bureau had apparently not bothered to correct. Orla stood again on the library steps, this time watching a crew of workers remove the white notice from the door.",
      "She did not feel that the network\'s work had been unnecessary simply because the crisis had resolved. Eleven people could now recite a novel from memory. Sixteen texts lived in living minds as well as on shelves. The group had learned something that no library could have taught them directly: that stories needed not just to be stored but to be inhabited — held inside people who argued with them, questioned them, and passed them on with their own voices. Orla tucked her coded ledger into her bag and walked inside. The library smelled of paper and old wood and something that had no name but felt, she thought, exactly like the beginning of a thought that had not yet been thought."
    ],
    vocabulary: [
      { word: "ingenuity", definition: "Clever creativity in solving problems or finding new ways to do difficult things.", example: "The ingenuity of the group\'s signal system allowed them to meet safely without being detected." },
      { word: "symbiosis", definition: "A relationship in which two or more parties benefit from and support each other.", example: "A symbiosis developed between the memorizers as they exchanged not just stories but arguments and interpretations." },
      { word: "clandestine", definition: "Done in secret, especially because it is against the rules or could be dangerous.", example: "The group operated a clandestine lending system to share memorized texts without detection." },
      { word: "perseverance", definition: "Steady determination to continue doing something difficult over a long period of time.", example: "Their perseverance through the cold winter months allowed the network to grow to eleven memorizers." },
      { word: "abstraction", definition: "An idea that exists in theory or in the mind but feels distant from real, concrete experience.", example: "The new policy had seemed like an abstraction until Orla found the library door locked." },
      { word: "intrinsic", definition: "Belonging to something as an essential or permanent quality, not added from outside.", example: "Orla believed that the distortion of memorized stories was an intrinsic feature of living knowledge." },
      { word: "coalition", definition: "A group of different people or organizations that come together to work toward a shared goal.", example: "A coalition of educators, scientists, and journalists challenged the Bureau in court." },
      { word: "deliberateness", definition: "The quality of acting or speaking carefully and with full intention, not by accident.", example: "Orla laid out her idea with careful deliberateness, making sure everyone understood the risks." },
      { word: "lenient", definition: "More willing to allow mistakes or rule-breaking than strict standards would require; not harsh.", example: "The Bureau was not lenient — those caught keeping books faced real consequences." }
    ],
    questions: [
      { text: "What is the main purpose of the Underground Railroad of Stories?", options: ["To secretly sell rare books for profit", "To preserve knowledge and stories by memorizing them and passing them from person to person", "To overthrow the Bureau of Clarity using physical protest", "To create new stories to replace the ones that were destroyed"], correct: 1 },
      { text: "What is the \"method of loci\" that Dayo teaches the group?", options: ["A shorthand system for writing stories on very small pieces of paper", "A memorization technique that attaches information to specific locations in an imagined place", "A code language based on musical notation invented by Orla", "A method for testing whether a memorized passage is accurate"], correct: 1 },
      { text: "How does Orla come to view the distortions and changes that occur as stories are memorized and retold?", options: ["As a serious problem that damages the credibility of the preserved texts", "As proof that the Bureau\'s policy was correct about \"unauthorized emotional content\"", "As an inherent characteristic of living knowledge — every telling is also an interpretation", "As evidence that the method of loci technique does not work reliably"], correct: 2 },
      { text: "What does the word \"clandestine\" suggest about the group\'s activities?", options: ["That their work is done openly and proudly in public", "That they are operating secretly because of the risk of discovery", "That they have official permission from the government for their activities", "That their methods are very slow and inefficient"], correct: 1 },
      { text: "What does Orla conclude at the end of the story, even though the libraries have reopened?", options: ["That the group\'s work was unnecessary because the crisis resolved on its own", "That the Bureau will eventually return and destroy the books again", "That stories need to be inhabited by people who argue with and question them, not just stored on shelves", "That the most important step is to find and punish whoever reported the group to the Bureau"], correct: 2 }
    ]
  }

];

// Badge definitions
const BADGES = [
  { id: "first-story", name: "First Story", description: "Complete your first story", icon: "⭐", requirement: { type: "stories_completed", count: 1 } },
  { id: "bookworm", name: "Bookworm", description: "Complete 3 stories", icon: "📖", requirement: { type: "stories_completed", count: 3 } },
  { id: "story-master", name: "Story Master", description: "Complete all stories", icon: "👑", requirement: { type: "stories_completed", count: 14 } },
  { id: "quiz-star", name: "Quiz Star", description: "Get a perfect score on any quiz", icon: "🌟", requirement: { type: "perfect_quiz", count: 1 } },
  { id: "vocab-explorer", name: "Vocab Explorer", description: "Learn 10 vocabulary words", icon: "🔤", requirement: { type: "words_learned", count: 10 } },
  { id: "vocab-master", name: "Word Wizard", description: "Learn 25 vocabulary words", icon: "🧙", requirement: { type: "words_learned", count: 25 } },
  { id: "streak-3", name: "Reading Streak", description: "Read 3 days in a row", icon: "🔥", requirement: { type: "streak", count: 3 } },
  { id: "streak-5", name: "Super Streak", description: "Read 5 days in a row", icon: "💫", requirement: { type: "streak", count: 5 } },
  { id: "level-2", name: "Level Up!", description: "Reach Level 2 stories", icon: "🚀", requirement: { type: "level_reached", count: 2 } },
  { id: "level-3", name: "Advanced Reader", description: "Reach Level 3 stories", icon: "🏆", requirement: { type: "level_reached", count: 3 } },
  { id: "level-4", name: "Expert Reader", description: "Reach Level 4 stories", icon: "🧠", requirement: { type: "level_reached", count: 4 } },
  { id: "level-5", name: "Master Scholar", description: "Reach Level 5 stories", icon: "🎓", requirement: { type: "level_reached", count: 5 } },
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
    { id: "bow", name: "Hair Bow", cost: 25, emoji: "🎀" },
    { id: "pirate", name: "Pirate Hat", cost: 90, emoji: "🏴‍☠️" },
    { id: "top-hat", name: "Top Hat", cost: 100, emoji: "🎩" },
    { id: "helmet", name: "Knight Helmet", cost: 120, emoji: "⚔️" },
    { id: "alien", name: "Alien Antenna", cost: 150, emoji: "👽" }
  ],
  backgrounds: [
    { id: "default", name: "Meadow", cost: 0, color: "#a8d8a8" },
    { id: "sunset", name: "Sunset", cost: 30, color: "#f4a261" },
    { id: "ocean", name: "Ocean", cost: 40, color: "#6db6d6" },
    { id: "space", name: "Space", cost: 60, color: "#2d1b69" },
    { id: "rainbow", name: "Rainbow", cost: 80, color: "linear-gradient(135deg, #ff9a9e, #fad0c4, #a8edea, #d4fc79)" },
    { id: "stars", name: "Starry Night", cost: 50, color: "#1a1a2e" },
    { id: "lava", name: "Lava", cost: 90, color: "linear-gradient(135deg, #ff4e00, #ec9f05)" },
    { id: "aurora", name: "Aurora", cost: 110, color: "linear-gradient(135deg, #0f2027, #203a43, #2c5364, #00c6ff)" },
    { id: "candy", name: "Candy Land", cost: 100, color: "linear-gradient(135deg, #ff6fd8, #f9a8d4, #93c5fd, #a78bfa)" },
    { id: "galaxy", name: "Galaxy", cost: 140, color: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)" },
    { id: "fire", name: "Fire", cost: 130, color: "linear-gradient(135deg, #f12711, #f5af19)" }
  ],
  companions: [
    { id: "none", name: "No Companion", cost: 0, emoji: "" },
    { id: "cat", name: "Cat", cost: 60, emoji: "🐱" },
    { id: "dog", name: "Puppy", cost: 60, emoji: "🐶" },
    { id: "owl", name: "Owl", cost: 70, emoji: "🦉" },
    { id: "bunny", name: "Bunny", cost: 50, emoji: "🐰" },
    { id: "dragon", name: "Baby Dragon", cost: 100, emoji: "🐲" },
    { id: "fox", name: "Fox", cost: 80, emoji: "🦊" },
    { id: "penguin", name: "Penguin", cost: 85, emoji: "🐧" },
    { id: "unicorn-comp", name: "Unicorn", cost: 120, emoji: "🦄" },
    { id: "phoenix", name: "Phoenix", cost: 150, emoji: "🔥" },
    { id: "robot", name: "Robot", cost: 130, emoji: "🤖" }
  ]
};

// Virtual Pet definitions
const PET_TYPES = [
  { id: "cat", name: "Kitty", emoji: "🐱", babyEmoji: "🐱", teenEmoji: "😺", adultEmoji: "😸", legendaryEmoji: "😻", cost: 0 },
  { id: "dog", name: "Puppy", emoji: "🐶", babyEmoji: "🐶", teenEmoji: "🐕", adultEmoji: "🦮", legendaryEmoji: "🐺", cost: 0 },
  { id: "bunny", name: "Bunny", emoji: "🐰", babyEmoji: "🐰", teenEmoji: "🐇", adultEmoji: "🐰", legendaryEmoji: "🐇", cost: 50 },
  { id: "owl", name: "Owlet", emoji: "🦉", babyEmoji: "🐣", teenEmoji: "🦉", adultEmoji: "🦅", legendaryEmoji: "🕊️", cost: 75 },
  { id: "dragon", name: "Dragon", emoji: "🐲", babyEmoji: "🥚", teenEmoji: "🦎", adultEmoji: "🐉", legendaryEmoji: "🐲", cost: 120 },
  { id: "unicorn", name: "Unicorn", emoji: "🦄", babyEmoji: "🐴", teenEmoji: "🦄", adultEmoji: "🦄", legendaryEmoji: "🦄", cost: 150 }
];

const PET_SKINS = {
  cat: [
    { id: "default", label: "Orange Tabby", baby: "\ud83d\udc31", teen: "\ud83d\ude3a", adult: "\ud83d\ude38", legendary: "\ud83d\ude3b" },
    { id: "black", label: "Black Cat", baby: "\ud83d\udc08\u200d\u2b1b", teen: "\ud83d\udc08\u200d\u2b1b", adult: "\ud83d\udc08", legendary: "\ud83d\ude3c" },
    { id: "tiger", label: "Tiger Cub", baby: "\ud83d\udc2f", teen: "\ud83d\udc2f", adult: "\ud83d\udc05", legendary: "\ud83d\udc05" },
    { id: "lion", label: "Lion Cub", baby: "\ud83e\udd81", teen: "\ud83e\udd81", adult: "\ud83e\udd81", legendary: "\ud83e\udd81" },
    { id: "leopard", label: "Leopard", baby: "\ud83d\udc06", teen: "\ud83d\udc06", adult: "\ud83d\udc06", legendary: "\ud83d\udc06" }
  ],
  dog: [
    { id: "default", label: "Golden Pup", baby: "\ud83d\udc36", teen: "\ud83d\udc15", adult: "\ud83e\uddae", legendary: "\ud83d\udc3a" },
    { id: "poodle", label: "Poodle", baby: "\ud83d\udc29", teen: "\ud83d\udc29", adult: "\ud83d\udc29", legendary: "\ud83d\udc29" },
    { id: "fox", label: "Fox", baby: "\ud83e\udd8a", teen: "\ud83e\udd8a", adult: "\ud83e\udd8a", legendary: "\ud83e\udd8a" },
    { id: "wolf", label: "Wolf", baby: "\ud83d\udc3a", teen: "\ud83d\udc3a", adult: "\ud83d\udc15", legendary: "\ud83d\udc3a" }
  ],
  bunny: [
    { id: "default", label: "White Bunny", baby: "\ud83d\udc30", teen: "\ud83d\udc07", adult: "\ud83d\udc30", legendary: "\ud83d\udc07" },
    { id: "hamster", label: "Hamster", baby: "\ud83d\udc39", teen: "\ud83d\udc39", adult: "\ud83d\udc39", legendary: "\ud83d\udc39" },
    { id: "mouse", label: "Mouse", baby: "\ud83d\udc2d", teen: "\ud83d\udc01", adult: "\ud83d\udc01", legendary: "\ud83d\udc2d" }
  ],
  owl: [
    { id: "default", label: "Barn Owl", baby: "\ud83d\udc23", teen: "\ud83e\udd89", adult: "\ud83e\udd85", legendary: "\ud83d\udd4a\ufe0f" },
    { id: "parrot", label: "Parrot", baby: "\ud83e\udd9c", teen: "\ud83e\udd9c", adult: "\ud83e\udd9c", legendary: "\ud83e\udd9c" },
    { id: "penguin", label: "Penguin", baby: "\ud83d\udc27", teen: "\ud83d\udc27", adult: "\ud83d\udc27", legendary: "\ud83d\udc27" },
    { id: "flamingo", label: "Flamingo", baby: "\ud83e\udda9", teen: "\ud83e\udda9", adult: "\ud83e\udda9", legendary: "\ud83e\udda9" }
  ],
  dragon: [
    { id: "default", label: "Fire Dragon", baby: "\ud83e\udd5a", teen: "\ud83e\udd8e", adult: "\ud83d\udc09", legendary: "\ud83d\udc32" },
    { id: "dino", label: "Dinosaur", baby: "\ud83e\udd95", teen: "\ud83e\udd95", adult: "\ud83e\udd96", legendary: "\ud83e\udd96" },
    { id: "snake", label: "Serpent", baby: "\ud83d\udc0d", teen: "\ud83d\udc0d", adult: "\ud83d\udc32", legendary: "\ud83d\udc09" }
  ],
  unicorn: [
    { id: "default", label: "Classic Unicorn", baby: "\ud83d\udc34", teen: "\ud83e\udd84", adult: "\ud83e\udd84", legendary: "\ud83e\udd84" },
    { id: "deer", label: "Deer", baby: "\ud83e\udd8c", teen: "\ud83e\udd8c", adult: "\ud83e\udd8c", legendary: "\ud83e\udd8c" }
  ]
};

const PET_STAGES = [
  { stage: "baby", label: "Baby", xpNeeded: 0, feedingsNeeded: 0 },
  { stage: "teen", label: "Growing", xpNeeded: 100, feedingsNeeded: 5 },
  { stage: "adult", label: "Grown Up", xpNeeded: 300, feedingsNeeded: 15 },
  { stage: "master", label: "Legendary", xpNeeded: 800, feedingsNeeded: 40 }
];

const PET_FOODS = [
  { id: "apple", name: "Apple", emoji: "🍎", happiness: 5, cost: 0 },
  { id: "cookie", name: "Cookie", emoji: "🍪", happiness: 10, cost: 15 },
  { id: "cake", name: "Cake", emoji: "🎂", happiness: 20, cost: 30 },
  { id: "star-treat", name: "Star Treat", emoji: "⭐", happiness: 35, cost: 50 },
  { id: "golden-apple", name: "Golden Apple", emoji: "🍏", happiness: 50, cost: 75 },
  { id: "rainbow-cake", name: "Rainbow Cake", emoji: "🌈", happiness: 70, cost: 100 }
];

const PET_ACCESSORIES = [
  { id: "none", name: "None", emoji: "", cost: 0 },
  { id: "bow", name: "Bow Tie", emoji: "🎀", cost: 20 },
  { id: "scarf", name: "Scarf", emoji: "🧣", cost: 25 },
  { id: "glasses", name: "Glasses", emoji: "👓", cost: 30 },
  { id: "cape", name: "Cape", emoji: "🦸", cost: 50 },
  { id: "tiara", name: "Tiara", emoji: "👸", cost: 60 },
  { id: "magic-wand", name: "Magic Wand", emoji: "✨", cost: 80 },
  { id: "crown", name: "Crown", emoji: "👑", cost: 90 },
  { id: "headphones", name: "Headphones", emoji: "🎧", cost: 70 },
  { id: "shield", name: "Shield", emoji: "🛡️", cost: 100 },
  { id: "wings", name: "Wings", emoji: "🪽", cost: 120 },
  { id: "sword", name: "Sword", emoji: "⚔️", cost: 110 },
  { id: "trophy", name: "Trophy", emoji: "🏆", cost: 150 }
];

// Level thresholds
const LEVELS = [
  { level: 1, name: "Beginner Reader", xpRequired: 0 },
  { level: 2, name: "Story Explorer", xpRequired: 200 },
  { level: 3, name: "Book Adventurer", xpRequired: 500 },
  { level: 4, name: "Reading Champion", xpRequired: 1000 },
  { level: 5, name: "Story Master", xpRequired: 1800 },
  { level: 6, name: "Legend of the Library", xpRequired: 3000 },
  { level: 7, name: "Wisdom Wizard", xpRequired: 4500 },
  { level: 8, name: "Knowledge Knight", xpRequired: 6500 },
  { level: 9, name: "Galaxy Brain", xpRequired: 9000 },
  { level: 10, name: "Legendary Scholar", xpRequired: 12000 }
];
