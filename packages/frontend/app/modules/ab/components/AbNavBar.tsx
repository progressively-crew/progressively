import { AiOutlineSetting } from "react-icons/ai";
import { HorizontalNav, NavItem } from "~/components/HorizontalNav";
import { IoShapes } from "react-icons/io5";

export interface AbNavBarProps {
  projectId: string;
  envId: string;
  experimentId: string;
}

export const AbNavBar = ({ projectId, envId, experimentId }: AbNavBarProps) => {
  const rootEnvPath = `/dashboard/projects/${projectId}/environments/${envId}/ab`;

  return (
    <HorizontalNav label={`A/B experiment related`}>
      <NavItem
        to={`${rootEnvPath}/${experimentId}/variants`}
        icon={<IoShapes />}
      >
        Variants
      </NavItem>

      <NavItem
        to={`${rootEnvPath}/${experimentId}/settings`}
        icon={<AiOutlineSetting />}
      >
        Settings
      </NavItem>
    </HorizontalNav>
  );
};
