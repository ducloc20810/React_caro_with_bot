import React from "react";
import Column from "../Column/Column";
import "./Row.css";
const Row = ({ row, clickSquare, rowIndex }) => {
  return (
    <ul className="row">
      {row.map((col, index) => (
        <Column
          rowIndex={rowIndex}
          colIndex={index}
          col={col}
          key={index}
          clickSquare={clickSquare}
        />
      ))}
    </ul>
  );
};

export default Row;
