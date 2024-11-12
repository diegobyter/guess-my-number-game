import { getGameState } from './gameState.js';
import { getMessage } from './languageLoader.js';

const $guessInput = document.getElementById('user-input');
const $scoreDisplay = document.getElementById('current-score');
const $highscoreDisplay = document.getElementById('highscore');
const $secretNumberDisplay = document.getElementById('secret-number');
const $messageDisplay = document.getElementById('message');
const $h1 = document.querySelector('h1');
const $background = document.body;
const $submitButtn = document.getElementById('submit-btn');

export function updateUI() {
    const state = getGameState();

    $scoreDisplay.textContent = state.score;
    $highscoreDisplay.textContent = state.highscore;
    $secretNumberDisplay.textContent = state.playerWin ? state.secretNumber : "?";
    $h1.textContent = state.gameIsOver ? getMessage('gameOverTitle') : getMessage('gameTitle');

    if (state.gameIsOver) {
        $background.classList.remove('bg-gradient');
        $background.classList.add('gameover');
        $submitButtn.textContent = getMessage('playAgainLabel');
        $h1.textContent = getMessage('gameOverTitle');
    } else if (state.playerWin) {
        $background.classList.remove('bg-gradient');
        $background.classList.add('victory');
        $submitButtn.textContent = getMessage('playAgainLabel');
        $h1.textContent = getMessage('gotItRight');
    } else {
        $background.classList.remove('gameover', 'victory');
        $background.classList.add('bg-gradient')
        $submitButtn.textContent = getMessage('checkLabel');
        $h1.textContent = getMessage('gameTitle');
    }
}

export function setWarning(messageKey) {
    $messageDisplay.textContent = getMessage(messageKey);

    $guessInput.classList.add('shake');
    $submitButtn.classList.add('shake');
    $messageDisplay.classList.add('warning');
    setTimeout(() => {
        $messageDisplay.setAttribute('class', '');
        $guessInput.setAttribute('class', '');
        $submitButtn.setAttribute('class', '');
    }, 1500);
}

export function resetInput() {
    $guessInput.value = '';
}