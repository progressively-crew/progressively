import { HorizontalNav, NavItem } from "~/components/HorizontalNav";
import { Flag } from "../types";

export interface FlagMenuprops {
  projectId: string;
  flag: Flag;
}

export const FlagMenu = ({ projectId, flag }: FlagMenuprops) => {
  const rootPath = `/dashboard/projects/${projectId}/flags/${flag.uuid}`;

  return (
    <HorizontalNav label={`Flag related`}>
      <NavItem to={`${rootPath}`}>Overview</NavItem>
      <NavItem to={`${rootPath}/settings`}>Settings</NavItem>
    </HorizontalNav>
  );
};
