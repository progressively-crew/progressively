import { Test, TestingModule } from '@nestjs/testing';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { RolloutStrategy } from '../strategy/types';
import { FlagStatus } from '../flags/flags.status';
import { PopulatedFlagEnv, Variant } from '../flags/types';
import { SdkService } from './sdk.service';
import { AppModule } from '../app.module';
import { ComparatorEnum } from '../shared/utils/comparators/types';
import { Eligibility } from '../eligibility/types';

describe('SdkService', () => {
  let service: SdkService;
  let strategy: RolloutStrategy;
  let flagEnv: PopulatedFlagEnv;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        {
          provide: WINSTON_MODULE_PROVIDER,
          useValue: {
            log: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SdkService>(SdkService);
  });

  beforeEach(() => {
    strategy = {
      fieldComparator: ComparatorEnum.Equals,
      fieldName: 'email',
      fieldValue: '@gmail.com`',
      flagEnvironmentEnvironmentId: '1',
      flagEnvironmentFlagId: '1',
      uuid: '123',
      valueToServe: 'true',
      valueToServeType: 'Boolean',
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
      eligibilities: [],
      scheduling: [],
      strategies: [strategy],
      environment: {
        name: 'First',
        uuid: '1',
        clientKey: 'abc',
        projectId: '12',
      },
    };
  });

  describe('resolveFlagStatus', () => {
    describe('Not activated', () => {
      it('does not resolve the flag when not activated', () => {
        flagEnv.status = FlagStatus.NOT_ACTIVATED;

        const shouldActivate = service.resolveFlagStatus(flagEnv, {
          id: 'user-id-123',
        });

        expect(shouldActivate).toBe(false);
      });
    });

    describe('Simple Variant', () => {
      it('approximates 50% of the audience', () => {
        flagEnv.rolloutPercentage = 50;

        let activated = 0;
        let notActivated = 0;

        for (let i = 0; i < 100; i++) {
          const shouldActivate = service.resolveFlagStatus(flagEnv, {
            id: i,
          });

          if (shouldActivate) {
            activated++;
          } else {
            notActivated++;
          }
        }

        expect(activated).toBe(52);
        expect(notActivated).toBe(48);
      });

      it('returns true when the rollout percentage is 100%', () => {
        flagEnv.rolloutPercentage = 100;

        const shouldActivate = service.resolveFlagStatus(flagEnv, {
          id: 'user-id-123',
        });

        expect(shouldActivate).toBe(true);
      });

      it('returns false when the the user id is falsy', () => {
        flagEnv.rolloutPercentage = 99;

        const shouldActivate = service.resolveFlagStatus(flagEnv, {});

        expect(shouldActivate).toBe(false);
      });

      it('returns true when the userId is falsy BUT the percentage is 100', () => {
        flagEnv.rolloutPercentage = 100;

        const shouldActivate = service.resolveFlagStatus(flagEnv, {});

        expect(shouldActivate).toBe(true);
      });

      it('returns true when the percentage is (70%) and that the user/flag combination is in the percentage range', () => {
        flagEnv.rolloutPercentage = 70;

        const shouldActivate = service.resolveFlagStatus(flagEnv, {
          id: 'user-id-123',
        });

        expect(shouldActivate).toBe(true);
      });

      it('returns false when the percentage is (5%) and that the user/flag combination is NOT in the percentage range', () => {
        flagEnv.rolloutPercentage = 5;

        const shouldActivate = service.resolveFlagStatus(flagEnv, {
          id: 'user-id-123',
        });

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
        it(`gives the ${expectedVariant.value} variant when the user ID is ${id}`, () => {
          const shouldActivate = service.resolveFlagStatus(flagEnv, {
            id,
          });

          expect(shouldActivate).toEqual(expectedVariant);
        });
      });
    });

    describe('Eligibilities', () => {
      it('returns true when no eligibilities', () => {
        const shouldActivate = service.resolveFlagStatus(flagEnv, {
          id: 'user-id-123',
        });

        expect(shouldActivate).toBe(true);
      });

      it('returns true when the user matches eligibilities', () => {
        const eligility: Eligibility = {
          uuid: '1',
          fieldName: 'name',
          fieldComparator: ComparatorEnum.Equals,
          fieldValue: 'john\njane\nmarvin',
          flagEnvironmentFlagId: '1',
          flagEnvironmentEnvironmentId: '1',
        };

        flagEnv.eligibilities = [eligility];

        const shouldActivate = service.resolveFlagStatus(flagEnv, {
          id: 'user-id-123',
          name: 'jane',
        });

        expect(shouldActivate).toBe(true);
      });

      it('returns false when the user does not match eligibilities', () => {
        const eligility: Eligibility = {
          uuid: '1',
          fieldName: 'name',
          fieldComparator: ComparatorEnum.Equals,
          fieldValue: 'john\njane\nmarvin',
          flagEnvironmentFlagId: '1',
          flagEnvironmentEnvironmentId: '1',
        };

        flagEnv.eligibilities = [eligility];

        const shouldActivate = service.resolveFlagStatus(flagEnv, {
          id: 'user-id-123',
          name: 'laeti',
        });

        expect(shouldActivate).toBe(false);
      });
    });

    describe('Additional audience', () => {
      it('always returns true when no strategies are found', () => {
        flagEnv.strategies = [];

        const shouldActivate = service.resolveFlagStatus(flagEnv, {
          id: 'user-id-123',
        });

        expect(shouldActivate).toBe(true);
      });

      it('returns true when the field value matches', () => {
        strategy.fieldName = 'email';
        strategy.fieldValue = 'marvin.frachet@something.com';
        strategy.fieldComparator = ComparatorEnum.Equals;
        flagEnv.rolloutPercentage = 0;

        const fields = { email: 'marvin.frachet@something.com', id: '1234' };

        const shouldActivate = service.resolveFlagStatus(flagEnv, fields);

        expect(shouldActivate).toBe(true);
      });

      it('returns false when field value DOES NOT match', () => {
        strategy.fieldName = 'email';
        strategy.fieldValue = 'marvin.frachet@something.com';
        flagEnv.rolloutPercentage = 0;

        const fields = { email: 'not.working@gmail.com' };

        const shouldActivate = service.resolveFlagStatus(flagEnv, fields);

        expect(shouldActivate).toBe(false);
      });

      it('returns false when the field name DOES NOT match', () => {
        strategy.fieldName = 'email';
        strategy.fieldValue = 'marvin.frachet@something.com';
        flagEnv.rolloutPercentage = 0;

        const fields = { uuid: 'not.working@gmail.com' };

        const shouldActivate = service.resolveFlagStatus(flagEnv, fields);

        expect(shouldActivate).toBe(false);
      });

      describe('Comparators', () => {
        it('returns true when the field email contains @gmail', () => {
          strategy.fieldName = 'email';
          strategy.fieldValue = '@gmail';
          strategy.fieldComparator = ComparatorEnum.Contains;

          const fields = { email: 'should.workg@gmail.com' };
          const shouldActivate = service.resolveFlagStatus(flagEnv, fields);

          expect(shouldActivate).toBe(true);
        });
      });
    });
  });
});
