import { Main } from "~/components/Main";
import { User } from "~/modules/user/types";
import { SkipNavLink } from "~/components/SkipNav";
import { Container } from "~/components/Container";
import { Spacer } from "~/components/Spacer";
import { NavProvider } from "~/components/Breadcrumbs/providers/NavProvider";
import { InertWhenNavOpened } from "~/components/Breadcrumbs/InertWhenNavOpened";
import { styled } from "~/stitches.config";
import { HStack } from "~/components/HStack";
import { UseDropdown } from "~/modules/user/components/UserDropdown";
import { Stack } from "~/components/Stack";

export interface DashboardLayoutProps {
  user?: Partial<User>;
  children: React.ReactNode;
  breadcrumb?: React.ReactNode;
  header?: React.ReactNode;
  subNav?: React.ReactNode;
  status?: React.ReactNode;
}

const OverflowContainer = styled("div", {
  overflow: "hidden", // scroll inside table elements,
  padding: "$spacing$3", // show box shadow when overflowing,
  margin: "-$spacing$3",

  "@tablet": {
    marginTop: "$spacing$3",
  },
});

const TopWrapper = styled("div", {
  background: "$apollo",
  boxShadow: "$regularBottom",
});

const Grid = styled("div", {
  display: "grid",
  gridTemplateColumns: "240px 1fr",
  gap: "$spacing$12",
  variants: {
    singleColumn: {
      true: {
        gridTemplateColumns: "1fr",
      },
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
      <InertWhenNavOpened>
        <SkipNavLink>Skip to content</SkipNavLink>

        <div>
          <TopWrapper>
            <Container>
              <HStack justifyContent="space-between" height="cta">
                <div>{breadcrumb}</div>

                <UseDropdown user={user} />
              </HStack>

              <Spacer size={2} />

              <header>{header}</header>
            </Container>
          </TopWrapper>

          <Spacer size={12} />

          <Container>
            <Grid singleColumn={!subNav}>
              {subNav}

              <div>
                <Main>
                  <OverflowContainer>
                    <Stack spacing={8}>
                      {status}

                      {children}
                    </Stack>
                  </OverflowContainer>
                </Main>
              </div>
            </Grid>
          </Container>
        </div>
      </InertWhenNavOpened>
    </NavProvider>
  );
};
