import { NavLink } from "@remix-run/react";
import { styled } from "~/stitches.config";
import { HStack } from "./HStack";

const HorizontalNavWrapper = styled("nav", {
  width: "220px",

  "& ul": {
    display: "flex",
    flexDirection: "column",
    gap: "$spacing$2",
  },

  "& ul li a": {
    display: "block",
    cursor: "pointer",
    fontFamily: "$default",
    textDecoration: "none",
    color: "$hades",
    padding: "$spacing$3 $spacing$4",
    borderRadius: "$borderRadius$regular",
    transition: "all 0.2s",
    fontSize: "$uranus",
  },

  "& ul li a:hover": {
    background: "$nemesisLight",
  },

  "& ul li a.active": {
    background: "$nemesisLight",
    fontWeight: "$bold",
    color: "$nemesis",
  },

  "& ul li a svg": {
    color: "$nemesis",
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
      <ul>{children}</ul>
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
