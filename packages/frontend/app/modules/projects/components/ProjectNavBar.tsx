import { HorizontalNav, NavItem } from "~/components/HorizontalNav";
import { Project } from "../types";
import { EnvIcon } from "~/components/Icons/EnvIcon";
import { FlagIcon } from "~/components/Icons/FlagIcon";
import { SettingsIcon } from "~/components/Icons/SettingsIcon";
import { BsCaretRightFill } from "react-icons/bs/index.js";
import { AiOutlinePlus } from "react-icons/ai/index.js";
import { useState } from "react";
import { IconBox } from "~/components/IconBox";
import { useLocation } from "@remix-run/react";

export interface ProjectNavBarProps {
  project: Project;
}

export const ProjectNavBar = ({ project }: ProjectNavBarProps) => {
  const location = useLocation();
  const [expanded, setExpanded] = useState(
    location.pathname.includes("/environments")
  );

  const buttonStyles =
    "gap-2 w-full focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:focus:ring-offset-slate-900 text-sm h-8 block flex items-center rounded px-3 text-gray-700 hover:bg-gray-50 hover:dark:bg-slate-700 dark:text-gray-300";

  return (
    <HorizontalNav label={"Navigate in project"}>
      <NavItem
        to={`/dashboard/projects/${project.uuid}/flags`}
        icon={<FlagIcon />}
      >
        Feature flags
      </NavItem>

      <li className="text-sm block rounded text-gray-900 dark:text-white px-4">
        <button className={buttonStyles} onClick={() => setExpanded((s) => !s)}>
          <BsCaretRightFill
            className={expanded ? "rotate-90 transition-all" : "transition-all"}
          />
          Environments
        </button>
        <ul
          className={`pt-1 flex flex-col gap-2 pl-2 ${
            expanded ? "block" : "hidden"
          }`}
          aria-hidden={!expanded}
          aria-expanded={expanded}
          aria-label="Environments submenu"
        >
          {project.environments.map((env) => (
            <NavItem
              to={`/dashboard/projects/${project.uuid}/environments/${env.uuid}`}
              key={env.uuid}
              icon={
                <IconBox content={env.name} size="S">
                  <EnvIcon />
                </IconBox>
              }
            >
              {env.name}
            </NavItem>
          ))}

          <NavItem
            to={`/dashboard/projects/${project.uuid}/environments/create`}
            icon={<AiOutlinePlus />}
          >
            Add an env
          </NavItem>
        </ul>
      </li>

      <NavItem
        to={`/dashboard/projects/${project.uuid}/settings`}
        icon={<SettingsIcon />}
      >
        Settings
      </NavItem>
    </HorizontalNav>
  );
};
