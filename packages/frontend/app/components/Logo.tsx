import { styled } from "~/stitches.config";
import { Link } from "./Link";
import { Tag } from "./Tag";

export interface LogoProps {
  to?: string;
}

const LinkWrapper = styled(Link, {
  fontFamily: "Varela",
  letterSpacing: "2px",
  textDecoration: "none",
  color: "$textAccent",
  transition: "all 0.1s",

  "&:hover": {
    transform: "scale(1.05)",
  },

  "& span:first-of-type": {
    color: "$secondary",
  },
});

export const Logo = ({ to }: LogoProps) => {
  return (
    <LinkWrapper to={to || "/dashboard"}>
      <span>Progress</span>ively <Tag>Alpha</Tag>
    </LinkWrapper>
  );
};
