export type ActivityType =
  | 'change-flag-status'
  | 'change-flag-percentage'
  | 'change-variants-percentage'
  | 'create-webhook'
  | 'create-scheduling'
  | 'create-strategy'
  | 'create-metric'
  | 'create-variant'
  | 'delete-webhook'
  | 'delete-variant'
  | 'delete-metric'
  | 'delete-scheduling'
  | 'delete-strategy'
  | 'edit-strategy';

export type ActivityEntity = 'flag';

export interface Activity {
  userId: string;
  envId: string;
  flagId: string;
  type: ActivityType;
  concernedEntity: ActivityEntity;
  data?: string;
}
