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
      rolloutPercentage: 100,
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

      it('resolves "true" when the rollout percentage is 100% without strategies', () => {
        const shouldActivate = service.resolveFlagStatus(flagEnv, {
          id: 'user-id-123',
        });

        expect(shouldActivate).toBe(true);
      });

      it('resolves "false" when the id is not passed percentage is not 100%', () => {
        flagEnv.status = FlagStatus.NOT_ACTIVATED;

        const shouldActivate = service.resolveFlagStatus(flagEnv, {
          id: undefined,
        });

        expect(shouldActivate).toBe(false);
      });
    });
  });
});
