import React from "react";

export const Typography = ({
  className,
  as: asHTML,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => {
  const Root = asHTML || "p";
  return (
    <Root {...props} className={"dark:text-gray-200 " + (className || "")} />
  );
};
