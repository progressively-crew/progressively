export interface ICachingService {
  set: (k: string, v: any, timeInS?: number) => Promise<void>;
  get: (k: string) => Promise<string | null>;
}
