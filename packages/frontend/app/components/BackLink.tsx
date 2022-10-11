import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { Button } from "./Buttons/Button";

export interface BackLinkProps {
  children: React.ReactNode;
  to: string;
}

export const BackLink = ({ children, to }: BackLinkProps) => {
  return (
    <Button
      to={to}
      icon={<HiOutlineArrowNarrowLeft aria-hidden />}
      style={{ textAlign: "left", justifyContent: "flex-start" }}
    >
      {children}
    </Button>
  );
};
