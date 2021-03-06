import { FiExternalLink } from "react-icons/fi";
import { styled } from "~/stitches.config";

const Link = styled("a", {
  color: "$textAccent",
  transition: "all 0.1s",

  "&:active": {
    opacity: 0.7,
  },

  "& svg": {
    verticalAlign: "text-top",
    fontSize: "$neptune",
    color: "$secondary",
  },
});

export interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
}

export const ExternalLink = ({ href, children }: ExternalLinkProps) => {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      {children} <FiExternalLink aria-hidden />
    </Link>
  );
};
