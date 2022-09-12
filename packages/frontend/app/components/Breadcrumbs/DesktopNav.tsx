import { MdChevronRight } from "react-icons/md";
import { styled } from "~/stitches.config";
import { HStack } from "../HStack";
import { Link } from "../Link";
import { Crumbs } from "./types";

const Ol = styled("ol", {
  fontFamily: "$default",
  color: "$hades",
  display: "flex",
  height: "$cta",
  padding: "$spacing$1 0",

  "& li a": {
    boxSizing: "border-box",
    color: "$hades",
    transition: "border,box-shadow 0.2s",
    whiteSpace: "nowrap",
  },

  "& li:last-of-type a": {
    fontWeight: "$bold",
    color: "$nemesis",
  },

  "& li": {
    display: "flex",
    alignItems: "center",
  },
});

const Separator = styled("div", {
  display: "flex",
  margin: "0 $spacing$2",
  marginTop: "$spacing$1",
  fontSize: "$mars",
});

export interface DesktopNavProps {
  crumbs: Crumbs;
}

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
                  {crumb.icon}
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
