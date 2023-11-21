import { FaBook } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { FeedbackFish } from "@feedback-fish/react";
import { GoCommentDiscussion } from "react-icons/go";
import { NavItem } from "~/components/HorizontalNav";
import { useUser } from "../contexts/useUser";

export const UserNav = () => {
  const { user } = useUser();
  return (
    <ul className="flex flex-row gap-2 items-center">
      <NavItem
        to={"https://progressively.app/"}
        icon={<FaBook />}
        target="_blank"
      >
        Docs
      </NavItem>

      <li className="text-gray-700 dark:text-gray-300">
        <FeedbackFish projectId="012aac85b784ee">
          <button className="text-sm rounded cursor-pointer px-3 h-8 flex flex-row items-center gap-2 hover:bg-gray-50 hover:dark:bg-slate-700 w-full">
            <GoCommentDiscussion />
            Send feedback
          </button>
        </FeedbackFish>
      </li>

      <NavItem to="/dashboard/profile" icon={<AiOutlineUser />}>
        {user.fullname}
      </NavItem>
    </ul>
  );
};
