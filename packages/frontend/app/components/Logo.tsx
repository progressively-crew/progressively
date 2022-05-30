import { Link } from "./Link";
import { Typography } from "./Typography";

export interface LogoProps {
  to?: string;
}
export const Logo = ({ to }: LogoProps) => (
  <Link to={to || "/dashboard"}>
    <Typography as="span">Progressively</Typography>
  </Link>
);
