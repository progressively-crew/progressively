import { NavLink } from "remix";
import { styled } from "~/stitches.config";

const HorizontalNavWrapper = styled("nav", {
  "& ul": {
    background: "$backgroundAccent",
    display: "flex",
    padding: "$spacing$1",
    borderRadius: "$borderRadius$regular",
    alignItems: "center",
    gap: "$spacing$1",
  },

  "& ul li a": {
    display: "flex",
    fontFamily: "$default",
    padding: "$spacing$4 $spacing$5",
    alignItems: "center",
    textDecoration: "none",
    color: "$title",
    borderRadius: "$borderRadius$regular",
    cursor: "pointer",
  },

  "& ul li a:hover": {
    background: "$hover",
    color: "$primary",
  },

  "& ul li a:focus": {
    background: "$hover",
    color: "$primary",
  },

  "& ul li a.custom-nav-link.active": {},

  "& ul li svg": {
    marginRight: "$spacing$1",
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
      <NavLink to={to} className="custom-nav-link">
        <span style={{ display: "flex" }} aria-hidden>
          {icon}
        </span>
        {children}
      </NavLink>
    </li>
  );
};
