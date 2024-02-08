import { HorizontalNav, NavItem } from "~/components/HorizontalNav";
import { Flag } from "../types";
import {
  TbActivity,
  TbChartAreaLine,
  TbTargetArrow,
  TbWebhook,
} from "react-icons/tb";

export interface FlagEnvMenuProps {
  projectId: string;
  flag: Flag;
}

export const FlagMenu = ({ projectId, flag }: FlagEnvMenuProps) => {
  return (
    <HorizontalNav label={`Navigate in the flag`}>
      <NavItem
        to={`/dashboard/projects/${projectId}/flags/${flag.uuid}/audience`}
        icon={<TbTargetArrow />}
      >
        Audience
      </NavItem>

      <NavItem
        to={`/dashboard/projects/${projectId}/flags/${flag.uuid}/insights`}
        icon={<TbChartAreaLine />}
      >
        Insights
      </NavItem>

      <NavItem
        to={`/dashboard/projects/${projectId}/flags/${flag.uuid}/webhooks`}
        icon={<TbWebhook />}
      >
        Webhooks
      </NavItem>

      <NavItem
        to={`/dashboard/projects/${projectId}/flags/${flag.uuid}/activity`}
        icon={<TbActivity />}
      >
        Activity
      </NavItem>
    </HorizontalNav>
  );
};
