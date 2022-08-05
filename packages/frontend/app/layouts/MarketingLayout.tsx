import { useFlags } from "@progressively/react";
import { Main } from "~/components/Main";
import { SkipNavLink } from "~/components/SkipNav";
import { Nav } from "~/components/Nav";
import { Spacer } from "~/components/Spacer";
import { NavProvider } from "~/components/Breadcrumbs/providers/NavProvider";
import { InertWhenNavOpened } from "~/components/Breadcrumbs/InertWhenNavOpened";
import { Menu } from "~/components/Menu";
import { Button } from "~/components/Buttons/Button";
import { HStack } from "~/components/HStack";

export interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const MarketingLayout = ({ children }: DashboardLayoutProps) => {
  const { flags } = useFlags();
  return (
    <NavProvider>
      <div>
        <InertWhenNavOpened>
          <SkipNavLink>Skip to content</SkipNavLink>

          <Nav aria-label="General">
            <Menu to="/" hideOnMobile />

            <HStack spacing={6}>
              {flags.showDocumentationButton && (
                <Button
                  href="https://progressively-crew.github.io/"
                  variant="ghost"
                >
                  Documentation
                </Button>
              )}
              <Button
                variant="ghost"
                href="https://github.com/progressively-crew/progressively"
              >
                Github
              </Button>
              <Button to="/signin">Dashboard</Button>
            </HStack>
          </Nav>

          <Spacer size={5} />
        </InertWhenNavOpened>

        <InertWhenNavOpened>
          <Main>{children}</Main>
        </InertWhenNavOpened>
      </div>
    </NavProvider>
  );
};
