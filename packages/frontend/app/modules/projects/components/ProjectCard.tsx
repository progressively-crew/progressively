import { Flex, Heading, Icon, Link as CLink } from "@chakra-ui/react";
import React, { useRef } from "react";
import { Link } from "remix";
import { Box } from "@chakra-ui/react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Typography } from "~/components/Typography";
import { VisuallyHidden } from "~/components/VisuallyHidden";

export interface ProjectCardProps {
  id: string;
  linkTo: string;
  description: React.ReactNode;
  title: string;
  noBorder?: boolean;
}

export const ProjectCard = ({
  id,
  linkTo,
  description,
  title,
  noBorder,
}: ProjectCardProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);

  return (
    <Box
      borderTopWidth={noBorder ? 0 : 1}
      borderColor="background200"
      p={6}
      as="article"
      aria-labelledby={`article-${id}`}
      cursor="pointer"
      transition="background 0.3s"
      onClick={() => {
        linkRef.current?.click();
      }}
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
          <Heading as="h2" id={`article-${id}`} size="md" mb={2}>
            <CLink
              as={Link}
              textDecoration="underline"
              ref={linkRef}
              to={linkTo}
              color="brand.600"
            >
              {title} <VisuallyHidden>project</VisuallyHidden>
            </CLink>
          </Heading>

          <Typography color="textlight">{description}</Typography>
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
