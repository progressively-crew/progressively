import { Typography } from "./Typography";

export const H1: React.FC<React.HTMLAttributes<HTMLElement>> = (props) => {
  return <Typography as="h1" {...props} />;
};
