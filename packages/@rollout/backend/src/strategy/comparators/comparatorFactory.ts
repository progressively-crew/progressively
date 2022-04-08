import { ComparatorEnum } from '../types';
import { Comparator } from './comparators-types';
import { equals } from './equals';
import { notEquals } from './notEquals';

export const ComparatorFactory = {
  create: (comparatorKey: ComparatorEnum): Comparator => {
    switch (comparatorKey) {
      default:
      case ComparatorEnum.Equals: {
        return equals;
      }

      case ComparatorEnum.NotEquals: {
        return notEquals;
      }
    }
  },
};
