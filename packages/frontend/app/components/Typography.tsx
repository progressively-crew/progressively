import React from "react";

export const Typography = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => {
  return <p {...props} className={"text-gray-500 " + (className || "")} />;
};
