import { Flag } from "../types";

export const getFlagMetaTitle = (parentsData: any): string => {
  const flag: Flag | undefined =
    parentsData?.["routes/dashboard/projects/$id/flags/$flagId"]?.flag;

  return flag?.name || "";
};
