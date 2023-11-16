import { HTMLAttributes } from "react";
import { CgSpinner } from "react-icons/cg";

export const Spinner = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={`animate-spin ${className || ""}`} aria-hidden {...props}>
      <CgSpinner />
    </div>
  );
};
