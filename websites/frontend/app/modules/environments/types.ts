import { FlagEnv } from "../flags/types";

export interface Environment {
  uuid: string;
  name: string;
  projectId: string;
  flagEnvironment?: Array<FlagEnv>;
  clientKey: string;
  secretKey: string;
  domain?: string;
}

export interface CreateEnvironmentDTO {
  name?: string;
  domain?: string;
}

export interface LocalCount {
  count: number;
  name: string;
}
