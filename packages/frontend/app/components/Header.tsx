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
        {tagline}
        <Spacer size={1} />
        <HStack spacing={6}>
          <p id="header-title" className="text-xl font-bold">
            {title}
          </p>
        </HStack>
      </header>

      {description}
    </div>
  );
};
