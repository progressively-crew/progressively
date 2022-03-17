import {
  Container,
  Flex,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Logo } from "~/components/Logo";
import { User } from "~/modules/user/types";

export interface DashboardLayoutProps {
  user: User;
  children: React.ReactNode;
}
export const DashboardLayout = ({ user, children }: DashboardLayoutProps) => {
  return (
    <div>
      <Container maxW="3xl">
        <Flex
          p={3}
          as={"nav"}
          aria-label="General navigation"
          justifyContent={"space-between"}
          alignItems="center"
        >
          <Logo />

          <Menu>
            <MenuButton
              as={Button}
              variant="ghost"
              leftIcon={<AiOutlineUser aria-hidden />}
            >
              {user.fullname}
            </MenuButton>
            <MenuList>
              <MenuItem as={Link} to="/profile">
                Profile
              </MenuItem>
              <MenuItem as={Link} to="/signout">
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Container>

      <Container maxW="3xl" pt={16} pb={4}>
        {children}
      </Container>
    </div>
  );
};
