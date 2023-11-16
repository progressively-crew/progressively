import { Environment } from "../environments/types";
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
  environments: Array<Environment>;
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
  name?: string;
}
