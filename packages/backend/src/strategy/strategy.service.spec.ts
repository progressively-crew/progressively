import { Test, TestingModule } from '@nestjs/testing';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ComparatorEnum } from '../rule/comparators/types';
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
      rule: {
        fieldComparator: ComparatorEnum.Equals,
        fieldName: 'email',
        fieldValue: '`gmail.com',
      },
      flagEnvironmentEnvironmentId: '1',
      flagEnvironmentFlagId: '1',
      uuid: '123',
      valueToServe: 'true',
      valueToServeType: 'Boolean',
    };
  });

  describe('resolveAdditionalAudienceValue', () => {
    describe('value to serve String', () => {
      beforeEach(() => {
        strategy.valueToServeType = 'String';
        strategy.valueToServe = 'Control';
      });

      it('always returns false when no strategies are found', async () => {
        const shouldActivate = await service.resolveAdditionalAudienceValue(
          [],
          {
            id: 'user-id-123',
          },
        );

        expect(shouldActivate).toBe(false);
      });

      it('returns true when the field value matches', async () => {
        strategy.rule.fieldName = 'email';
        strategy.rule.fieldValue = 'marvin.frachet@something.com';
        strategy.rule.fieldComparator = ComparatorEnum.Equals;

        const fields = { email: 'marvin.frachet@something.com', id: '1234' };

        const shouldActivate = await service.resolveAdditionalAudienceValue(
          [strategy],
          fields,
        );

        expect(shouldActivate).toBe('Control');
      });

      it('returns false when the field value DOES NOT match', async () => {
        strategy.rule.fieldName = 'email';
        strategy.rule.fieldValue = 'marvin.frachet@something.com';

        const fields = { email: 'not.working@gmail.com' };

        const shouldActivate = await service.resolveAdditionalAudienceValue(
          [strategy],
          fields,
        );

        expect(shouldActivate).toBe(false);
      });

      it('returns false when the field name DOES NOT match', async () => {
        strategy.rule.fieldName = 'email';
        strategy.rule.fieldValue = 'marvin.frachet@something.com';

        const fields = { uuid: 'not.working@gmail.com' };

        const shouldActivate = await service.resolveAdditionalAudienceValue(
          [strategy],
          fields,
        );

        expect(shouldActivate).toBe(false);
      });
    });

    describe('value to serve Boolean', () => {
      beforeEach(() => {
        strategy.valueToServeType = 'Boolean';
      });

      it('always returns false when no strategies are found', async () => {
        const shouldActivate = await service.resolveAdditionalAudienceValue(
          [],
          {
            id: 'user-id-123',
          },
        );

        expect(shouldActivate).toBe(false);
      });

      it('returns true when the field value matches', async () => {
        strategy.rule.fieldName = 'email';
        strategy.rule.fieldValue = 'marvin.frachet@something.com';
        strategy.rule.fieldComparator = ComparatorEnum.Equals;

        const fields = { email: 'marvin.frachet@something.com', id: '1234' };

        const shouldActivate = await service.resolveAdditionalAudienceValue(
          [strategy],
          fields,
        );

        expect(shouldActivate).toBe(true);
      });

      it('returns false when the field value DOES NOT match', async () => {
        strategy.rule.fieldName = 'email';
        strategy.rule.fieldValue = 'marvin.frachet@something.com';

        const fields = { email: 'not.working@gmail.com' };

        const shouldActivate = await service.resolveAdditionalAudienceValue(
          [strategy],
          fields,
        );

        expect(shouldActivate).toBe(false);
      });

      it('returns false when the field name DOES NOT match', async () => {
        strategy.rule.fieldName = 'email';
        strategy.rule.fieldValue = 'marvin.frachet@something.com';

        const fields = { uuid: 'not.working@gmail.com' };

        const shouldActivate = await service.resolveAdditionalAudienceValue(
          [strategy],
          fields,
        );

        expect(shouldActivate).toBe(false);
      });
    });

    describe('Comparators', () => {
      it('returns true when the field email contains @gmail', async () => {
        strategy.rule.fieldName = 'email';
        strategy.rule.fieldValue = '@gmail';
        strategy.rule.fieldComparator = ComparatorEnum.Contains;

        const fields = { email: 'should.workg@gmail.com' };
        const shouldActivate = await service.resolveAdditionalAudienceValue(
          [strategy],
          fields,
        );

        expect(shouldActivate).toBe(true);
      });
    });
  });
});
