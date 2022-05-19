import { Flex, HStack } from "@chakra-ui/react";
import React, { useRef } from "react";
import { Form } from "remix";
import { FlagStatus } from "../types";
import { Switch } from "~/components/Switch";
import { Typography } from "~/components/Typography";
import { VisuallyHidden } from "~/components/VisuallyHidden";
import { Tag } from "~/components/Tag";
import { Heading } from "~/components/Heading";
import { Link } from "~/components/Link";

export interface FlagCardProps {
  id: string;
  linkTo: string;
  description: React.ReactNode;
  title: string;
  flagStatus: FlagStatus;
  flagKey: string;
  optimistic: boolean;
  noBorder?: boolean;
}

export const FlagCard = ({
  id,
  linkTo,
  description,
  title,
  flagStatus,
  flagKey,
  optimistic,
  noBorder,
}: FlagCardProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);

  return (
    <div>
      <Flex justifyContent={"space-between"} direction={["column", "row"]}>
        <div>
          <HStack spacing={[0, 2]} display={["block", "flex"]}>
            <Heading as="h3" id={`article-${id}`} size="md">
              <Link ref={linkRef} to={linkTo}>
                {title} <VisuallyHidden>feature flag</VisuallyHidden>
              </Link>
            </Heading>

            <span aria-hidden>
              <Tag>{flagKey}</Tag>
            </span>

            <VisuallyHidden>
              <p>The flag key is {flagKey}</p>
            </VisuallyHidden>
          </HStack>

          <Typography color="textlight">{description}</Typography>
        </div>

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

          <Switch
            type="submit"
            optimistic={optimistic}
            checked={flagStatus === FlagStatus.ACTIVATED}
          />
        </Form>
      </Flex>
    </div>
  );
};
