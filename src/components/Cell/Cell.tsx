import cx from "classnames";
import { useState } from "react";

type CellProps = {
  alive?: boolean;
  x: number;
  y: number;
};

export const Cell = ({ alive = false, x, y }: CellProps) => {
  const [active, setActive] = useState(alive);

  const onClickHandle = () => {
    setActive((prev) => !prev);
    console.log("x: ", x, " :: y:", y);
  };

  return (
    <div
      onClick={onClickHandle}
      className={cx(
        "rounded w-8 h-8 cursor-pointer ease-in transition-all",
        "hover:shadow-sm hover:bg-hover",
        active && "!bg-alive shadow-sm rounded-full",
        !active && "bg-dead"
      )}
    />
  );
};
