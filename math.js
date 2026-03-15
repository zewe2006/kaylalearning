/* Story Quest — Math Galaxy Data
   Lesson + Game structure, 3 levels (Beginner/Intermediate/Advanced)
   Topics: Addition & Subtraction, Multiplication & Division, Fractions & Decimals
   Space / Rocket theme for ages 7-11 */

// ======== LESSON TOPICS (teaching content) ========
const MATH_LESSONS = {
  beginner: [
    {
      id: "add-sub-basics",
      title: "Addition & Subtraction Basics",
      icon: "\u{1F680}",
      description: "Learn to add and subtract numbers up to 100",
      concepts: [
        {
          title: "Adding Numbers",
          explanation: "When we add, we put groups together to find the total. If you have 3 apples and get 5 more, you have 3 + 5 = 8 apples!",
          visual: "3 + 5 = ?",
          answer: 8,
          tip: "Count on from the bigger number: start at 5, then count 6, 7, 8!"
        },
        {
          title: "Subtracting Numbers",
          explanation: "When we subtract, we take away from a group. If you have 10 cookies and eat 4, you have 10 - 4 = 6 cookies left!",
          visual: "10 - 4 = ?",
          answer: 6,
          tip: "Count back from 10: go 9, 8, 7, 6!"
        },
        {
          title: "Adding with Carrying",
          explanation: "Sometimes when we add, we get more than 9 in one column. We 'carry' the extra to the next column. 27 + 15: 7+5=12, write 2 carry 1, then 2+1+1=4. Answer: 42!",
          visual: "27 + 15 = ?",
          answer: 42,
          tip: "Line up the numbers and add each column from right to left."
        },
        {
          title: "Subtracting with Borrowing",
          explanation: "When a top digit is smaller than the bottom digit, we 'borrow' from the next column. 43 - 17: Can't do 3-7, so borrow: 13-7=6, 3-1=2. Answer: 26!",
          visual: "43 - 17 = ?",
          answer: 26,
          tip: "If the top number is smaller, borrow 10 from the column to the left."
        }
      ]
    },
    {
      id: "multiply-intro",
      title: "Introduction to Multiplication",
      icon: "\u{2B50}",
      description: "Discover how multiplication is repeated addition",
      concepts: [
        {
          title: "What is Multiplication?",
          explanation: "Multiplication is a fast way to add the same number over and over. 3 x 4 means 'three groups of four': 4 + 4 + 4 = 12!",
          visual: "3 x 4 = ?",
          answer: 12,
          tip: "Think of it as groups! 3 groups of 4 things."
        },
        {
          title: "Times Tables: 2s",
          explanation: "The 2 times table is like counting by 2s: 2, 4, 6, 8, 10, 12... When you multiply any number by 2, you double it!",
          visual: "6 x 2 = ?",
          answer: 12,
          tip: "Doubling! 6 + 6 = 12."
        },
        {
          title: "Times Tables: 5s",
          explanation: "The 5 times table always ends in 0 or 5: 5, 10, 15, 20, 25... Look at a clock face for help!",
          visual: "7 x 5 = ?",
          answer: 35,
          tip: "Count by 5s seven times: 5, 10, 15, 20, 25, 30, 35!"
        },
        {
          title: "Times Tables: 10s",
          explanation: "Multiplying by 10 is the easiest! Just add a zero to the end of any number: 8 x 10 = 80!",
          visual: "8 x 10 = ?",
          answer: 80,
          tip: "Just add a zero! 8 becomes 80."
        }
      ]
    }
  ],
  intermediate: [
    {
      id: "multiply-divide",
      title: "Multiplication & Division",
      icon: "\u{1F31F}",
      description: "Master times tables and learn division",
      concepts: [
        {
          title: "Times Tables: 3s and 4s",
          explanation: "For 3s, add 3 each time: 3, 6, 9, 12, 15... For 4s, double the 2s table! 4 x 7: think 2 x 7 = 14, then double it: 28!",
          visual: "4 x 7 = ?",
          answer: 28,
          tip: "Double the 2s! 2 x 7 = 14, so 4 x 7 = 28."
        },
        {
          title: "Times Tables: 6s, 7s, 8s",
          explanation: "These are the trickiest! 6 x 7 = 42, 7 x 8 = 56, 6 x 8 = 48. A trick: 56 = 7 x 8 (5, 6, 7, 8 in order!)",
          visual: "7 x 8 = ?",
          answer: 56,
          tip: "Remember: 5-6-7-8! So 7 x 8 = 56."
        },
        {
          title: "What is Division?",
          explanation: "Division is sharing equally. 20 / 4 means 'share 20 things among 4 groups.' Each group gets 5! Division is the opposite of multiplication.",
          visual: "20 / 4 = ?",
          answer: 5,
          tip: "Ask: what times 4 equals 20? 5 x 4 = 20!"
        },
        {
          title: "Division with Remainders",
          explanation: "Sometimes things don't share evenly. 17 / 5 = 3 remainder 2, because 5 x 3 = 15, and 17 - 15 = 2 left over.",
          visual: "17 / 5 = ?",
          answer: "3 R2",
          tip: "Find the biggest multiple of 5 that fits in 17. That's 15 (5x3). Leftover: 17-15=2."
        }
      ]
    },
    {
      id: "fractions-intro",
      title: "Introduction to Fractions",
      icon: "\u{1FA90}",
      description: "Learn what fractions are and how to compare them",
      concepts: [
        {
          title: "What is a Fraction?",
          explanation: "A fraction shows part of a whole. In 1/4, the bottom number (4) tells how many equal parts, and the top number (1) tells how many parts we have. 1/4 of a pizza means 1 slice out of 4!",
          visual: "1/4 of 8 = ?",
          answer: 2,
          tip: "Divide 8 into 4 equal groups. Each group has 2!"
        },
        {
          title: "Comparing Fractions",
          explanation: "When fractions have the same bottom number (denominator), the bigger top number is bigger: 3/5 > 2/5. When they have the same top, the smaller bottom is bigger: 1/3 > 1/4!",
          visual: "Which is bigger: 3/8 or 5/8?",
          answer: "5/8",
          tip: "Same denominator? Just compare the numerators: 5 > 3!"
        },
        {
          title: "Equivalent Fractions",
          explanation: "Some fractions look different but are the same amount! 1/2 = 2/4 = 3/6. Multiply or divide both top and bottom by the same number.",
          visual: "1/2 = ?/6",
          answer: 3,
          tip: "Bottom went from 2 to 6 (x3), so top goes from 1 to 3 (x3)!"
        },
        {
          title: "Adding Simple Fractions",
          explanation: "When fractions have the same bottom number, just add the tops! 2/7 + 3/7 = 5/7. The bottom stays the same because the size of the pieces doesn't change.",
          visual: "2/7 + 3/7 = ?",
          answer: "5/7",
          tip: "Same denominator? Just add the numerators: 2 + 3 = 5. Keep the 7."
        }
      ]
    }
  ],
  advanced: [
    {
      id: "long-division",
      title: "Long Division & Word Problems",
      icon: "\u{1F6F8}",
      description: "Master long division and multi-step problems",
      concepts: [
        {
          title: "Long Division Steps",
          explanation: "Long division has 4 steps: Divide, Multiply, Subtract, Bring down. For 156 / 12: 12 goes into 15 once (12), subtract to get 3, bring down 6 to get 36. 12 goes into 36 three times. Answer: 13!",
          visual: "156 / 12 = ?",
          answer: 13,
          tip: "Remember: Divide, Multiply, Subtract, Bring down. Repeat!"
        },
        {
          title: "Multi-step Word Problems",
          explanation: "Some problems need more than one step. 'A store has 5 boxes with 12 pencils each. They sell 23 pencils. How many are left?' Step 1: 5 x 12 = 60. Step 2: 60 - 23 = 37.",
          visual: "5 x 12 - 23 = ?",
          answer: 37,
          tip: "Break it into smaller steps. Solve one part at a time!"
        },
        {
          title: "Order of Operations",
          explanation: "When a problem has different operations, follow PEMDAS: Parentheses first, then Multiplication/Division (left to right), then Addition/Subtraction (left to right). 3 + 4 x 2 = 3 + 8 = 11, NOT 14!",
          visual: "3 + 4 x 2 = ?",
          answer: 11,
          tip: "Multiply/divide before you add/subtract!"
        },
        {
          title: "Working with Parentheses",
          explanation: "Parentheses tell you what to do first! (3 + 4) x 2 means add first: 7 x 2 = 14. Without parentheses, 3 + 4 x 2 = 11.",
          visual: "(3 + 4) x 2 = ?",
          answer: 14,
          tip: "Always solve what's inside the parentheses first!"
        }
      ]
    },
    {
      id: "fractions-decimals",
      title: "Fractions & Decimals",
      icon: "\u{1F30C}",
      description: "Convert between fractions and decimals",
      concepts: [
        {
          title: "What are Decimals?",
          explanation: "Decimals are another way to write fractions. 0.5 = 1/2, 0.25 = 1/4, 0.75 = 3/4. The first decimal place is tenths, the second is hundredths.",
          visual: "0.5 = ?/?",
          answer: "1/2",
          tip: "0.5 means 5 tenths, which simplifies to 1/2."
        },
        {
          title: "Fractions to Decimals",
          explanation: "To turn a fraction into a decimal, divide the top by the bottom. 3/4 = 3 divided by 4 = 0.75. Some are easy to remember: 1/2 = 0.5, 1/4 = 0.25, 3/4 = 0.75.",
          visual: "3/4 = ?",
          answer: 0.75,
          tip: "Divide numerator by denominator: 3 / 4 = 0.75."
        },
        {
          title: "Adding Decimals",
          explanation: "Line up the decimal points and add normally. 2.35 + 1.7 = ? Write 1.7 as 1.70, then add: 2.35 + 1.70 = 4.05.",
          visual: "2.35 + 1.7 = ?",
          answer: 4.05,
          tip: "Line up the decimal points! Add zeros if needed to make columns even."
        },
        {
          title: "Multiplying Decimals",
          explanation: "Multiply like normal whole numbers, then count total decimal places. 0.3 x 0.4: 3 x 4 = 12, two decimal places total, so 0.12!",
          visual: "0.3 x 0.4 = ?",
          answer: 0.12,
          tip: "Multiply without decimals first, then put the decimal point back."
        }
      ]
    }
  ]
};

