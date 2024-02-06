import React from "react";
import { Link } from "../Link";

export interface EntityProps {
  title: React.ReactNode;
  link?: string;
  description?: React.ReactNode;
  avatar?: React.ReactNode;
  actions?: React.ReactNode;
  linkRef?: React.RefObject<HTMLAnchorElement>;
  children?: React.ReactNode;
  menu?: React.ReactNode;
  breakAvatar?: boolean;
}

export const Entity = ({
  title,
  description,
  avatar,
  link,
  actions,
  linkRef,
  children,
  menu,
  breakAvatar,
}: EntityProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between p-4">
      <div className="flex flex-row gap-4 lg:w-[40%]">
        <div
          className={`flex ${
            breakAvatar
              ? "flex-col md:flex-row md:items-center"
              : description
              ? "flex-row items-start"
              : "flex-row items-center"
          }  gap-4 flex-1`}
        >
          {avatar}

          <div className="flex-1">
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
              <div className="text-sm text-slate-500 mt-1">{description}</div>
            )}
          </div>
        </div>

        {menu && <div className="md:hidden">{menu}</div>}
      </div>

      {children && (
        <div className="mt-4 md:mt-0 flex flex-col gap-2 md:flex-row justify-between flex-1">
          {children}
        </div>
      )}

      {(actions || menu) && (
        <div className="flex flex-row gap-8 items-center">
          {actions}
          {menu && <div className="hidden md:block">{menu}</div>}
        </div>
      )}
    </div>
  );
};
