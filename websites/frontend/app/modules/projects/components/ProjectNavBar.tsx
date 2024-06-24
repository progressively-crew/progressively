import { HorizontalNav, NavItem } from "~/components/HorizontalNav";
import { Project } from "../types";
import { FlagIcon } from "~/components/Icons/FlagIcon";
import { TbChartAreaLine } from "react-icons/tb";
import { IoFunnelOutline } from "react-icons/io5";
import { SettingsIcon } from "~/components/Icons/SettingsIcon";
import { HomeIcon } from "~/components/Icons/HomeIcon";
import { BiGroup } from "react-icons/bi";

export interface ProjectNavBarProps {
  project: Project;
}

export const ProjectNavBar = ({ project }: ProjectNavBarProps) => {
  return (
    <HorizontalNav label={"Navigate in project"}>
      <ul className="flex flex-row items-center">
        <NavItem
          to={`/dashboard/projects/${project.uuid}/home`}
          icon={<HomeIcon />}
        >
          Home
        </NavItem>
        <NavItem
          to={`/dashboard/projects/${project.uuid}/flags/all`}
          icon={<FlagIcon />}
        >
          Feature flags
        </NavItem>

        <NavItem
          to={`/dashboard/projects/${project.uuid}/segments`}
          icon={<BiGroup />}
        >
          Segments
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
      </ul>

      <ul className="flex flex-row items-center">
        <NavItem
          to={`/dashboard/projects/${project.uuid}/settings`}
          icon={<SettingsIcon />}
        >
          Settings
        </NavItem>
      </ul>
    </HorizontalNav>
  );
};
