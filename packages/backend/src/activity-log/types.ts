export type ActivityType =
  | 'change-flag-status'
  | 'change-flag-percentage'
  | 'change-variants-percentage'
  | 'create-webhook'
  | 'create-scheduling'
  | 'create-strategy'
  | 'create-metric'
  | 'create-variant'
  | 'create-segment'
  | 'create-segment-rule'
  | 'delete-webhook'
  | 'delete-variant'
  | 'delete-metric'
  | 'delete-scheduling'
  | 'delete-segment'
  | 'delete-rule'
  | 'delete-strategy'
  | 'edit-segment-name'
  | 'edit-segment-rule';

export type ActivityEntity = 'flag';

export interface Activity {
  userId: string;
  envId: string;
  flagId: string;
  type: ActivityType;
  concernedEntity: ActivityEntity;
  data?: string;
}
