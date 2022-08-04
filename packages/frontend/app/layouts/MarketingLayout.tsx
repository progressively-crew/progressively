import { useFlags } from "@progressively/react";
import { Main } from "~/components/Main";
import { SkipNavLink } from "~/components/SkipNav";
import { Nav } from "~/components/Nav";
import { Spacer } from "~/components/Spacer";
import { NavProvider } from "~/components/Breadcrumbs/providers/NavProvider";
import { InertWhenNavOpened } from "~/components/Breadcrumbs/InertWhenNavOpened";
import { Menu } from "~/components/Menu";
import { Button } from "~/components/Buttons/Button";
import { GithubLink } from "~/components/GithubLink";

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

            <div>
              {flags.showDocumentationButton && (
                <Button
                  href="https://progressively-crew.github.io/"
                  variant="ghost"
                >
                  Documentation
                </Button>
              )}
              <GithubLink />
              <Button to="/signin">Dashboard</Button>
            </div>
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
