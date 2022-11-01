import { MdChevronRight } from "react-icons/md";
import { TbFolders } from "react-icons/tb";
import { HStack } from "../HStack";
import { EnvIcon } from "../Icons/EnvIcon";
import { FlagIcon } from "../Icons/FlagIcon";
import { ProjectIcon } from "../Icons/ProjectIcon";
import { Link } from "../Link";
import { Crumb, Crumbs } from "./types";

interface IconWrapperProps {
  children: React.ReactNode;
}

const IconWrapper = ({ children }: IconWrapperProps) => {
  return <span className="flex text-indigo-700">{children}</span>;
};

export interface DesktopNavProps {
  crumbs: Crumbs;
}

const CrumbIcon = ({ crumb }: { crumb: Crumb }) => {
  if (crumb.isRoot)
    return (
      <IconWrapper>
        <TbFolders />
      </IconWrapper>
    );

  if (crumb.isEnv)
    return (
      <IconWrapper>
        <EnvIcon />
      </IconWrapper>
    );

  if (crumb.isFlag)
    return (
      <IconWrapper>
        <FlagIcon />
      </IconWrapper>
    );

  if (crumb.isProject)
    return (
      <IconWrapper>
        <ProjectIcon />
      </IconWrapper>
    );

  return null;
};

export const DesktopNav = ({ crumbs }: DesktopNavProps) => {
  const lastItemIndex = crumbs.length - 1;

  return (
    <nav aria-label="Breadcrumbs">
      <ol className="flex h-10 items-center">
        {crumbs.map((crumb, index) => {
          const currentPage = index === lastItemIndex;

          return (
            <li
              key={crumb.link}
              className={
                "flex items-center hover:underline last-of-type:text-indigo-700 last-of-type:font-bold last-of-type:underline"
              }
            >
              <Link
                aria-current={currentPage ? "page" : undefined}
                to={crumb.link}
                fontSize="uranus"
              >
                <HStack spacing={2}>
                  <CrumbIcon crumb={crumb} />
                  {crumb.label}
                </HStack>
              </Link>

              {!currentPage && (
                <div className="flex text-gray-800 px-2" aria-hidden>
                  <MdChevronRight />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
