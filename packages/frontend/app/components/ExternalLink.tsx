import { FiExternalLink } from "react-icons/fi/index.js";
import { Link } from "./Link";

export interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
}

export const ExternalLink = ({ href, children }: ExternalLinkProps) => {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      <div>
        {children} <FiExternalLink aria-hidden />
      </div>
    </Link>
  );
};
