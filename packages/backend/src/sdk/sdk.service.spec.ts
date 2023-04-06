import { Test, TestingModule } from '@nestjs/testing';
import { FlagStatus } from '../flags/flags.status';
import { PopulatedFlagEnv, Variant } from '../flags/types';
import { SdkService } from './sdk.service';
import { AppModule } from '../app.module';
import { RedisService } from '../websocket/redis.service';

describe('SdkService', () => {
  let service: SdkService;
  let flagEnv: PopulatedFlagEnv;
  let redisService: RedisService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<SdkService>(SdkService);
    redisService = module.get<RedisService>(RedisService);
  });

  afterAll(async () => {
    await redisService.close();
  });

  beforeEach(() => {
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
      variants: [],
      scheduling: [],
      environment: {
        name: 'First',
        uuid: '1',
        clientKey: 'abc',
        projectId: '12',
      },
      strategies: [],
    };
  });

  describe('resolveFlagStatus', () => {
    describe('No strategies (true / false)', () => {
      it('does not resolve the flag when not activated', () => {
        flagEnv.status = FlagStatus.NOT_ACTIVATED;

        const shouldActivate = service.resolveFlagStatus(flagEnv, {
          id: 'user-id-123',
        });

        expect(shouldActivate).toBe(false);
      });

      it('resolves "true" when the flag is activated', () => {
        const shouldActivate = service.resolveFlagStatus(flagEnv, {
          id: 'user-id-123',
        });

        expect(shouldActivate).toBe(true);
      });
    });

    describe('With strategies', () => {
      describe('valueToServe: boolean', () => {
        it('resolves "true" when the strategy has a rollout of 100% and no rules', () => {
          flagEnv.strategies = [
            {
              flagEnvironmentEnvironmentId: '1',
              flagEnvironmentFlagId: '1',
              valueToServe: 'true',
              valueToServeType: 'Boolean',
              uuid: '1',
              variants: [],
              rolloutPercentage: 100,
              rules: [],
            },
          ];

          const shouldActivate = service.resolveFlagStatus(flagEnv, {
            id: 'user-id-123',
          });

          expect(shouldActivate).toBe(true);
        });

        it('resolves "false" when the strategy has a rollout of 0% and no rules', () => {
          flagEnv.strategies = [
            {
              flagEnvironmentEnvironmentId: '1',
              flagEnvironmentFlagId: '1',
              valueToServe: 'true',
              valueToServeType: 'Boolean',
              uuid: '1',
              variants: [],
              rolloutPercentage: 0,
              rules: [],
            },
          ];

          const shouldActivate = service.resolveFlagStatus(flagEnv, {
            id: 'user-id-123',
          });

          expect(shouldActivate).toBe(false);
        });

        it('resolves "false" when the strategy has a rollout of 10% and no rules', () => {
          flagEnv.strategies = [
            {
              flagEnvironmentEnvironmentId: '1',
              flagEnvironmentFlagId: '1',
              valueToServe: 'true',
              valueToServeType: 'Boolean',
              uuid: '1',
              variants: [],
              rolloutPercentage: 10,
              rules: [],
            },
          ];

          const shouldActivate = service.resolveFlagStatus(flagEnv, {
            id: 'user-id-123',
          });

          expect(shouldActivate).toBe(false);
        });

        it('resolves "true" when the strategy has a rollout of 90% and no rules', () => {
          flagEnv.strategies = [
            {
              flagEnvironmentEnvironmentId: '1',
              flagEnvironmentFlagId: '1',
              valueToServe: 'true',
              valueToServeType: 'Boolean',
              uuid: '1',
              variants: [],
              rolloutPercentage: 90,
              rules: [],
            },
          ];

          const shouldActivate = service.resolveFlagStatus(flagEnv, {
            id: 'user-id-123',
          });

          expect(shouldActivate).toBe(true);
        });
      });
    });

    describe('valueToServe: string', () => {
      it('resolves "hello world" when the strategy has a rollout of 100% and no rules', () => {
        flagEnv.strategies = [
          {
            flagEnvironmentEnvironmentId: '1',
            flagEnvironmentFlagId: '1',
            valueToServe: 'hello world',
            valueToServeType: 'String',
            uuid: '1',
            variants: [],
            rolloutPercentage: 100,
            rules: [],
          },
        ];

        const shouldActivate = service.resolveFlagStatus(flagEnv, {
          id: 'user-id-123',
        });

        expect(shouldActivate).toBe('hello world');
      });

      it('resolves "false" when the strategy has a rollout of 0% and no rules', () => {
        flagEnv.strategies = [
          {
            flagEnvironmentEnvironmentId: '1',
            flagEnvironmentFlagId: '1',
            valueToServe: 'hello world',
            valueToServeType: 'String',
            uuid: '1',
            variants: [],
            rolloutPercentage: 0,
            rules: [],
          },
        ];

        const shouldActivate = service.resolveFlagStatus(flagEnv, {
          id: 'user-id-123',
        });

        expect(shouldActivate).toBe(false);
      });

      it('resolves "false" when the strategy has a rollout of 10% and no rules', () => {
        flagEnv.strategies = [
          {
            flagEnvironmentEnvironmentId: '1',
            flagEnvironmentFlagId: '1',
            valueToServe: 'hello world',
            valueToServeType: 'String',
            uuid: '1',
            variants: [],
            rolloutPercentage: 10,
            rules: [],
          },
        ];

        const shouldActivate = service.resolveFlagStatus(flagEnv, {
          id: 'user-id-123',
        });

        expect(shouldActivate).toBe(false);
      });

      it('resolves "hello-world" when the strategy has a rollout of 90% and no rules', () => {
        flagEnv.strategies = [
          {
            flagEnvironmentEnvironmentId: '1',
            flagEnvironmentFlagId: '1',
            valueToServe: 'hello world',
            valueToServeType: 'String',
            uuid: '1',
            variants: [],
            rolloutPercentage: 90,
            rules: [],
          },
        ];

        const shouldActivate = service.resolveFlagStatus(flagEnv, {
          id: 'user-id-123',
        });

        expect(shouldActivate).toBe('hello world');
      });
    });
  });
});
