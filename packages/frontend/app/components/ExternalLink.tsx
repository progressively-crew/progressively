import { FiExternalLink } from "react-icons/fi";

export interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
}

export const ExternalLink = ({ href, children }: ExternalLinkProps) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children} <FiExternalLink aria-hidden />
    </a>
  );
};
