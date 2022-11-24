import { Test, TestingModule } from '@nestjs/testing';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from '../database/prisma.service';
import { FlagStatus } from '../flags/flags.status';
import { PopulatedFlagEnv, Variant } from '../flags/types';
import { StrategyService } from './strategy.service';
import { ComparatorEnum, RolloutStrategy, StrategyRuleType } from './types';

describe('StrategyService', () => {
  let service: StrategyService;
  let strategy: RolloutStrategy;
  let flagEnv: PopulatedFlagEnv;

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
      variants: [],
      environment: {
        uuid: '1',
        name: 'prod',
        projectId: '1',
        clientKey: 'yup',
      },
      strategies: [strategy],
      scheduling: [],
      eligibilities: [],
    };
  });

  describe('resolveStrategies', () => {
    describe('Simple Variant', () => {
      it('approximates 50% of the audience', async () => {
        flagEnv.rolloutPercentage = 50;

        let activated = 0;
        let notActivated = 0;

        for (let i = 0; i < 100; i++) {
          const shouldActivate = await service.resolveStrategies(
            flagEnv,
            [strategy],
            {
              id: i,
            },
          );

          if (shouldActivate) {
            activated++;
          } else {
            notActivated++;
          }
        }

        expect(activated).toBe(52);
        expect(notActivated).toBe(48);
      });

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

    describe('Multi Variate', () => {
      beforeEach(() => {
        const variants: Array<Variant> = [];

        flagEnv.variants = variants;
        flagEnv.rolloutPercentage = 0;

        flagEnv.variants.push(
          {
            value: 'First',
            rolloutPercentage: 25,
            isControl: true,
            uuid: '1',
          },
          {
            value: 'Second',
            rolloutPercentage: 50,
            isControl: false,
            uuid: '2',
          },
          {
            value: 'Third',
            rolloutPercentage: 25,
            isControl: false,
            uuid: '3',
          },
        );
      });

      (
        [
          [
            '3',
            {
              isControl: true,
              rolloutPercentage: 25,
              uuid: '1',
              value: 'First',
            },
          ],
          [
            '4321',
            {
              isControl: false,
              rolloutPercentage: 50,
              uuid: '2',
              value: 'Second',
            },
          ],
          [
            '789',
            {
              isControl: false,
              rolloutPercentage: 50,
              uuid: '2',
              value: 'Second',
            },
          ],
          [
            '123',
            {
              isControl: false,
              rolloutPercentage: 50,
              uuid: '2',
              value: 'Second',
            },
          ],
          [
            '1000',
            {
              isControl: false,
              rolloutPercentage: 50,
              uuid: '2',
              value: 'Second',
            },
          ],
          [
            '10000',
            {
              isControl: false,
              rolloutPercentage: 25,
              uuid: '3',
              value: 'Third',
            },
          ],
          [
            '30000',
            {
              isControl: false,
              rolloutPercentage: 25,
              uuid: '3',
              value: 'Third',
            },
          ],
        ] as const
      ).forEach(([id, expectedVariant]) => {
        it(`gives the ${expectedVariant.value} variant when the user ID is ${id}`, async () => {
          const shouldActivate = await service.resolveStrategies(
            flagEnv,
            [strategy],
            { id },
          );

          expect(shouldActivate).toEqual(expectedVariant);
        });
      });
    });

    describe('Strategies', () => {
      it('always returns true when no strategies are found', async () => {
        const shouldActivate = await service.resolveStrategies(flagEnv, [], {
          id: 'user-id-123',
        });

        expect(shouldActivate).toBe(true);
      });

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

      describe('Comparators', () => {
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
