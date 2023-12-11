var startBtn = document.querySelector("#start-button");
var timeEl = document.querySelector("#time");
var introEl = document.querySelector(".intro");
var quizEl = document.querySelector("#quiz");
var questionText = document.querySelector("#question-text");
var answerText = document.querySelector("#answers-text");
var scoreText = document.querySelector("#end-game");
var finalScore = document.querySelector("#score");
var displayScore = document.getElementById("display");
var submitBtn = document.querySelector("#submit");
var initials = document.querySelector("#initials");
var startOverBtn = document.querySelector(".start-over");
var clearBtn = document.querySelector(".clear");

// Array of questions and answers
var questions = [
  {
    question:
      "Which type of dialog box is used to display a message and a data entry field?",
    answers: ["1. Alert ()", "2. Prompt()", "3. Confirm()", "4. Msg()"],
    correctAnswer: "2. Prompt()",
  },
  {
    question: "Which one of these represents a for loop?",
    answers: [
      "1. (i = 0; i++)",
      "2. (i = length)",
      "3. (i < length; i++)",
      "4. (i = 0; i < length; i++)",
    ],
    correctAnswer: "4. (i = 0; i < length; i++)",
  },
  {
    question: "Which of these is NOT a logical operator?",
    answers: ["1. !", "2. &", "3. &&", "4. ||"],
    correctAnswer: "2. &",
  },
  {
    question: "What does the .split('') method do?",
    answers: [
      "1. Turn a string into an array",
      "2. Turn objects into properties",
      "3. Turn an array into a string",
      "4. Turn a string into numbers",
    ],
    correctAnswer: "1. Turn a string into an array",
  },
];

var currentQuestionIdx = 0;
var timeLeft = 75;
var timeInterval;

function startQuiz() {
  // Starts the timer and ends the game when it reaches "0"
  timeInterval = setInterval(function () {
    timeLeft--;
    timeEl.textContent = "Time: " + timeLeft;
    if (timeLeft === 0) {
      clearInterval(timeInterval);
      endGame();
    }
  }, 1000);

  // The start button and instructions disappear, and the first questions object appears.
  startBtn.style.display = "none";
  introEl.style.display = "none";
  quizEl.style.display = "block";

  nextQuestion();
}

function nextQuestion() {
  // Checks to see if there are any more questions in the 'questions' array. If not, endGame is called.
  if (currentQuestionIdx >= questions.length) {
    endGame();
  }
  // Clears the answer buttons from the previous question
  answerText.textContent = "";
  var currentQuestion = questions[currentQuestionIdx].question;
  var currentAnswer = questions[currentQuestionIdx].answers;
  questionText.textContent = currentQuestion;

  // The for loop adds the answers to the screen as buttons
  for (var i = 0; i < currentAnswer.length; i++) {
    var answerBtn = document.createElement("button");
    answerBtn.setAttribute("class", "answers-text");
    answerBtn.setAttribute("value", currentAnswer[i]);
    answerBtn.textContent = currentAnswer[i];
    answerText.appendChild(answerBtn);
  }
}

// Hides the quiz questions and shows final score.
function endGame() {
  clearInterval(timeInterval);
  timeEl.style.display = "none";
  quizEl.style.display = "none";
  scoreText.style.display = "block";
  finalScore.textContent = "Your final score is: " + timeLeft;
}

// Gets values of endScore and initials, and displays them as highscores.
function showScore() {
  var value = localStorage.getItem("endScore");
  initials = localStorage.getItem("initials");
  var highScore = document.querySelector("#highscore");
  highScore.style.display = "block";
  displayScore.textContent = initials + " - " + value;
}

// Starts the game
startBtn.addEventListener("click", function () {
  startQuiz();
});

// Checks to see if what the user clicked matches the correct answer.
answerText.addEventListener("click", function (e) {
  var clickedBtnValue = e.target.value;
  if (clickedBtnValue === questions[currentQuestionIdx].correctAnswer) {
    currentQuestionIdx++;
    nextQuestion();
  } else {
    // Subtracts time for an incorrect answer
    function subtractTime() {
      timeLeft -= 10;
    }
    subtractTime();
    currentQuestionIdx++;
    nextQuestion();
  }
});

// After the user enters their info, their initials and highscore will be stored and displayed.
submitBtn.addEventListener("click", function () {
  event.preventDefault();
  scoreText.style.display = "none";
  finalScore.textContent = "";
  localStorage.setItem("endScore", timeLeft);
  localStorage.setItem("initials", initials.value);
  showScore();
});

// Returns user to the home page.
startOverBtn.addEventListener("click", function () {
  location.href = 'index.html';
});

// Clears high score and local storage.
clearBtn.addEventListener("click", function () {
  localStorage.clear();
  displayScore.style.display = "none";
});
