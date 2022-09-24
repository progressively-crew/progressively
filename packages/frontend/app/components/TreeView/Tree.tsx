import { NavLink } from "@remix-run/react";
import React from "react";
import { focusInTree } from "~/modules/misc/utils/focusInTree";
import { styled } from "~/stitches.config";
import { TreeItemProvider, useTreeItem } from "./TreeItemContext";

export interface TreeProps {
  children: React.ReactNode;
  label: string;
}

const TreeWrapper = styled("ul", {
  ul: {
    display: "flex",
    flexDirection: "column",
    gap: "1px",
  },

  "& a.active": {
    background: "$nemesisLight",
    color: "$nemesis",
    fontWeight: "$bold",
  },

  "& a:hover": {
    background: "$nemesisLight",
    borderLeft: "4px solid $nemesis",
  },

  "& a:focus-visible": {
    background: "$nemesisLight",
    borderLeft: "4px solid $nemesis",
    outline: "none",
    boxShadow: "unset",
  },

  "& a": {
    boxSizing: "border-box",
    width: "100%",
    padding: "0 $spacing$8",
    display: "inline-flex",
    fontSize: "$uranus",
    color: "$hades",
    fontFamily: "$default",
    height: "$ctaSmall",
    alignItems: "center",
    transition: "all 0.1s",
    borderLeft: "4px solid transparent",

    "&:active": {
      color: "$nemesis",
    },
  },
});

export const Tree = ({ children, label }: TreeProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    switch (e.key) {
      case "ArrowDown": {
        const tree = e.currentTarget;

        return focusInTree(tree, "li > a", 1);
      }

      case "ArrowUp": {
        const tree = e.currentTarget;

        return focusInTree(tree, "li > a", -1);
      }

      default:
        return;
    }
  };

  return (
    <TreeWrapper role="tree" aria-label={label} onKeyDown={handleKeyDown}>
      {children}
    </TreeWrapper>
  );
};

export const TreeGroup = ({ children, label }: TreeProps) => {
  const id = useTreeItem();

  return (
    <ul role="group" aria-label={label} id={id}>
      {children}
    </ul>
  );
};

export interface TreeItemLinkProps {
  children: React.ReactNode;
  to: string;
  onClick?: () => void;
  id?: string;
}

const TreeItemLink = ({
  children,
  to,
  onClick,
  id: actualId,
}: TreeItemLinkProps) => {
  const expanded = false;
  const id = useTreeItem();

  return (
    <NavLink
      end
      role="treeitem"
      aria-expanded={expanded}
      aria-owns={id}
      to={to}
      onClick={onClick}
      id={actualId}
    >
      {children}
    </NavLink>
  );
};

export interface TreeItemProps {
  children: React.ReactNode;
  group?: React.ReactNode;
  to: string;
  onClick?: () => void;
  id?: string;
}

export const TreeItem = ({
  children,
  group,
  to,
  onClick,
  id,
}: TreeItemProps) => {
  return (
    <TreeItemProvider>
      <li role="none">
        <TreeItemLink to={to} onClick={onClick} id={id}>
          {children}
        </TreeItemLink>
      </li>
      {group}
    </TreeItemProvider>
  );
};
