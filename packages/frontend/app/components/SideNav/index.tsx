import { NavLink } from "@remix-run/react";
import { useProjects } from "~/modules/projects/contexts/useProjects";
import { User } from "~/modules/user/types";
import { styled } from "~/stitches.config";
import { DarkLogo } from "../Logo/DarkLogo";
import { Spacer } from "../Spacer";

const SideNavWrapper = styled("div", {
  background: "$hadesLight",
  height: "100%",
  width: "300px",
  boxSizing: "border-box",
  padding: "$spacing$4",

  ".logo-wrapper": {
    padding: "0 $spacing$6",
  },

  "& nav": {
    padding: "0 $spacing$8",
  },

  "& ul li ul": {
    paddingLeft: "$spacing$4",
  },

  "& li": {
    marginTop: "$spacing$2",
  },

  "& nav a": {
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
      background: "$hades",
    },

    "&.active": {
      background: "$hades",
    },
  },
});

export interface SideNavProps {
  user?: Partial<User>;
}

export const SideNav = ({ user }: SideNavProps) => {
  const { projects } = useProjects();

  return (
    <SideNavWrapper>
      <div className="logo-wrapper">
        <DarkLogo to={"/dashboard"} />
      </div>

      <Spacer size={8} />

      <nav aria-label="Main navigation">
        <ul>
          {projects.map((up) => (
            <li key={`sidenav-project-${up.projectId}`}>
              <NavLink to={`/dashboard/projects/${up.projectId}`}>{up.project.name}</NavLink>
              <ul>
                {up.project.environments.map((env) => (
                  <li key={`sidenav-env-${env.uuid}`}>
                    <NavLink
                      to={`/dashboard/projects/${up.projectId}/environments/${env.uuid}/flags`}
                    >
                      {env.name}
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
