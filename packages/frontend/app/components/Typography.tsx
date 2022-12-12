import React from "react";

export const Typography = ({
  className,
  as: asHTML,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => {
  const Root = asHTML || "p";
  return <Root {...props} className={"text-gray-500 " + (className || "")} />;
};
