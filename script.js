const cells = document.querySelectorAll('[data-cell]');
const resultMessage = document.getElementById('resultMessage');
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const player1NameDisplay = document.getElementById('player1Name');
const player2NameDisplay = document.getElementById('player2Name');
const player1ScoreDisplay = document.getElementById('player1Score');
const player2ScoreDisplay = document.getElementById('player2Score');
const startGameButton = document.getElementById('startGame');
const continueGameButton = document.getElementById('continueGame');
const newGameButton = document.getElementById('newGame');
const hurrayElement = document.getElementById('hurray');

let currentPlayer, player1Name, player2Name;
let player1Score = 0;
let player2Score = 0;
let boardState = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to show hurray animation
function showHurray() {
    hurrayElement.innerHTML = '🎉🎉 Hurray! 🎉🎉';
    hurrayElement.classList.add('show');
    setTimeout(() => {
        hurrayElement.classList.remove('show');
    }, 2000);  // Show for 2 seconds
}

// Function to check for winner
function checkWinner() {
    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return boardState[a];
        }
    }
    return boardState.includes('') ? null : 'Draw';
}

// Function to update the game status
function updateGameStatus() {
    const winner = checkWinner();
    if (winner) {
        gameActive = false;
        if (winner === 'X') {
            player1Score++;
            resultMessage.innerText = `${player1Name} Wins!`;
            showHurray();  // Show hurray for player 1
        } else if (winner === 'O') {
            player2Score++;
            resultMessage.innerText = `${player2Name} Wins!`;
            showHurray();  // Show hurray for player 2
        } else {
            resultMessage.innerText = "It's a Draw!";
        }
        updateScore();
        toggleGameButtons(true);  // Show Continue and New Game buttons
    }
}

// Function to update the score display
function updateScore() {
    player1ScoreDisplay.innerText = player1Score;
    player2ScoreDisplay.innerText = player2Score;
}

// Function to reset the board for the next round
function resetBoard() {
    boardState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('disabled');
    });
    resultMessage.innerText = '';
    currentPlayer = 'X';
    gameActive = true;
}

// Function to toggle visibility of game buttons
function toggleGameButtons(show) {
    continueGameButton.style.display = show ? 'inline-block' : 'none';
    newGameButton.style.display = show ? 'inline-block' : 'none';
}

// Handle cell click
function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (boardState[cellIndex] !== '' || !gameActive) return;

    boardState[cellIndex] = currentPlayer;
    cell.innerText = currentPlayer;
    cell.classList.add('disabled');

    updateGameStatus();

    if (gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

// Start the game with player names
startGameButton.addEventListener('click', () => {
    player1Name = player1Input.value || 'Player 1';
    player2Name = player2Input.value || 'Player 2';

    player1NameDisplay.innerText = `${player1Name}:`;
    player2NameDisplay.innerText = `${player2Name}:`;

    resetBoard();
    toggleGameButtons(false);  // Hide Continue and New Game buttons initially
});

// Add event listener to all cells
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

// Handle Continue Game button
continueGameButton.addEventListener('click', () => {
    resetBoard();
    toggleGameButtons(false);  // Hide buttons when continuing
});

// Handle New Game button
newGameButton.addEventListener('click', () => {
    player1Score = 0;
    player2Score = 0;
    updateScore();
    player1Input.value = '';
    player2Input.value = '';
    player1NameDisplay.innerText = 'Player 1: 0';
    player2NameDisplay.innerText = 'Player 2: 0';
    resultMessage.innerText = '';
    toggleGameButtons(false);  // Hide buttons
});
