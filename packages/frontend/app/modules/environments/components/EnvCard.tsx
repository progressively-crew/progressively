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
}

export const EnvCard = ({ id, linkTo, title, clientKey }: EnvCardProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);

  return (
    <div>
      <div>
        <Heading as="h3" id={`article-${id}`} size="md">
          <Link ref={linkRef} to={linkTo}>
            {title} <VisuallyHidden>environment</VisuallyHidden>
          </Link>
        </Heading>

        <Typography color="textlight">
          The environment sdk key is <Tag>{clientKey}</Tag>
        </Typography>
      </div>

      <AiOutlineArrowRight aria-hidden />
    </div>
  );
};
