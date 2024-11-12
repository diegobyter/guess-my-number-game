import { playGame, resetGame } from './gameController.js';
import { loadLanguage } from './languageLoader.js';

async function initializeGame(language) {
    await loadLanguage(language);
    resetGame();
}

document.getElementById('submit-btn').addEventListener('click', () => {
    const guess = Number(document.getElementById('user-input').value);
    playGame(guess);
});

document.getElementById('language-select').addEventListener('change', async (e) => {
    await initializeGame(e.target.value);
});

initializeGame('en');
