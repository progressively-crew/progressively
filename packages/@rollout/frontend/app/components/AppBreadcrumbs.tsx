import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  HStack,
  Icon,
  Link as CLink,
} from "@chakra-ui/react";
import { FiChevronRight } from "react-icons/fi";
import { Link } from "remix";
import { MdChevronLeft } from "react-icons/md";

export interface Crumb {
  link: string;
  label: string;
}

export type Crumbs = Array<Crumb>;

export interface BreadCrumbsProps {
  crumbs: Crumbs;
}

export const BreadCrumbs = ({ crumbs }: BreadCrumbsProps) => {
  const lastItemIndex = crumbs.length - 1;

  const beforeLastCrumb =
    crumbs.length > 1 ? crumbs[crumbs.length - 2] : undefined;

  return (
    <>
      {beforeLastCrumb && (
        <HStack mb={2} display={["flex", "none"]}>
          <MdChevronLeft aria-hidden />
          <CLink as={Link} to={beforeLastCrumb.link}>
            Back to {beforeLastCrumb.label}
          </CLink>
        </HStack>
      )}
      <Breadcrumb
        display={["none", "block"]}
        pb={2}
        separator={
          <Icon display="flex" alignItems="center" as={FiChevronRight} />
        }
      >
        {crumbs.map((crumb, index) => (
          <BreadcrumbItem
            isCurrentPage={index === lastItemIndex}
            key={crumb.link}
          >
            <BreadcrumbLink
              fontWeight={index === lastItemIndex ? "semibold" : undefined}
              textDecoration="underline"
              as={Link}
              to={crumb.link}
              fontSize="lg"
            >
              {crumb.label}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
    </>
  );
};
