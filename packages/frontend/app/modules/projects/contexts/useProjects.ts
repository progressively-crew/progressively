import { useContext } from "react";
import { ProjectsContext } from "./ProjectsContext";

export const useProjects = () => useContext(ProjectsContext);
