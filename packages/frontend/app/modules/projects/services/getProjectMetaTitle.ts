import { Project } from "../types";

export const getProjectMetaTitle = (parentsData: any): string => {
  const project: Project | undefined =
    parentsData?.["routes/dashboard/projects/$id"]?.project;

  return project?.name || "";
};
