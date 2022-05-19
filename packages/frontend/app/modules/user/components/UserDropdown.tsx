import { Button, Icon, Flex } from "@chakra-ui/react";
import { BiCaretDown } from "react-icons/bi";
import { Link } from "remix";
import { User } from "~/modules/user/types";
import { VisuallyHidden } from "~/components/VisuallyHidden";

export interface UserDropdownProps {
  user: User;
}

export const UseDropdown = ({ user }: UserDropdownProps) => {
  return (
    <Button
      size="lg"
      as={Link}
      to="/profile"
      variant="ghost"
      paddingInlineEnd={[0, 4]}
      rightIcon={
        <Icon display={["none", "block"]} as={BiCaretDown} aria-hidden />
      }
    >
      {user.fullname}

      <Flex
        display={["flex", "none"]}
        alignItems="center"
        justifyContent={"center"}
        as="span"
        borderRadius="50%"
        background="brand.300"
        h={"48px"}
        w={"48px"}
        color="white"
        fontSize={"xl"}
      >
        <span aria-hidden>{user.fullname.substring(0, 1)}</span>
        <VisuallyHidden>{user.fullname}</VisuallyHidden>
      </Flex>
    </Button>
  );
};
