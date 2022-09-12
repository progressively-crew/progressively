import { DesktopNav } from "./DesktopNav";
import { Crumbs } from "./types";

export interface BreadCrumbsProps {
  crumbs: Crumbs;
}

export const BreadCrumbs = ({ crumbs }: BreadCrumbsProps) => {
  return <DesktopNav crumbs={crumbs} />;
};
