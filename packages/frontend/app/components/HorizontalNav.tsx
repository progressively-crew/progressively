import { NavLink } from "@remix-run/react";
import { styled } from "~/stitches.config";

const HorizontalNavWrapper = styled("nav", {
  "& ul": {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },

  "& ul li a": {
    cursor: "pointer",
    display: "flex",
    fontFamily: "$default",
    paddingTop: "$spacing$4",
    paddingBottom: "$spacing$4",
    paddingLeft: "$spacing$4",
    paddingRight: "$spacing$6",
    alignItems: "center",
    textDecoration: "none",
    color: "$hades",
    borderBottom: "4px solid transparent",
    borderTop: "4px solid transparent",
    gap: "$spacing$2",
    transition: "border,box-shadow 0.2s",
    fontSize: "$jupiter",
    whiteSpace: "nowrap",
  },

  "& ul li a:hover": {
    borderBottomColor: "$nemesis",
    color: "$nemesis",
  },

  "& ul li a.active": {
    borderBottomColor: "$nemesis",
    color: "$nemesis",
  },

  "& ul li svg": {
    marginRight: "$spacing$1",
  },

  "@mobile": {
    "& ul": {
      overflow: "auto",
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
        <span aria-hidden>{icon}</span>
        {children}
      </NavLink>
    </li>
  );
};
