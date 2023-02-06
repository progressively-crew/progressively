export type ActivityType =
  | "change-flag-status"
  | "change-flag-percentage"
  | "change-variants-percentage"
  | "create-additional-audience"
  | "create-eligibility-restriction"
  | "create-webhook"
  | "create-scheduling"
  | "create-metric"
  | "create-variant"
  | "delete-webhook"
  | "delete-variant"
  | "delete-metric";

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
