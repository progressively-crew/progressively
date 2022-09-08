import { Main } from "~/components/Main";
import { User } from "~/modules/user/types";
import { SkipNavLink } from "~/components/SkipNav";
import { Container } from "~/components/Container";
import { Spacer } from "~/components/Spacer";
import { NavProvider } from "~/components/Breadcrumbs/providers/NavProvider";
import { InertWhenNavOpened } from "~/components/Breadcrumbs/InertWhenNavOpened";
import { styled } from "~/stitches.config";
import { SideNav } from "~/components/SideNav";

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
  gap: "$spacing$12",

  "@tablet": {
    flexDirection: "column",
    gridTemplateColumns: "1fr",
  },

  variants: {
    singleColumn: {
      true: {
        gridTemplateColumns: "1fr",
      },
    },
  },
});

const EndSection = styled("div", {
  overflow: "hidden", // scroll inside table elements,
  padding: "$spacing$3", // show box shadow when overflowing,
  margin: "-$spacing$3",

  "@tablet": {
    marginTop: "$spacing$3",
  },
});

const BreadCrumbWrapper = styled("div", {
  background: "$apollo",
});

const PageWrapper = styled("div", {
  marginLeft: "300px",
});

const MenuWrapper = styled("div", {
  height: "100%",
  position: "fixed",
  left: 0,
  top: 0,
  width: "300px",
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
      <InertWhenNavOpened>
        <SkipNavLink>Skip to content</SkipNavLink>
      </InertWhenNavOpened>

      <MenuWrapper>
        <SideNav user={user} />
      </MenuWrapper>

      <PageWrapper>
        <div>
          {breadcrumb && (
            <>
              <BreadCrumbWrapper>
                <Container>{breadcrumb}</Container>
              </BreadCrumbWrapper>
              <Spacer size={4} />
            </>
          )}
          <Container>
            <header>{header}</header>
          </Container>

          <Spacer size={8} />

          <InertWhenNavOpened>
            <Main>
              <Container>
                <ContentWrapper singleColumn={!subNav}>
                  {subNav ? <div>{subNav}</div> : null}

                  <EndSection>
                    {status && (
                      <>
                        {status}
                        <Spacer size={8} />
                      </>
                    )}

                    {children}
                  </EndSection>
                </ContentWrapper>
              </Container>
            </Main>
          </InertWhenNavOpened>
        </div>
      </PageWrapper>
    </NavProvider>
  );
};
