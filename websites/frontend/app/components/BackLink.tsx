import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { Button } from "./Buttons/Button";

export interface BackLinkProps {
  children: React.ReactNode;
  to: string;
  colorScheme?: "light" | "dark";
}

export const BackLink = ({
  children,
  to,
  colorScheme = "light",
}: BackLinkProps) => {
  return (
    <Button
      to={to}
      icon={<HiOutlineArrowNarrowLeft aria-hidden />}
      style={{ textAlign: "left", justifyContent: "flex-start" }}
      variant={colorScheme === "light " ? "tertiary" : "tertiary-inverse"}
    >
      {children}
    </Button>
  );
};
