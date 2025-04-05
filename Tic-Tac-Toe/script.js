// Selecting all the boxes (game board)
let Boxes = document.querySelectorAll('.box');

// Selecting the Reset and New Game buttons
let reset = document.querySelector("#Reset"); 
let newGamebtn = document.querySelector("#NewGame");

// Selecting the message container and message text
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

// Boolean variable to check if the game is against AI (false = Player vs Player, true = Player vs Computer)
let isComputer = false; 

// Boolean variable to track if the game is over
let GameOver = false;

// Selecting Player vs Player (PvP) and Player vs Computer (PvC) buttons
let PvP = document.querySelector('#PvP');
let PvC = document.querySelector('#PvC');

// Selecting the turn indicator text
let TurnIndicator = document.querySelector('#TurnIndicator');

// Boolean to track whose turn it is (true = O, false = X)
let turn0 = true;

// Winning combinations (indices of boxes)
const Winpattern = [
    [0,1,2], [0,3,6], [0,4,8], [1,2,7], 
    [2,5,8], [2,4,6], [3,4,5], [6,7,8]
];

// Function to update the turn indicator
const UpdateTurn = () => {
    TurnIndicator.innerText = turn0 ? "Turn: O" : "Turn: X";
};

// Event listener for Player vs Player mode
PvP.addEventListener("click", () => {
    isComputer = false;  // Set to Player vs Player
    ResetGame();  // Restart the game
});

// Event listener for Player vs Computer mode
PvC.addEventListener("click", () => {
    isComputer = true;  // Set to Player vs Computer
    ResetGame();  // Restart the game
});

// Function to reset the game
const ResetGame = () => {
    turn0 = true;  // Reset turn to Player O
    GameOver = false; // Reset game-over state
    EnableBtns();  // Enable all buttons
    msgContainer.classList.add("hide"); // Hide the winner message
    UpdateTurn(); // Update turn display
};

// Adding click event listeners to each box
Boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // If the game is over or the box is already filled, do nothing
        if (GameOver || box.innerText !== "") return;

        // Set the text to "O" or "X" based on the turn
        box.innerText = turn0 ? "O" : "X";
        box.disabled = true; // Disable the box after selection
        turn0 = !turn0; // Switch turn
        UpdateTurn(); // Update turn display
        CheckWinner(); // Check if the game is won

        // If playing against AI and it's AI's turn, let AI play
        if (isComputer && !GameOver && !turn0) {
            setTimeout(AIMove, 500); // Delay AI move for realism
        }
    });
});

// Function to find empty boxes
const findEmptyBoxes = () => {
    let emptyBoxes = [];
    for (let box of Boxes) {
        if (box.innerText === "") { // If the box is empty
            emptyBoxes.push(box);
        }
    }
    return emptyBoxes; // Return list of empty boxes
};

// Function to randomly select an empty box
const getRandomBox = (emptyBoxes) => {
    let randomIndex = Math.floor(Math.random() * emptyBoxes.length); // Pick random index
    return emptyBoxes[randomIndex]; // Return the random box
};

// AI Move function (Computer plays)
const AIMove = () => {
    let emptyBoxes = findEmptyBoxes(); // Get all available empty boxes

    if (emptyBoxes.length > 0) { // If there are empty boxes
        let chosenBox = getRandomBox(emptyBoxes); // AI picks one randomly
        chosenBox.innerText = "X";  // AI places "X"
        chosenBox.disabled = true;  // Disable the selected box
        turn0 = true;  // Give turn back to the player
        UpdateTurn();  // Update turn display
        CheckWinner();  // Check if AI wins
    }
};

// Function to check for a draw
const CheckDraw = () => {
    let isDraw = true;
    for (let box of Boxes) {       
        if (box.innerText === "") { // If there is any empty box, it's not a draw
            isDraw = false;
            break;
        }
    }
    if (isDraw) {
        msg.innerText = "It's a draw! Try again"; // Show draw message
        msgContainer.classList.remove("hide"); // Show message container
        GameOver = true; // Set game as over
    }
};

// Function to show the winner
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`; // Show winner message
    msgContainer.classList.remove("hide"); // Display the message container
    GameOver = true; // Stop further moves
};

// Function to disable all buttons (when game ends)
const DisableBtns = () => {
    for (let box of Boxes) {
        box.disabled = true;
    }
};

// Function to enable all buttons (for new game)
const EnableBtns = () => {
    for (let box of Boxes) {
        box.disabled = false;
        box.innerText = ""; // Clear all boxes
    }
};

// Function to check if someone has won
const CheckWinner = () => {
    let WinnerFound = false;
    for (let pattern of Winpattern) {
        let Pos1val = Boxes[pattern[0]].innerText;
        let Pos2val = Boxes[pattern[1]].innerText;
        let Pos3val = Boxes[pattern[2]].innerText;

        if (Pos1val !== "" && Pos1val === Pos2val && Pos2val === Pos3val) {
            console.log("Winner:", Pos1val);
            showWinner(Pos1val); // Announce winner
            DisableBtns(); // Disable further moves
            WinnerFound = true;
            break;
        }
    }
    if (!WinnerFound) {
        CheckDraw(); // If no winner, check for draw
    }
};

// Add event listeners to restart the game
newGamebtn.addEventListener("click", ResetGame);
reset.addEventListener("click", ResetGame);
