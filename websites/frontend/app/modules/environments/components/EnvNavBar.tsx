import { HorizontalNav, NavItem } from "~/components/HorizontalNav";
import { Environment } from "../types";
import { FlagIcon } from "~/components/Icons/FlagIcon";
import { SettingsIcon } from "~/components/Icons/SettingsIcon";
import { Project } from "~/modules/projects/types";
import { MetricIcon } from "~/components/Icons/MetricIcon";

export interface EnvNavBarProps {
  project: Project;
  environment: Environment;
}

export const EnvNavBar = ({ project, environment }: EnvNavBarProps) => {
  return (
    <HorizontalNav label={"Navigate in project"}>
      <NavItem
        to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/flags`}
        icon={<FlagIcon />}
      >
        Feature flags
      </NavItem>

      <NavItem
        to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/metrics`}
        icon={<MetricIcon />}
      >
        Metrics
      </NavItem>

      <NavItem
        to={`/dashboard/projects/${project.uuid}/environments/${environment.uuid}/settings`}
        icon={<SettingsIcon />}
      >
        Settings
      </NavItem>
    </HorizontalNav>
  );
};
