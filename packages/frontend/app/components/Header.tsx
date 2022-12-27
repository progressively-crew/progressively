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
    <div className="flex flex-row gap-4">
      <div>
        <header aria-labelledby="header-title">
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
        </header>

        {description}
      </div>
      {action}
    </div>
  );
};
