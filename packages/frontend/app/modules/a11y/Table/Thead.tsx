import React, { ReactNode, useEffect, useRef } from "react";
import { Checkbox } from "~/components/Checkbox";
import { useHydrated } from "~/modules/misc/hooks/useHydrated";
import { useSelections } from "./TableContext";
import { Th, Thead as CTHead, Tr, VisuallyHidden } from "@chakra-ui/react";

export interface TheadProps {
  children: React.ReactNode;
  disabled?: boolean;
}
export const Thead = ({ children, disabled }: TheadProps) => {
  const checkboxRef = useRef<HTMLInputElement>(null);
  const isHydrated = useHydrated();
  const { selections, onSelectAll, indeterminate } = useSelections();

  useEffect(() => {
    if (!checkboxRef.current) return;

    if (indeterminate) {
      checkboxRef.current.indeterminate = true;
    } else {
      checkboxRef.current.indeterminate = false;
    }
  }, [indeterminate]);

  const childrenClone = React.Children.toArray(children).map<ReactNode>(
    (node, index: number) =>
      React.isValidElement(node)
        ? React.cloneElement(node, {
            "aria-colindex": index + 2,
          })
        : null
  );

  return (
    <CTHead>
      <Tr aria-rowindex={1}>
        <Th aria-colindex={1}>
          <VisuallyHidden>
            <span id="select-all">
              Select {isHydrated ? "all" : "an element"}
            </span>
          </VisuallyHidden>

          {isHydrated && (
            <Checkbox
              ref={checkboxRef}
              checked={selections.length > 0}
              aria-labelledby={"select-all"}
              tabIndex={0}
              onChange={onSelectAll}
              value="select-all"
              name="select-all"
              disabled={disabled}
            />
          )}
        </Th>
        {childrenClone}
      </Tr>
    </CTHead>
  );
};
