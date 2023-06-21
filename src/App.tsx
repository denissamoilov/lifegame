import { useState } from "react";
import { Cell, Field } from "./components";

function App() {
  const [fieldSize, setFieldSize] = useState(10);

  return (
    <div className="flex justify-center items-center w-full h-full">
      <Field>
        {Array.from({ length: fieldSize }, (_, rowIndex) => (
          <div key={rowIndex} className="flex gap-1">
            {Array.from({ length: fieldSize }, (_, colIndex) => (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                alive={false}
                x={colIndex}
                y={rowIndex}
              />
            ))}
          </div>
        ))}
      </Field>
    </div>
  );
}

export default App;
