import { NavLink } from "@remix-run/react";
import { styled } from "~/stitches.config";
import { Container } from "./Container";
import { HStack } from "./HStack";

const HorizontalNavWrapper = styled("nav", {
  background: "$nemesisLight",

  "& ul": {
    display: "flex",
  },

  "& ul li a": {
    height: "calc($subnavHeight - 8px)", // 8px is the invisible border
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    display: "flex",
    cursor: "pointer",
    fontFamily: "$default",
    textDecoration: "none",
    color: "$hades",
    paddingRight: "$spacing$6",
    paddingLeft: "$spacing$2",
    borderTop: "4px solid transparent",
    borderBottom: "4px solid transparent",
    transition: "all 0.2s",
    fontSize: "$uranus",
  },

  "& ul li a:hover": {
    borderBottom: "4px solid $nemesis",
  },

  "& ul li a.active": {
    color: "$nemesis",
    borderBottom: "4px solid $nemesis",
  },

  "& ul li a svg": {
    color: "$nemesis",
    fontSize: "$jupiter",
  },

  "@tablet": {
    width: "100%",
    marginTop: "$spacing$4",
  },
});

export interface HorizontalNavProps {
  children: React.ReactNode;
  label: string;
}

export const HorizontalNav = ({ children, label }: HorizontalNavProps) => {
  return (
    <HorizontalNavWrapper aria-label={label}>
      <Container>
        <ul>{children}</ul>
      </Container>
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
      <NavLink to={to} end className={({ isActive }) => (isActive ? "active" : undefined)}>
        <HStack spacing={2}>
          <span aria-hidden>{icon}</span>
          <span>{children}</span>
        </HStack>
      </NavLink>
    </li>
  );
};
