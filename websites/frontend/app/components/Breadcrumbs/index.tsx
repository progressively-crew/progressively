import { HStack } from "../HStack";
import { IconBox } from "../IconBox";
import { EnvIcon } from "../Icons/EnvIcon";
import { FlagIcon } from "../Icons/FlagIcon";
import { ProjectIcon } from "../Icons/ProjectIcon";
import { Link } from "../Link";
import { MenuButton } from "../MenuButton";
import { Crumbs } from "./types";
import { Logo } from "../Logo/Logo";

export interface BreadCrumbsProps {
  crumbs: Crumbs;
}

export const BreadCrumbs = ({ crumbs }: BreadCrumbsProps) => {
  const lastItemIndex = crumbs.length - 1;
  const focusStyles =
    "focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:focus:ring-offset-slate-900";

  return (
    <nav aria-label="Breadcrumbs" className="py-1 px-4">
      <ol className="flex items-center">
        {crumbs.map((crumb, index) => {
          const currentPage = index === lastItemIndex;

          return (
            <li
              key={crumb.link}
              className={
                "flex items-center last-of-type:text-indigo-700 last-of-type:font-bold"
              }
            >
              <Link
                aria-current={currentPage ? "page" : undefined}
                to={crumb.link}
                className={`text-sm transition-background px-2 py-1 rounded hover:text-black hover:dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 no-underline ${focusStyles} ${
                  currentPage
                    ? "text-black dark:text-slate-100"
                    : "text-gray-500 dark:text-slate-400"
                }`}
              >
                <div className={"rounded px-2 py-1"}>
                  <HStack spacing={2}>
                    {crumb.isRoot ? (
                      <HStack spacing={2}>
                        <Logo />
                        <span className="sr-only">My projects</span>
                      </HStack>
                    ) : (
                      <HStack spacing={2}>
                        <IconBox content={crumb.label} size="S">
                          {crumb.isProject && <ProjectIcon />}
                          {crumb.isEnv && <EnvIcon />}
                          {crumb.isFlag && <FlagIcon />}
                        </IconBox>
                        {crumb.label}
                      </HStack>
                    )}
                  </HStack>
                </div>
              </Link>

              {crumb.menuItems ? (
                <MenuButton items={crumb.menuItems} label={crumb.menuLabel!} />
              ) : null}

              {!currentPage && (
                <div
                  className="flex text-gray-200 dark:text-slate-500 px-4"
                  aria-hidden
                >
                  <div
                    className="h-6 bg-gray-200 dark:bg-slate-700 w-[2px]"
                    style={{ transform: "rotateZ(30deg)" }}
                  />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
