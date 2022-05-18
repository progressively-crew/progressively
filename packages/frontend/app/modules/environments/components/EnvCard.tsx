import { Flex, Heading, Link as CLink } from "@chakra-ui/react";
import { useRef } from "react";
import { Link } from "remix";
import { Box, Icon } from "@chakra-ui/react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Typography } from "~/components/Typography";
import { VisuallyHidden } from "~/components/VisuallyHidden";
import { Tag } from "~/components/Tag";

export interface EnvCardProps {
  id: string;
  linkTo: string;
  title: string;
  clientKey: string;
  noBorder?: boolean;
}

export const EnvCard = ({
  id,
  linkTo,
  title,
  clientKey,
  noBorder,
}: EnvCardProps) => {
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
        "& .arrow-forward": {
          transform: "translateX(30%)",
          color: "brand.400",
        },
      }}
      _focusWithin={{
        background: "background100",
        "& .arrow-forward": {
          transform: "translateX(30%)",
          color: "brand.400",
        },
      }}
      _active={{
        background: "background200",
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

          <Box as="span" display={["none", "inline"]}>
            <Typography color="textlight">
              The environment sdk key is <Tag>{clientKey}</Tag>
            </Typography>
          </Box>
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
