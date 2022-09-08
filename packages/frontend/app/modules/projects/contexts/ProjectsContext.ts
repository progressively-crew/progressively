import { createContext } from "react";
import { UserProject } from "../types";

export interface ProjectsContextType {
  projects: Array<UserProject>;
}

export const ProjectsContext = createContext<ProjectsContextType>({ projects: [] });
