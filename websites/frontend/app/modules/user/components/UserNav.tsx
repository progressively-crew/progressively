import { FaBook } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { GoCommentDiscussion } from "react-icons/go";
import { NavItem } from "~/components/HorizontalNav";
import { useUser } from "../contexts/useUser";

export const UserNav = () => {
  const { user } = useUser();
  return (
    <nav aria-label="User related navigation">
      <ul className="flex flex-row gap-2 items-center">
        <NavItem
          to={"https://progressively.app/"}
          icon={<FaBook />}
          target="_blank"
        >
          Docs
        </NavItem>

        <NavItem
          to={"https://github.com/progressively-crew/progressively/issues"}
          icon={<GoCommentDiscussion />}
          target="_blank"
        >
          Send feedback
        </NavItem>

        <NavItem to="/dashboard/profile" icon={<AiOutlineUser />}>
          {user.fullname}
        </NavItem>
      </ul>
    </nav>
  );
};
