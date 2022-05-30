import { NavLink } from "remix";
import { styled } from "~/stitches.config";

const HorizontalNavWrapper = styled("nav", {
  "& ul": {
    background: "$backgroundAccent",
    display: "flex",
    borderRadius: "$borderRadius$regular",
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
    color: "$title",
    borderBottom: "4px solid transparent",
    borderTop: "4px solid transparent",
    gap: "$spacing$2",
    transition: "border,box-shadow 0.2s",
    fontSize: "$content",
  },

  "& ul li:first-of-type a": {
    borderEndStartRadius: "$borderRadius$regular",
    borderStartStartRadius: "$borderRadius$regular",
  },

  "& ul li a:hover": {
    borderBottomColor: "$hover",
    color: "$hover",
  },

  "& ul li a.active": {
    borderBottomColor: "$hover",
    color: "$hover",
  },

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
