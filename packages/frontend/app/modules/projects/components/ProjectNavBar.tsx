import { HorizontalNav, NavItem } from "~/components/HorizontalNav";
import { EnvIcon } from "~/components/Icons/EnvIcon";
import { FlagIcon } from "~/components/Icons/FlagIcon";
import { SettingsIcon } from "~/components/Icons/SettingsIcon";

export interface ProjectNavBarProps {
  projectId: string;
}

export const ProjectNavBar = ({ projectId }: ProjectNavBarProps) => {
  return (
    <HorizontalNav label={`Project related`}>
      <NavItem to={`/dashboard/projects/${projectId}/flags`}>
        Feature flags
      </NavItem>

      <NavItem to={`/dashboard/projects/${projectId}`}>Environments</NavItem>

      <NavItem to={`/dashboard/projects/${projectId}/settings`}>
        Settings
      </NavItem>
    </HorizontalNav>
  );
};
