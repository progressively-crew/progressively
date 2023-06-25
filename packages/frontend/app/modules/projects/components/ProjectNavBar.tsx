import {
  HorizontalNav,
  HorizontalNavSection,
  NavItem,
} from "~/components/HorizontalNav";
import { ProjectIcon } from "~/components/Icons/ProjectIcon";

export interface ProjectNavBarProps {
  projectId: string;
}

export const ProjectNavBar = ({ projectId }: ProjectNavBarProps) => {
  return (
    <HorizontalNav label={"Navigate in project"}>
      <HorizontalNavSection
        icon={<ProjectIcon />}
        title="Navigate in the project"
      >
        <NavItem to={`/dashboard/projects/${projectId}/flags`}>
          Feature flags
        </NavItem>
        <NavItem to={`/dashboard/projects/${projectId}`}>Environments</NavItem>
        <NavItem to={`/dashboard/projects/${projectId}/settings`}>
          Settings
        </NavItem>
      </HorizontalNavSection>
    </HorizontalNav>
  );
};
