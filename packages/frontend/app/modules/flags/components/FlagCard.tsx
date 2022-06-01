import React, { useRef } from "react";
import { Form } from "remix";
import { FlagStatus } from "../types";
import { Switch } from "~/components/Switch";
import { Typography } from "~/components/Typography";
import { VisuallyHidden } from "~/components/VisuallyHidden";
import { Link } from "~/components/Link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/CardGroup";
import { Spacer } from "~/components/Spacer";
import { styled } from "~/stitches.config";
import { ButtonCopy } from "~/components/ButtonCopy";

const ToggleWrapper = styled("div", {
  display: "flex",
  gap: "$spacing$4",
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
      <Spacer size={2} />

      <CardHeader as="h3" id={`article-${id}`}>
        <Link ref={linkRef} to={linkTo}>
          {title} <VisuallyHidden>feature flag</VisuallyHidden>
        </Link>
      </CardHeader>

      <CardContent>
        <Typography>{description}</Typography>
      </CardContent>

      <Spacer size={4} />

      <CardFooter>
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

          <ToggleWrapper>
            <ButtonCopy size="xs" toCopy={flagKey}>
              {flagKey}
            </ButtonCopy>
            <Switch checked={flagStatus === FlagStatus.ACTIVATED} />
          </ToggleWrapper>
        </Form>
      </CardFooter>
    </Card>
  );
};
