import { Flex, Heading, Icon, Link as CLink } from "@chakra-ui/react";
import React, { useRef } from "react";
import { Form, Link } from "remix";
import { Box, Text } from "@chakra-ui/react";
import { FlagStatus } from "./types";
import { Switch } from "~/components/Switch";
import { ButtonCopy } from "~/components/ButtonCopy";
import { BiKey } from "react-icons/bi";

export interface FlagCardProps {
  id: string;
  linkTo: string;
  description: React.ReactNode;
  title: string;
  flagStatus: FlagStatus;
  flagKey: string;
  optimistic: boolean;
}

export const FlagCard = ({
  id,
  linkTo,
  description,
  title,
  flagStatus,
  flagKey,
  optimistic,
}: FlagCardProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);

  return (
    <Box
      borderTopWidth={1}
      borderColor="background"
      p={4}
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
        background: "background",
      }}
    >
      <Flex justifyContent={"space-between"} direction={["column", "row"]}>
        <div>
          <Flex>
            <Heading as="h3" id={`article-${id}`} size="md" mr={2}>
              <CLink
                as={Link}
                textDecoration="underline"
                ref={linkRef}
                to={linkTo}
                color="brand.600"
              >
                {title}
              </CLink>
            </Heading>
            <Box display={["none", " block"]}>
              <ButtonCopy
                toCopy={flagKey}
                icon={<Icon as={BiKey} aria-hidden />}
              >
                {flagKey}
              </ButtonCopy>
            </Box>
          </Flex>

          <Text>{description}</Text>
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
