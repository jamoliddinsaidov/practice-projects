# Card Memory Game

It is a classic card matching game. A user can see how many tries and how much time it takes to win the game, and can restart the game whenever they want.

## Preview

![Input Example](./images/demo.png 'Preview')

## User Stories

-   [x] User can see a grid with n x n cards (n is an integer). All the cards are faced down initially (hidden state).
-   [x] User can click a button to start the game. When this button is clicked, a timer will start.
-   [x] User can see the game statistics (number of tries, time counter).
-   [x] User can click on any card to unveil the image that is underneath it (change it to visible state). The image will be displayed until the user clicks on a 2nd card.

When the User clicks on the 2nd card:

-   [x] If there is a match, the 2 cards will be eliminated from the game (either hide/remove them or leave them in the visible state).
-   [x] If there isn't a match, the 2 cards will flip back to their original state (hidden state).
-   [x] When all the matches have been found, the user can see a dialog box showing a congratulations message with a counter displaying the time and tries it took to finish the game.
