import { Flex, Icon } from "@chakra-ui/react";
import React, { useRef } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Typography } from "~/components/Typography";
import { VisuallyHidden } from "~/components/VisuallyHidden";
import { Heading } from "~/components/Heading";
import { Link } from "~/components/Link";

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
    <div>
      <Flex justifyContent="space-between">
        <div>
          <Heading as="h2" id={`article-${id}`} size="md">
            <Link ref={linkRef} to={linkTo}>
              {title} <VisuallyHidden>project</VisuallyHidden>
            </Link>
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
    </div>
  );
};
