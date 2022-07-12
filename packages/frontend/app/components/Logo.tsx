import { styled } from "~/stitches.config";
import { Link } from "./Link";

export interface LogoProps {
  to?: string;
}

const LinkWrapper = styled(Link, {
  fontFamily: "Varela",
  letterSpacing: "2px",
  textDecoration: "none",
  color: "$title",
  transition: "all 0.1s",

  "&:hover": {
    transform: "scale(1.05)",
  },

  "& span:first-of-type": {
    color: "$hover",
  },
});

export const Logo = ({ to }: LogoProps) => {
  return (
    <LinkWrapper to={to || "/dashboard"}>
      <span>Progress</span>ively
    </LinkWrapper>
  );
};
