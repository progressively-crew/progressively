import { HorizontalNav, NavItem } from "~/components/HorizontalNav";
import { Project } from "../types";
import { FlagIcon } from "~/components/Icons/FlagIcon";
import { TbChartAreaLine } from "react-icons/tb";
import { IoFunnelOutline } from "react-icons/io5";
import { SettingsIcon } from "~/components/Icons/SettingsIcon";
import { HomeIcon } from "~/components/Icons/HomeIcon";
import { BiGroup } from "react-icons/bi";
import { MenuButton } from "~/components/MenuButton";
import { useLocation } from "@remix-run/react";

export interface ProjectNavBarProps {
  project: Project;
}

export const ProjectNavBar = ({ project }: ProjectNavBarProps) => {
  const location = useLocation();

  const isAnalytics = location.pathname.includes("analytics");

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

        <li>
          <MenuButton
            icon={<TbChartAreaLine />}
            items={[
              {
                label: "Page Views",
                href: `/dashboard/projects/${project.uuid}/analytics/page-views`,
              },
              {
                label: "Custom Events",
                href: `/dashboard/projects/${project.uuid}/analytics/custom-events`,
              },
            ]}
            labelClassName={
              "border-b-2 border-t-2 border-transparent -outline-offset-2 !rounded-none hover:!bg-gray-100 active:bg-gray-200 " +
              (isAnalytics ? "border-b-gray-900 text-gray-900" : "")
            }
            label="Analytics"
          >
            Analytics
          </MenuButton>
        </li>

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
