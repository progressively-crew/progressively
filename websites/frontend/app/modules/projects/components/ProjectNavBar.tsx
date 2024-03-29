import { HorizontalNav, NavItem } from "~/components/HorizontalNav";
import { Project } from "../types";
import { FlagIcon } from "~/components/Icons/FlagIcon";
import { TbChartAreaLine } from "react-icons/tb";
import { IoFunnelOutline } from "react-icons/io5";
import { SettingsIcon } from "~/components/Icons/SettingsIcon";

export interface ProjectNavBarProps {
  project: Project;
}

export const ProjectNavBar = ({ project }: ProjectNavBarProps) => {
  return (
    <HorizontalNav label={"Navigate in project"}>
      <NavItem
        to={`/dashboard/projects/${project.uuid}/flags/all`}
        icon={<FlagIcon />}
      >
        Feature flags
      </NavItem>

      <NavItem
        to={`/dashboard/projects/${project.uuid}/analytics`}
        icon={<TbChartAreaLine />}
      >
        Analytics
      </NavItem>

      <NavItem
        to={`/dashboard/projects/${project.uuid}/funnels`}
        icon={<IoFunnelOutline />}
      >
        Funnels
      </NavItem>

      <NavItem
        to={`/dashboard/projects/${project.uuid}/settings`}
        icon={<SettingsIcon />}
      >
        Settings
      </NavItem>
    </HorizontalNav>
  );
};
