
// Add ID and event listener to the start button
var startBtn = document.querySelector("#start-button");


// Create a "start quiz" function
function startQuiz() {
    var timeLeft = 75;
    var timeInterval = setInterval(function() {
        timeLeft--;
    }, 1000);
}

// When the start button is clicked, a timer will appear and it will take you to the first question with answers

// If I answer a question correctly, a message will appear and it will proceed to the next question.

// If I answer a question incorrectly, a message will appear, it will proceed to the next question and time is subtracted from the timer.

// The game is over either when all questions are answered or the timer reaches zero.

// When the game is over, it will display the score equals to time left.

// When the game is over, I can save my initial and my score.


startBtn.addEventListener("click", function() {
    startQuiz();
})