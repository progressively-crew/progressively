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
  return (
    <HorizontalNav label={`Navigate in flag in specific environment`}>
      <li className="px-3 h-8 flex flex-row items-center">
        <Form method="post" id={`form-${flagEnv.flagId}`}>
          <ToggleFlag
            isFlagActivated={flagEnv.status === FlagStatus.ACTIVATED}
            flagId={flagEnv.flagId}
          />
        </Form>
      </li>

      <NavItem
        to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagEnv.flagId}/dev-setup`}
        icon={<TbDeviceImacCheck />}
      >
        Dev setup
      </NavItem>

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
    </HorizontalNav>
  );
};
