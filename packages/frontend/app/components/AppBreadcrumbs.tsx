import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Icon,
} from "@chakra-ui/react";
import { FiChevronRight } from "react-icons/fi";
import { Link } from "remix";

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
    <>
      <Breadcrumb
        aria-label="Breadcrumb"
        display={["none", "block"]}
        separator={
          <Icon display="flex" alignItems="center" as={FiChevronRight} />
        }
      >
        {crumbs.map((crumb, index) => (
          <BreadcrumbItem
            isCurrentPage={
              crumb.forceNotCurrent ? false : index === lastItemIndex
            }
            key={crumb.link}
            color={index === lastItemIndex ? "text" : "textlight"}
          >
            <BreadcrumbLink
              fontWeight={index === lastItemIndex ? "semibold" : undefined}
              textDecoration="underline"
              display="flex"
              alignItems={"center"}
              as={Link}
              to={crumb.link}
              height={"44px"}
              fontSize="xl"
            >
              {crumb.label}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
    </>
  );
};
