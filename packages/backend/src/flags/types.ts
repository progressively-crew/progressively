import {
  FlagEnvironment,
  Environment,
  Flag,
  RolloutStrategy,
} from '@prisma/client';

export interface FlagHitsRetrieveDTO {
  date: string;
  notactivated: number;
  activated: number;
}

export interface PopulatedFlagEnv extends FlagEnvironment {
  environment: Environment;
  flag: Flag;
  strategies: Array<RolloutStrategy>;
  _type: 'Flag'; // needed for websocket checking between A/B updates and flag update
}
