import { Project } from "../types";

export const getProjectMetaTitle = (matches: any): string => {
  const project: Project | undefined = matches.find(
    (match: any) => match.id === "routes/dashboard/projects/$id"
  )?.data.project;

  return project?.name || "";
};
