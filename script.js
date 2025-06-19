const questions = [
  {
    question: "איזה הר מגיע עד לים?",
    options: ["הכרמל", "החרמון", "התבור", "הגלבוע"],
    correct: 0
  },
  {
    question: "בישראל יש ארבע ערים גדולות וְהֵן:",
    options: [
      "חיפה, אשדוד, רמת גן, פתח תקווה.",
      "ירושלים, רמת גן, תל אביב, באר שבע.",
      "ירושלים, תל אביב, חיפה, ראשון לציון.",
      "ירושלים, תל אביב, אילת, נהריה."
    ],
    correct: 2
  },
  // המשך כל השאלות שלך...
  {
    question: "הר הרצל נמצא ב:",
    options: ["באר שבע", "חיפה", "תל אביב", "ירושלים"],
    correct: 3
  }
];

let currentQuestionIndex = 0;
let score = 0;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('nextBtn');
const resultEl = document.getElementById('result');

function loadQuestion() {
  const q = questions[currentQuestionIndex];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = '';

  q.options.forEach((option, index) => {
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.className = 'option';
    btn.onclick = () => selectOption(index);
    optionsEl.appendChild(btn);
  });
  nextBtn.style.display = 'none';
}

function selectOption(selectedIndex) {
  const currentQ = questions[currentQuestionIndex];
  const buttons = document.querySelectorAll('.option');

  buttons.forEach((btn, index) => {
    btn.disabled = true;
    if (index === currentQ.correct) {
      btn.classList.add('correct');
    } else if (index === selectedIndex) {
      btn.classList.add('wrong');
    }
  });

  if (selectedIndex === currentQ.correct) {
    score++;
  }

  nextBtn.style.display = 'block';
}

nextBtn.onclick = () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
};

function showResult() {
  document.getElementById('quiz-container').style.display = 'none';
  resultEl.innerHTML = `הצלחת לענות על ${score} מתוך ${questions.length} שאלות!`;

  // הפעלת אפקט הקונפטי
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.5 }
  });
}

loadQuestion();