import cx from "classnames";
import { MatrixType } from "../../types/types";

export type CellProps = {
  alive: boolean;
  x: number;
  y: number;
  onChange: ({ alive, x, y }: MatrixType) => void;
};

export const Cell = ({ alive = false, x, y, onChange }: CellProps) => {
  const onClickHandle = () => {
    onChange({ alive, x, y });
  };

  return (
    <div
      onClick={onClickHandle}
      className={cx(
        "w-8 h-8 cursor-pointer",
        "hover:shadow-sm hover:bg-hover",
        alive && "!bg-alive shadow-sm rounded-full",
        !alive && "bg-dead shadow-inner rounded"
      )}
    />
  );
};
