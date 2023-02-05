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
  menu?: React.ReactNode;
}

export const CardEntity = ({
  title,
  description,
  avatar,
  link,
  actions,
  children,
  menu,
}: EntityProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleClick = link ? () => linkRef.current?.click() : undefined;
  return (
    <Card onClick={handleClick}>
      <Entity
        menu={menu}
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
  menu,
}: EntityProps) => {
  return (
    <CardContent>
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex flex-row gap-4 lg:w-[40%]">
          <div className="flex flex-col md:flex-row md:items-center gap-4 flex-1">
            {avatar}

            <div className="flex-1">
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

          {menu && <div className="md:hidden">{menu}</div>}
        </div>

        {children && <div className="mt-4 md:mt-0">{children}</div>}

        {(actions || menu) && (
          <div className="flex flex-row gap-8 items-center">
            {actions}
            {menu && <div className="hidden md:block">{menu}</div>}
          </div>
        )}
      </div>
    </CardContent>
  );
};
