import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../database/prisma.service';
import { FlagStatus } from '../flags/flags.status';
import { ExtendedFlagEnv, StrategyService } from './strategy.service';
import { ComparatorEnum, RolloutStrategy, StrategyRuleType } from './types';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { VariantType } from '../flags/types';

describe('StrategyService', () => {
  let service: StrategyService;
  let strategy: RolloutStrategy;
  let flagEnv: ExtendedFlagEnv;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StrategyService,
        PrismaService,
        {
          provide: WINSTON_MODULE_PROVIDER,
          useValue: {
            log: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<StrategyService>(StrategyService);
  });

  beforeEach(() => {
    strategy = {
      fieldComparator: undefined,
      fieldName: undefined,
      fieldValue: undefined,
      flagEnvironmentEnvironmentId: '1',
      flagEnvironmentFlagId: '1',
      name: 'Strategy name',
      strategyRuleType: StrategyRuleType.Default,
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
      variantType: VariantType.SimpleVariant,
      variants: [],
    };
  });

  describe('resolveStrategies', () => {
    describe('no strategies', () => {
      it('always returns true when no strategies are found', async () => {
        const shouldActivate = await service.resolveStrategies(flagEnv, [], {
          id: 'user-id-123',
        });

        expect(shouldActivate).toBe(true);
      });
    });

    describe('Percentage rollout', () => {
      it('returns true when the rollout percentage is 100%', async () => {
        flagEnv.rolloutPercentage = 100;

        const shouldActivate = await service.resolveStrategies(
          flagEnv,
          [strategy],
          {
            id: 'user-id-123',
          },
        );

        expect(shouldActivate).toBe(true);
      });

      it('returns false when the the user id is falsy', async () => {
        flagEnv.rolloutPercentage = 99;

        const shouldActivate = await service.resolveStrategies(
          flagEnv,
          [strategy],
          {},
        );

        expect(shouldActivate).toBe(false);
      });

      it('returns true when the userId is falsy BUT the percentage is 100', async () => {
        flagEnv.rolloutPercentage = 100;

        const shouldActivate = await service.resolveStrategies(
          flagEnv,
          [strategy],
          {},
        );

        expect(shouldActivate).toBe(true);
      });

      it('returns true when the percentage is (70%) and that the user/flag combination is in the percentage range', async () => {
        flagEnv.rolloutPercentage = 70;

        const shouldActivate = await service.resolveStrategies(
          flagEnv,
          [strategy],
          {
            id: 'user-id-123',
          },
        );

        expect(shouldActivate).toBe(true);
      });

      it('returns false when the percentage is (5%) and that the user/flag combination is NOT in the percentage range', async () => {
        flagEnv.rolloutPercentage = 5;

        const shouldActivate = await service.resolveStrategies(
          flagEnv,
          [strategy],
          {
            id: 'user-id-123',
          },
        );

        expect(shouldActivate).toBe(false);
      });
    });

    describe('StrategyRuleType', () => {
      it('returns true when the StrategyRuleType is field and that the field value matches', async () => {
        strategy.strategyRuleType = StrategyRuleType.Field;
        strategy.fieldName = 'email';
        strategy.fieldValue = 'marvin.frachet@something.com';
        strategy.fieldComparator = ComparatorEnum.Equals;
        flagEnv.rolloutPercentage = 0;

        const fields = { email: 'marvin.frachet@something.com', id: '1234' };

        const shouldActivate = await service.resolveStrategies(
          flagEnv,
          [strategy],
          fields,
        );

        expect(shouldActivate).toBe(true);
      });

      it('returns false when the StrategyRuleType is field and that the field value DOES NOT match', async () => {
        strategy.strategyRuleType = StrategyRuleType.Field;
        strategy.fieldName = 'email';
        strategy.fieldValue = 'marvin.frachet@something.com';
        flagEnv.rolloutPercentage = 0;

        const fields = { email: 'not.working@gmail.com' };

        const shouldActivate = await service.resolveStrategies(
          flagEnv,
          [strategy],
          fields,
        );

        expect(shouldActivate).toBe(false);
      });

      it('returns false when the StrategyRuleType is field and that the field name DOES NOT match', async () => {
        strategy.strategyRuleType = StrategyRuleType.Field;
        strategy.fieldName = 'email';
        strategy.fieldValue = 'marvin.frachet@something.com';
        flagEnv.rolloutPercentage = 0;

        const fields = { uuid: 'not.working@gmail.com' };

        const shouldActivate = await service.resolveStrategies(
          flagEnv,
          [strategy],
          fields,
        );

        expect(shouldActivate).toBe(false);
      });

      describe('comparators', () => {
        it('returns true when the StrategyRuleType is field and that the field name DOES NOT match with the NEQ comparator', async () => {
          strategy.strategyRuleType = StrategyRuleType.Field;
          strategy.fieldName = 'email';
          strategy.fieldValue = 'marvin.frachet@something.com';
          strategy.fieldComparator = ComparatorEnum.NotEquals;

          const fields = { email: 'should.workg@gmail.com' };
          const shouldActivate = await service.resolveStrategies(
            flagEnv,
            [strategy],
            fields,
          );

          expect(shouldActivate).toBe(true);
        });

        it('returns true when the StrategyRuleType is field and that the field email contains @gmail', async () => {
          strategy.strategyRuleType = StrategyRuleType.Field;
          strategy.fieldName = 'email';
          strategy.fieldValue = '@gmail';
          strategy.fieldComparator = ComparatorEnum.Contains;

          const fields = { email: 'should.workg@gmail.com' };
          const shouldActivate = await service.resolveStrategies(
            flagEnv,
            [strategy],
            fields,
          );

          expect(shouldActivate).toBe(true);
        });
      });
    });
  });
});
