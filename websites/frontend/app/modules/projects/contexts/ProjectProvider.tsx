import { Project } from "../types";
import { ProjectContext } from "./ProjectContext";

export interface ProjectProviderProps {
  children: React.ReactNode;
  project: Project;
  userRole: string;
}

export const ProjectProvider = ({
  children,
  project,
  userRole,
}: ProjectProviderProps) => {
  return (
    <ProjectContext.Provider value={{ project, userRole }}>
      {children}
    </ProjectContext.Provider>
  );
};
