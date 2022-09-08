import { UserProject } from "../types";
import { ProjectsContext } from "./ProjectsContext";

export interface ProjectsProviderProps {
  children: React.ReactNode;
  projects: Array<UserProject>;
}

export const ProjectsProvider = ({ children, projects }: ProjectsProviderProps) => {
  return <ProjectsContext.Provider value={{ projects }}>{children}</ProjectsContext.Provider>;
};
