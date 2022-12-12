import {
  AiOutlineBarChart,
  AiOutlineClockCircle,
  AiOutlineSetting,
} from "react-icons/ai";
import { FaToggleOff } from "react-icons/fa";
import { TbSend } from "react-icons/tb";
import { MdBubbleChart } from "react-icons/md";
import { HorizontalNav, NavItem } from "~/components/HorizontalNav";
import { VariantIcon } from "~/components/Icons/VariantIcon";

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
        icon={<FaToggleOff />}
      >
        Overview
      </NavItem>
      <NavItem
        to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/variants`}
        icon={<VariantIcon />}
      >
        Variants
      </NavItem>
      <NavItem
        to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/scheduling`}
        icon={<AiOutlineClockCircle />}
      >
        Scheduling
      </NavItem>

      <NavItem
        to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/insights`}
        icon={<AiOutlineBarChart />}
      >
        Insights
      </NavItem>
      <NavItem
        to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/metrics`}
        icon={<MdBubbleChart />}
      >
        Metrics
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
