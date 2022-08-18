import { x86 as murmur } from 'murmurhash3js';

const BUCKET_COUNT = 10000; // number of buckets
const MAX_INT_32 = Math.pow(2, 32);

export const isInBucket = (
  key: string,
  userId: string,
  rolloutPercentage: number,
) => {
  const bucket = genBucket(key, userId);

  return isInRange(bucket, rolloutPercentage);
};

export const isInRange = (bucket: number, rolloutPercentage: number) => {
  const higherBoundActivationThreshold =
    BUCKET_COUNT * (rolloutPercentage / 100);

  return bucket < higherBoundActivationThreshold;
};

export const genBucket = (userId: string, key: string) => {
  const bucketKey = `${userId}-${key}`;
  const bucketHash: number = murmur.hash32(bucketKey, 1);
  const bucketHashRatio = bucketHash / MAX_INT_32; // int 32 hash divided by the max number of int 32
  const bucket = Math.floor(bucketHashRatio * BUCKET_COUNT);

  return bucket;
};
