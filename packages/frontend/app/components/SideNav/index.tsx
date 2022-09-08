import { NavLink, useLocation } from "@remix-run/react";
import { FiLayers } from "react-icons/fi";
import { MdOutlineGroupWork } from "react-icons/md";
import { useProjects } from "~/modules/projects/contexts/useProjects";
import { User } from "~/modules/user/types";
import { styled } from "~/stitches.config";
import { HStack } from "../HStack";
import { DarkLogo } from "../Logo/DarkLogo";
import { Spacer } from "../Spacer";

const SideNavWrapper = styled("div", {
  background: "$hades",
  height: "100%",
  width: "300px",
  boxSizing: "border-box",
  padding: "$spacing$4",

  "& nav": {
    padding: "0 $spacing$6",
  },

  "& ul li svg": {
    color: "$tyche",
  },

  "& ul li ul li": {
    position: "relative",
    "&:before": {
      marginLeft: "7px",
      content: '""',
      height: "100%",
      width: "2px",
      background: "$tyche",
      position: "absolute",
      left: 0,
      top: 0,
    },
  },

  "& ul li ul li a": {
    color: "$heracles",
    marginLeft: "$spacing$2",
    fontSize: "$neptune",
    borderRadius: "0 $borderRadius$regular $borderRadius$regular 0",
  },

  "& nav ul a": {
    cursor: "pointer",
    display: "flex",
    fontSize: "$uranus",
    color: "$apollo",
    fontFamily: "$default",
    height: "$ctaSmall",
    alignItems: "center",
    borderRadius: "$borderRadius$regular",
    padding: "0 $spacing$6",
    margin: "0 -$spacing$6",
    transition: "all 0.1s",
    textDecoration: "none",

    "&:hover": {
      background: "$hadesLight",
    },

    "&.active": {
      background: "$tyche",
    },
    "&.active svg": {
      color: "$apollo",
    },
  },
});

export interface SideNavProps {
  user?: Partial<User>;
}

export const SideNav = ({ user }: SideNavProps) => {
  const { projects } = useProjects();
  const location = useLocation();

  const isProjectActive = ({ isActive }: { isActive: boolean }) => {
    // When creating an env, we are still in a page taking part of a project
    const isCreateEnvPage = location.pathname.includes("/environments/create");

    // When hitting the /environments, we defer the active to the child link
    const isEnvPage = location.pathname.includes(`/environments`);

    return isActive && (isCreateEnvPage || !isEnvPage) ? "active" : undefined;
  };

  return (
    <SideNavWrapper>
      <nav aria-label="Main navigation">
        <DarkLogo to={"/dashboard"} />

        <Spacer size={8} />
        <ul>
          {projects.map((up) => (
            <li key={`sidenav-project-${up.projectId}`}>
              <NavLink to={`/dashboard/projects/${up.projectId}`} className={isProjectActive}>
                <HStack spacing={3}>
                  <MdOutlineGroupWork aria-hidden />
                  <span>{up.project.name}</span>
                </HStack>
              </NavLink>
              <ul>
                {up.project.environments.map((env) => (
                  <li key={`sidenav-env-${env.uuid}`}>
                    <NavLink to={`/dashboard/projects/${up.projectId}/environments/${env.uuid}`}>
                      <HStack spacing={3}>
                        <span>{env.name}</span>
                      </HStack>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </SideNavWrapper>
  );
};
