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

  describe('isMatchingAtLeastOneRule', () => {
    it('returns true when no rules are passed', () => {
      const rules: Array<RuleType> = [];

      const fields: FieldRecord = {
        id: '1234',
        email: 'marv',
      };

      expect(service.isMatchingAtLeastOneRule(rules, fields)).toBe(true);
    });

    it('returns true when at least one rule is valid', () => {
      const rules: Array<RuleType> = [
        {
          fieldComparator: ComparatorEnum.Equals,
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
        id: 'abcd',
        email: 'marvin',
      };

      expect(service.isMatchingAtLeastOneRule(rules, fields)).toBe(true);
    });

    it('returns fals when absolutely no rule is matching', () => {
      const rules: Array<RuleType> = [
        {
          fieldComparator: ComparatorEnum.Equals,
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
        id: 'not-matching',
        email: 'not-matching',
      };

      expect(service.isMatchingAtLeastOneRule(rules, fields)).toBe(false);
    });
  });

  describe('isMatchingAllRules', () => {
    it('returns false when no rules are passed', () => {
      const rules: Array<RuleType> = [];

      const fields: FieldRecord = {
        id: '1234',
        email: 'marv',
      };

      expect(service.isMatchingAllRules(rules, fields)).toBe(false);
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
  });
});
