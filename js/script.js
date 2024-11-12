import { MIN_GUESS, MAX_GUESS, MIN_SCORE, MAX_SCORE, PENALTY, updateHighscore, initializeGameState } from "./gameState.js";
import { getGameState, decreaseScore } from "./gameState.js";

"use strict";

const $submitBtn = document.getElementById('submit-btn');
const $guess = document.getElementById('user-input');

function resetGame() {
    initializeGameState();
    const state = getGameState();
    state.message = `<Input a number between ${MIN_GUESS} and ${MAX_GUESS}>`;
    $guess.value = '';
    updateGameUI();
}

function updateGameUI() {
    const state = getGameState();

    const $highscore = document.getElementById('highscore');
    const $score = document.getElementById('current-score');
    const $secretNumber = document.getElementById('secret-number');
    const $message = document.getElementById('message');
    const $background = document.body;
    const $h1 = document.querySelector('h1');

    if (state.playerWin) {
        $h1.textContent = "You got it right!"
        $background.className = 'victory';
        $guess.style.display = "none";
        $submitBtn.textContent = "Play Again"

    } else if (state.gameIsOver) {
        $background.className = 'gameover';
        $h1.textContent = "Game Over!";
        $guess.style.display = "none";
        $submitBtn.textContent = "Play Again"

    } else {
        $background.className = 'bg-gradient';
        $h1.textContent = "Guess My Number!";
        $guess.style.display = "initial";
        $submitBtn.textContent = "Check"
    }

    $secretNumber.textContent = state.playerWin ? state.secretNumber : "?";
    $highscore.textContent = state.highscore;
    $score.textContent = state.score;
    $message.textContent = state.message;

    if (state.displayWarning) {
        $guess.classList.add('shake');
        $submitBtn.classList.add('shake');
        $guess.setAttribute('disabled', true);
        $submitBtn.setAttribute('disabled', true);
        $message.style.color = "orange";

        setTimeout(() => {
            state.displayWarning = false;
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
    const state = getGameState();
    state.message = message;
    state.displayWarning = true;
}
function isCorrectGuess(guess) {
    const state = getGameState();
    return guess === state.secretNumber;
}
function isValidGuess(guess) {
    return guess >= MIN_GUESS && guess <= MAX_GUESS;
}
function handleWin() {
    const state = getGameState();
    state.playerWin = true;
    state.message = "🚩 Congratulations! You won the game.";
    updateHighscore();
}

function handleGameOver() {
    const state = getGameState();
    state.gameIsOver = true;
    state.message = "😥 What a shame! You lost.";
}

function handleWrongGuess(guess) {
    const state = getGameState();
    decreaseScore();
    if (state.score < MIN_SCORE) {
        handleGameOver();
    } else {
        const GUESS_TOO_HIGH = guess > state.secretNumber;
        setWarning(GUESS_TOO_HIGH ? "📈 Your guess is too hight!" : "📉 Your guess is too low!")
    }
}

function playGame() {
    const state = getGameState();
    if (state.playerWin || state.gameIsOver) {
        resetGame();
        return;
    }
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
resetGame();