import React, { ReactNode, useRef } from "react";
import { HTMLAttributes } from "react";
import { Checkbox } from "~/components/Checkbox";
import { VisuallyHidden } from "~/components/VisuallyHidden";
import { KeyboardKeys } from "../utils/keyboardKeys";
import { useSelections } from "./TableContext";

export interface RowProps extends HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode;
  selection: string;
  disabled?: boolean;
}
export const Row = ({ children, selection, disabled, ...props }: RowProps) => {
  const checkboxRef = useRef<HTMLInputElement>(null);
  const { onSelect, selections } = useSelections();

  const handleClick = (e: React.MouseEvent<HTMLTableRowElement>) => {
    if (!checkboxRef.current) return;

    const target = e.target as HTMLElement;
    if (target === checkboxRef.current) return;

    checkboxRef.current.click();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTableRowElement>) => {
    switch (e.key) {
      case KeyboardKeys.SPACE: {
        if (!checkboxRef.current) return;

        e.preventDefault();

        checkboxRef.current.click();

        break;
      }
      case KeyboardKeys.ENTER: {
        if (!checkboxRef.current) return;
        const target = e.target as HTMLElement;
        if (target === checkboxRef.current) return;
        e.preventDefault();

        checkboxRef.current.click();

        break;
      }
    }
  };

  const labelledby = `col-${selection}`;
  const childrenClone = React.Children.toArray(children).map<ReactNode>(
    (node, index: number) =>
      React.isValidElement(node)
        ? React.cloneElement(node, {
            "aria-colindex": index + 2,
            id: index === 0 ? labelledby : undefined,
          })
        : null
  );

  const isChecked = selections.indexOf(selection) > -1;

  const handleChange = () => {
    if (disabled) return;
    onSelect(selection);
  };

  return (
    <tr onClick={handleClick} onKeyDown={handleKeyDown} {...props}>
      <td aria-colindex={1}>
        <VisuallyHidden>
          <span id={`select-col-${selection}`}>Select</span>
        </VisuallyHidden>

        <Checkbox
          name={`checkbox-${selection}`}
          ref={checkboxRef}
          aria-labelledby={`select-col-${selection} ${labelledby}`}
          tabIndex={-1}
          checked={isChecked}
          onChange={handleChange}
          value={selection}
          disabled={disabled}
        />
      </td>

      {childrenClone}
    </tr>
  );
};
