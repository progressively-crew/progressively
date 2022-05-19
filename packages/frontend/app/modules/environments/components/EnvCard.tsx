import { Flex, Box, Icon } from "@chakra-ui/react";
import { useRef } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Typography } from "~/components/Typography";
import { VisuallyHidden } from "~/components/VisuallyHidden";
import { Tag } from "~/components/Tag";
import { Heading } from "~/components/Heading";
import { Link } from "~/components/Link";

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
          <Box mr={2} mb={1}>
            <Heading as="h3" id={`article-${id}`} size="md">
              <Link ref={linkRef} to={linkTo}>
                {title} <VisuallyHidden>environment</VisuallyHidden>
              </Link>
            </Heading>
          </Box>

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
