export type ActivityType =
  | "change-flag-status"
  | "change-flag-percentage"
  | "change-variants-percentage"
  | "create-webhook"
  | "create-variant"
  | "create-strategy"
  | "delete-webhook"
  | "delete-variant"
  | "delete-rule"
  | "delete-strategy"
  | "edit-strategy";

export type ActivityEntity = "flag";

export interface Activity {
  concernedEntity: ActivityEntity;
  data?: any;
  flagUuid: string;
  id: number;
  type: ActivityType;
  userUuid: string;
  utc: string;
  user: {
    fullname: string;
  };
}
