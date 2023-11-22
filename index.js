const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resultElem = document.getElementById('result');
const resetBtn = document.getElementById('resetBtn');

let currentPlayer = 'X';
let moves = 0;
let gameEnded = false;

// Game logic object
const gameLogic = {
  winConditions: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ],

  checkWinner() {
    for (let condition of this.winConditions) {
      const [a, b, c] = condition;
      if (
        cells[a].textContent !== '' &&
        cells[a].textContent === cells[b].textContent &&
        cells[a].textContent === cells[c].textContent
      ) {
        return cells[a].textContent;
      }
    }
    return null;
  }
};

// Function to handle cell click
function handleCellClick(event) {
  const cell = event.target;
  const cellIndex = Array.from(cells).indexOf(cell);

  if (!gameEnded && cell.textContent === '') {
    cell.textContent = currentPlayer;
    moves++;

    const winner = gameLogic.checkWinner();
    if (winner) {
      endGame(`Player ${winner} wins!`, onGameEnd);
    } else if (moves === 9) {
      endGame("It's a draw!", onGameEnd);
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
}

// Function to end the game using a promise and callback
function endGame(message, callback) {
  return new Promise((resolve) => {
    gameEnded = true;
    resultElem.textContent = message;
    setTimeout(() => {
      onGameEnd(callback);
    }, 100);
  });
}

// Function to reset the game
function resetGame() {
  cells.forEach((cell) => {
    cell.textContent = '';
  });
  currentPlayer = 'X';
  moves = 0;
  gameEnded = false;
  resultElem.textContent = '';
}

// Callback function for ending the game
function onGameEnd() {
  // Use an alert to notify players that the game has ended
  alert('The game has ended');
}

// Add event listeners
cells.forEach((cell) => {
  cell.addEventListener('click', handleCellClick);
});

resetBtn.addEventListener('click', resetGame);
