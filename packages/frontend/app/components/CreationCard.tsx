import { useRef } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { styled } from "~/stitches.config";
import { Card } from "./CardGroup";
import { Link } from "./Link";

export interface EmptyCardProps {
  children: React.ReactNode;
  to: string;
}

const Wrapper = styled(Card, {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  border: "8px solid $border",

  "& a": {
    color: "$title",
  },

  "& svg": {
    display: "block",
    color: "$title",
    fontSize: "$title",
    marginBottom: "$spacing$4",
  },
});

export const CreationCard = ({ children, to }: EmptyCardProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);

  return (
    <Wrapper onClick={() => linkRef?.current?.click()}>
      <AiOutlinePlusCircle aria-hidden />
      <Link to={to} ref={linkRef}>
        {children}
      </Link>
    </Wrapper>
  );
};
