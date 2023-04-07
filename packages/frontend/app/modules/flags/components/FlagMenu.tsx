import { HorizontalNav, NavItem } from "~/components/HorizontalNav";
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
      <li className="border-r border-gray-200 dark:border-slate-700 pr-4 shrink-0">
        <Form method="post" id={`form-${flagEnv.flagId}`}>
          <ToggleFlag
            isFlagActivated={flagEnv.status === FlagStatus.ACTIVATED}
            flagId={flagEnv.flagId}
          />
        </Form>
      </li>

      <NavItem
        to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagEnv.flagId}`}
      >
        Audience
      </NavItem>

      <NavItem
        to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagEnv.flagId}/variants`}
      >
        Variants
      </NavItem>

      <NavItem
        to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagEnv.flagId}/segments`}
      >
        Segments
      </NavItem>

      <NavItem
        to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagEnv.flagId}/scheduling`}
      >
        Scheduling
      </NavItem>

      <NavItem
        to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagEnv.flagId}/insights`}
      >
        Insights
      </NavItem>

      <NavItem
        to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagEnv.flagId}/metrics`}
      >
        Metrics
      </NavItem>

      <NavItem
        to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagEnv.flagId}/webhooks`}
      >
        Webhooks
      </NavItem>

      <NavItem
        to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagEnv.flagId}/activity`}
      >
        Activity
      </NavItem>

      <NavItem
        to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagEnv.flagId}/settings`}
      >
        Settings
      </NavItem>
    </HorizontalNav>
  );
};
