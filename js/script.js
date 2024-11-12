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


// PLAN THE ALGORITHM
// 1. Generate and store a random number between 1 and 20;
// 2. Set the score to 20;
// 3. Add animation to the text “Input a number between 1 and 20”;
// 4. If input gets focused, remove animation;
// 5. If user click the "Check" button, check if input has a number;
// 6. If input doesn't have a number, run the alert animation;
// 7. But if input has a number, check if the number provided is the same as the secret number;
// 8. If the player guesses correctly, play the victory animation and update the highscore if it is a new high score. Also, pause the game until the player clicks "Again" button.
// 9. But if the guessed number isn't the same as the secret number, decrease the score by one and check if score is above 0.
// 10. If the score is above 0, check if the guessed number is too high or too low compared to the secret number. Then, informs it to the user.
// 11. But if the score is not above 0, run the game-over animation, and pause the game until the user clicks the "Play Again" button.

// PLAN THE CODE ACHITECTURE
// Query the DOM
// Encapsulate state in an object
// Create function to reset the game
// Create function to generate a random number between 1 and 20
// Create a function to start or stop the text blinking animation
// Create a function to run the alert animation
// Create a function to run the victory animation
// Create a function to run the game-over animation
// Add event listeners to the DOM elements
