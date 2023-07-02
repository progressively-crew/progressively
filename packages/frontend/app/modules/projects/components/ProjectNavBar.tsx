import {
  HorizontalNav,
  HorizontalNavSection,
  NavItem,
} from "~/components/HorizontalNav";
import { ProjectIcon } from "~/components/Icons/ProjectIcon";
import { Project } from "../types";
import { EnvIcon } from "~/components/Icons/EnvIcon";
import { IoAddCircleOutline } from "react-icons/io5";

export interface ProjectNavBarProps {
  project: Project;
}

export const ProjectNavBar = ({ project }: ProjectNavBarProps) => {
  return (
    <HorizontalNav label={"Navigate in project"}>
      <HorizontalNavSection
        icon={<ProjectIcon />}
        title="Navigate in the project"
      >
        <NavItem to={`/dashboard/projects/${project.uuid}/flags`}>
          Feature flags
        </NavItem>

        <li className="text-sm block rounded px-3 text-gray-900 dark:text-white">
          <div className="h-8">Environments</div>
          <ul className="flex flex-col gap-1">
            {project.environments.map((env) => (
              <NavItem
                to={`/dashboard/projects/${project.uuid}/environments/${env.uuid}`}
                key={env.uuid}
                icon={<EnvIcon />}
              >
                {env.name}
              </NavItem>
            ))}

            <NavItem
              to={`/dashboard/projects/${project.uuid}/environments/create`}
              icon={<IoAddCircleOutline />}
            >
              Add an env
            </NavItem>
          </ul>
        </li>

        <NavItem to={`/dashboard/projects/${project.uuid}/settings`}>
          Settings
        </NavItem>
      </HorizontalNavSection>
    </HorizontalNav>
  );
};
