import React from "react";

export interface CodeblockProps {
  html: string;
}

export const Codeblock = ({ html }: CodeblockProps) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      className="text-xs bg-white px-4 py-4"
    ></div>
  );
};
