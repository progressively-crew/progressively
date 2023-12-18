import { HorizontalNav, NavItem } from "~/components/HorizontalNav";
import { Project } from "../types";
import { FlagIcon } from "~/components/Icons/FlagIcon";
import { TbChartAreaLine } from "react-icons/tb";
import { IoFunnelOutline } from "react-icons/io5";

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
          to={`/dashboard/projects/${project.uuid}/analytics?envId=${firstEnv.uuid}`}
          icon={<TbChartAreaLine />}
        >
          Analytics
        </NavItem>
      )}

      {firstEnv && (
        <NavItem
          to={`/dashboard/projects/${project.uuid}/funnels?envId=${firstEnv.uuid}`}
          icon={<IoFunnelOutline />}
        >
          Funnels
        </NavItem>
      )}
    </HorizontalNav>
  );
};
