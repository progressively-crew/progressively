import { TimeType } from './constants';

export interface ICachingService {
  set: (k: string, v: any, timeInS?: TimeType) => Promise<void>;
  get: <T>(k: string) => Promise<T | null>;
  teardown: () => Promise<void>;
  del: (k: string) => Promise<void>;
}
