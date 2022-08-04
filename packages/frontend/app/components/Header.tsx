import { H1 } from "./H1";
import { Spacer } from "./Spacer";
import { TagLine } from "./Tagline";

export interface HeaderProps {
  title: string | React.ReactNode;
  description?: React.ReactNode;
  startAction?: React.ReactNode;
  tagline?: string;
}

export const Header = ({
  title,
  description,
  startAction,
  tagline,
}: HeaderProps) => {
  return (
    <div>
      <div>
        <H1>{title}</H1>
        {tagline && <TagLine>{tagline}</TagLine>}
      </div>

      {description || startAction ? <Spacer size={2} /> : null}

      {description}

      {startAction && <div>{startAction}</div>}
    </div>
  );
};
