import {
  AiOutlineAppstore,
  AiOutlineBarChart,
  AiOutlineClockCircle,
  AiOutlineSetting,
} from "react-icons/ai";
import { FaToggleOff } from "react-icons/fa";
import { MdBubbleChart } from "react-icons/md";
import { HideTablet } from "~/components/HideMobile";
import { HorizontalNav, NavItem } from "~/components/HorizontalNav";
import { Spacer } from "~/components/Spacer";
import { Typography } from "~/components/Typography";

export interface FlagMenuProps {
  projectId: string;
  envId: string;
  flagId: string;
}

export const FlagMenu = ({ projectId, envId, flagId }: FlagMenuProps) => {
  return (
    <HorizontalNav label={`Flag related`}>
      <HideTablet role="separator" as="li">
        <Typography
          size="neptune"
          textTransform="uppercase"
          color="hadesLight"
          fontWeight="semiBold"
        >
          Rollout details
        </Typography>
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
        icon={<AiOutlineAppstore />}
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
        <Typography
          size="neptune"
          textTransform="uppercase"
          color="hadesLight"
          fontWeight="semiBold"
        >
          Measuring
        </Typography>
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
        <Typography
          size="neptune"
          textTransform="uppercase"
          color="hadesLight"
          fontWeight="semiBold"
        >
          Other
        </Typography>
        <Spacer size={1} />
      </HideTablet>

      <NavItem
        to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagId}/settings`}
        icon={<AiOutlineSetting />}
      >
        Settings
      </NavItem>
    </HorizontalNav>
  );
};
