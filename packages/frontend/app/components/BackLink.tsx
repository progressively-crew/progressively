import { MdChevronLeft } from "react-icons/md";
import { Link } from "remix";

export interface BackLinkProps {
  children: React.ReactNode;
  to: string;
}

export const BackLink = ({ children, to }: BackLinkProps) => {
  return (
    <div>
      <MdChevronLeft aria-hidden />
      <Link to={to}>{children}</Link>
    </div>
  );
};
