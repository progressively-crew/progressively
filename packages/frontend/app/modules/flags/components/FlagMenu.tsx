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
import { FlagEnv, FlagStatus } from "../types";
import { Form } from "@remix-run/react";
import { ToggleFlag } from "./ToggleFlag";

export interface FlagMenuProps {
  projectId: string;
  envId: string;
  flagEnv: FlagEnv;
}

export const FlagMenu = ({ projectId, envId, flagEnv }: FlagMenuProps) => {
  return (
    <HorizontalNav label={`Flag related`}>
      <li>
        <Form method="post" id={`form-${flagEnv.flagId}`}>
          <ToggleFlag
            isFlagActivated={flagEnv.status === FlagStatus.ACTIVATED}
            flagId={flagEnv.flagId}
            flagName={flagEnv.flag.name}
          />
        </Form>
      </li>

      <NavItem
        to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagEnv.flagId}`}
        icon={<BiGroup />}
      >
        Audience
      </NavItem>

      <NavItem
        to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagEnv.flagId}/insights`}
        icon={<AiOutlineBarChart />}
      >
        Insights
      </NavItem>

      <NavItem
        to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagEnv.flagId}/variants`}
        icon={<VariantIcon />}
      >
        Variants
      </NavItem>

      <NavItem
        to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagEnv.flagId}/metrics`}
        icon={<MetricIcon />}
      >
        Metrics
      </NavItem>

      <NavItem
        to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagEnv.flagId}/scheduling`}
        icon={<AiOutlineClockCircle />}
      >
        Scheduling
      </NavItem>

      <NavItem
        to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagEnv.flagId}/webhooks`}
        icon={<TbSend />}
      >
        Webhooks
      </NavItem>
      <NavItem
        to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagEnv.flagId}/settings`}
        icon={<AiOutlineSetting />}
      >
        Settings
      </NavItem>
    </HorizontalNav>
  );
};
