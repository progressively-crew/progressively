import { Main } from "~/components/Main";
import { User } from "~/modules/user/types";
import { SkipNavLink } from "~/components/SkipNav";
import { Container } from "~/components/Container";
import { Spacer } from "~/components/Spacer";
import { NavProvider } from "~/components/Breadcrumbs/providers/NavProvider";
import { InertWhenNavOpened } from "~/components/Breadcrumbs/InertWhenNavOpened";
import { UserDropdown } from "~/modules/user/components/UserDropdown";
import { useMatches, useNavigation } from "@remix-run/react";
import { BreadCrumbs } from "~/components/Breadcrumbs";
import { Spinner } from "~/components/Spinner";
import { ThemeSwitch } from "~/components/ThemeSwitch";

export interface DashboardLayoutProps {
  user: User;
  children: React.ReactNode;
  subNav?: React.ReactNode;
  status?: React.ReactNode;
}

export const DashboardLayout = ({
  user,
  children,
  subNav,
  status,
}: DashboardLayoutProps) => {
  const navigation = useNavigation();
  const matches = useMatches();

  const crumbs = matches
    .filter((match) => match.handle && match.handle.breadcrumb)
    .map((match) => match.handle.breadcrumb(match, matches));

  const isNormalLoad =
    navigation.state === "loading" && navigation.formData == null;

  return (
    <NavProvider>
      <SkipNavLink>Skip to content</SkipNavLink>

      <div className="bg-white dark:bg-slate-800">
        <Container>
          <div className="flex justify-between h-14 items-center">
            <BreadCrumbs crumbs={crumbs} />
            <UserDropdown user={user} />
          </div>
        </Container>
      </div>

      <div className="bg-white dark:bg-slate-800 lg:sticky top-0 border-b border-gray-200 dark:border-slate-700 z-10">
        <Container>{subNav}</Container>
      </div>

      <InertWhenNavOpened className="h-full bg-gray-50 dark:bg-slate-900 flex-1">
        <Main>
          {status}
          <div className="flex-1 px-4 md:px-12">
            <div>
              <div className={`max-w-5xl w-full mx-auto`}>
                <Spacer size={12} />

                <div className="flex flex-col gap-4 md:gap-6">{children}</div>

                <Spacer size={10} />
              </div>
            </div>

            {isNormalLoad && (
              <div
                className="fixed left-4 bottom-4 animate-opacity-appearing"
                style={{
                  animationDelay: "300ms",
                  opacity: 0,
                }}
              >
                <Spinner className="text-3xl text-gray-400" />
              </div>
            )}
          </div>
        </Main>

        <footer className="px-8 py-2 border-t border-gray-300 flex justify-end">
          <div className="inline-block">
            <ThemeSwitch />
          </div>
        </footer>
      </InertWhenNavOpened>
    </NavProvider>
  );
};
