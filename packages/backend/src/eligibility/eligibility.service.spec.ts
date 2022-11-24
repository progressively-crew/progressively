import { Test, TestingModule } from '@nestjs/testing';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from '../database/prisma.service';
import { FlagStatus } from '../flags/flags.status';
import { PopulatedFlagEnv, Variant } from '../flags/types';
import { EligibilityService } from './eligibility.service';
import { ComparatorEnum, Eligibility } from './types';

describe('EligibilityService', () => {
  let service: EligibilityService;
  let eligibility: Eligibility;
  let flagEnv: PopulatedFlagEnv;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EligibilityService,
        PrismaService,
        {
          provide: WINSTON_MODULE_PROVIDER,
          useValue: {
            log: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EligibilityService>(EligibilityService);
  });

  beforeEach(() => {
    eligibility = {
      fieldComparator: undefined,
      fieldName: undefined,
      fieldValue: undefined,
      flagEnvironmentEnvironmentId: '1',
      flagEnvironmentFlagId: '1',
      uuid: '123',
    };

    flagEnv = {
      environmentId: '1',
      flagId: '2',
      flag: {
        uuid: '1',
        createdAt: new Date(),
        description: 'Description of the flag',
        key: 'flag-key',
        name: 'Super flag',
      },
      status: FlagStatus.ACTIVATED,
      rolloutPercentage: 100,
      variants: [],
      environment: {
        uuid: '1',
        name: 'prod',
        projectId: '1',
        clientKey: 'yup',
      },
      strategies: [],
      scheduling: [],
      eligibilities: [eligibility],
    };
  });

  describe('isEligible', () => {
    it('fails', () => {
      expect(true).toBe(false);
    });
  });
});
