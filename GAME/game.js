const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessageText = document.getElementById("winningMessage");
const restartButton = document.getElementById("restartButton");

let isCircleTurn = false;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function startGame() {
  isCircleTurn = false;
  winningMessageText.classList.add("hide");

  cells.forEach(cell => {
    cell.classList.remove("x", "o");
    cell.textContent = ""; // Clear text content also
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = isCircleTurn ? "o" : "x";
  placeMark(cell, currentClass);

  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
  cell.textContent = currentClass.toUpperCase();
}

function swapTurns() {
  isCircleTurn = !isCircleTurn;
}

function checkWin(currentClass) {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains("x") || cell.classList.contains("o");
  });
}

function endGame(draw) {
  if (draw) {
    winningMessageText.textContent = "Draw!";
  } else {
    winningMessageText.textContent = `${isCircleTurn ? "O" : "X"} Wins!`;
  }
  winningMessageText.classList.remove("hide");
}

restartButton.addEventListener("click", startGame);

// Start game when page loads
startGame();