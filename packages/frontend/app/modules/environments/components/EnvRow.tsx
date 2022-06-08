import { useRef } from "react";
import { VisuallyHidden } from "~/components/VisuallyHidden";
import { Link } from "~/components/Link";
import { ButtonCopy } from "~/components/ButtonCopy";
import { styled } from "~/stitches.config";

const Wrapper = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  borderBottom: "1px solid $border",
  padding: "$spacing$4 $spacing$8",
  cursor: "pointer",
  alignItems: "center",
  transition: "background 0.2s",

  "&:hover": {
    background: "$backgroundAccent",
  },
  "&:active": {
    background: "$border",
  },

  "& a": {
    color: "$title",
  },
});

export interface EnvCardProps {
  id: string;
  linkTo: string;
  title: string;
  clientKey: string;
}

export const EnvRow = ({ id, linkTo, title, clientKey }: EnvCardProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);

  return (
    <Wrapper onClick={() => linkRef?.current?.click()}>
      <h3 id={`article-${id}`}>
        <Link ref={linkRef} to={linkTo}>
          {title} <VisuallyHidden>environment</VisuallyHidden>
        </Link>
      </h3>

      <ButtonCopy toCopy={clientKey}>
        <VisuallyHidden>Sdk Key:</VisuallyHidden>
        {clientKey}
      </ButtonCopy>
    </Wrapper>
  );
};
