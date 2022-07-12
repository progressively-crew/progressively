import React, { useRef } from "react";
import { Typography } from "~/components/Typography";
import { VisuallyHidden } from "~/components/VisuallyHidden";
import { Link } from "~/components/Link";
import { styled } from "~/stitches.config";
import { ButtonCopy } from "~/components/ButtonCopy";
import { HideMobile } from "~/components/HideMobile";

const Wrapper = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr auto auto",
  gridColumnGap: "$spacing$8",
  gridRowGap: "$spacing$8",
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

  "@mobile": {
    padding: "$spacing$4",
  },
});

export interface ExperimentRowProps {
  id: string;
  linkTo: string;
  description: React.ReactNode;
  title: string;
  experimentKey: string;
}

export const ExperimentRow = ({
  id,
  linkTo,
  description,
  title,
  experimentKey,
}: ExperimentRowProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);

  return (
    <Wrapper onClick={() => linkRef?.current?.click()}>
      <div>
        <h3 id={`article-${id}`}>
          <Link ref={linkRef} to={linkTo}>
            {title} <VisuallyHidden>experiment</VisuallyHidden>
          </Link>
        </h3>

        <Typography size="small">{description}</Typography>
      </div>

      <HideMobile>
        <ButtonCopy toCopy={experimentKey}>{experimentKey}</ButtonCopy>
      </HideMobile>
    </Wrapper>
  );
};
