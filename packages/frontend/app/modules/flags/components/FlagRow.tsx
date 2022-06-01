import React, { useRef } from "react";
import { Form } from "remix";
import { FlagStatus } from "../types";
import { Switch } from "~/components/Switch";
import { Typography } from "~/components/Typography";
import { VisuallyHidden } from "~/components/VisuallyHidden";
import { Link } from "~/components/Link";
import { styled } from "~/stitches.config";
import { ButtonCopy } from "~/components/ButtonCopy";

const Wrapper = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr auto auto",
  gridColumnGap: "$spacing$8",
  gridRowGap: "$spacing$8",
  borderBottom: "1px solid $border",
  padding: "0 $spacing$4 $spacing$2 $spacing$4",
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

export interface FlagRowProps {
  id: string;
  linkTo: string;
  description: React.ReactNode;
  title: string;
  flagStatus: FlagStatus;
  flagKey: string;
}

export const FlagRow = ({
  id,
  linkTo,
  description,
  title,
  flagStatus,
  flagKey,
}: FlagRowProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);

  return (
    <Wrapper onClick={() => linkRef?.current?.click()}>
      <div>
        <h3 id={`article-${id}`}>
          <Link ref={linkRef} to={linkTo}>
            {title} <VisuallyHidden>feature flag</VisuallyHidden>
          </Link>
        </h3>

        <Typography size="small">{description}</Typography>
      </div>

      <ButtonCopy toCopy={flagKey}>{flagKey}</ButtonCopy>

      <Form method="post">
        <input
          type="hidden"
          name="nextStatus"
          value={
            flagStatus === FlagStatus.ACTIVATED
              ? FlagStatus.NOT_ACTIVATED
              : FlagStatus.ACTIVATED
          }
        />
        <input type="hidden" name="flagId" value={id} />

        <Switch checked={flagStatus === FlagStatus.ACTIVATED} />
      </Form>
    </Wrapper>
  );
};
