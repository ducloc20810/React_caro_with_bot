import React from "react";
import "./Column.css";
import { GiCircle } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
const Column = ({ rowIndex, col, clickSquare, colIndex }) => {
  return (
    <li className="col" onClick={() => clickSquare(rowIndex, colIndex)}>
      {col === "player" && <AiOutlineClose className="green" fontSize={100} />}
      {col === "bot" && <GiCircle className="red" fontSize={100} />}
    </li>
  );
};

export default Column;
