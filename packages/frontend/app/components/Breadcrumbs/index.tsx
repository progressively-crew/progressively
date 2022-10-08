import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { Crumbs } from "./types";

export interface BreadCrumbsProps {
  crumbs: Crumbs;
}

export const BreadCrumbs = ({ crumbs }: BreadCrumbsProps) => {
  return <MobileNav crumbs={crumbs} />;
  // return <DesktopNav crumbs={crumbs} />;
};
