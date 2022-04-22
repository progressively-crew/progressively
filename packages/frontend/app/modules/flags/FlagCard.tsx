import {
  Flex,
  Heading,
  HStack,
  Link as CLink,
  Tag,
  VisuallyHidden,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { Form, Link } from "remix";
import { Box, Text } from "@chakra-ui/react";
import { FlagStatus } from "./types";
import { Switch } from "~/components/Switch";

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
      _active={{
        background: "background200",
      }}
    >
      <Flex justifyContent={"space-between"} direction={["column", "row"]}>
        <div>
          <HStack spacing={[0, 2]} display={["block", "flex"]}>
            <Heading as="h3" id={`article-${id}`} size="md" mr={2} mb={[2, 1]}>
              <CLink
                as={Link}
                textDecoration="underline"
                ref={linkRef}
                to={linkTo}
                color="brand.600"
              >
                {title} <VisuallyHidden>feature flag</VisuallyHidden>
              </CLink>
            </Heading>

            <Tag aria-hidden display={["none", "inline-flex"]}>
              {flagKey}
            </Tag>

            <VisuallyHidden>
              <p>The flag key is {flagKey}</p>
            </VisuallyHidden>
          </HStack>

          <Text color="textlight">{description}</Text>
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
