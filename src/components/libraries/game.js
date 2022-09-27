export const checkRow = (board, row, turn) => {
  let count = 0;
  for (let col of board[row]) {
    if (col === turn) {
      count++;
    }
  }
  if (count === 3) return true;
  return false;
};

export const checkCol = (board, col, maxRow, turn) => {
  let count = 0;
  for (let row = 0; row < maxRow; row++) {
    if (board[row][col] === turn) {
      count++;
    }
  }
  if (count === 3) return true;
  return false;
};

export const checkDiagonal = (board, row, col, maxRow, maxCol, turn) => {
  let countLeft = 1;
  let countRight = 1;
  // Chéo trái xuống
  for (let i = row + 1, j = col - 1; i < maxRow && j >= 0; ++i, --j) {
    if (board[i][j] === turn) countLeft++;
  }

  // Chéo trái lên
  for (let i = row - 1, j = col + 1; i >= 0 && j < maxCol; --i, ++j) {
    if (board[i][j] === turn) countLeft++;
  }

  // Chéo phải xuống
  for (let i = row + 1, j = col + 1; i < maxRow && j < maxCol; ++i, ++j) {
    if (board[i][j] === turn) countRight++;
  }

  // Chéo phải lên
  for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; --i, --j) {
    if (board[i][j] === turn) countRight++;
  }

  if (countRight === maxRow || countLeft === maxRow) return true;
};

export const checkEnd = (board, maxRow, maxCol) => {
  let count = 0;
  for (let row = 0; row < maxRow; row++) {
    for (let col = 0; col < maxCol; col++) {
      if (board[row][col]) count++;
    }
  }
  if (count === maxRow * maxCol) return true;
  return false;
};
