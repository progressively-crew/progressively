export type ActivityType =
  | "change-flag-status"
  | "change-flag-percentage"
  | "change-variants-percentage"
  | "create-webhook"
  | "create-scheduling"
  | "create-variant"
  | "create-strategy"
  | "delete-webhook"
  | "delete-variant"
  | "delete-scheduling"
  | "delete-rule"
  | "delete-strategy"
  | "edit-strategy";

export type ActivityEntity = "flag";

export interface Activity {
  concernedEntity: ActivityEntity;
  data?: any;
  flagEnvironmentEnvironmentId: string;
  flagEnvironmentFlagId: string;
  id: number;
  type: ActivityType;
  userUuid: string;
  utc: string;
  user: {
    fullname: string;
  };
}
