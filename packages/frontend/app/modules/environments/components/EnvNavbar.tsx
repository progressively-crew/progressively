import {
  HorizontalNav,
  HorizontalNavSection,
  NavItem,
} from "~/components/HorizontalNav";
import { EnvIcon } from "~/components/Icons/EnvIcon";

export interface EnvNavBarProps {
  projectId: string;
  envId: string;
}

export const EnvNavBar = ({ projectId, envId }: EnvNavBarProps) => {
  const rootEnvPath = `/dashboard/projects/${projectId}/environments/${envId}`;

  return (
    <HorizontalNav label={"Navigate in the environment"}>
      <HorizontalNavSection
        icon={<EnvIcon />}
        title="Navigate in the environment"
      >
        <NavItem to={`${rootEnvPath}`}>Feature flags</NavItem>

        <NavItem to={`${rootEnvPath}/settings`}>Settings</NavItem>
      </HorizontalNavSection>
    </HorizontalNav>
  );
};
