import { useMemo } from "react";
import { Button } from "../Button/Button";
import { Cell } from "../Cell/Cell";
import { useFilter } from "./useField";

// type FieldProps = {
//   matrix: { alive: boolean }[][];
//   onCellClick: ({ x, y }: { x: number; y: number }) => void;
// };

// * If a live cell has fewer than two live neighbors, it dies (underpopulation).
// * If a live cell has more than three live neighbors, it dies (overpopulation).
// * If a live cell has two or three live neighbors, it remains alive.
// * If a dead cell has exactly three live neighbors, it becomes alive (reproduction)

export const Field = () => {
  const {
    matrixArray,
    onCellClick,
    onStartHandle,
    onStopHandle,
    leftToSelect,
    readyToStart,
    gameStarted,
  } = useFilter();

  const matrix = useMemo(
    () => (
      <>
        {matrixArray.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1">
            {row.map((cell, colIndex) => (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                alive={cell.alive}
                x={colIndex}
                y={rowIndex}
                onChange={onCellClick}
              />
            ))}
          </div>
        ))}
      </>
    ),
    [matrixArray, onCellClick]
  );

  return (
    <div className="flex flex-col lg:flex-row gap-12 max-w-screen-lg px-8 items-start">
      <div className="flex flex-col gap-8 items-start">
        <h1>Conway's Game of Life</h1>
        <div className="flex flex-col gap-2">
          <h2>Rules:</h2>
          <ul>
            <li>
              If a live cell has fewer than two live neighbors, it dies
              (underpopulation).
            </li>
            <li>
              If a live cell has more than three live neighbors, it dies
              (overpopulation).
            </li>
            <li>
              If a live cell has two or three live neighbors, it remains alive.
            </li>
            <li>
              If a dead cell has exactly three live neighbors, it becomes alive
              (reproduction)
            </li>
          </ul>
        </div>
        <p>
          Please select <strong>{leftToSelect}</strong> fields
        </p>
        <div className="flex items-start gap-6">
          <Button
            onClick={onStartHandle}
            isDisabled={!readyToStart || gameStarted}
          >
            Start
          </Button>
          <Button
            onClick={onStopHandle}
            isDisabled={!readyToStart || !gameStarted}
          >
            Stop
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-1 rounded-lg bg-white relative p-1 shadow-sm">
        {matrix}
      </div>
    </div>
  );
};
