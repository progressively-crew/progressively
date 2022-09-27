import { x86 as murmur } from 'murmurhash3js';
import { Variant } from '../flags/types';

const BUCKET_COUNT = 10000; // number of buckets
const MAX_INT_32 = Math.pow(2, 32);

export const getVariation = (
  bucketId: number,
  orderedVariants: Array<Variant>,
): Variant => {
  let cumulative = 0;
  for (const variant of orderedVariants) {
    const countOfConcernedBuckets =
      BUCKET_COUNT * (variant.rolloutPercentage / 100);

    cumulative += countOfConcernedBuckets;

    if (bucketId < cumulative) {
      return variant;
    }
  }

  // We guarantee that the control variant always exists and can't be removed
  return orderedVariants.find((variant) => variant.isControl)!;
};

export const isInBucket = (bucketId: number, rolloutPercentage: number) => {
  const higherBoundActivationThreshold =
    BUCKET_COUNT * (rolloutPercentage / 100);

  return bucketId < higherBoundActivationThreshold;
};

export const getBucketThreshold = () => BUCKET_COUNT;

export const genBucket = (key: string, userId: string) => {
  const bucketKey = `${userId}-${key}`;
  const bucketHash: number = murmur.hash32(bucketKey, 1);
  const bucketHashRatio = bucketHash / MAX_INT_32; // int 32 hash divided by the max number of int 32
  return Math.floor(bucketHashRatio * BUCKET_COUNT);
};
