import React, { useRef } from "react";
import { Form } from "remix";
import { FlagStatus } from "../types";
import { Switch } from "~/components/Switch";
import { Typography } from "~/components/Typography";
import { VisuallyHidden } from "~/components/VisuallyHidden";
import { Tag } from "~/components/Tag";
import { Link } from "~/components/Link";
import { Card, CardContent, CardHeader } from "~/components/CardGroup";
import { Spacer } from "~/components/Spacer";
import { styled } from "~/stitches.config";

const HeaderInline = styled("div", {
  display: "flex",
  gap: "$spacing$2",
  justifyContent: "space-between",
});

const Footer = styled("div", {
  display: "flex",
  justifyContent: "space-between",
});

export interface FlagCardProps {
  id: string;
  linkTo: string;
  description: React.ReactNode;
  title: string;
  flagStatus: FlagStatus;
  flagKey: string;
}

export const FlagCard = ({
  id,
  linkTo,
  description,
  title,
  flagStatus,
  flagKey,
}: FlagCardProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);

  return (
    <Card onClick={() => linkRef?.current?.click()}>
      <CardHeader>
        <span aria-hidden>
          <Tag>{flagKey}</Tag>
        </span>

        <VisuallyHidden>
          <p>The flag key is {flagKey}</p>
        </VisuallyHidden>
      </CardHeader>

      <Spacer size={2} />

      <CardHeader as="h3" id={`article-${id}`}>
        <HeaderInline>
          <Link ref={linkRef} to={linkTo}>
            {title} <VisuallyHidden>feature flag</VisuallyHidden>
          </Link>
        </HeaderInline>
      </CardHeader>

      <CardContent>
        <Typography>{description}</Typography>

        <Spacer size={8} />

        <Footer>
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
        </Footer>
      </CardContent>
    </Card>
  );
};
