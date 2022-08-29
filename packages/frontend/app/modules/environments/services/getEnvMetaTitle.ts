import { Project } from "~/modules/projects/types";

export const getEnvMetaTitle = (parentsData: any, envId: string): string => {
  const project: Project | undefined =
    parentsData?.["routes/dashboard/projects/$id"]?.project;

  const environment = project?.environments.find((env) => env.uuid === envId);

  return environment?.name || "";
};