// ======== GAME QUESTIONS (quiz/challenge content) ========
const MATH_GAMES = {
  beginner: [
    {
      id: "addition-mission",
      title: "Addition Mission",
      icon: "\u{1F680}",
      description: "Solve addition problems to fuel your rocket!",
      questions: [
        { question: "14 + 23 = ?", options: [35, 37, 36, 33], correct: 1, hint: "Add the ones: 4+3=7. Add the tens: 1+2=3. Put them together!" },
        { question: "38 + 47 = ?", options: [85, 75, 95, 84], correct: 0, hint: "8+7=15, write 5 carry 1. 3+4+1=8. Answer: 85!" },
        { question: "56 + 29 = ?", options: [75, 85, 95, 65], correct: 1, hint: "6+9=15, write 5 carry 1. 5+2+1=8. Answer: 85!" },
        { question: "125 + 48 = ?", options: [163, 173, 183, 153], correct: 1, hint: "5+8=13, write 3 carry 1. 2+4+1=7. Keep the 1. Answer: 173!" },
        { question: "67 + 45 = ?", options: [102, 122, 112, 92], correct: 2, hint: "7+5=12, write 2 carry 1. 6+4+1=11. Answer: 112!" },
        { question: "234 + 156 = ?", options: [380, 390, 400, 370], correct: 1, hint: "Add column by column from right to left." },
        { question: "99 + 99 = ?", options: [188, 198, 208, 199], correct: 1, hint: "Think of it as 100 + 100 - 2 = 198!" },
        { question: "45 + 36 + 19 = ?", options: [100, 90, 110, 95], correct: 0, hint: "Add two at a time: 45+36=81, then 81+19=100!" }
      ]
    },
    {
      id: "subtraction-mission",
      title: "Subtraction Mission",
      icon: "\u{1F30D}",
      description: "Subtract to navigate through the asteroid field!",
      questions: [
        { question: "45 - 23 = ?", options: [22, 32, 12, 28], correct: 0, hint: "5-3=2, 4-2=2. Answer: 22!" },
        { question: "73 - 38 = ?", options: [45, 35, 25, 55], correct: 1, hint: "Can't do 3-8, borrow! 13-8=5, 6-3=3. Answer: 35!" },
        { question: "100 - 47 = ?", options: [63, 53, 43, 57], correct: 1, hint: "Borrow from 100. 10-7=3, 9-4=5. Answer: 53!" },
        { question: "82 - 56 = ?", options: [36, 26, 16, 46], correct: 1, hint: "12-6=6, 7-5=2. Answer: 26!" },
        { question: "150 - 75 = ?", options: [85, 65, 75, 95], correct: 2, hint: "150 is double 75. So half of 150 is 75!" },
        { question: "200 - 123 = ?", options: [87, 77, 67, 97], correct: 1, hint: "200 - 100 = 100, then 100 - 23 = 77!" },
        { question: "91 - 49 = ?", options: [52, 42, 32, 48], correct: 1, hint: "Think: 91-50=41, then add 1 back = 42!" },
        { question: "500 - 275 = ?", options: [225, 235, 215, 325], correct: 0, hint: "500 - 300 = 200, then add back 25 = 225!" }
      ]
    },
    {
      id: "multiply-mission",
      title: "Multiply Mission",
      icon: "\u{2B50}",
      description: "Multiply to power up your spaceship!",
      questions: [
        { question: "3 x 7 = ?", options: [18, 21, 24, 27], correct: 1, hint: "7+7+7 = 21, or think 3x7: count by 7s three times." },
        { question: "6 x 4 = ?", options: [20, 22, 24, 26], correct: 2, hint: "4+4+4+4+4+4 = 24. Or double 6x2=12, then double again!" },
        { question: "8 x 5 = ?", options: [35, 40, 45, 50], correct: 1, hint: "Count by 5s eight times, or 8x10=80, then halve it!" },
        { question: "9 x 6 = ?", options: [54, 56, 45, 48], correct: 0, hint: "9x6: finger trick! Put down finger 6, you see 5 and 4 = 54!" },
        { question: "7 x 7 = ?", options: [42, 47, 49, 56], correct: 2, hint: "7 x 7 = 49. A perfect square!" },
        { question: "4 x 9 = ?", options: [32, 36, 38, 40], correct: 1, hint: "9x4: finger trick! Put down finger 4, see 3 and 6 = 36!" },
        { question: "5 x 12 = ?", options: [50, 55, 60, 65], correct: 2, hint: "5 x 12: 5 x 10 = 50, plus 5 x 2 = 10. Total: 60!" },
        { question: "8 x 8 = ?", options: [56, 62, 64, 66], correct: 2, hint: "8 x 8 = 64. I ate and I ate until I was sick on the floor (8x8=64)!" }
      ]
    }
  ],
  intermediate: [
    {
      id: "division-mission",
      title: "Division Mission",
      icon: "\u{1F31F}",
      description: "Divide and conquer the galaxy!",
      questions: [
        { question: "48 / 6 = ?", options: [6, 7, 8, 9], correct: 2, hint: "What times 6 equals 48? 6 x 8 = 48!" },
        { question: "63 / 9 = ?", options: [6, 7, 8, 9], correct: 1, hint: "What times 9 equals 63? 9 x 7 = 63!" },
        { question: "72 / 8 = ?", options: [7, 8, 9, 10], correct: 2, hint: "What times 8 equals 72? 8 x 9 = 72!" },
        { question: "56 / 7 = ?", options: [6, 7, 8, 9], correct: 2, hint: "5-6-7-8! 7 x 8 = 56, so 56/7 = 8!" },
        { question: "144 / 12 = ?", options: [10, 11, 12, 13], correct: 2, hint: "12 x 12 = 144. It's a perfect square!" },
        { question: "96 / 8 = ?", options: [10, 11, 12, 13], correct: 2, hint: "8 x 12 = 96. Think: 8 x 10 = 80, 8 x 2 = 16, 80+16=96." },
        { question: "85 / 5 = ?", options: [15, 16, 17, 18], correct: 2, hint: "5 x 17 = 85. Or: 85/5 = (50+35)/5 = 10+7 = 17." },
        { question: "132 / 11 = ?", options: [10, 11, 12, 13], correct: 2, hint: "11 x 12 = 132. Count by 11s: 11, 22, 33 ... 132!" }
      ]
    },
    {
      id: "mixed-operations",
      title: "Mixed Operations",
      icon: "\u{1FA90}",
      description: "Use all your skills in a cosmic challenge!",
      questions: [
        { question: "25 x 4 = ?", options: [90, 95, 100, 105], correct: 2, hint: "25 x 4 = 100. There are 4 quarters in a dollar!" },
        { question: "150 / 3 = ?", options: [40, 45, 50, 55], correct: 2, hint: "3 x 50 = 150. Break it down: 150 = 120 + 30, so 40 + 10 = 50." },
        { question: "15 x 8 = ?", options: [110, 115, 120, 125], correct: 2, hint: "15 x 8: 10x8=80, 5x8=40, 80+40=120!" },
        { question: "256 / 4 = ?", options: [54, 60, 64, 68], correct: 2, hint: "4 x 64 = 256. Or halve twice: 256/2=128, 128/2=64." },
        { question: "What is 3/4 of 40?", options: [20, 25, 30, 35], correct: 2, hint: "1/4 of 40 = 10. So 3/4 = 3 x 10 = 30!" },
        { question: "Which is bigger: 2/3 or 3/5?", options: ["2/3", "3/5", "They're equal", "Can't tell"], correct: 0, hint: "2/3 = 10/15 and 3/5 = 9/15. 10 > 9, so 2/3 is bigger!" },
        { question: "1/3 + 1/6 = ?", options: ["2/9", "2/6", "1/2", "1/3"], correct: 2, hint: "Find common denominator: 2/6 + 1/6 = 3/6 = 1/2!" },
        { question: "3/4 - 1/2 = ?", options: ["1/4", "1/2", "2/4", "1/3"], correct: 0, hint: "1/2 = 2/4. So 3/4 - 2/4 = 1/4!" }
      ]
    },
    {
      id: "word-problems",
      title: "Space Word Problems",
      icon: "\u{1F469}\u{200D}\u{1F680}",
      description: "Solve real-life math puzzles set in space!",
      questions: [
        { question: "An astronaut collects 6 moon rocks each day for 9 days. How many rocks total?", options: [45, 54, 63, 48], correct: 1, hint: "6 rocks x 9 days = 6 x 9 = 54 rocks!" },
        { question: "A space station has 84 food packs shared equally among 7 astronauts. How many each?", options: [10, 11, 12, 14], correct: 2, hint: "84 / 7 = 12 food packs each!" },
        { question: "A rocket travels 250 km in the first hour and 175 km in the second. How far total?", options: [415, 425, 435, 325], correct: 1, hint: "250 + 175 = 425 km total." },
        { question: "There are 156 stars visible. 89 are behind clouds. How many can you see?", options: [57, 67, 77, 87], correct: 1, hint: "156 - 89 = 67 visible stars." },
        { question: "Each planet has 4 moons. If there are 8 planets, how many moons?", options: [28, 30, 32, 36], correct: 2, hint: "4 moons x 8 planets = 32 moons!" },
        { question: "An alien has 3/4 of 100 space crystals. How many is that?", options: [50, 60, 70, 75], correct: 3, hint: "1/4 of 100 = 25. So 3/4 = 3 x 25 = 75!" },
        { question: "A spaceship needs 15 fuel cells per trip. How many trips with 180 cells?", options: [10, 11, 12, 15], correct: 2, hint: "180 / 15 = 12 trips!" },
        { question: "5 aliens have 7 eyes each. 3 aliens have 4 eyes each. Total eyes?", options: [43, 45, 47, 50], correct: 2, hint: "5x7=35 eyes + 3x4=12 eyes = 47 eyes total!" }
      ]
    }
  ],
  advanced: [
    {
      id: "order-operations",
      title: "Order of Operations",
      icon: "\u{1F6F8}",
      description: "Master PEMDAS to navigate complex equations!",
      questions: [
        { question: "3 + 5 x 2 = ?", options: [16, 13, 11, 10], correct: 1, hint: "Multiply first: 5x2=10. Then add: 3+10=13!" },
        { question: "20 - 3 x 4 = ?", options: [68, 32, 8, 12], correct: 2, hint: "Multiply first: 3x4=12. Then subtract: 20-12=8!" },
        { question: "(6 + 4) x 3 = ?", options: [18, 22, 30, 34], correct: 2, hint: "Parentheses first: 6+4=10. Then multiply: 10x3=30!" },
        { question: "48 / (2 + 6) = ?", options: [4, 5, 6, 8], correct: 2, hint: "Parentheses first: 2+6=8. Then divide: 48/8=6!" },
        { question: "2 x (10 - 3) + 5 = ?", options: [14, 17, 19, 21], correct: 2, hint: "Parentheses: 10-3=7. Multiply: 2x7=14. Add: 14+5=19!" },
        { question: "100 - 4 x (3 + 7) = ?", options: [40, 50, 60, 70], correct: 2, hint: "Parentheses: 3+7=10. Multiply: 4x10=40. Subtract: 100-40=60!" },
        { question: "(8 + 2) x (9 - 4) = ?", options: [30, 40, 50, 60], correct: 2, hint: "Both parentheses: 10 x 5 = 50!" },
        { question: "5 + 3 x 4 - 2 = ?", options: [15, 17, 22, 30], correct: 0, hint: "Multiply first: 3x4=12. Then left to right: 5+12-2=15!" }
      ]
    },
    {
      id: "fractions-advanced",
      title: "Fraction & Decimal Challenge",
      icon: "\u{1F30C}",
      description: "Convert and calculate with fractions and decimals!",
      questions: [
        { question: "What is 0.75 as a fraction?", options: ["1/2", "2/3", "3/4", "4/5"], correct: 2, hint: "0.75 = 75/100 = 3/4 (divide both by 25)." },
        { question: "What is 2/5 as a decimal?", options: ["0.25", "0.4", "0.5", "0.45"], correct: 1, hint: "2 / 5 = 0.4. Think: 2/5 = 4/10 = 0.4." },
        { question: "0.6 + 0.35 = ?", options: ["0.85", "0.95", "0.41", "1.0"], correct: 1, hint: "0.60 + 0.35 = 0.95. Line up the decimals!" },
        { question: "2/3 + 1/4 = ?", options: ["3/7", "5/12", "11/12", "7/12"], correct: 2, hint: "Common denominator 12: 8/12 + 3/12 = 11/12!" },
        { question: "1.5 x 4 = ?", options: ["4.5", "5.0", "5.5", "6.0"], correct: 3, hint: "1.5 x 4 = 1x4 + 0.5x4 = 4 + 2 = 6.0!" },
        { question: "3/8 + 1/4 = ?", options: ["4/12", "4/8", "5/8", "1/2"], correct: 2, hint: "1/4 = 2/8. So 3/8 + 2/8 = 5/8!" },
        { question: "Which is biggest: 0.7, 3/4, or 0.65?", options: ["0.7", "3/4", "0.65", "All equal"], correct: 1, hint: "3/4 = 0.75. Compare: 0.75 > 0.7 > 0.65. 3/4 wins!" },
        { question: "5/6 - 1/3 = ?", options: ["4/6", "1/2", "2/3", "4/3"], correct: 1, hint: "1/3 = 2/6. So 5/6 - 2/6 = 3/6 = 1/2!" }
      ]
    },
    {
      id: "challenge-mission",
      title: "Galaxy Brain Challenge",
      icon: "\u{1F9E0}",
      description: "The ultimate test of all your math skills!",
      questions: [
        { question: "A rocket uses 2.5 kg of fuel per minute. How much in 12 minutes?", options: ["25 kg", "28 kg", "30 kg", "32 kg"], correct: 2, hint: "2.5 x 12 = 2.5 x 10 + 2.5 x 2 = 25 + 5 = 30!" },
        { question: "What is 3/5 of 250?", options: [125, 150, 175, 200], correct: 1, hint: "1/5 of 250 = 50. So 3/5 = 3 x 50 = 150!" },
        { question: "If 1 alien year = 1.5 Earth years, how many Earth years in 8 alien years?", options: [10, 11, 12, 13], correct: 2, hint: "1.5 x 8 = 12 Earth years!" },
        { question: "(15 + 25) x (100 - 96) = ?", options: [120, 140, 160, 180], correct: 2, hint: "Parentheses: 40 x 4 = 160!" },
        { question: "A space garden grows 3/4 inch per day. How much in 2 weeks?", options: ["7.5 in", "10 in", "10.5 in", "14 in"], correct: 2, hint: "2 weeks = 14 days. 3/4 x 14 = 42/4 = 10.5 inches!" },
        { question: "360 / 8 + 15 x 3 = ?", options: [90, 135, 180, 45], correct: 0, hint: "Division and multiply first: 45 + 45 = 90!" },
        { question: "Which fraction equals 0.125?", options: ["1/4", "1/5", "1/8", "1/10"], correct: 2, hint: "0.125 = 125/1000 = 1/8. Think: 8 x 0.125 = 1." },
        { question: "A crew of 12 shares 3/4 of 480 rations equally. How many each?", options: [25, 28, 30, 35], correct: 2, hint: "3/4 of 480 = 360. Then 360/12 = 30 each!" }
      ]
    }
  ]
};

