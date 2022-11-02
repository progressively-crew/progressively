import { H1 } from "./H1";
import { HStack } from "./HStack";
import { Spacer } from "./Spacer";

export interface HeaderProps {
  title: string | React.ReactNode;
  description?: React.ReactNode;
  tagline?: React.ReactNode;
}

export const Header = ({ title, description, tagline }: HeaderProps) => {
  return (
    <div>
      <header aria-labelledby="header-title">
        <HStack spacing={6}>
          <H1 as="p" id="header-title">
            {title}
          </H1>
        </HStack>

        <Spacer size={1} />
        {tagline}
      </header>

      {description}
    </div>
  );
};
