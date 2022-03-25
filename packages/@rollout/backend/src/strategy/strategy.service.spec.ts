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

  describe('checkActivationType', () => {
    it('returns true when the activation rule is Boolean', () => {
      strategy.activationType = ActivationRuleType.Boolean;

      const shouldActivate = service.checkActivationType(strategy, flagEnv, {
        id: 'user-id-123',
      });

      expect(shouldActivate).toBe(true);
    });

    it('returns false when the activation rule is Percentage but the userId is falsy', () => {
      strategy.rolloutPercentage = 99;
      strategy.activationType = ActivationRuleType.Percentage;

      const shouldActivate = service.checkActivationType(strategy, flagEnv, {});

      expect(shouldActivate).toBe(false);
    });

    it('returns true when the activation rule is Percentage, the userId is falsy BUT the percentage is 100', () => {
      strategy.rolloutPercentage = 100;
      strategy.activationType = ActivationRuleType.Percentage;

      const shouldActivate = service.checkActivationType(strategy, flagEnv, {});

      expect(shouldActivate).toBe(true);
    });

    it('returns true when the ActivationRuleType is Percentage (70%) and that the user/flag combination is in the percentage range', () => {
      strategy.activationType = ActivationRuleType.Percentage;
      strategy.rolloutPercentage = 70;

      const shouldActivate = service.checkActivationType(strategy, flagEnv, {
        id: 'user-id-123',
      });

      expect(shouldActivate).toBe(true);
    });

    it('returns false when the ActivationRuleType is Percentage (5%) and that the user/flag combination is NOT in the percentage range', () => {
      strategy.activationType = ActivationRuleType.Percentage;
      strategy.rolloutPercentage = 5;

      const shouldActivate = service.checkActivationType(strategy, flagEnv, {
        id: 'user-id-123',
      });

      expect(shouldActivate).toBe(false);
    });

    it('returns false when the ActivationRuleType does not match any known one', () => {
      strategy.activationType = 'unknown';
      strategy.rolloutPercentage = 5;

      const shouldActivate = service.checkActivationType(strategy, flagEnv, {
        id: 'user-id-123',
      });

      expect(shouldActivate).toBe(false);
    });
  });

  describe('checkStrategyRule', () => {
    it('returns true when the StrategyRuleType is default', () => {
      strategy.strategyRuleType = StrategyRuleType.Default;

      const shouldActivate = service.checkStrategyRule(strategy, {});

      expect(shouldActivate).toBe(true);
    });

    it('returns true when the StrategyRuleType is field and that the field value matches', () => {
      strategy.strategyRuleType = StrategyRuleType.Field;
      strategy.fieldName = 'email';
      strategy.fieldValue = 'marvin.frachet@gmail.com';

      const fields = { email: 'marvin.frachet@gmail.com', uuid: '1234' };

      const shouldActivate = service.checkStrategyRule(strategy, fields);

      expect(shouldActivate).toBe(true);
    });

    it('returns false when the StrategyRuleType is field and that the field value DOES NOT match', () => {
      strategy.strategyRuleType = StrategyRuleType.Field;
      strategy.fieldName = 'email';
      strategy.fieldValue = 'marvin.frachet@gmail.com';

      const fields = { email: 'not.working@gmail.com' };

      const shouldActivate = service.checkStrategyRule(strategy, fields);

      expect(shouldActivate).toBe(false);
    });

    it('returns false when the StrategyRuleType is field and that the field name DOES NOT match', () => {
      strategy.strategyRuleType = StrategyRuleType.Field;
      strategy.fieldName = 'email';
      strategy.fieldValue = 'marvin.frachet@gmail.com';

      const fields = { uuid: 'not.working@gmail.com' };

      const shouldActivate = service.checkStrategyRule(strategy, fields);

      expect(shouldActivate).toBe(false);
    });
  });
});
