import {
  HorizontalNav,
  HorizontalNavSection,
  NavItem,
} from "~/components/HorizontalNav";
import { FaToggleOff } from "react-icons/fa";
import { FlagEnv, FlagStatus } from "../types";
import { Form } from "@remix-run/react";
import { ToggleFlag } from "./ToggleFlag";
import { FlagIcon } from "~/components/Icons/FlagIcon";
import { Stack } from "~/components/Stack";
import { HiOutlinePresentationChartLine } from "react-icons/hi2";

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
      <Stack spacing={6}>
        <HorizontalNavSection icon={<FaToggleOff />} title={"Feature toggle"}>
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
          >
            Dev setup
          </NavItem>
        </HorizontalNavSection>

        <HorizontalNavSection icon={<FlagIcon />} title={"Feature management"}>
          <NavItem
            to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagEnv.flagId}`}
          >
            Audience
          </NavItem>

          <NavItem
            to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagEnv.flagId}/segments`}
          >
            Segments
          </NavItem>

          <NavItem
            to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagEnv.flagId}/variants`}
          >
            Variants
          </NavItem>

          <NavItem
            to={`/dashboard/projects/${projectId}/environments/${envId}/flags/${flagEnv.flagId}/scheduling`}
          >
            Scheduling
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
        </HorizontalNavSection>

        <HorizontalNavSection
          icon={<HiOutlinePresentationChartLine />}
          title={"Analysis"}
        >
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
        </HorizontalNavSection>
      </Stack>
    </HorizontalNav>
  );
};
