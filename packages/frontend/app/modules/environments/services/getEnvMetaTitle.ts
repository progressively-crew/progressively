import { Project } from "~/modules/projects/types";

export const getEnvMetaTitle = (matches: any, envId: string): string => {
  const project: Project | undefined = matches.find(
    (match: any) => match.id === "routes/dashboard/projects/$id"
  )?.data.project;

  const environment = project?.environments.find((env) => env.uuid === envId);

  return environment?.name || "";
};
