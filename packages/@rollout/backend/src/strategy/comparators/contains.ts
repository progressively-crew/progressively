import { Comparator } from './comparators-types';

export const contains: Comparator = (v1: string, v2: string) => {
  return v2.includes(v1);
};
