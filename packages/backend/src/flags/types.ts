import { Environment } from '../environments/types';
import { RolloutStrategy } from '../strategy/types';

export interface FlagHitsRetrieveDTO {
  date: string;
  notactivated: number;
  activated: number;
}

export interface Flag {
  uuid: string;
  name: string;
  key: string;
  description: string;
  createdAt: Date;
}

export interface FlagEnvironment {
  flagId: string;
  environmentId: string;
  status: string;
}

export interface PopulatedFlagEnv extends FlagEnvironment {
  environment: Environment;
  flag: Flag;
  strategies: Array<RolloutStrategy>;
}
