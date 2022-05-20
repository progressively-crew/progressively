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
}

export const ProjectCard = ({
  id,
  linkTo,
  description,
  title,
}: ProjectCardProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);

  return (
    <div>
      <div>
        <Heading as="h2" id={`article-${id}`} size="md">
          <Link ref={linkRef} to={linkTo}>
            {title} <VisuallyHidden>project</VisuallyHidden>
          </Link>
        </Heading>

        <Typography color="textlight">{description}</Typography>
      </div>

      <AiOutlineArrowRight aria-hidden />
    </div>
  );
};
