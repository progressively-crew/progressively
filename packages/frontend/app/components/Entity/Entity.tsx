import React, { useRef } from "react";
import { Link } from "../Link";
import { Card, CardContent } from "../Card";

export interface EntityProps {
  title: string;
  link?: string;
  description?: React.ReactNode;
  avatar?: React.ReactNode;
  actions?: React.ReactNode;
}

export const Entity = ({
  title,
  description,
  avatar,
  link,
  actions,
}: EntityProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleClick = link ? () => linkRef.current?.click() : undefined;

  return (
    <Card onClick={handleClick}>
      <CardContent>
        <div className="flex flex-row items-center gap-4 justify-between">
          <div className="flex flex-row items-center gap-4">
            {avatar}
            <div className="space-y-1">
              <div className="font-medium leading-none">
                {link ? (
                  <Link ref={linkRef} to={link}>
                    {title}
                  </Link>
                ) : (
                  title
                )}
              </div>
              {description && (
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {description}
                </div>
              )}
            </div>
          </div>

          {actions && (
            <div className="flex flex-row gap-4 items-center">{actions}</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
