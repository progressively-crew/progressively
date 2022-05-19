import { Flex, Icon } from "@chakra-ui/react";
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
    <div>
      <Flex justifyContent="space-between">
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
