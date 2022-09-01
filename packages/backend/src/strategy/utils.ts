import { x86 as murmur } from 'murmurhash3js';
import { Variant } from '../flags/types';

const BUCKET_COUNT = 10000; // number of buckets
const MAX_INT_32 = Math.pow(2, 32);

export const getVariation = (
  key: string,
  userId: string,
  orderedVariants: Array<Variant>,
): Variant => {
  const bucket = genBucket(key, userId);

  for (let variant of orderedVariants) {
    if (isInRange(bucket, variant.rolloutPercentage)) {
      return variant;
    }
  }

  // We guarantee that the control variant always exists and can't be removed
  const controlVariant = orderedVariants.find((variant) => variant.isControl)!;
  return controlVariant;
};

export const isInBucket = (
  key: string,
  userId: string,
  rolloutPercentage: number,
) => {
  const bucket = genBucket(key, userId);

  return isInRange(bucket, rolloutPercentage);
};

const isInRange = (bucket: number, rolloutPercentage: number) => {
  const higherBoundActivationThreshold =
    BUCKET_COUNT * (rolloutPercentage / 100);

  return bucket < higherBoundActivationThreshold;
};

const genBucket = (key: string, userId: string) => {
  const bucketKey = `${userId}-${key}`;
  const bucketHash: number = murmur.hash32(bucketKey, 1);
  const bucketHashRatio = bucketHash / MAX_INT_32; // int 32 hash divided by the max number of int 32
  return Math.floor(bucketHashRatio * BUCKET_COUNT);
};
