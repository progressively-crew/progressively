import { MdChevronRight } from "react-icons/md";
import { TbFolders } from "react-icons/tb";
import { styled } from "~/stitches.config";
import { HStack } from "../HStack";
import { EnvIcon } from "../Icons/EnvIcon";
import { FlagIcon } from "../Icons/FlagIcon";
import { ProjectIcon } from "../Icons/ProjectIcon";
import { Link } from "../Link";
import { Crumb, Crumbs } from "./types";

const Ol = styled("ol", {
  fontFamily: "$default",
  display: "flex",
  height: "$cta",
  padding: "$spacing$1 0",

  "& li a": {
    boxSizing: "border-box",
    color: "$hadesLight",
    transition: "border,box-shadow 0.2s",
    whiteSpace: "nowrap",
    textDecoration: "none",
  },

  "& li a:hover": {
    textDecoration: "underline",
  },

  "& li a:active": {
    color: "$nemesis",
    textDecoration: "underline",
  },

  "& li:last-of-type a": {
    fontWeight: "$bold",
    color: "$nemesis",
    textDecoration: "underline",
  },

  "& li": {
    display: "flex",
    alignItems: "center",
  },
});

const Separator = styled("div", {
  display: "flex",
  margin: "0 $spacing$2",
  fontSize: "$mars",
  color: "$hades",
});

const IconWrapper = styled("span", {
  display: "flex",
  "& svg": {
    color: "$nemesis",
  },
});

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
      <Ol>
        {crumbs.map((crumb, index) => {
          const currentPage = index === lastItemIndex;

          return (
            <li key={crumb.link}>
              <Link
                aria-current={crumb.forceNotCurrent ? undefined : currentPage ? "page" : undefined}
                to={crumb.link}
                fontSize="uranus"
              >
                <HStack spacing={2}>
                  <CrumbIcon crumb={crumb} />
                  {crumb.label}
                </HStack>
              </Link>

              {!currentPage && (
                <Separator aria-hidden>
                  <MdChevronRight />
                </Separator>
              )}
            </li>
          );
        })}
      </Ol>
    </nav>
  );
};
