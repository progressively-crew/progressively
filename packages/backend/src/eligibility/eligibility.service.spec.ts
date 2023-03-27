import { Test, TestingModule } from '@nestjs/testing';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ComparatorEnum } from '../rule/comparators/types';
import { PrismaService } from '../database/prisma.service';
import { FlagStatus } from '../flags/flags.status';
import { PopulatedFlagEnv } from '../flags/types';
import { EligibilityService } from './eligibility.service';
import { Eligibility } from './types';

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
      rule: {
        fieldComparator: ComparatorEnum.Contains,
        fieldName: 'email',
        fieldValue: '@gmail.com',
      },
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
    it('isnt elligible when the email field is empty', () => {
      expect(service.isEligible(flagEnv, {})).toBe(false);
    });

    it('isnt elligible when the email field does not contain @gmail.com', () => {
      expect(
        service.isEligible(flagEnv, {
          email: 'marvin@something.com',
        }),
      ).toBe(false);
    });

    it('is elligible when the email field contains @gmail.com', () => {
      expect(
        service.isEligible(flagEnv, {
          email: 'marvin@gmail.com',
        }),
      ).toBe(true);
    });

    it('is elligible when there are NO eligibilities (no restrictions) for the flags, meaning everybody is concerned', () => {
      flagEnv.eligibilities = [];

      expect(service.isEligible(flagEnv, {})).toBe(true);
    });
  });
});
