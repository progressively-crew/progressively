import React from "react";

export const Typography = (
  props: React.HTMLAttributes<HTMLParagraphElement>
) => {
  return <p {...props} className="text-gray-600" />;
};
