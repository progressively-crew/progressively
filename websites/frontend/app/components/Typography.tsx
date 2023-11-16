import React, { ElementType } from "react";

export interface TypographyProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: ElementType;
}

export const Typography = ({
  className = "",
  as: asHTML,
  ...props
}: TypographyProps) => {
  const Root = asHTML || "p";

  return <Root {...props} className={`dark:text-gray-200 ${className}`} />;
};
