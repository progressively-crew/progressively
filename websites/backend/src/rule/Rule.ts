import { ComparatorFactory } from './comparators/comparatorFactory';
import { Comparator } from './comparators/comparators-types';
import { ComparatorEnum } from './comparators/types';

export class Rule {
  constructor(
    private toCompareWith: string | number | boolean,
    private comparator: Comparator,
  ) {}

  static createFrom(
    toCompareWith: string | number | boolean,
    fieldComparator: ComparatorEnum,
  ) {
    return new Rule(toCompareWith, ComparatorFactory.create(fieldComparator));
  }

  isSatisfiedBy(valuetoCheck: string | number | boolean) {
    return this.comparator(this.toCompareWith, valuetoCheck);
  }
}
