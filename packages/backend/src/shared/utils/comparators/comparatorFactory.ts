import { ComparatorEnum } from './types';
import { Comparator } from './comparators-types';
import { contains } from './contains';
import { equals } from './equals';

export const ComparatorFactory = {
  create: (comparatorKey: ComparatorEnum): Comparator => {
    switch (comparatorKey) {
      default:
      case ComparatorEnum.Equals: {
        return equals;
      }

      case ComparatorEnum.Contains: {
        return contains;
      }
    }
  },
};
