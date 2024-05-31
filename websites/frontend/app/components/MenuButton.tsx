import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import { Link } from "@remix-run/react";
import React, { ElementType } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { RxCaretSort } from "react-icons/rx";
import { Tooltip } from "./Tooltip/Tooltip";
import { IconBox } from "./IconBox";
import { Typography } from "./Typography";

interface MenuItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export interface MenuButtonProps {
  items: Array<MenuItem>;
  label: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  variant?: "action" | "switch";
}

export const MenuButton = ({
  items,
  label,
  children,
  variant = "switch",
  icon,
}: MenuButtonProps) => {
  let menuButtonClass =
    "h-10 flex justify-center flex-row items-center hover:bg-gray-50 rounded text-gray-700";

  if (children) {
    menuButtonClass += " text-sm gap-2 px-3";
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        {variant === "switch" ? (
          <button className={menuButtonClass} aria-label={label}>
            {icon}
            {children && (
              <span className="hidden md:inline">
                <Typography as="span">{children}</Typography>
              </span>
            )}
            <RxCaretSort className="text-xl" />
          </button>
        ) : (
          <div>
            <Tooltip tooltip={<p>{label}</p>}>
              <button className={menuButtonClass} aria-label={label}>
                {icon}
                {children && <Typography as="span">{children}</Typography>}
                <HiOutlineDotsVertical className="text-xl" />
              </button>
            </Tooltip>
          </div>
        )}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="w-auto rounded-md bg-white shadow-lg border border-gray-200"
          sideOffset={5}
        >
          {items.map((item) => {
            const Root = (item.onClick ? "button" : Link) as ElementType;

            return (
              <DropdownMenu.Item
                className="DropdownMenuItem"
                key={item.label}
                asChild
              >
                <Root
                  to={item.href || ""}
                  onClick={item.onClick}
                  className="whitespace-nowrap flex gap-2 min-w-[200px] items-center first:rounded-t-md last:rounded-b-md px-3 py-3 text-sm text-gray-700 font-normal"
                >
                  {item.icon && (
                    <IconBox content={item.label} size="S">
                      {item.icon}
                    </IconBox>
                  )}
                  {item.label}
                </Root>
              </DropdownMenu.Item>
            );
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
