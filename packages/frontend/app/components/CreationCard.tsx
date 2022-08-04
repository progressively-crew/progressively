import { useRef } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "./Link";

export interface EmptyCardProps {
  children: React.ReactNode;
  to: string;
}

export const CreationCard = ({ children, to }: EmptyCardProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);

  return (
    <div onClick={() => linkRef?.current?.click()}>
      <AiOutlinePlusCircle aria-hidden />
      <Link to={to} ref={linkRef}>
        {children}
      </Link>
    </div>
  );
};
