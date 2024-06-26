import { ICachingService } from '../types';

export class InMemoryService implements ICachingService {
  private dict: Record<string, any>;
  constructor() {
    this.dict = {};
  }
  teardown() {
    return Promise.resolve();
  }

  get(k: string) {
    return Promise.resolve(this.dict[k]);
  }

  async set(k: string, v: any) {
    this.dict[k] = v;
  }

  async del(k: string) {
    this.dict[k] = undefined;
  }
}
