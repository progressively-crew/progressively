import { Heading } from "./Heading";

export const H1: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = (
  props
) => {
  return <Heading as="h1" id="page-title" size="3xl" {...props} />;
};
