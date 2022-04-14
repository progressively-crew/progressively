import {
  Flex,
  Heading,
  Link as CLink,
  Tag,
  VisuallyHidden,
} from "@chakra-ui/react";
import { useRef } from "react";
import { Link } from "remix";
import { Box, Text, Icon } from "@chakra-ui/react";
import { AiOutlineArrowRight } from "react-icons/ai";

export interface EnvCardProps {
  id: string;
  linkTo: string;
  title: string;
  clientKey: string;
}

export const EnvCard = ({ id, linkTo, title, clientKey }: EnvCardProps) => {
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
        "& .arrow-forward": {
          transform: "translateX(30%)",
          color: "brand.400",
        },
      }}
      _active={{
        background: "background",
      }}
    >
      <Flex justifyContent="space-between">
        <div>
          <Heading as="h3" id={`article-${id}`} size="md" mr={2} mb={1}>
            <CLink
              as={Link}
              textDecoration="underline"
              ref={linkRef}
              to={linkTo}
              color="brand.600"
            >
              {title} <VisuallyHidden>environment</VisuallyHidden>
            </CLink>
          </Heading>

          <Text color="textlight" display={["none", "inline"]}>
            The environment sdk key is <Tag>{clientKey}</Tag>
          </Text>
        </div>

        <Icon
          transitionProperty={"transform,color"}
          transitionDuration="0.3s"
          className="arrow-forward"
          alignSelf="center"
          as={AiOutlineArrowRight}
          w={6}
          h={6}
          aria-hidden
          display={["none", "inline"]}
        />
      </Flex>
    </Box>
  );
};
