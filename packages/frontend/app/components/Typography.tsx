import { Text } from "@chakra-ui/react";
import { HTMLAttributes } from "react";

export interface TypographyProps extends HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  as?: any;
  fontSize?: "xl" | "sm";
  color?: "textlight";
}

export const Typography = ({
  children,
  as = "p",
  fontSize,
  color,
  ...props
}: TypographyProps) => {
  return (
    <Text as={as} fontSize={fontSize} textColor={color} {...props}>
      {children}
    </Text>
  );
};
