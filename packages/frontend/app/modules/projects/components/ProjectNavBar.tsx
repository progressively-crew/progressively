import { HorizontalNav, NavItem } from "~/components/HorizontalNav";

export interface ProjectNavBarProps {
  projectId: string;
}

export const ProjectNavBar = ({ projectId }: ProjectNavBarProps) => {
  return (
    <HorizontalNav label={`Project related`}>
      <NavItem to={`/dashboard/projects/${projectId}`}>Environments</NavItem>
      <NavItem to={`/dashboard/projects/${projectId}/flags`}>
        Feature flags
      </NavItem>

      <NavItem to={`/dashboard/projects/${projectId}/settings`}>
        Settings
      </NavItem>
    </HorizontalNav>
  );
};
