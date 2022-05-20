import React, { HTMLAttributes } from "react";

export interface TbodyProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}
export const Tbody = ({ children, ...props }: TbodyProps) => {
  const childrenClone = React.Children.toArray(children).map(
    (node, index: number) =>
      React.isValidElement(node)
        ? React.cloneElement(node, {
            "aria-rowindex": index + 2,
          })
        : null
  );

  return <tbody {...props}>{childrenClone}</tbody>;
};
