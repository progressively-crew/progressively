import { Test, TestingModule } from '@nestjs/testing';
import { RuleService } from './rule.service';

describe('RuleService', () => {
  let service: RuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RuleService],
    }).compile();

    service = module.get<RuleService>(RuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
