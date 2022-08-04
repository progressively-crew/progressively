import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { Link } from "./Link";

export interface BackLinkProps {
  children: React.ReactNode;
  to: string;
}

export const BackLink = ({ children, to }: BackLinkProps) => {
  return (
    <Link to={to}>
      <HiOutlineArrowNarrowLeft aria-hidden />
      {children}
    </Link>
  );
};
