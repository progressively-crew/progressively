import { createContext } from "react";
import { Project } from "../types";

export interface ProjectsContextType {
  projects: Array<Project>;
}

export const ProjectsContext = createContext<ProjectsContextType>({
  projects: [],
});
