export type ActivityType =
  | "change-flag-status"
  | "change-flag-percentage"
  | "change-variants-percentage"
  | "create-webhook"
  | "create-scheduling"
  | "create-metric"
  | "create-variant"
  | "create-segment"
  | "create-segment-rule"
  | "delete-webhook"
  | "delete-variant"
  | "delete-metric"
  | "delete-scheduling"
  | "delete-segment"
  | "delete-rule"
  | "edit-segment-name"
  | "edit-segment-rule";

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
