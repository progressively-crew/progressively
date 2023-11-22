import { FaBook } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { FeedbackFish } from "@feedback-fish/react";
import { GoCommentDiscussion } from "react-icons/go";
import { NavItem } from "~/components/HorizontalNav";
import { useUser } from "../contexts/useUser";
import { ThemeSwitch } from "~/components/ThemeSwitch";

export const UserNav = () => {
  const { user } = useUser();
  return (
    <nav aria-label="User related navigation">
      <ul className="flex flex-row gap-2 items-center px-8">
        <li>
          <ThemeSwitch />
        </li>

        <NavItem
          to={"https://progressively.app/"}
          icon={<FaBook />}
          target="_blank"
        >
          Docs
        </NavItem>

        <li className="text-gray-700 dark:text-gray-300">
          <FeedbackFish projectId="012aac85b784ee">
            <button className="text-sm cursor-pointer px-3 py-2 border-t-2 border-b-2 border-transparent flex flex-row items-center gap-2 hover:bg-gray-100 hover:dark:bg-slate-700 w-full">
              <GoCommentDiscussion />
              Send feedback
            </button>
          </FeedbackFish>
        </li>

        <NavItem to="/dashboard/profile" icon={<AiOutlineUser />}>
          {user.fullname}
        </NavItem>
      </ul>
    </nav>
  );
};
