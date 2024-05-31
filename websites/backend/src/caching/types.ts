export interface ICachingService {
  set: (k: string, v: any) => Promise<void>;
  get: (k: string) => Promise<string | null>;
}
