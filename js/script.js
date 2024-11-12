// Query the DOM
const $restartBtn = document.getElementById('play-again-btn');
const $highscore = document.getElementById('highscore');
const $currentScore = document.getElementById('current-score');
const $targetNumber = document.getElementById('target-number');
const $message = document.getElementById('message');
const $userInput = document.getElementById('user-input');
const $checkBtn = document.getElementById('check-btn');

// Encapsulate state in an object
const gameState = {
    secretNumber: null,
    score: 0,
    highscore: 0,
    gameIsOver: false
}

// Create function to reset the game
function resetGAme() {
    gameState.secretNumber = generateSecretNumber();
    gameState.score = 20;
    $currentScore.textContent = gameState.score;
    gameState.gameIsOver = false;
    $message.textContent = "<Input a number between 1 and 20>";
    if (document.body.classList.contains('victory')) {
        document.body.classList.remove('victory');
    }
    handleBlinkingAnimation(true);
    if ($message.classList.contains('yellowText')) {
        $message.classList.remove('yellowText')
    }

    $targetNumber.textContent = "?";
    document.body.classList.add('bg-gradient');
    $userInput.value = '';
}

// Create function to generate a random number between 1 and 20
function generateSecretNumber() {
    const secretNumber = Math.trunc(Math.random() * 20 + 1);
    console.log("Secret: ", secretNumber);
    return secretNumber;
}

// Create a function to start or stop the text blinking animation
function handleBlinkingAnimation(blinkOrNot) {
    if ($message.classList.contains('blink') && !blinkOrNot) {
        $message.classList.remove('blink');
    } else if (!$message.classList.contains('blink') && blinkOrNot) {
        $message.classList.add('blink')
    }
}

// Create a function to run the alert animation
function runAlertAnimation(msg) {
    if (!$userInput.classList.contains('shake') || !$checkBtn.classList.contains('shake')) {
        $userInput.classList.add('shake');
        $checkBtn.classList.add('shake');
        const msgBefore = $message.textContent;
        $message.textContent = msg;
        $message.classList.add('redText');
        $userInput.setAttribute('disabled', true);
        $checkBtn.setAttribute('disabled', true);
        setTimeout(() => {
            $userInput.classList.remove('shake');
            $checkBtn.classList.remove('shake');
            $message.classList.remove('redText');
            $message.textContent = msgBefore;
            $userInput.removeAttribute('disabled')
            $checkBtn.removeAttribute('disabled')
        }, 4000)
    }
}

// Create function to check the scores
function checkScores() {
    const inputValue = parseInt($userInput.value);
    if (inputValue === gameState.secretNumber) {
        if (gameState.score > gameState.highscore) {
            gameState.highscore = gameState.score;
            $highscore.textContent = gameState.highscore;
        }
        runVictoryAnimation()

    } else {
        gameState.score--;
        $currentScore.textContent = gameState.score;
    }

    if (gameState.score <= 0) {
        gameState.score = 0;
        gameState.gameIsOver = true;
        runGameOverAnimation();
    } else if (inputValue < gameState.secretNumber) {
        runAlertAnimation("📉 Your guess is too low!")
    } else {
        runAlertAnimation("📈 Your guess is too hight!")
    }
}

// Create a function to run the victory animation
function runVictoryAnimation() {
    if (!document.body.classList.contains('victory')) {
        document.body.classList.remove('bg-gradient');
        $targetNumber.textContent = gameState.secretNumber;
        document.body.classList.add('victory');
        $message.textContent = "🚩 Congratulations! You won the game."
    }
}

// Create a function to run the game-over animation
function runGameOverAnimation() {
    if (!document.body.classList.contains('gameover')) {
        document.body.classList.remove('bg-gradient');
        document.body.classList.add('gameover');
        $message.textContent = "😥 Game Over! You lost."
        $message.classList.add('yellowText')
    }
}

// Add event listeners to the DOM elements
$checkBtn.onclick = function () {
    handleBlinkingAnimation(false)
    if (!$userInput.value) {
        runAlertAnimation("Fill the input bellow with your guest first!");
    } else {
        checkScores()
    }
}

$restartBtn.onclick = resetGAme;

resetGAme();