import { Typography } from "./Typography";

export const H1: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = (props) => {
  return (
    <Typography
      as="h1"
      id="page-title"
      size="mercury"
      font="title"
      color="hades"
      fontWeight="semiBold"
      lineHeight="title"
      {...props}
    />
  );
};
