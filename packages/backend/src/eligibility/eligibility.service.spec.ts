import { Test, TestingModule } from '@nestjs/testing';
import { EligibilityService } from './eligibility.service';

describe('EligibilityService', () => {
  let service: EligibilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EligibilityService],
    }).compile();

    service = module.get<EligibilityService>(EligibilityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
