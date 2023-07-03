import { HorizontalNav, NavItem } from "~/components/HorizontalNav";
import { Project } from "../types";
import { EnvIcon } from "~/components/Icons/EnvIcon";
import { IoAddCircleOutline } from "react-icons/io5";
import { FlagIcon } from "~/components/Icons/FlagIcon";
import { SettingsIcon } from "~/components/Icons/SettingsIcon";
import { IconBox } from "~/components/IconBox";

export interface ProjectNavBarProps {
  project: Project;
}

export const ProjectNavBar = ({ project }: ProjectNavBarProps) => {
  return (
    <div className="pt-4">
      <HorizontalNav label={"Navigate in project"}>
        <NavItem
          to={`/dashboard/projects/${project.uuid}/flags`}
          icon={<FlagIcon />}
        >
          Feature flags
        </NavItem>

        <li className="block rounded text-gray-900 dark:text-white px-4">
          <div className="h-8 flex items-center gap-2 px-3 text-gray-700 pb-1 dark:text-slate-50">
            <EnvIcon />
            Environments
          </div>
          <ul className="flex flex-col gap-2 pl-6">
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
              icon={<IoAddCircleOutline className="w-5 h-5" />}
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
    </div>
  );
};
