import { Link } from "./Link";
import { VisuallyHidden } from "./VisuallyHidden";

export interface LogoProps {
  to?: string;
}
export const Logo = ({ to }: LogoProps) => (
  <Link to={to || "/dashboard"}>
    <VisuallyHidden>Progressively</VisuallyHidden>
    <span>
      Progress
      <span>ively</span>
    </span>
  </Link>
);
