import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { styled } from "~/stitches.config";
import { Link } from "./Link";

export interface BackLinkProps {
  children: React.ReactNode;
  to: string;
}

const BackLinkWrapper = styled(Link, {
  "& svg": {
    marginRight: "$spacing$1",
  },
});

export const BackLink = ({ children, to }: BackLinkProps) => {
  return (
    <BackLinkWrapper to={to}>
      <HiOutlineArrowNarrowLeft aria-hidden />
      {children}
    </BackLinkWrapper>
  );
};
