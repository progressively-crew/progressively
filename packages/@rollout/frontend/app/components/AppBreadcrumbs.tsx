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
        <CLink
          as={Link}
          to="/dashboard"
          display={["inline-block", "none"]}
          mb={12}
        >
          <HStack alignItems={"center"} height={"44px"} fontSize="xl">
            <MdChevronLeft aria-hidden />
            <span> Back to {beforeLastCrumb.label}</span>
          </HStack>
        </CLink>
      )}

      <Breadcrumb
        display={["none", "block"]}
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
