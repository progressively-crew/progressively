import { NavLink } from "@remix-run/react";
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

  "& a:focus": {
    background: "$nemesisLight",
    borderLeft: "8px solid $nemesis",
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
    borderLeft: "8px solid transparent",

    "&:active": {
      color: "$nemesis",
    },
  },
});

export const Tree = ({ children, label }: TreeProps) => {
  return (
    <TreeWrapper role="tree" aria-label={label}>
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
}

const TreeItemLink = ({ children, to, onClick }: TreeItemLinkProps) => {
  const expanded = false;
  const id = useTreeItem();

  return (
    <NavLink end role="treeitem" aria-expanded={expanded} aria-owns={id} to={to} onClick={onClick}>
      {children}
    </NavLink>
  );
};

export interface TreeItemProps {
  children: React.ReactNode;
  group?: React.ReactNode;
  to: string;
  onClick?: () => void;
}

export const TreeItem = ({ children, group, to, onClick }: TreeItemProps) => {
  return (
    <TreeItemProvider>
      <li role="none">
        <TreeItemLink to={to} onClick={onClick}>
          {children}
        </TreeItemLink>
      </li>
      {group}
    </TreeItemProvider>
  );
};
