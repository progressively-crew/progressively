import { MdChevronRight } from "react-icons/md";
import { styled } from "~/stitches.config";
import { Link } from "../Link";
import { Crumbs } from "./types";

const Ol = styled("ol", {
  fontFamily: "$default",
  color: "$text",
  display: "flex",

  "& li a": {
    transition: "border,box-shadow 0.2s",
  },

  "& li:last-of-type a": {
    fontWeight: "$fontWeights$bold",
    color: "$secondary",
  },

  "& li": {
    display: "flex",
    alignItems: "center",
  },
});

const Separator = styled("div", {
  margin: "0 $spacing$2",
  display: "inline-block",
});

const HStack = styled("span", {
  display: "flex",
  alignItems: "center",
  gap: "$spacing$2",
});

export interface DesktopNavProps {
  crumbs: Crumbs;
}

export const DesktopNav = ({ crumbs }: DesktopNavProps) => {
  const lastItemIndex = crumbs.length - 1;

  return (
    <nav aria-label="Breadcrumb">
      <Ol>
        {crumbs.map((crumb, index) => {
          const currentPage = index === lastItemIndex;

          return (
            <li key={crumb.link}>
              <Link
                aria-current={
                  crumb.forceNotCurrent
                    ? undefined
                    : currentPage
                    ? "page"
                    : undefined
                }
                to={crumb.link}
              >
                <HStack>
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
