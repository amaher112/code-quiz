var startBtn = document.querySelector("#start-button");
var timeEl = document.querySelector("#time");
var introEl = document.querySelector(".intro");
var quizEl = document.querySelector("#quiz");
var questionText = document.querySelector("#question-text");
var answerText = document.querySelector("#answers-text");
var scoreText = document.querySelector("#end-game");
var finalScore = document.querySelector("#score");
var submitBtn = document.querySelector("#submit");
var initials = document.querySelector("#initials");

var questions = [
  {
    question: "Which type of dialog box is used to display a message and a data entry field?",
    answers: ["1. Alert ()", "2. Prompt()", "3. Confirm()", "4. Msg()"],
    correctAnswer: "2. Prompt()",
  },
  {
    question: "Which one of these represents a for loop?",
    answers: ["1. ", "2. ", "3. ", "4. (i = 0; i < length; i++)"],
    correctAnswer: "4. (i = 0; i < length; i++)",
  },
  {
    question: "Which of these is NOT a logical operator?",
    answers: ["1. !", "2. &", "3. &&", "4. ||"],
    correctAnswer: "2. &",
  },
  {
    question: "What does the .split('') method do?",
    answers: ["1. Turn a string into an array", "2. Turn objects into properties", "3. Turn an array into a string", "4. Turn a string into numbers"],
    correctAnswer: "1. Turn a string into an array",
  },
];

var currentQuestionIdx = 0;
var timeLeft = 75;

function startQuiz() {
  var timeInterval = setInterval(function () {
    timeLeft--;
    timeEl.textContent = "Time: " + timeLeft;
    if (timeLeft === 0) {
      clearInterval(timeInterval);
      endGame();
    }
  }, 1000);
  startBtn.style.display = "none";
  introEl.style.display = "none";
  quizEl.style.display = "block";

  nextQuestion();
}

function nextQuestion() {
  answerText.textContent = "";
  var currentQuestion = questions[currentQuestionIdx].question;
  var currentAnswer = questions[currentQuestionIdx].answers;
  questionText.textContent = currentQuestion;
  for (var i = 0; i < currentAnswer.length; i++) {
    var answerBtn = document.createElement("button");
    answerBtn.setAttribute("class", "answers-text");
    answerBtn.setAttribute("value", currentAnswer[i]);
    answerBtn.textContent = currentAnswer[i];
    answerText.appendChild(answerBtn);
  }
}

function endGame() {
  quizEl.style.display = "none";
  scoreText.style.display = "block";
  finalScore.textContent = "Your final score is: " + timeLeft;
}

function displayScore() {
  var value = localStorage.getItem("endScore");
  var displayScore = document.getElementById("display");
  displayScore.textContent = value;

  //  display "highscore"
  // Add clear and go back buttons
}

// If I answer a question,  it will proceed to the next question.

// If I answer a question incorrectly, time is subtracted from the timer.

// The game is over either when all questions are answered or the timer reaches zero.

// When the game is over, it will display the score equals to time left.

// When the game is over, I can save my initial and my score.

startBtn.addEventListener("click", function () {
  startQuiz();
});

answerText.addEventListener("click", function (e) {
  var clickedBtn = e.target;
  var clickedBtnValue = e.target.value;
  console.log(clickedBtnValue);
  if (clickedBtnValue === questions[currentQuestionIdx].correctAnswer) {
    currentQuestionIdx++;
    nextQuestion();
  } else {
    // Subtract time
    function subtractTime() {
      timeLeft -= 10;
    }
    currentQuestionIdx++;
    nextQuestion();
  }
});

submitBtn.addEventListener("click", function () {
  scoreText.style.display = "none";
  finalScore.textContent = "";
  localStorage.setItem("endScore", timeLeft);
  localStorage.setItem("initials", initials.value);
  displayScore();
});
