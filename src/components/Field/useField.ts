import { useCallback, useEffect, useMemo, useState } from "react";
import { DELAY, FIELD_SIZE, MAX_SELECTED_FIELDS } from "../../constants/constants";
import { CoordinatesType, MatrixType } from "../../types/types";

const offsets = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];

export const useFilter = () => {
  const [fieldSize, setFieldSize] = useState(FIELD_SIZE);
  const [gameStarted, setGameStarted] = useState(false);

  const [selectedFields, setSelectedFields] = useState(0);
  const [matrixArray, setMatrixArray] = useState<MatrixType[][]>([]);
  const [activeCellMatrix, setActiveCellMatrix] = useState<MatrixType[]>([]);

  const checkNeighborStatus = useCallback(({ x, y }: CoordinatesType) =>
    matrixArray[y][x].alive, [matrixArray]);

  const checkCurrentCellStatus = useCallback(({ alive, x, y }: MatrixType) => {
    let aliveNeighborCounter = 0;

    offsets.map((o) => {
      const nX = x + o[0];
      const nY = y + o[1];
      if (nX >= 0 && nX < fieldSize && nY >= 0 && nY < fieldSize) {
        checkNeighborStatus({ x: nX, y: nY }) && aliveNeighborCounter++
      }
      return null;
    });

    if(aliveNeighborCounter < 2 || aliveNeighborCounter > 3) {
      return false
    } else if( !alive && aliveNeighborCounter === 3) {
      return true;
    } else if ( alive ) {
      return true;
    } else {
      return false;
    }
  }, [checkNeighborStatus, fieldSize]);

  const onCellClick = ({ alive, x, y }: MatrixType) => {
    const updatedMatrixArray = [...matrixArray];
    const updatedActiveCells = [...activeCellMatrix];

    if (selectedFields < MAX_SELECTED_FIELDS) {
      setSelectedFields((prev) => (!alive ? prev + 1 : prev - 1));
    } else if (alive) {
      setSelectedFields((prev) => prev - 1);
    } else {
      return false;
    }

    const existingIndex = activeCellMatrix.findIndex(item => item.x === x && item.y === y);

    if (existingIndex !== -1) {
      updatedActiveCells.splice(existingIndex, 1);
      updatedMatrixArray[y][x] = {alive: false, x, y };
    } else {
      updatedActiveCells.push({ alive: true, x, y });
      updatedMatrixArray[y][x] = {alive: true, x, y };
    }

    setActiveCellMatrix(updatedActiveCells);
    setMatrixArray(updatedMatrixArray);
  };

  const updateCells = useCallback(() => {
    setMatrixArray((matrixArray) => [...matrixArray].map((row) => row.map((cell) => {
        const isCellAlive = checkCurrentCellStatus(cell);
        return { ...cell, alive: isCellAlive }
      })  
    ))
  }, [checkCurrentCellStatus]);

  const onStartHandle = () => {
    setGameStarted(true);
    updateCells();
  };

  const onStopHandle = useCallback(() => setGameStarted(false), []);

  useEffect(
    () => {
      const interval = setInterval(() => {
        gameStarted && updateCells()
      }, DELAY);
      return () => clearInterval(interval);
    },
    [gameStarted, matrixArray, updateCells]
  );

  useEffect(() => {
    const initialMatrixArray = [];

    for (let i = 0; i < fieldSize; i++) {
      const row = [];
      for (let j = 0; j < fieldSize; j++) {
        row.push({ alive: false, x: j, y: i });
      }
      initialMatrixArray.push(row);
    }

    setMatrixArray(initialMatrixArray);
  }, [fieldSize]);

  const leftToSelect = useMemo(() => MAX_SELECTED_FIELDS - selectedFields, [selectedFields]);

  const readyToStart = useMemo(() => leftToSelect === 0, [leftToSelect]);

  return {
    gameStarted,
    matrixArray,
    onCellClick,
    onStartHandle,
    onStopHandle,
    readyToStart,
    leftToSelect
  }
}