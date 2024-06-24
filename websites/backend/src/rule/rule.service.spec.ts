import { Test, TestingModule } from '@nestjs/testing';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from '../database/prisma.service';
import { RuleService } from './rule.service';
import { RuleType } from './types';
import { ComparatorEnum } from './comparators/types';
import { FieldRecord } from '../rule/types';

describe('RuleService', () => {
  let service: RuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RuleService,
        PrismaService,
        {
          provide: WINSTON_MODULE_PROVIDER,
          useValue: {
            log: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RuleService>(RuleService);
  });

  describe('isMatchingAllRules', () => {
    it('returns true when no rules are passed', () => {
      const rules: Array<RuleType> = [];

      const fields: FieldRecord = {
        id: '1234',
        email: 'marv',
      };

      expect(service.isMatchingAllRules(rules, fields)).toBe(true);
    });

    it(`resolves rules using the "AND" operator`, () => {
      const rules: Array<RuleType> = [
        {
          fieldComparator: ComparatorEnum.Contains,
          fieldName: 'email',
          fieldValue: 'marvin',
        },
        {
          fieldComparator: ComparatorEnum.Equals,
          fieldName: 'id',
          fieldValue: '1234',
        },
      ];

      const fields: FieldRecord = {
        id: '1234',
        email: 'marvin',
      };

      expect(service.isMatchingAllRules(rules, fields)).toBe(true);
    });

    it(`returns false when only one rule is matching using the "AND" operator`, () => {
      const rules: Array<RuleType> = [
        {
          fieldComparator: ComparatorEnum.Contains,
          fieldName: 'email',
          fieldValue: 'marvin@gmail.com',
        },
        {
          fieldComparator: ComparatorEnum.Equals,
          fieldName: 'id',
          fieldValue: '1234',
        },
      ];

      const fields: FieldRecord = {
        id: '1234',
        email: 'marvin',
      };

      expect(service.isMatchingAllRules(rules, fields)).toBe(false);
    });

    it(`resolves rules with a segment`, () => {
      const rules: Array<Partial<RuleType>> = [
        {
          segment: {
            uuid: '123',
            name: 'Hello world',
            segmentRules: [
              {
                uuid: '123',
                fieldComparator: ComparatorEnum.Equals,
                fieldName: 'id',
                fieldValue: '1234',
              },
              {
                uuid: '1233',
                fieldComparator: ComparatorEnum.Contains,
                fieldName: 'id',
                fieldValue: '12',
              },
            ],
          },
        },
      ];

      const fields: FieldRecord = {
        id: '1234',
        email: 'marvin',
      };

      expect(service.isMatchingAllRules(rules, fields)).toBe(true);
    });

    it(`returns false when the  rules in the segment is not match`, () => {
      const rules: Array<Partial<RuleType>> = [
        {
          segment: {
            uuid: '123',
            name: 'Hello world',
            segmentRules: [
              {
                uuid: '123',
                fieldComparator: ComparatorEnum.Equals,
                fieldName: 'id',
                fieldValue: '1234',
              },
            ],
          },
        },
      ];

      const fields: FieldRecord = {
        id: '12344',
        email: 'marvin',
      };

      expect(service.isMatchingAllRules(rules, fields)).toBe(false);
    });
  });
});
