import { HorizontalNav, NavItem } from "~/components/HorizontalNav";

export interface EnvNavBarProps {
  projectId: string;
  envId: string;
}

export const EnvNavBar = ({ projectId, envId }: EnvNavBarProps) => {
  const rootEnvPath = `/dashboard/projects/${projectId}/environments/${envId}`;

  return (
    <HorizontalNav label={`Environment related`}>
      <NavItem to={`${rootEnvPath}`}>Feature flags</NavItem>

      <NavItem to={`${rootEnvPath}/settings`}>Settings</NavItem>
    </HorizontalNav>
  );
};
