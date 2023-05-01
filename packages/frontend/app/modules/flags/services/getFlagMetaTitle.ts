import { Flag } from "../types";

export const getFlagMetaTitle = (matches: any): string => {
  const flag: Flag | undefined = matches.find(
    (match: any) => match.id === "routes/dashboard/projects/$id/flags/$flagId"
  )?.data.flag;

  return flag?.name || "";
};
