import { NavLink } from "@remix-run/react";
import { HStack } from "./HStack";
import { FaBook } from "react-icons/fa/index.js";
import { AiOutlineUser } from "react-icons/ai/index.js";
import { FeedbackFish } from "@feedback-fish/react";
import { GoCommentDiscussion } from "react-icons/go/index.js";

export interface HorizontalNavProps {
  children: React.ReactNode;
  label: string;
}

export const HorizontalNav = ({ children, label }: HorizontalNavProps) => {
  return (
    <nav
      aria-label={label}
      className="pb-4 flex flex-col gap-4"
      style={{ height: "calc(100% - 72px)" }}
    >
      <ul className="flex flex-col gap-1 pt-4 flex-1">{children}</ul>
      <ul className="border-t border-slate-200 dark:border-slate-700 pt-4 flex flex-col gap-1">
        <NavItem
          to={"https://progressively.app/"}
          icon={<FaBook />}
          target="_blank"
        >
          Documentation
        </NavItem>

        <li className="text-gray-700 dark:text-gray-300 px-4">
          <FeedbackFish projectId="012aac85b784ee">
            <button className="text-sm rounded cursor-pointer px-3 h-8 flex flex-row items-center gap-2 hover:bg-gray-50 hover:dark:bg-slate-700 w-full">
              <GoCommentDiscussion />
              Send feedback
            </button>
          </FeedbackFish>
        </li>

        <NavItem to="/dashboard/profile" icon={<AiOutlineUser />}>
          My profile
        </NavItem>
      </ul>
    </nav>
  );
};

export interface NavItemProps {
  children: React.ReactNode;
  to: string;
  icon?: React.ReactNode;
  target?: string;
}

export const NavItem = ({ children, to, icon, target }: NavItemProps) => {
  const focusStyles =
    "focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:focus:ring-offset-slate-900";

  return (
    <li className="px-4">
      <NavLink
        to={to}
        end
        target={target}
        className={({ isActive }) =>
          isActive
            ? "text-sm font-bold h-8 block flex items-center rounded px-3 bg-gray-100 text-gray-700 dark:bg-slate-600 dark:text-slate-50 " +
              focusStyles
            : "text-sm h-8 block flex items-center rounded px-3 text-gray-700 hover:bg-gray-50 hover:dark:bg-slate-700 dark:text-gray-300 " +
              focusStyles
        }
      >
        <HStack spacing={2}>
          {icon}
          {children}
        </HStack>
      </NavLink>
    </li>
  );
};
