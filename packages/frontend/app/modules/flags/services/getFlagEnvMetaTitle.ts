import { FlagEnv } from "../types";

export const getFlagEnvMetaTitle = (parentsData: any): string => {
  const flagEnv: FlagEnv | undefined =
    parentsData?.[
      "routes/dashboard/projects/$id/environments/$env/flags/$flagId"
    ]?.flagEnv;

  return flagEnv?.flag?.name || "";
};
