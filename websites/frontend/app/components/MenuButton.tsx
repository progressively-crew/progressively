import { Menu, Transition } from "@headlessui/react";
import { Link } from "@remix-run/react";
import React, { Fragment } from "react";
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
  position?: "right" | "left";
}

export const MenuButton = ({
  items,
  label,
  children,
  variant = "switch",
  icon,
  position = "left",
}: MenuButtonProps) => {
  let menuButtonClass =
    "h-10 flex justify-center flex-row items-center hover:bg-gray-50 rounded text-gray-700";

  if (children) {
    menuButtonClass += " text-sm gap-2 px-3";
  }

  return (
    <div className="relative">
      <Menu>
        {variant === "switch" ? (
          <Menu.Button className={menuButtonClass} aria-label={label}>
            {icon}
            {children && (
              <span className="hidden md:inline">
                <Typography as="span">{children}</Typography>
              </span>
            )}
            <RxCaretSort className="text-xl" />
          </Menu.Button>
        ) : (
          <Tooltip tooltip={<p>{label}</p>}>
            <Menu.Button className={menuButtonClass} aria-label={label}>
              {icon}
              {children && <Typography as="span">{children}</Typography>}
              <HiOutlineDotsVertical className="text-xl" />
            </Menu.Button>
          </Tooltip>
        )}

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={`${
              position === "left" ? "right-0" : ""
            } z-20 absolute mt-2 w-auto origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
          >
            {items.map((item) => (
              <Menu.Item key={item.label}>
                {({ active }) => {
                  const Root = item.onClick ? "button" : Link;

                  return (
                    <Root
                      className={`whitespace-nowrap flex gap-2 min-w-[200px] items-center first:rounded-t-md last:rounded-b-md px-3 py-3 text-sm text-gray-700 font-normal ${
                        active ? "bg-gray-100" : ""
                      }`}
                      to={item.href || ""}
                      onClick={item.onClick}
                    >
                      {item.icon && (
                        <IconBox content={item.label} size="S">
                          {item.icon}
                        </IconBox>
                      )}
                      {item.label}
                    </Root>
                  );
                }}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
