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
import { AiOutlineGithub } from "react-icons/ai";
import { FaChartBar } from "react-icons/fa";

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
                  variant="secondary"
                >
                  Documentation
                </Button>
              )}
              <Button
                variant="secondary"
                href="https://github.com/progressively-crew/progressively"
                icon={<AiOutlineGithub aria-hidden />}
              >
                Github
              </Button>
              <Button
                to="/signin"
                variant="primary"
                icon={<FaChartBar aria-hidden />}
              >
                Dashboard
              </Button>
            </HStack>
          </Nav>
        </InertWhenNavOpened>

        <InertWhenNavOpened>
          <Main>{children}</Main>
        </InertWhenNavOpened>
      </div>
    </NavProvider>
  );
};
