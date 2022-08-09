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

const PageWrapper = styled("div", {
  display: "flex",
  flexDirection: "row",
  gap: "$spacing$12",
  "@tablet": {
    flexDirection: "column",
  },
});

const HeaderWrapper = styled("div", {
  background: "$apollo",

  variants: {
    hasBreadcrumbs: {
      true: { padding: "$spacing$4 0 $spacing$10 0" },
      false: { padding: "$spacing$10 0 $spacing$10 0" },
    },
  },
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

        <HeaderWrapper hasBreadcrumbs={Boolean(breadcrumb)}>
          {breadcrumb && (
            <Container>
              {breadcrumb}
              <Spacer size={4} />
            </Container>
          )}

          <Container>
            <header>{header}</header>
          </Container>
        </HeaderWrapper>

        <Spacer
          size={{
            "@initial": 8,
            "@tablet": 0,
            "@mobile": 0,
          }}
        />

        <InertWhenNavOpened>
          <Main>
            <Container>
              <PageWrapper>
                {subNav ? <div>{subNav}</div> : null}
                <div style={{ flex: 1 }}>
                  {status && (
                    <>
                      {status}
                      <Spacer size={8} />
                    </>
                  )}

                  {children}
                </div>
              </PageWrapper>
            </Container>
          </Main>
        </InertWhenNavOpened>
      </div>
    </NavProvider>
  );
};
