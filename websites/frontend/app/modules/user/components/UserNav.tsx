import { FaBook } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { GoCommentDiscussion } from "react-icons/go";
import { useUser } from "../contexts/useUser";
import { Navbar } from "~/components/Navbar";
import { MenuButton } from "~/components/MenuButton";

export const UserNav = () => {
  const { user } = useUser();
  return (
    <Navbar label="User related navigation">
      <MenuButton
        items={[
          {
            label: "My profile",
            href: "/dashboard/profile",
            icon: <AiOutlineUser />,
          },
          {
            label: "Docs",
            href: "https://docs.progressively.app/",
            icon: <FaBook />,
          },

          {
            label: "Send feedback",
            href: "https://github.com/progressively-crew/progressively/issues",
            icon: <GoCommentDiscussion />,
          },
        ]}
        label={user.fullname}
        icon={<AiOutlineUser />}
      >
        {user.fullname}
      </MenuButton>
    </Navbar>
  );
};
