import { NavLink } from "@remix-run/react";
import { styled } from "~/stitches.config";

const HorizontalNavWrapper = styled("nav", {
  "& ul": {
    display: "flex",
    flexDirection: "column",
    gap: "$spacing$4",
    marginLeft: "-$spacing$4",
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
    color: "$textAccent",
    gap: "$spacing$2",
    transition: "border,box-shadow 0.2s",
    fontSize: "$uranus",
    whiteSpace: "nowrap",
    borderRadius: "$borderRadius$regular",
  },

  "& ul li a.active": {
    background: "$backgroundAccent",
    color: "$activeFg",
    fontWeight: "$bold",
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
