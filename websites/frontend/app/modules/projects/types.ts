import { User } from "../user/types";

// In Sync with the backend UserRoles type
export enum UserRoles {
  Admin = "admin",
  User = "user",
}

export interface Project {
  uuid: string;
  createdAt: string;
  name: string;
  userProject?: Array<UserProject>;
}

export interface UserProject {
  projectId: string;
  userId: string;
  role: UserRoles;
  project: Project;
  user?: User;
}

export interface CreateProjectDTO {
  name: string;
  domain: string;
}

export interface LocalCount {
  count: number;
  name: string;
}

export interface Funnel {
  uuid: string;
  name: string;
}

export interface CreateFunnelEntryDTO {
  flagUuid?: string;
  flagName?: string;
  eventName?: string;
  variant?: string;
  pageViewUrl?: string;
}
