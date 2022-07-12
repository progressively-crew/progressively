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
