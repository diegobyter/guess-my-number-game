"use strict";

const $submitBtn = document.getElementById('check-btn');
const $restartBtn = document.getElementById('play-again-btn');
const $guess = document.getElementById('user-input');

const MIN_SCORE = 1;
const MAX_SCORE = 100;
const MIN_GUESS = 1;
const MAX_GUESS = 20;
const PENALTY = 10;

const gameState = {
    secretNumber: null,
    score: 0,
    highscore: 0,
    message: null,
    playerWin: false,
    displayWarning: false,
    gameIsOver: false,
    resetGame: false
}

function resetGame() {
    gameState.secretNumber = generateSecretNumber();
    gameState.score = MAX_SCORE;
    gameState.message = `<Input a number between ${MIN_GUESS} and ${MAX_GUESS}>`;
    gameState.playerWin = false;
    gameState.gameIsOver = false;
    gameState.resetGame = true;
    $guess.value = '';
    updateGameUI();
}

function updateGameUI() {
    const $highscore = document.getElementById('highscore');
    const $score = document.getElementById('current-score');
    const $secretNumber = document.getElementById('secret-number');
    const $message = document.getElementById('message');
    const $background = document.body;
    const $h1 = document.querySelector('h1');

    if (gameState.playerWin) {
        $h1.textContent = "You got it right!"
        $background.className = 'victory';
    }
    else if (gameState.gameIsOver) {
        $background.className = 'gameover';
        $h1.textContent = "Game Over!";
    } else {
        $background.className = 'bg-gradient';
        $h1.textContent = "Guess My Number!";
    }

    $secretNumber.textContent = gameState.playerWin ? gameState.secretNumber : "?";
    $highscore.textContent = gameState.highscore;
    $score.textContent = gameState.score;
    $message.textContent = gameState.message;

    if (gameState.displayWarning) {
        $guess.classList.add('shake');
        $submitBtn.classList.add('shake');
        $guess.setAttribute('disabled', true);
        $submitBtn.setAttribute('disabled', true);
        $message.style.color = "orange";

        setTimeout(() => {
            gameState.displayWarning = false;
            $guess.classList.remove('shake');
            $submitBtn.classList.remove('shake');
            $guess.removeAttribute('disabled');
            $submitBtn.removeAttribute('disabled');
            $message.style.color = "white";
        }, 1500);
    }
}

function generateSecretNumber() {
    return Math.trunc(Math.random() * MAX_GUESS + MIN_GUESS);
}

function setWarning(message) {
    gameState.message = message;
    gameState.displayWarning = true;
}
function isCorrectGuess(guess) {
    return guess === gameState.secretNumber;
}
function isValidGuess(guess) {
    return guess >= MIN_GUESS && guess <= MAX_GUESS;
}
function handleWin() {
    gameState.playerWin = true;
    gameState.message = "🚩 Congratulations! You won the game.";
    if (gameState.score > gameState.highscore) {
        gameState.highscore = gameState.score;
    }
}

function handleGameOver() {
    gameState.gameIsOver = true;
    gameState.message = "😥 What a shame! You lost.";
}

function handleWrongGuess(guess) {
    gameState.score -= PENALTY;
    if (gameState.score === MIN_SCORE - PENALTY) {
        handleGameOver();
    } else {
        const GUESS_TOO_HIGH = guess > gameState.secretNumber;
        setWarning(GUESS_TOO_HIGH ? "📈 Your guess is too hight!" : "📉 Your guess is too low!")
    }
}

function playGame() {
    const GUESS = Number($guess.value);
    if (!$guess.value) {
        setWarning("Fill the input bellow with your guest first!");

    } else if (!isValidGuess(GUESS)) {
        setWarning(`The number must be between ${MIN_GUESS} and ${MAX_GUESS}!`);

    } else if (isCorrectGuess(GUESS)) {
        handleWin();

    } else {
        handleWrongGuess(GUESS);
    }
    updateGameUI();
}

$submitBtn.addEventListener('click', playGame);
$restartBtn.addEventListener('click', resetGame);
resetGame();