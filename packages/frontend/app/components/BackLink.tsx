import { HStack } from "@chakra-ui/react";
import { MdChevronLeft } from "react-icons/md";
import { Link } from "remix";

export interface BackLinkProps {
  children: React.ReactNode;
  to: string;
}

export const BackLink = ({ children, to }: BackLinkProps) => {
  return (
    <HStack>
      <MdChevronLeft aria-hidden />
      <Link to="/signin">Back to signin</Link>
    </HStack>
  );
};
