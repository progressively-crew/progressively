import { Test, TestingModule } from '@nestjs/testing';
import { RolloutStrategy } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { FlagStatus } from '../flags/flags.status';
import { ExtendedFlagEnv, StrategyService } from './strategy.service';
import { ActivationRuleType, StrategyRuleType } from './types';

describe('StrategyService', () => {
  let service: StrategyService;
  let strategy: RolloutStrategy;
  let flagEnv: ExtendedFlagEnv;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StrategyService, PrismaService],
    }).compile();

    service = module.get<StrategyService>(StrategyService);
  });

  beforeEach(() => {
    strategy = {
      activationType: ActivationRuleType.Boolean,
      fieldComparator: undefined,
      fieldName: undefined,
      fieldValue: undefined,
      flagEnvironmentEnvironmentId: '1',
      flagEnvironmentFlagId: '1',
      name: 'Strategy name',
      rolloutPercentage: undefined,
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
    describe('ActivationRuleType', () => {
      it('returns true when the activation rule is Boolean', async () => {
        strategy.activationType = ActivationRuleType.Boolean;

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
        strategy.activationType = ActivationRuleType.Percentage;

        const shouldActivate = await service.resolveStrategies(
          flagEnv,
          [strategy],
          {},
        );

        expect(shouldActivate).toBe(false);
      });

      it('returns true when the activation rule is Percentage, the userId is falsy BUT the percentage is 100', async () => {
        strategy.rolloutPercentage = 100;
        strategy.activationType = ActivationRuleType.Percentage;

        const shouldActivate = await service.resolveStrategies(
          flagEnv,
          [strategy],
          {},
        );

        expect(shouldActivate).toBe(true);
      });

      it('returns true when the ActivationRuleType is Percentage (70%) and that the user/flag combination is in the percentage range', async () => {
        strategy.activationType = ActivationRuleType.Percentage;
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
        strategy.activationType = ActivationRuleType.Percentage;
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

      it('returns false when the ActivationRuleType does not match any known one', async () => {
        strategy.activationType = 'unknown';
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
        strategy.fieldValue = 'marvin.frachet@gmail.com';

        const fields = { email: 'marvin.frachet@gmail.com', uuid: '1234' };

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
        strategy.fieldValue = 'marvin.frachet@gmail.com';

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
        strategy.fieldValue = 'marvin.frachet@gmail.com';

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
          strategy.fieldValue = 'marvin.frachet@gmail.com';
          strategy.fieldComparator = 'neq';

          const fields = { uuid: 'should.workg@gmail.com' };
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
