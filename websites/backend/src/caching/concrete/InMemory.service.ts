import { ICachingService } from '../types';

export class InMemoryService implements ICachingService {
  private dict: Record<string, any>;
  constructor() {
    this.dict = {};
  }
  get(k: string) {
    return Promise.resolve(this.dict[k]);
  }

  async set(k: string, v: any) {
    this.dict[k] = v;
  }
}
