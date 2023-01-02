import {
  AiOutlineBarChart,
  AiOutlineClockCircle,
  AiOutlineSetting,
} from "react-icons/ai";
import { BiGroup } from "react-icons/bi";
import { TbSend } from "react-icons/tb";
import { HorizontalNav, NavItem } from "~/components/HorizontalNav";
import { VariantIcon } from "~/components/Icons/VariantIcon";
import { MetricIcon } from "~/components/Icons/MetricIcon";

export interface FlagMenuProps {
  projectId: string;
  envId: string;
  flagId: string;
}

export const FlagMenu = ({ projectId, envId, flagId }: FlagMenuProps) => {
  return (
    <HorizontalNav label={`Flag related`}>
      <NavItem
        to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}`}
        icon={<BiGroup />}
      >
        Audience
      </NavItem>

      <NavItem
        to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/insights`}
        icon={<AiOutlineBarChart />}
      >
        Insights
      </NavItem>

      <NavItem
        to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/variants`}
        icon={<VariantIcon />}
      >
        Variants
      </NavItem>

      <NavItem
        to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/metrics`}
        icon={<MetricIcon />}
      >
        Metrics
      </NavItem>

      <NavItem
        to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/scheduling`}
        icon={<AiOutlineClockCircle />}
      >
        Scheduling
      </NavItem>

      <NavItem
        to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/webhooks`}
        icon={<TbSend />}
      >
        Webhooks
      </NavItem>
      <NavItem
        to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/settings`}
        icon={<AiOutlineSetting />}
      >
        Settings
      </NavItem>
    </HorizontalNav>
  );
};
