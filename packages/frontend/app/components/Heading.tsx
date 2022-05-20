export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  size?: "lg" | "3xl" | "xl" | "md";
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const Heading: React.FC<HeadingProps> = (props) => {
  const Compo = props.as || "h2";
  return <Compo {...props} />;
};
