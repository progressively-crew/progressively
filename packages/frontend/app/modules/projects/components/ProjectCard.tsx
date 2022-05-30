import React, { useRef } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Typography } from "~/components/Typography";
import { VisuallyHidden } from "~/components/VisuallyHidden";
import { Link } from "~/components/Link";
import { Card, CardContent, CardHeader } from "~/components/CardGroup";

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
    <Card onClick={() => linkRef?.current?.click()}>
      <CardHeader as="h2" id={`article-${id}`}>
        <Link ref={linkRef} to={linkTo}>
          {title} <VisuallyHidden>project</VisuallyHidden>
        </Link>
      </CardHeader>

      <CardContent>
        <Typography>{description}</Typography>
      </CardContent>
    </Card>
  );
};
