import { HTMLAttributes } from "react";

export interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  as?: "legend" | "span" | undefined;
  htmlFor?: string;
  className?: string;
}

export const Label = ({
  children,
  as: asComponent,
  htmlFor,
  className,
  ...props
}: LabelProps) => {
  const Component = asComponent || "label";

  return (
    <Component
      htmlFor={htmlFor}
      className={`text-gray-700 ${className || ""}`}
      {...props}
    >
      {children}
    </Component>
  );
};
