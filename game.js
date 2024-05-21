const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

const questions = [
  {
    category: "Computer Science",
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
    category: "Computer Science",
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
    category: "Computer Science",
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

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
  game.classList.remove('hidden');
  loader.classList.add('hidden');
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score);
    window.location.href = "./end.html";
    return
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerHTML = currentQuestion.question;

  const answerChoices = [...currentQuestion.incorrect_answers];
  const correctAnswerIndex = Math.floor(Math.random() * 4);
  answerChoices.splice(correctAnswerIndex, 0, currentQuestion.correct_answer);

  choices.forEach((choice, index) => {
    choice.innerHTML = answerChoices[index];
    choice.dataset['number'] = answerChoices[index];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['number'];

    const classToApply = selectedAnswer === currentQuestion.correct_answer ? 'correct' : 'incorrect';

    if (classToApply === 'correct') {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

document.addEventListener('DOMContentLoaded', startGame);
