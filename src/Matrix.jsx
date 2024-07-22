import React, { useState } from "react";
import "./Matrix.css"; // Assuming you have an App.css file for styling

const Matrix = () => {
  // Initializing a 3x3 matrix with null values
  const initialMatrix = Array(3)
    .fill(null)
    .map(() => Array(3).fill(null));

  // State to keep track of the colors of the boxes
  const [matrix, setMatrix] = useState(initialMatrix);
  const [clickOrder, setClickOrder] = useState([]); // Track the order of clicks

  const handleClick = (rowIndex, colIndex) => {
    if (
      matrix[rowIndex][colIndex] !== "green" &&
      matrix[rowIndex][colIndex] !== "orange"
    ) {
      const newMatrix = matrix.map((row, rIdx) =>
        row.map((col, cIdx) => {
          if (rIdx === rowIndex && cIdx === colIndex) {
            return "green";
          }
          return col;
        })
      );

      setMatrix(newMatrix);

      // Track the clicked cell
      setClickOrder([...clickOrder, { rowIndex, colIndex }]);

      // If the last box is clicked
      if (rowIndex === 2 && colIndex === 2) {
        changeColorsToOrange([...clickOrder, { rowIndex, colIndex }]);
      }
    }
  };

  const changeColorsToOrange = (order) => {
    let newMatrix = [...matrix];
    order.forEach((click, index) => {
      setTimeout(() => {
        newMatrix[click.rowIndex][click.colIndex] = "orange";
        setMatrix([...newMatrix]); // Update the state after each color change
      }, index * 500); // Adjust timing as needed
    });
  };

  return (
    <div className="matrix">
      {matrix.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((color, colIndex) => (
            <div
              key={colIndex}
              className="box"
              style={{ backgroundColor: color || "white" }}
              onClick={() => handleClick(rowIndex, colIndex)}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Matrix;
