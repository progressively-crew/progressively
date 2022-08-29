import { Project } from "../types";

export const getProjectMetaTitle = (parentsData: any): string => {
  const project: Project = parentsData["routes/dashboard/projects/$id"].project;

  return project.name;
};
