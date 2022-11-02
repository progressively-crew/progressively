export interface LabelProps {
  children: React.ReactNode;
  as?: "legend" | undefined;
  htmlFor?: string;
}

export const Label = ({ children, as: asComponent, htmlFor }: LabelProps) => {
  const Component = asComponent || "label";

  return (
    <Component id="content" htmlFor={htmlFor} className="font-semibold">
      {children}
    </Component>
  );
};
