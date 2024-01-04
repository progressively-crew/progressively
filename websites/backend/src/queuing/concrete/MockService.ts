import { IQueuingService } from '../types';

export class MockService implements IQueuingService {
  async send() {}

  async consume() {}

  async teardown() {}
}
