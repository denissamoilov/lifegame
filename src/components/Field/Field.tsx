import { HTMLAttributes } from "react";

type FieldProps = HTMLAttributes<HTMLDivElement>;

export const Field = ({ children }: FieldProps) => (
  <div className="flex flex-col gap-1 rounded-lg bg-white relative p-1 shadow-sm">
    {children}
  </div>
);
