import { HStack } from "../HStack";
import { IconBox } from "../IconBox";
import { FlagIcon } from "../Icons/FlagIcon";
import { ProjectIcon } from "../Icons/ProjectIcon";
import { Link } from "../Link";
import { MenuButton } from "../MenuButton";
import { Crumbs } from "./types";
import { MdArrowBackIosNew } from "react-icons/md";

export interface BreadCrumbsProps {
  crumbs: Crumbs;
}

export const BreadCrumbs = ({ crumbs }: BreadCrumbsProps) => {
  const lastItemIndex = crumbs.length - 1;

  const lastCrumb = crumbs[crumbs.length - 2];

  return (
    <>
      <nav className="md:hidden">
        <Link
          to={lastCrumb.link}
          className={`text-xs transition-background px-1 h-10 flex flex-row items-center rounded hover:text-black hover:bg-gray-100 active:bg-gray-200 no-underline text-gray-500`}
        >
          <div className={"rounded px-2 py-1"}>
            <HStack spacing={2}>
              <HStack spacing={2}>
                <MdArrowBackIosNew aria-hidden />
                {lastCrumb.label}
              </HStack>
            </HStack>
          </div>
        </Link>
      </nav>
      <nav aria-label="Breadcrumbs" className="hidden md:block">
        <ol className="flex items-center">
          {crumbs.map((crumb, index) => {
            const currentPage = index === lastItemIndex;

            return (
              <li
                key={crumb.link}
                className={
                  "flex items-center last-of-type:text-indigo-700 last-of-type:font-bold shrink-0"
                }
              >
                <Link
                  aria-current={currentPage ? "page" : undefined}
                  to={crumb.link}
                  className={`text-xs transition-background px-1 h-10 flex flex-row items-center rounded hover:text-black hover:bg-gray-100 active:bg-gray-200 no-underline ${
                    currentPage ? "text-black" : "text-gray-500"
                  }`}
                >
                  <div className={"rounded px-2 py-1"}>
                    <HStack spacing={2}>
                      {crumb.isRoot ? (
                        <HStack spacing={2}>
                          <MdArrowBackIosNew aria-hidden />
                          All projects
                        </HStack>
                      ) : (
                        <HStack spacing={2}>
                          <IconBox content={crumb.label} size="S">
                            {crumb.isProject && <ProjectIcon />}
                            {crumb.isFlag && <FlagIcon />}
                          </IconBox>
                          {crumb.label}
                        </HStack>
                      )}
                    </HStack>
                  </div>
                </Link>

                {crumb.menuItems ? (
                  <MenuButton
                    items={crumb.menuItems}
                    label={crumb.menuLabel!}
                  />
                ) : null}

                {!currentPage && (
                  <div className="flex text-gray-200 px-4" aria-hidden>
                    <div
                      className="h-6 bg-gray-200 w-[2px]"
                      style={{ transform: "rotateZ(30deg)" }}
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};
