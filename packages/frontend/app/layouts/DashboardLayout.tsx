import { Logo } from "~/components/Logo";
import { Main } from "~/components/Main";
import { User } from "~/modules/user/types";
import { UseDropdown } from "~/modules/user/components/UserDropdown";
import { SkipNavLink } from "~/components/SkipNav";
import { Container } from "~/components/Container";

export interface DashboardLayoutProps {
  user?: Partial<User>;
  children: React.ReactNode;
  breadcrumb?: React.ReactNode;
  header: React.ReactNode;
  subNav?: React.ReactNode;
}

export const DashboardLayout = ({
  user,
  children,
  breadcrumb,
  header,
  subNav,
}: DashboardLayoutProps) => {
  return (
    <div>
      <SkipNavLink>Skip to content</SkipNavLink>

      <Container>
        <nav aria-label="General">
          <Logo />

          {user && user.fullname && <UseDropdown user={user as User} />}
        </nav>

        {breadcrumb}
      </Container>

      <Main>
        <Container>{header}</Container>
        {subNav}

        <Container>{children}</Container>
      </Main>
    </div>
  );
};
