import {
  AiOutlineBarChart,
  AiOutlineClockCircle,
  AiOutlineSetting,
} from "react-icons/ai";
import { FaPowerOff } from "react-icons/fa";
import { HorizontalNav, NavItem } from "~/components/HorizontalNav";

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
        icon={<FaPowerOff />}
      >
        Strategies
      </NavItem>

      <NavItem
        to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/insights`}
        icon={<AiOutlineBarChart />}
      >
        Insights
      </NavItem>

      <NavItem
        to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/scheduling`}
        icon={<AiOutlineClockCircle />}
      >
        Scheduling
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
