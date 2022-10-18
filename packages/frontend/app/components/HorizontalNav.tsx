import { NavLink } from "@remix-run/react";
import { styled } from "~/stitches.config";
import { HStack } from "./HStack";

const HorizontalNavWrapper = styled("nav", {
  paddingTop: "12px", // hack to stay fully aligned with the title of the page

  "& ul": {
    display: "flex",
    flexDirection: "column",
    gap: "$spacing$1",
  },

  "& ul li a": {
    borderRadius: "$borderRadius$regular",
    height: "$cta",
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    display: "flex",
    cursor: "pointer",
    fontFamily: "$default",
    textDecoration: "none",
    color: "$hades",
    padding: "0 $spacing$6",
    transition: "all 0.2s",
    fontSize: "$uranus",
  },

  "& ul li a:hover": {
    background: "$nemesisLight",
  },

  "& ul li a.active": {
    fontWeight: "$bold",
    color: "$nemesis",
    background: "$nemesisLight",
  },

  "& ul li a svg": {
    color: "$nemesis",
    fontSize: "$jupiter",
  },

  "@tablet": {
    overflow: "hidden",
    paddingTop: 0,
    marginTop: "2px",
    width: "100%",
    background: "$nemesisLight",

    "& ul": {
      flexDirection: "row",
      width: "100%",
    },

    "& ul li a": {
      borderBottom: "4px solid transparent",
      borderTop: "4px solid transparent",
      borderRadius: "unset",
    },

    "& ul li a.active": {
      borderBottom: "4px solid $nemesis",
    },
  },
});

export interface HorizontalNavProps {
  children: React.ReactNode;
  label: string;
}

export const HorizontalNav = ({ children, label }: HorizontalNavProps) => {
  return (
    <HorizontalNavWrapper aria-label={label}>
      <ul style={{ overflowX: "scroll" }}>{children}</ul>
    </HorizontalNavWrapper>
  );
};

export interface NavItemProps {
  children: React.ReactNode;
  to: string;
  icon: React.ReactNode;
}

export const NavItem = ({ children, to, icon }: NavItemProps) => {
  return (
    <li>
      <NavLink
        to={to}
        end
        className={({ isActive }) => (isActive ? "active" : undefined)}
      >
        <HStack spacing={2}>
          <span aria-hidden>{icon}</span>
          <span>{children}</span>
        </HStack>
      </NavLink>
    </li>
  );
};
