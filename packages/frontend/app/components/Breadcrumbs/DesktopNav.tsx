import { MdChevronRight } from "react-icons/md";
import { styled } from "~/stitches.config";
import { Link } from "../Link";
import { Crumbs } from "./types";

const Ol = styled("ol", {
  fontFamily: "$default",
  color: "$text",
  display: "flex",

  "& li a": {
    color: "$background",
    transition: "border,box-shadow 0.2s",
  },

  "& li a:active": {
    color: "$background",
    opacity: 0.7,
  },

  "& li:last-of-type a": {
    fontWeight: "$fontWeights$bold",
    color: "$backgroundAccent",
  },

  "& li": {
    display: "flex",
    alignItems: "center",
  },
});

const Separator = styled("div", {
  margin: "0 $spacing$2",
  marginTop: "$spacing$1",
  display: "inline-block",
  color: "$backgroundAccent",
  fontSize: "$mars",
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
            <li key={`desktop-breadcrumbs-${crumb.link}-${crumb.label}`}>
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
