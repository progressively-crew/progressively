import { Menu, Transition } from "@headlessui/react";
import { NavLink } from "@remix-run/react";
import React, { Fragment } from "react";
import { RxCaretSort } from "react-icons/rx";
import { InitialBox } from "./InitialBox";

interface MenuItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface MenuButtonProps {
  items: Array<MenuItem>;
  label: string;
}

export const MenuButton = ({ items, label }: MenuButtonProps) => {
  return (
    <div className="relative">
      <Menu>
        <Menu.Button
          className={
            "w-6 h-8 flex justify-center items-center hover:bg-gray-100 hover:dark:bg-slate-700 active:dark:bg-slate-600 transition-all rounded text-gray-500 dark:text-slate-200 text-xl"
          }
        >
          <RxCaretSort aria-label={label} />
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="z-20 absolute right-0 mt-2 w-auto origin-top-right divide-y divide-gray-100 dark:divide-slate-700 rounded-md bg-white dark:bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5">
            {items.map((item) => (
              <Menu.Item key={item.label}>
                {({ active }) => (
                  <NavLink
                    as={item.onClick ? "button" : undefined}
                    className={`flex gap-2 w-full items-center first:rounded-t-md last:rounded-b-md px-3 py-3 text-sm text-gray-700 dark:text-slate-200 font-normal focus:bg-gray-100 ${
                      active ? "bg-gray-100 dark:bg-slate-700" : ""
                    }`}
                    to={item.href || ""}
                    onClick={item.onClick}
                  >
                    <InitialBox content={item.label} size="S" />
                    {item.label}
                  </NavLink>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
