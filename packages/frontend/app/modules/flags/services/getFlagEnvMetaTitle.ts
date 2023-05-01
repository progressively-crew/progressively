import { FlagEnv } from "../types";

export const getFlagEnvMetaTitle = (matches: any): string => {
  const flagEnv: FlagEnv | undefined = matches.find(
    (match: any) =>
      match.id ===
      "routes/dashboard/projects/$id/environments/$env/flags/$flagId"
  )?.data?.flagEnv;

  return flagEnv?.flag?.name || "";
};
