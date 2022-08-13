import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../database/prisma.service';
import { FlagStatus } from '../flags/flags.status';
import { ExtendedFlagEnv, StrategyService } from './strategy.service';
import { ComparatorEnum, RolloutStrategy, StrategyRuleType } from './types';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

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
      rolloutPercentage: 100,
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
        strategy.rolloutPercentage = 100;

        const shouldActivate = await service.resolveStrategies(
          flagEnv,
          [strategy],
          {
            id: 'user-id-123',
          },
        );

        expect(shouldActivate).toBe(true);
      });

      it('returns false when the activation rule is Percentage but the userId is falsy', async () => {
        strategy.rolloutPercentage = 99;

        const shouldActivate = await service.resolveStrategies(
          flagEnv,
          [strategy],
          {},
        );

        expect(shouldActivate).toBe(false);
      });

      it('returns true when the activation rule is Percentage, the userId is falsy BUT the percentage is 100', async () => {
        strategy.rolloutPercentage = 100;

        const shouldActivate = await service.resolveStrategies(
          flagEnv,
          [strategy],
          {},
        );

        expect(shouldActivate).toBe(true);
      });

      it('returns true when the ActivationRuleType is Percentage (70%) and that the user/flag combination is in the percentage range', async () => {
        strategy.rolloutPercentage = 70;

        const shouldActivate = await service.resolveStrategies(
          flagEnv,
          [strategy],
          {
            id: 'user-id-123',
          },
        );

        expect(shouldActivate).toBe(true);
      });

      it('returns false when the ActivationRuleType is Percentage (5%) and that the user/flag combination is NOT in the percentage range', async () => {
        strategy.rolloutPercentage = 5;

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
      it('returns true when the StrategyRuleType is default', async () => {
        strategy.strategyRuleType = StrategyRuleType.Default;

        const shouldActivate = await service.resolveStrategies(
          flagEnv,
          [strategy],
          {},
        );

        expect(shouldActivate).toBe(true);
      });

      it('returns true when the StrategyRuleType is field and that the field value matches', async () => {
        strategy.strategyRuleType = StrategyRuleType.Field;
        strategy.fieldName = 'email';
        strategy.fieldValue = 'marvin.frachet@something.com';

        const fields = { email: 'marvin.frachet@something.com', uuid: '1234' };

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

        const fields = { uuid: 'not.working@gmail.com' };

        const shouldActivate = await service.resolveStrategies(
          flagEnv,
          [strategy],
          fields,
        );

        expect(shouldActivate).toBe(false);
      });

      describe('comparators', () => {
        it('returns true when the StrategyRuleType is field and that the field name DOES NOT match with  the neq comparator', async () => {
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
