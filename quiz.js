const quizQuestion = document.getElementById('quiz-question');
const options = Array.from(document.getElementsByClassName('option-text'));
const questionNumber = document.getElementById('question-number');
const pointsText = document.getElementById('points');
const progressComplete = document.getElementById('progress-complete');
const loadingSpinner = document.getElementById('loading-spinner');
const quiz = document.getElementById('quiz');

let currentQuizQuestion = {};
let canAcceptAnswers = false;
let points = 0;
let questionCount = 0;
let availableQuizQuestions = [];

const quizQuestions = [
  {
    category: "Information Technology",
    type: "multiple",
    difficulty: "easy",
    question: "Which HTML tag is used to define an inline style?",
    correct_answer: "&lt;style&gt;",
    incorrect_answers: [
      "&lt;script&gt;",
      "&lt;css&gt;",
      "&lt;span&gt;"
    ]
  },
  {
    category: "Information Technology",
    type: "multiple",
    difficulty: "easy",
    question: "Which property is used to change the text color in CSS?",
    correct_answer: "color",
    incorrect_answers: [
      "text-color",
      "font-color",
      "text-style"
    ]
  },
  {
    category: "Information Technology",
    type: "multiple",
    difficulty: "easy",
    question: "Which of the following is the correct way to comment in HTML?",
    correct_answer: "&lt;!-- Comment --&gt;",
    incorrect_answers: [
      "// Comment",
      "/* Comment */",
      "&lt;! Comment&gt;"
    ]
  },
];

const CORRECT_SCORE = 10;
const TOTAL_QUESTIONS = 3;

startQuiz = () => {
  questionCount = 0;
  points = 0;
  availableQuizQuestions = [...quizQuestions];
  fetchNextQuestion();
  quiz.classList.remove('hidden');
  loadingSpinner.classList.add('hidden');
};

fetchNextQuestion = () => {
  if (availableQuizQuestions.length === 0 || questionCount >= TOTAL_QUESTIONS) {
    localStorage.setItem('latestScore', points);
    window.location.href = "./finish.html";
    return;
  }

  questionCount++;
  questionNumber.innerText = `Question ${questionCount}/${TOTAL_QUESTIONS}`;
  progressComplete.style.width = `${(questionCount / TOTAL_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuizQuestions.length);
  currentQuizQuestion = availableQuizQuestions[questionIndex];
  quizQuestion.innerHTML = currentQuizQuestion.question;

  const answerOptions = [...currentQuizQuestion.incorrect_answers];
  const correctOptionIndex = Math.floor(Math.random() * 4);
  answerOptions.splice(correctOptionIndex, 0, currentQuizQuestion.correct_answer);

  options.forEach((option, index) => {
    option.innerHTML = answerOptions[index];
    option.dataset['index'] = answerOptions[index];
  });

  availableQuizQuestions.splice(questionIndex, 1);
  canAcceptAnswers = true;
};

options.forEach(option => {
  option.addEventListener('click', e => {
    if (!canAcceptAnswers) return;

    canAcceptAnswers = false;
    const selectedOption = e.target;
    const selectedAnswer = selectedOption.dataset['index'];

    const applyClass = selectedAnswer === currentQuizQuestion.correct_answer ? 'correct' : 'incorrect';

    if (applyClass === 'correct') {
      increaseScore(CORRECT_SCORE);
    }

    selectedOption.parentElement.classList.add(applyClass);

    setTimeout(() => {
      selectedOption.parentElement.classList.remove(applyClass);
      fetchNextQuestion();
    }, 1000);
  });
});

increaseScore = num => {
  points += num;
  pointsText.innerText = points;
};

document.addEventListener('DOMContentLoaded', startQuiz);
