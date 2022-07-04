import React, { useRef } from "react";
import { Typography } from "~/components/Typography";
import { VisuallyHidden } from "~/components/VisuallyHidden";
import { Link } from "~/components/Link";
import { styled } from "~/stitches.config";
import { ButtonCopy } from "~/components/ButtonCopy";
import { HideMobile } from "~/components/HideMobile";
import { Tag } from "~/components/Tag";

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

  "& h3": {
    fontSize: "$content",
    color: "$title",
    fontFamily: "$default",
    height: "$cta",
    alignItems: "center",
    display: "flex",
    gap: "$spacing$3",
  },

  "@mobile": {
    padding: "$spacing$4",
  },
});

export interface VariantRowProps {
  id: string;
  description: React.ReactNode;
  title: string;
  variantKey: string;
  isControl: boolean;
}

export const VariantRow = ({
  id,
  description,
  title,
  variantKey,
  isControl,
}: VariantRowProps) => {
  return (
    <Wrapper>
      <div>
        <h3 id={`article-${id}`}>
          {title} <VisuallyHidden>variant</VisuallyHidden>
          {isControl && <Tag>control variant</Tag>}
        </h3>

        <Typography size="small">{description}</Typography>
      </div>

      <HideMobile>
        <ButtonCopy toCopy={variantKey}>{variantKey}</ButtonCopy>
      </HideMobile>
    </Wrapper>
  );
};
