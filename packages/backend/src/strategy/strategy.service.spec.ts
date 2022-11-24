import { Test, TestingModule } from '@nestjs/testing';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ComparatorEnum } from '../shared/utils/comparators/types';
import { PrismaService } from '../database/prisma.service';
import { StrategyService } from './strategy.service';
import { RolloutStrategy } from './types';

describe('StrategyService', () => {
  let service: StrategyService;
  let strategy: RolloutStrategy;

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
      uuid: '123',
    };
  });

  describe('isAdditionalAudience', () => {
    it('always returns false when no strategies are found', async () => {
      const shouldActivate = await service.isAdditionalAudience([], {
        id: 'user-id-123',
      });

      expect(shouldActivate).toBe(false);
    });

    it('returns true when the field value matches', async () => {
      strategy.fieldName = 'email';
      strategy.fieldValue = 'marvin.frachet@something.com';
      strategy.fieldComparator = ComparatorEnum.Equals;

      const fields = { email: 'marvin.frachet@something.com', id: '1234' };

      const shouldActivate = await service.isAdditionalAudience(
        [strategy],
        fields,
      );

      expect(shouldActivate).toBe(true);
    });

    it('returns false when the field value DOES NOT match', async () => {
      strategy.fieldName = 'email';
      strategy.fieldValue = 'marvin.frachet@something.com';

      const fields = { email: 'not.working@gmail.com' };

      const shouldActivate = await service.isAdditionalAudience(
        [strategy],
        fields,
      );

      expect(shouldActivate).toBe(false);
    });

    it('returns false when the field name DOES NOT match', async () => {
      strategy.fieldName = 'email';
      strategy.fieldValue = 'marvin.frachet@something.com';

      const fields = { uuid: 'not.working@gmail.com' };

      const shouldActivate = await service.isAdditionalAudience(
        [strategy],
        fields,
      );

      expect(shouldActivate).toBe(false);
    });

    describe('Comparators', () => {
      it('returns true when the field email contains @gmail', async () => {
        strategy.fieldName = 'email';
        strategy.fieldValue = '@gmail';
        strategy.fieldComparator = ComparatorEnum.Contains;

        const fields = { email: 'should.workg@gmail.com' };
        const shouldActivate = await service.isAdditionalAudience(
          [strategy],
          fields,
        );

        expect(shouldActivate).toBe(true);
      });
    });
  });
});