// ======== BADGES ========
const MATH_BADGES = [
  { id: "math-first-lesson", name: "First Launch", icon: "\u{1F680}", description: "Complete your first math lesson", condition: (u) => u.math && u.math.lessonsCompleted >= 1 },
  { id: "math-first-game", name: "Starfighter", icon: "\u{2B50}", description: "Complete your first math game", condition: (u) => u.math && u.math.gamesCompleted >= 1 },
  { id: "math-perfect", name: "Perfect Orbit", icon: "\u{1F31F}", description: "Get 100% on any math game", condition: (u) => u.math && u.math.perfectGames >= 1 },
  { id: "math-5-lessons", name: "Space Scholar", icon: "\u{1F4DA}", description: "Complete 5 math lessons", condition: (u) => u.math && u.math.lessonsCompleted >= 5 },
  { id: "math-5-games", name: "Galaxy Gamer", icon: "\u{1F3AE}", description: "Complete 5 math games", condition: (u) => u.math && u.math.gamesCompleted >= 5 },
  { id: "math-all-beginner", name: "Liftoff Master", icon: "\u{1F6F0}\u{FE0F}", description: "Complete all Beginner content", condition: (u) => {
    if (!u.math) return false;
    var done = u.math.completedIds || {};
    return done["add-sub-basics"] && done["multiply-intro"] && done["addition-mission"] && done["subtraction-mission"] && done["multiply-mission"];
  }},
  { id: "math-all-intermediate", name: "Orbit Ace", icon: "\u{1FA90}", description: "Complete all Intermediate content", condition: (u) => {
    if (!u.math) return false;
    var done = u.math.completedIds || {};
    return done["multiply-divide"] && done["fractions-intro"] && done["division-mission"] && done["mixed-operations"] && done["word-problems"];
  }},
  { id: "math-all-advanced", name: "Galaxy Commander", icon: "\u{1F30C}", description: "Complete all Advanced content", condition: (u) => {
    if (!u.math) return false;
    var done = u.math.completedIds || {};
    return done["long-division"] && done["fractions-decimals"] && done["order-operations"] && done["fractions-advanced"] && done["challenge-mission"];
  }},
  { id: "math-master", name: "Math Galaxy Master", icon: "\u{1F451}", description: "Complete ALL math content", condition: (u) => {
    if (!u.math) return false;
    return (u.math.lessonsCompleted || 0) >= 6 && (u.math.gamesCompleted || 0) >= 9;
  }}
];

