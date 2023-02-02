import React, { useRef } from "react";
import { Link } from "../Link";
import { Card, CardContent } from "../Card";

export interface EntityProps {
  title: React.ReactNode;
  link?: string;
  description?: React.ReactNode;
  avatar?: React.ReactNode;
  actions?: React.ReactNode;
  linkRef?: React.RefObject<HTMLAnchorElement>;
  children?: React.ReactNode;
}

export const CardEntity = ({
  title,
  description,
  avatar,
  link,
  actions,
  children,
}: EntityProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleClick = link ? () => linkRef.current?.click() : undefined;
  return (
    <Card onClick={handleClick}>
      <Entity
        title={title}
        description={description}
        avatar={avatar}
        link={link}
        actions={actions}
        linkRef={linkRef}
      >
        {children}
      </Entity>
    </Card>
  );
};

export const Entity = ({
  title,
  description,
  avatar,
  link,
  actions,
  linkRef,
  children,
}: EntityProps) => {
  return (
    <CardContent>
      <div className="flex flex-row items-center gap-4 justify-between">
        <div className="flex flex-row items-center gap-4">
          {avatar}
          <div className="space-y-1">
            <div className="font-medium leading-none dark:text-slate-200">
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

        {children}

        {actions && (
          <div className="flex flex-row gap-8 items-center">{actions}</div>
        )}
      </div>
    </CardContent>
  );
};
