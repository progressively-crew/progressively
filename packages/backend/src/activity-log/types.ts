export type ActivityType =
  | 'change-flag-status'
  | 'change-flag-percentage'
  | 'create-additional-audience'
  | 'create-eligibility-restriction'
  | 'create-webhook'
  | 'create-scheduling'
  | 'create-metric'
  | 'create-variant';

export type ActivityEntity = 'flag';

export interface Activity {
  userId: string;
  envId: string;
  flagId: string;
  type: ActivityType;
  concernedEntity: ActivityEntity;
  data?: string;
}
