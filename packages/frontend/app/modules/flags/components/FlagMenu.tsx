import {
  AiOutlineBarChart,
  AiOutlineClockCircle,
  AiOutlineSetting,
} from "react-icons/ai";
import { FaToggleOff } from "react-icons/fa";
import { TbSend } from "react-icons/tb";
import { MdBubbleChart } from "react-icons/md";
import { HideTablet } from "~/components/HideMobile";
import { HorizontalNav, NavItem } from "~/components/HorizontalNav";
import { Spacer } from "~/components/Spacer";
import { VariantIcon } from "~/components/Icons/VariantIcon";

export interface FlagMenuProps {
  projectId: string;
  envId: string;
  flagId: string;
}

export const FlagMenu = ({ projectId, envId, flagId }: FlagMenuProps) => {
  return (
    <HorizontalNav label={`Flag related`}>
      <HideTablet role="separator" as="li">
        <p className="uppercase text-black text-sm font-bold">
          Rollout details
        </p>
        <Spacer size={1} />
      </HideTablet>

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

      <HideTablet role="separator" as="li">
        <Spacer size={4} />
        <p className="uppercase text-black text-sm font-bold">Measuring</p>
        <Spacer size={1} />
      </HideTablet>

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

      <HideTablet role="separator" as="li">
        <Spacer size={4} />
        <p className="uppercase text-black text-sm font-bold">Other</p>
        <Spacer size={1} />
      </HideTablet>

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
