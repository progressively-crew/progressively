import { Main } from "~/components/Main";
import { User } from "~/modules/user/types";
import { UseDropdown } from "~/modules/user/components/UserDropdown";
import { SkipNavLink } from "~/components/SkipNav";
import { Container } from "~/components/Container";
import { Nav } from "~/components/Nav";
import { Spacer } from "~/components/Spacer";
import { NavProvider } from "~/components/Breadcrumbs/providers/NavProvider";
import { InertWhenNavOpened } from "~/components/Breadcrumbs/InertWhenNavOpened";
import { Menu } from "~/components/Menu";

export interface DashboardLayoutProps {
  user?: Partial<User>;
  children: React.ReactNode;
  breadcrumb?: React.ReactNode;
  header: React.ReactNode;
  subNav?: React.ReactNode;
  status?: React.ReactNode;
}

export const DashboardLayout = ({
  user,
  children,
  breadcrumb,
  header,
  subNav,
  status,
}: DashboardLayoutProps) => {
  return (
    <NavProvider>
      <div>
        <InertWhenNavOpened>
          <SkipNavLink>Skip to content</SkipNavLink>

          <Nav aria-label="General">
            <Menu hideOnMobile={!breadcrumb} />

            {user && user.fullname && <UseDropdown user={user as User} />}
          </Nav>

          <Spacer size={5} />
        </InertWhenNavOpened>

        {breadcrumb && <Container>{breadcrumb}</Container>}

        <InertWhenNavOpened>
          <Main>
            <Spacer size={6} />
            <Container>
              {header && (
                <>
                  {header}
                  <Spacer size={10} />
                </>
              )}

              {subNav && (
                <>
                  {subNav}
                  <Spacer size={8} />
                </>
              )}

              {status && (
                <>
                  {status}
                  <Spacer size={8} />
                </>
              )}

              {children}
            </Container>
          </Main>
        </InertWhenNavOpened>
      </div>
    </NavProvider>
  );
};
