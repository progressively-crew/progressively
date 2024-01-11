import { Main } from "~/components/Main";
import { SkipNavLink } from "~/components/SkipNav";
import { Spacer } from "~/components/Spacer";
import { useNavigation } from "@remix-run/react";
import { Spinner } from "~/components/Spinner";
import { UserNav } from "~/modules/user/components/UserNav";
import { Inert } from "~/components/Inert/Inert";

export interface SettingLayoutProps {
  children: React.ReactNode;
  status?: React.ReactNode;
  backLink?: React.ReactNode;
}

export const SettingLayout = ({
  children,
  status,
  backLink,
}: SettingLayoutProps) => {
  const navigation = useNavigation();

  const isNormalLoad =
    navigation.state === "loading" && navigation.formData == null;

  const layoutClassName = "max-w-7xl mx-auto";

  return (
    <Inert>
      <SkipNavLink>Skip to content</SkipNavLink>

      <div className="bg-gray-50 dark:bg-slate-900 h-full flex-1 rounded-xl shadow-xl">
        <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex justify-between rounded-t-lg py-1 px-1">
          <div>{backLink}</div>
          <UserNav />
        </div>

        <div
          className={`${layoutClassName} h-full dark:bg-slate-900 flex-1 px-4 md:px-20 pt-8 md:pt-0 w-full`}
        >
          <Main>
            <div className="md:h-4" />

            {status}
            <div className="md:h-4" />

            <div className="flex-1">
              <div className="flex flex-col gap-4 md:gap-6">{children}</div>

              <Spacer size={10} />

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
        </div>
      </div>
    </Inert>
  );
};