// ======== DAILY MATH CHALLENGE ========
// Generates 5 fresh questions daily based on kid's level, seeded by date

function getDailyChallengeDate() {
  return new Date().toISOString().slice(0, 10); // e.g. "2026-03-15"
}

function dailySeed(dateStr) {
  // Simple hash from date string for deterministic daily questions
  var hash = 0;
  for (var i = 0; i < dateStr.length; i++) {
    hash = ((hash << 5) - hash) + dateStr.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function seededRandom(seed) {
  // LCG pseudo-random from seed
  var s = seed;
  return function() {
    s = (s * 1664525 + 1013904223) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

function generateDailyChallenge() {
  var dateStr = getDailyChallengeDate();
  var seed = dailySeed(dateStr);
  var rng = seededRandom(seed);

  // Determine difficulty from age group
  var ageGroup = (typeof getAgeGroup === "function") ? getAgeGroup() : "all";
  var difficulty = "mixed"; // default
  if (ageGroup === "early" || ageGroup === "developing") difficulty = "easy";
  else if (ageGroup === "proficient") difficulty = "medium";
  else difficulty = "hard";

  var questions = [];
  var NUM_QUESTIONS = 5;

  for (var i = 0; i < NUM_QUESTIONS; i++) {
    var q = generateDailyQuestion(difficulty, rng, i);
    questions.push(q);
  }

  return {
    date: dateStr,
    difficulty: difficulty,
    questions: questions
  };
}

function generateDailyQuestion(difficulty, rng, index) {
  // Cycle through operation types
  var ops;
  if (difficulty === "easy") {
    ops = ["add", "sub", "add", "sub", "add"];
  } else if (difficulty === "medium") {
    ops = ["add", "sub", "mul", "add", "div"];
  } else {
    ops = ["add", "mul", "div", "sub", "mul"];
  }
  var op = ops[index % ops.length];

  var a, b, answer, questionText, hint;

  switch (op) {
    case "add":
      if (difficulty === "easy") {
        a = Math.floor(rng() * 40) + 5;
        b = Math.floor(rng() * 40) + 5;
      } else if (difficulty === "medium") {
        a = Math.floor(rng() * 200) + 50;
        b = Math.floor(rng() * 200) + 50;
      } else {
        a = Math.floor(rng() * 500) + 100;
        b = Math.floor(rng() * 500) + 100;
      }
      answer = a + b;
      questionText = a + " + " + b + " = ?";
      hint = "Add the ones first, then the tens. Carry if needed!";
      break;

    case "sub":
      if (difficulty === "easy") {
        answer = Math.floor(rng() * 30) + 5;
        b = Math.floor(rng() * 20) + 3;
        a = answer + b;
      } else if (difficulty === "medium") {
        answer = Math.floor(rng() * 150) + 20;
        b = Math.floor(rng() * 100) + 15;
        a = answer + b;
      } else {
        answer = Math.floor(rng() * 300) + 50;
        b = Math.floor(rng() * 200) + 30;
        a = answer + b;
      }
      questionText = a + " - " + b + " = ?";
      hint = "Subtract column by column from right to left. Borrow if needed!";
      break;

    case "mul":
      if (difficulty === "medium") {
        a = Math.floor(rng() * 9) + 2;
        b = Math.floor(rng() * 9) + 2;
      } else {
        a = Math.floor(rng() * 12) + 2;
        b = Math.floor(rng() * 12) + 2;
      }
      answer = a * b;
      questionText = a + " \u00D7 " + b + " = ?";
      hint = "Think of " + a + " groups of " + b + ". You can also skip-count by " + b + "!";
      break;

    case "div":
      if (difficulty === "medium") {
        b = Math.floor(rng() * 8) + 2;
        answer = Math.floor(rng() * 9) + 2;
      } else {
        b = Math.floor(rng() * 11) + 2;
        answer = Math.floor(rng() * 12) + 2;
      }
      a = answer * b;
      questionText = a + " \u00F7 " + b + " = ?";
      hint = "Think: what number times " + b + " equals " + a + "?";
      break;
  }

  // Generate 4 options: correct + 3 distractors
  var options = [answer];
  var attempts = 0;
  while (options.length < 4 && attempts < 50) {
    var offset = Math.floor(rng() * Math.max(10, Math.floor(answer * 0.3))) + 1;
    if (rng() > 0.5) offset = -offset;
    var wrong = answer + offset;
    if (wrong > 0 && wrong !== answer && options.indexOf(wrong) === -1) {
      options.push(wrong);
    }
    attempts++;
  }
  // Fill remaining if needed
  while (options.length < 4) {
    options.push(answer + options.length * 3);
  }

  // Shuffle options
  for (var j = options.length - 1; j > 0; j--) {
    var k = Math.floor(rng() * (j + 1));
    var temp = options[j];
    options[j] = options[k];
    options[k] = temp;
  }

  var correctIndex = options.indexOf(answer);

  return {
    question: questionText,
    options: options,
    correct: correctIndex,
    hint: hint
  };
}
