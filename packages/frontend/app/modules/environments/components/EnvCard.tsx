import { useRef } from "react";
import { Typography } from "~/components/Typography";
import { VisuallyHidden } from "~/components/VisuallyHidden";
import { Tag } from "~/components/Tag";
import { Link } from "~/components/Link";
import { Card, CardContent, CardHeader } from "~/components/CardGroup";

export interface EnvCardProps {
  id: string;
  linkTo: string;
  title: string;
  clientKey: string;
}

export const EnvCard = ({ id, linkTo, title, clientKey }: EnvCardProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);

  return (
    <Card onClick={() => linkRef?.current?.click()}>
      <CardHeader as="h3" id={`article-${id}`}>
        <Link ref={linkRef} to={linkTo}>
          {title} <VisuallyHidden>environment</VisuallyHidden>
        </Link>
      </CardHeader>

      <CardContent>
        <Typography>
          The environment sdk key is <Tag>{clientKey}</Tag>
        </Typography>
      </CardContent>
    </Card>
  );
};
