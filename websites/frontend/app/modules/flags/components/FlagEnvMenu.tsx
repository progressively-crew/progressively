import { HorizontalNav, NavItem } from "~/components/HorizontalNav";
import { FlagEnv } from "../types";
import {
  TbActivity,
  TbChartAreaLine,
  TbTargetArrow,
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
      <NavItem
        to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagEnv.flagId}/audience`}
        icon={<TbTargetArrow />}
      >
        Audience
      </NavItem>

      <NavItem
        to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagEnv.flagId}/insights`}
        icon={<TbChartAreaLine />}
      >
        Insights
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
    </HorizontalNav>
  );
};
