import React, { ElementType, forwardRef } from "react";

export interface TypographyProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: ElementType;
}

export const Typography = forwardRef(
  ({ className = "", as: asHTML, ...props }: TypographyProps, ref) => {
    const Root = asHTML || "p";

    return (
      <Root ref={ref} {...props} className={`text-gray-800 ${className}`} />
    );
  }
);

Typography.displayName = "Typography";
