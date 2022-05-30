import { MdChevronRight } from "react-icons/md";
import { styled } from "~/stitches.config";
import { Container } from "./Container";
import { Link } from "./Link";

const Ol = styled("ol", {
  fontFamily: "$default",
  color: "$content",
  display: "flex",

  '& [aria-current="page"]': {
    fontWeight: "$fontWeights$bold",
    color: "$hover",
  },
});

const Separator = styled("div", {
  margin: "0 $spacing$2",
  display: "inline-block",
});

export interface Crumb {
  link: string;
  label: string;
  forceNotCurrent?: boolean;
}

export type Crumbs = Array<Crumb>;

export interface BreadCrumbsProps {
  crumbs: Crumbs;
}

export const BreadCrumbs = ({ crumbs }: BreadCrumbsProps) => {
  const lastItemIndex = crumbs.length - 1;

  return (
    <Container>
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
                  {crumb.label}
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
    </Container>
  );
};
