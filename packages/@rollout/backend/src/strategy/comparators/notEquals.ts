import { Comparator } from './comparators-types';

export const notEquals: Comparator = (v1: string, v2: string) => {
  return v1 !== v2;
};
