import { useRef } from "react";
import { VisuallyHidden } from "~/components/VisuallyHidden";
import { Link } from "~/components/Link";
import { ButtonCopy } from "~/components/ButtonCopy";

export interface EnvCardProps {
  id: string;
  linkTo: string;
  title: string;
  clientKey: string;
}

export const EnvRow = ({ id, linkTo, title, clientKey }: EnvCardProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);

  return (
    <div onClick={() => linkRef?.current?.click()}>
      <h3 id={`article-${id}`}>
        <Link ref={linkRef} to={linkTo}>
          {title} <VisuallyHidden>environment</VisuallyHidden>
        </Link>
      </h3>

      <ButtonCopy toCopy={clientKey}>
        <VisuallyHidden>Sdk Key:</VisuallyHidden>
        {clientKey}
      </ButtonCopy>
    </div>
  );
};
