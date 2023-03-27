import { Comparator } from './comparators-types';

export const equals: Comparator = (v1: string, v2: string) => {
  return v1 === v2;
};
