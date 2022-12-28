import React from "react";
import { HStack } from "./HStack";
import { Spacer } from "./Spacer";

export interface HeaderProps {
  title: string | React.ReactNode;
  description?: React.ReactNode;
  tagline?: React.ReactNode;
  action?: React.ReactNode;
}

export const Header = ({
  title,
  description,
  tagline,
  action,
}: HeaderProps) => {
  return (
    <header className="flex flex-row gap-4" aria-labelledby="header-title">
      <div>
        {tagline}
        <Spacer size={1} />
        <HStack spacing={6}>
          <p
            id="header-title"
            className="text-xl font-bold dark:text-slate-100"
          >
            {title}
          </p>
        </HStack>

        {description}
      </div>
      {action}
    </header>
  );
};
