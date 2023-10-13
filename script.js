let player1 = true;
let player2 = false;
let gameWon = false;

// Select all elements with class "cell" and convert NodeList to an array
const cells = Array.from(document.querySelectorAll(".cell"));

// Function to check for a winner
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            return cells[a].textContent;
        }
    }
}

// Click event handler function for cells
function cellClickHandler() {
    if (gameWon || this.textContent !== "") {
        return; // If there's a winner or the cell is already filled, return early
    }

    if (player1) {
        this.textContent = "X";
        player1 = false;
        player2 = true;
        document.querySelector(".turn").textContent = "player2 turn";
    } else if (player2) {
        this.textContent = "O";
        player1 = true;
        player2 = false;
        document.querySelector(".turn").textContent = "player1 turn";
    }

    const winner = checkWinner();
    if (winner) {
        gameWon = true;
        document.querySelector(".turn").textContent = "GAME OVER";
        document.querySelector(".result").textContent = `${winner} wins!`;
    }
}

// Loop through each cell and attach the click event listener
cells.forEach(cell => {
    cell.addEventListener("click", cellClickHandler);
});

document.querySelector(".restart").addEventListener("click", () => {
    // Reset the game by reloading the page
    location.reload();
});