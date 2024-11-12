// UNDERSTANDING THE GAME
// When first opened, the game generates a random number between 1 and 20 and sets the score to 20.
// The prompt “Input a number between 1 and 20” blinks until the player focuses or hovers over it.
// If the player submits without entering a number, an alert animation plays.
// When a number is submitted, the game checks it against the secret number:
// If incorrect, the score decreases by 1, and the game indicates if the guess is too high or too low.
// If the player guesses correctly, a victory animation plays, and the score updates if it’s a new high score.
// The screen turns green and pauses until the player clicks "Again."
// If the score reaches zero, a game-over animation plays, and the screen turns red until "Again" is clicked.
// Clicking "Again" restarts the game with the current high score intact if it’s updated.