import { HTMLAttributes } from "react";
import cx from "classnames";

type ButtonProps = {
  isDisabled?: boolean;
} & HTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  className,
  isDisabled,
  ...props
}: ButtonProps) => (
  <button
    className={cx(
      "font-medium bg-primary-300 text-white px-6 py-2 rounded-md",
      isDisabled && "cursor-default opacity-50",
      className
    )}
    disabled={isDisabled}
    {...props}
  >
    {children}
  </button>
);
