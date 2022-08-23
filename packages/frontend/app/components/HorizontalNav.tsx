import { NavLink } from "@remix-run/react";
import { styled } from "~/stitches.config";
import { HStack } from "./HStack";

const HorizontalNavWrapper = styled("nav", {
  "& ul": {
    display: "flex",
    flexDirection: "row",
    gap: "$spacing$2",
  },

  "& ul li a": {
    height: "$cta",
    display: "flex",
    cursor: "pointer",
    fontFamily: "$default",
    textDecoration: "none",
    color: "$hades",
    padding: "0 $spacing$4",
    transition: "all 0.2s",
    fontSize: "$uranus",
    borderTop: "4px solid transparent",
    borderBottom: "4px solid transparent",
  },

  "& ul li a.active": {
    background: "$nemesisLight",
    fontWeight: "$bold",
    color: "$nemesis",
    borderBottom: "4px solid $nemesis",
  },

  "& ul li a svg": {
    color: "$nemesis",
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
