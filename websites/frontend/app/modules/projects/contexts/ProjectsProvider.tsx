import { Project } from "../types";
import { ProjectsContext } from "./ProjectsContext";

export interface ProjectsProviderProps {
  children: React.ReactNode;
  projects: Array<Project>;
}

export const ProjectsProvider = ({
  children,
  projects,
}: ProjectsProviderProps) => {
  return (
    <ProjectsContext.Provider value={{ projects }}>
      {children}
    </ProjectsContext.Provider>
  );
};
