import React, { useRef } from "react";
import { FlagStatus } from "../types";
import { Typography } from "~/components/Typography";
import { VisuallyHidden } from "~/components/VisuallyHidden";
import { Link } from "~/components/Link";
import { ButtonCopy } from "~/components/ButtonCopy";
import { HideMobile } from "~/components/HideMobile";

export interface FlagRowProps {
  id: string;
  linkTo: string;
  description: React.ReactNode;
  title: string;
  flagStatus: FlagStatus;
  flagKey: string;
}

export const FlagRow = ({
  id,
  linkTo,
  description,
  title,
  flagKey,
}: FlagRowProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);

  return (
    <div onClick={() => linkRef?.current?.click()}>
      <div>
        <h3 id={`article-${id}`}>
          <Link ref={linkRef} to={linkTo}>
            {title} <VisuallyHidden>feature flag</VisuallyHidden>
          </Link>
        </h3>

        <Typography size="small">{description}</Typography>
      </div>

      <HideMobile>
        <ButtonCopy toCopy={flagKey}>{flagKey}</ButtonCopy>
      </HideMobile>
    </div>
  );
};
