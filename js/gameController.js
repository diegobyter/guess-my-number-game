import { getGameState, initializeGameState, decreaseScore, updateHighscore, MIN_GUESS, MAX_GUESS } from './gameState.js';
import { updateUI, setWarning, resetInput } from './uiController.js';

export function playGame(guess) {
    const state = getGameState();

    if (state.gameIsOver || state.playerWin) {
        state.messageKey = "inputPrompt";
        resetGame();
        resetInput();
        updateUI()
        return;
    }

    if (!guess) {
        setWarning('fillInput');
        return;
    }

    if (guess < MIN_GUESS || guess > MAX_GUESS) {
        setWarning('invalidRange');
        return;
    }

    if (guess === state.secretNumber) {
        state.playerWin = true;
        state.messageKey = 'guessCorrect';
        updateHighscore();
    } else {
        decreaseScore();
        if (state.score === 0) {
            state.gameIsOver = true;
            state.messageKey = 'gameOver';
        } else {
            setWarning(guess > state.secretNumber ? 'guessHigh' : 'guessLow');

        }
    }

    updateUI();
}

export function resetGame() {
    initializeGameState();
    updateUI();
}