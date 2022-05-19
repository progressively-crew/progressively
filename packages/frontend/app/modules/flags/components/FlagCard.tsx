import { Flex, HStack, Box } from "@chakra-ui/react";
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
    <Box
      borderTopWidth={noBorder ? 0 : 1}
      borderColor="background200"
      p={6}
      as="article"
      aria-labelledby={`article-${id}`}
      cursor="pointer"
      onClick={() => {
        linkRef.current?.click();
      }}
      transition="background 0.3s"
      _hover={{
        background: "background100",
      }}
      _focusWithin={{
        background: "background100",
      }}
      _active={{
        background: "background200",
      }}
    >
      <Flex justifyContent={"space-between"} direction={["column", "row"]}>
        <div>
          <HStack spacing={[0, 2]} display={["block", "flex"]}>
            <Box as="span" mr={2} mb={[2, 1]}>
              <Heading as="h3" id={`article-${id}`} size="md">
                <Link ref={linkRef} to={linkTo}>
                  {title} <VisuallyHidden>feature flag</VisuallyHidden>
                </Link>
              </Heading>
            </Box>

            <Box as="span" aria-hidden display={["none", "inline-flex"]}>
              <Tag>{flagKey}</Tag>
            </Box>

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
    </Box>
  );
};
