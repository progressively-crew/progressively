import { FiExternalLink } from "react-icons/fi";
import { styled } from "./stitches.config";
import { Link } from "./Link";

const Wrapper = styled("span", {
  "& svg": {
    verticalAlign: "text-top",
    fontSize: "$neptune",
    color: "$nemesis",
  },
});

export interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
}

export const ExternalLink = ({ href, children }: ExternalLinkProps) => {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      <Wrapper>
        {children} <FiExternalLink aria-hidden />
      </Wrapper>
    </Link>
  );
};
