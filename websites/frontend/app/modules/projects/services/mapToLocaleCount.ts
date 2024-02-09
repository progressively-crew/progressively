import { LocalCount } from "../types";

export const mapToLocaleCount = (
  aggregatedCounts: Array<any>,
  key: string
): Array<LocalCount> => {
  //[{ _count: { uuid: 2070 }, os: 'Mac OS' }],

  const arrayOfLocalCount: Array<LocalCount> = aggregatedCounts.map(
    (agc: any) => ({
      count: agc._count.uuid,
      name: agc[key],
    })
  );

  return arrayOfLocalCount;
};
