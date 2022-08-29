import { createContext } from "react";
import { Project } from "../types";

export interface ProjectContextType {
  project: Project;
  userRole: string;
}

export const ProjectContext = createContext<ProjectContextType>({});
