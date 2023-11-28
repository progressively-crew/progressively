import { HorizontalNav, NavItem } from "~/components/HorizontalNav";
import { Project } from "../types";
import { FlagIcon } from "~/components/Icons/FlagIcon";
import { SettingsIcon } from "~/components/Icons/SettingsIcon";

import { EnvMenuButton } from "~/modules/environments/components/EnvMenuButton";
import { TbChartAreaLine } from "react-icons/tb";

export interface ProjectNavBarProps {
  project: Project;
}

export const ProjectNavBar = ({ project }: ProjectNavBarProps) => {
  const firstEnv = project.environments[0];

  return (
    <HorizontalNav label={"Navigate in project"}>
      <NavItem
        to={`/dashboard/projects/${project.uuid}/flags`}
        icon={<FlagIcon />}
      >
        Feature flags
      </NavItem>

      {firstEnv && (
        <NavItem
          to={`/dashboard/projects/${project.uuid}/insights?envId=${firstEnv.uuid}`}
          icon={<TbChartAreaLine />}
        >
          Insights
        </NavItem>
      )}

      <li className="text-sm block rounded text-gray-900 dark:text-white">
        <EnvMenuButton
          projectId={project.uuid}
          environments={project.environments}
        />
      </li>

      <NavItem
        to={`/dashboard/projects/${project.uuid}/settings`}
        icon={<SettingsIcon />}
      >
        Settings
      </NavItem>
    </HorizontalNav>
  );
};
