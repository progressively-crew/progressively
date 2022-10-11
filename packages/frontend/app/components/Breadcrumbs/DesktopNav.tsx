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
});

const Li = styled("li", {
  display: "flex",
  alignItems: "center",

  "& a:hover": {
    textDecoration: "underline",
  },

  "& a:active": {
    color: "$nemesis",
    textDecoration: "underline",
  },

  "&:last-of-type a": {
    fontWeight: "$bold",
    color: "$nemesis",
    textDecoration: "underline",
  },

  variants: {
    forceNotCurrent: {
      true: {
        "&:last-of-type a": {
          fontWeight: "revert",
          color: "$hadesLight",
          textDecoration: "none",
        },

        "&:last-of-type a:hover": {
          textDecoration: "underline",
        },

        "&:last-of-type a:active": {
          color: "$nemesis",
          textDecoration: "underline",
        },
      },
    },
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
            <Li key={crumb.link} forceNotCurrent={crumb.forceNotCurrent}>
              <Link
                aria-current={
                  crumb.forceNotCurrent
                    ? undefined
                    : currentPage
                    ? "page"
                    : undefined
                }
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
            </Li>
          );
        })}
      </Ol>
    </nav>
  );
};
