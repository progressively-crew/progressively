import {
  HorizontalNav,
  HorizontalNavSection,
  NavItem,
} from "~/components/HorizontalNav";
import { Flag } from "../types";
import { FlagIcon } from "~/components/Icons/FlagIcon";

export interface FlagMenuprops {
  projectId: string;
  flag: Flag;
}

export const FlagMenu = ({ projectId, flag }: FlagMenuprops) => {
  const rootPath = `/dashboard/projects/${projectId}/flags/${flag.uuid}`;

  return (
    <HorizontalNav label={"Navigate in the flag"}>
      <HorizontalNavSection icon={<FlagIcon />} title="Navigate in the flag">
        <NavItem to={`${rootPath}`}>Environments</NavItem>
        <NavItem to={`${rootPath}/settings`}>Settings</NavItem>
      </HorizontalNavSection>
    </HorizontalNav>
  );
};
