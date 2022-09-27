export function findBestSquareToClick(board, emptySquares, maxRow, maxCol) {
  let maxCount = 0;
  let pos = {
    row: emptySquares[0].row,
    col: emptySquares[0].col,
  };
  emptySquares.forEach((square) => {
    // Check horizontal
    const { row: currentRow, col: currentCol } = square;
    let count = 0;
    for (let col = 0; col < maxCol; col++) {
      if (board[currentRow][col] === "bot") {
        count++;
      }
    }

    if (count > maxCount) {
      maxCount = count;
      pos = {
        row: currentRow,
        col: currentCol,
      };
    }

    // Check vertical
    count = 0;

    for (let row = 0; row < maxRow; row++) {
      if (board[row][currentCol] === "bot") {
        count++;
      }
    }

    if (count > maxCount) {
      maxCount = count;
      pos = {
        row: currentRow,
        col: currentCol,
      };
    }

    // Check diogonal
    let emptySquareDiogonal = {
      row: 0,
      col: 0,
    };
    count = 0;
    // Check if item is on the main diogonal
    if (currentCol === currentRow) {
      // Check left diogonal
      for (let row = 0, col = 0; row < maxRow && col < maxCol; row++, col++) {
        if (board[row][col] === "bot") {
          count++;
        } else if (!board[row][col]) {
          emptySquareDiogonal = {
            row,
            col,
          };
        }
      }

      if (count > maxCount) {
        maxCount = count;
        pos = {
          row: emptySquareDiogonal.row,
          col: emptySquareDiogonal.col,
        };
      }
    }

    // Check right diogonal
    if (
      currentCol === maxRow - currentRow ||
      currentRow === maxCol - currentCol
    ) {
      count = 0;
      for (
        let row = 0, col = maxCol - 1;
        row < maxRow && col >= 0;
        row++, col--
      ) {
        if (board[row][col] === "bot") {
          count++;
        } else if (!board[row][col]) {
          emptySquareDiogonal = {
            row,
            col,
          };
        }
      }

      if (count > maxCount) {
        maxCount = count;
        pos = {
          row: emptySquareDiogonal.row,
          col: emptySquareDiogonal.col,
        };
      }
    }
  });

  return {
    maxCount,
    pos,
  };
}

export function findEmptySquares(board, maxRow, maxCol) {
  const emptySquares = [];

  for (let i = 0; i < maxRow; i++) {
    for (let j = 0; j < maxCol; j++) {
      if (!board[i][j]) {
        const pos = {
          row: i,
          col: j,
        };
        emptySquares.push(pos);
      }
    }
  }

  return emptySquares;
}

export function checkPlayerNearlyWin(board, emptySquares, maxRow, maxCol) {
  let posResult = { found: false };

  for (let square of emptySquares) {
    // Check horizontal

    const { row: currentRow, col: currentCol } = square;

    let count = 0;
    for (let col = 0; col < maxCol; col++) {
      if (board[currentRow][col] === "player") {
        count++;
      }
    }

    if (count === maxRow - 1) {
      posResult = { found: true, row: currentRow, col: currentCol };

      break;
    }

    // Check vertical
    count = 0;

    for (let row = 0; row < maxRow; row++) {
      if (board[row][currentCol] === "player") {
        count++;
      }
    }

    if (count === maxRow - 1) {
      posResult = { found: true, row: currentRow, col: currentCol };

      break;
    }

    // Check diogonal
    // Check if item is on the main diogonal

    count = 0;
    // if (currentCol !== currentRow) break;

    let emptySquareDiogonal = {};
    // Check left diogonal
    if (currentCol === currentRow) {
      for (let row = 0, col = 0; row < maxRow && col < maxCol; row++, col++) {
        if (board[row][col] === "player") {
          count++;
        } else if (!board[row][col]) {
          emptySquareDiogonal = {
            row,
            col,
          };
        }
      }

      if (count === maxRow - 1 && Object.keys(emptySquareDiogonal).length) {
        posResult = {
          found: true,
          row: emptySquareDiogonal.row,
          col: emptySquareDiogonal.col,
        };

        break;
      }
    }

    // Check right diogonal
    if (
      currentCol === maxRow - currentRow ||
      currentRow === maxCol - currentCol
    ) {
      count = 0;
      for (
        let row = 0, col = maxCol - 1;
        row < maxRow && col >= 0;
        row++, col--
      ) {
        if (board[row][col] === "player") {
          count++;
        } else if (!board[row][col]) {
          emptySquareDiogonal = {
            row,
            col,
          };
        }
      }

      if (count === maxRow - 1 && Object.keys(emptySquareDiogonal).length) {
        posResult = {
          found: true,
          row: emptySquareDiogonal.row,
          col: emptySquareDiogonal.col,
        };

        break;
      }
    }
  }

  console.log(posResult);

  return posResult;
}
