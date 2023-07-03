import { HorizontalNav, NavItem } from "~/components/HorizontalNav";
import { FlagEnv, FlagStatus } from "../types";
import { Form } from "@remix-run/react";
import { ToggleFlag } from "./ToggleFlag";
import {
  TbActivity,
  TbApps,
  TbChartAreaLine,
  TbChartPie,
  TbClockEdit,
  TbDeviceImacCheck,
  TbTargetArrow,
  TbUsersGroup,
  TbWebhook,
} from "react-icons/tb";

export interface FlagEnvMenuProps {
  projectId: string;
  envId: string;
  flagEnv: FlagEnv;
}

export const FlagEnvMenu = ({
  projectId,
  envId,
  flagEnv,
}: FlagEnvMenuProps) => {
  const isActivated = flagEnv.status === FlagStatus.ACTIVATED;
  return (
    <HorizontalNav label={`Navigate in flag in specific environment`}>
      <li
        className={`transition-all py-6 px-4 border-b border-gray-200 dark:border-slate-800 ${
          isActivated
            ? "bg-emerald-100 dark:bg-emerald-600"
            : "bg-gray-100 dark:bg-slate-800"
        }`}
      >
        <div className="px-3 flex flex-row items-center">
          <Form method="post" id={`form-${flagEnv.flagId}`}>
            <ToggleFlag isFlagActivated={isActivated} flagId={flagEnv.flagId} />
          </Form>
        </div>
      </li>

      <NavItem
        to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagEnv.flagId}`}
        icon={<TbTargetArrow />}
      >
        Audience
      </NavItem>

      <NavItem
        to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagEnv.flagId}/segments`}
        icon={<TbUsersGroup />}
      >
        Segments
      </NavItem>

      <NavItem
        to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagEnv.flagId}/variants`}
        icon={<TbApps />}
      >
        Variants
      </NavItem>

      <NavItem
        to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagEnv.flagId}/scheduling`}
        icon={<TbClockEdit />}
      >
        Scheduling
      </NavItem>

      <NavItem
        to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagEnv.flagId}/webhooks`}
        icon={<TbWebhook />}
      >
        Webhooks
      </NavItem>

      <NavItem
        to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagEnv.flagId}/activity`}
        icon={<TbActivity />}
      >
        Activity
      </NavItem>

      <NavItem
        to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagEnv.flagId}/insights`}
        icon={<TbChartAreaLine />}
      >
        Insights
      </NavItem>

      <NavItem
        to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagEnv.flagId}/metrics`}
        icon={<TbChartPie />}
      >
        Metrics
      </NavItem>

      <NavItem
        to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagEnv.flagId}/dev-setup`}
        icon={<TbDeviceImacCheck />}
      >
        Dev setup
      </NavItem>
    </HorizontalNav>
  );
};
