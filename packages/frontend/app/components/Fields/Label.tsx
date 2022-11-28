import { HTMLAttributes } from "react";

export interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  as?: "legend" | "span" | undefined;
  htmlFor?: string;
}

export const Label = ({
  children,
  as: asComponent,
  htmlFor,
  ...props
}: LabelProps) => {
  const Component = asComponent || "label";

  return (
    <Component htmlFor={htmlFor} className="font-semibold" {...props}>
      {children}
    </Component>
  );
};
