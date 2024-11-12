export const MIN_SCORE = 1;
export const MAX_SCORE = 100;
export const MIN_GUESS = 1;
export const MAX_GUESS = 20;
export const PENALTY = 10;

let state = {
    secretNumber: null,
    score: 0,
    highscore: 0,
    playerWin: false,
    gameIsOver: false
};

export function initializeGameState() {
    state.secretNumber = generateSecretNumber();
    state.score = MAX_SCORE;
    state.playerWin = false;
    state.gameIsOver = false;
}

export function getGameState() {
    return state;
}

export function decreaseScore() {
    state.score -= PENALTY;
    if (state.score < MIN_SCORE) state.score = 0;
}

export function updateHighscore() {
    if (state.score > state.highscore) {
        state.highscore = state.score;
    }
}

function generateSecretNumber() {
    return Math.trunc(Math.random() * MAX_GUESS + MIN_GUESS);
}