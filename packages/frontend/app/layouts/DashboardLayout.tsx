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
import { useMatches } from "@remix-run/react";
import { BreadCrumbs } from "~/components/Breadcrumbs";
import { HideDesktop, HideTablet } from "~/components/HideMobile";

export interface DashboardLayoutProps {
  user?: Partial<User>;
  children: React.ReactNode;
  header?: React.ReactNode;
  subNav?: React.ReactNode;
  status?: React.ReactNode;
}

const OverflowContainer = styled("div", {
  overflow: "hidden", // scroll inside table elements,
  padding: "$spacing$3", // show box shadow when overflowing,
  margin: "-$spacing$3",
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

  "@tablet": {
    gridTemplateColumns: "1fr",
    gap: "$spacing$0",
  },
});

export const DashboardLayout = ({
  user,
  children,
  header,
  subNav,
  status,
}: DashboardLayoutProps) => {
  const matches = useMatches();

  const crumbs = matches
    .filter((match) => match.handle && match.handle.breadcrumb)
    .map((match) => match.handle.breadcrumb(match, matches));

  return (
    <NavProvider>
      <SkipNavLink>Skip to content</SkipNavLink>

      <div>
        <TopWrapper>
          <Container>
            <HStack justifyContent="space-between" height="navHeight">
              <BreadCrumbs crumbs={crumbs} />

              <UseDropdown user={user} />
            </HStack>

            {header && <Spacer size={2} />}

            <header>{header}</header>
          </Container>
        </TopWrapper>

        <InertWhenNavOpened>
          <Spacer size={{ "@initial": 12, "@tablet": subNav ? 0 : 4 }} />

          <HideDesktop>{subNav}</HideDesktop>

          {header && <Spacer size={6} />}

          <Container>
            <Grid singleColumn={!subNav}>
              <HideTablet>{subNav}</HideTablet>

              <OverflowContainer>
                <Main>
                  <Stack spacing={{ "@initial": 8, "@mobile": 4 }}>
                    {status}

                    {children}
                  </Stack>
                </Main>
              </OverflowContainer>
            </Grid>
          </Container>
        </InertWhenNavOpened>
      </div>
    </NavProvider>
  );
};
