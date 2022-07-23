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
import { styled } from "~/stitches.config";

export interface DashboardLayoutProps {
  user?: Partial<User>;
  children: React.ReactNode;
  breadcrumb?: React.ReactNode;
  header: React.ReactNode;
  subNav?: React.ReactNode;
  status?: React.ReactNode;
}

const ContentWrapper = styled("div", {
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  gap: "$spacing$10",
});

const MenuWrapper = styled("div", {
  width: "$menuWidth",
});

const BreadcrumbWrapper = styled("div", {
  background: "$secondary",
  padding: "$spacing$2 0",
});

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
        </InertWhenNavOpened>

        {breadcrumb && (
          <BreadcrumbWrapper>
            <Container>{breadcrumb}</Container>
          </BreadcrumbWrapper>
        )}

        <InertWhenNavOpened>
          <Spacer size={10} />
          <Container>
            <ContentWrapper>
              <div>{subNav && <MenuWrapper>{subNav}</MenuWrapper>}</div>
              <Main>
                {header && (
                  <>
                    {header}
                    <Spacer size={10} />
                  </>
                )}

                {status && (
                  <>
                    {status}
                    <Spacer size={8} />
                  </>
                )}

                {children}
              </Main>
            </ContentWrapper>
          </Container>
        </InertWhenNavOpened>
      </div>
    </NavProvider>
  );
};
