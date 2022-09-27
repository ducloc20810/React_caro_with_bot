import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Row from "./components/Row/Row";
import {
  checkPlayerNearlyWin,
  findBestSquareToClick,
  findEmptySquares,
} from "./components/libraries/bot";

import {
  checkCol,
  checkRow,
  checkDiagonal,
  checkEnd,
} from "./components/libraries/game";
const maxRow = 3;
const maxCol = maxRow;
function App() {
  const [board, setBoard] = useState(
    Array.from({ length: maxRow }, () =>
      Array.from({ length: maxCol }, () => "")
    )
  );

  const [winner, setWinner] = useState(null);
  const [isEnd, setIsEnd] = useState(false);

  const [turn, setTurn] = useState("player");
  const [isCheckWinner, setIsCheckWinner] = useState(false);

  const checkWinner = useCallback(
    (row, col) => {
      // Check row
      setIsCheckWinner(true);

      if (checkRow(board, row, turn)) {
        setWinner(turn);
        return;
      }

      if (checkCol(board, col, maxRow, turn)) {
        setWinner(turn);
        return;
      }

      if (checkDiagonal(board, row, col, maxRow, maxCol, turn)) {
        setWinner(turn);
        return;
      }

      if (checkEnd(board, maxRow, maxCol)) {
        setIsEnd(true);
        return;
      }

      setTurn((turn) => (turn === "player" ? "bot" : "player"));
      setIsCheckWinner(false);
    },
    [board, turn]
  );

  const clickSquare = useCallback(
    (row, col) => {
      const updatedBoard = [...board];

      if (updatedBoard[row][col]) return;
      updatedBoard[row][col] = turn;

      setBoard(updatedBoard);
      checkWinner(row, col);
    },
    [board, checkWinner, turn]
  );

  const resetState = () => {
    setWinner(null);
    setIsEnd(false);
    setTurn("player");
    setBoard(
      Array.from({ length: maxRow }, () =>
        Array.from({ length: maxCol }, () => "")
      )
    );
    setIsCheckWinner(false);
  };

  useEffect(() => {
    if (winner) {
      setTimeout(() => {
        alert(`${winner} has win the game!!!`);
        resetState();
      }, 100);
    }
  }, [winner]);

  useEffect(() => {
    if (isEnd) {
      setTimeout(() => {
        alert(`Game is ended`);
        resetState();
      }, 100);
    }
  }, [isEnd]);

  // Bot fight
  useEffect(() => {
    if (turn === "player" || isCheckWinner) return;

    // Find empty square
    console.log("bot turn");
    const emptySquares = findEmptySquares(board, maxRow, maxCol);
    let endTurn = false;

    // Find best square to click
    const { maxCount, pos } = findBestSquareToClick(
      board,
      emptySquares,
      maxRow,
      maxCol
    );

    // Check if bot nearly win
    if (maxCount === maxRow - 1) {
      clickSquare(pos.row, pos.col);
      endTurn = true;
      console.log("bot try to win");
      return;
    }

    // Check if player is nearly win
    const playerBlockPos = checkPlayerNearlyWin(
      board,
      emptySquares,
      maxRow,
      maxCol
    );
    if (playerBlockPos.found) {
      clickSquare(playerBlockPos.row, playerBlockPos.col);
      endTurn = true;
    }

    // Click
    if (!endTurn) {
      clickSquare(pos.row, pos.col);
      console.log("Bot click");
    }

    return () => {
      endTurn = false;
    };
  }, [turn, clickSquare, board, isCheckWinner]);

  return (
    <div className="App">
      <h1>Caro (Player vs Bot)</h1>
      {board.map((row, index) => (
        <Row row={row} key={index} clickSquare={clickSquare} rowIndex={index} />
      ))}
    </div>
  );
}

export default App;
