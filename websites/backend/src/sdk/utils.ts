import { x86 as murmur } from 'murmurhash3js';
import { BadRequestException } from '@nestjs/common';
import { FieldRecord } from '../rule/types';
import { PopulatedFlagEnv, PopulatedVariant } from '../flags/types';
import { CryptoService } from '../crypto/crypto.service';

const BUCKET_COUNT = 10000; // number of buckets
const MAX_INT_32 = Math.pow(2, 32);

export const getVariation = (
  bucketId: number,
  orderedVariants: Array<PopulatedVariant>,
): string | undefined => {
  let cumulative = 0;

  for (const variant of orderedVariants) {
    const countOfConcernedBuckets =
      BUCKET_COUNT * (variant.rolloutPercentage / 100);

    cumulative += countOfConcernedBuckets;

    if (bucketId < cumulative) {
      return variant.variant.value;
    }
  }

  // We guarantee that the control variant always exists and can't be removed
  return orderedVariants.find((variant) => variant.variant.isControl)!.variant
    .value;
};

export const isInBucket = (bucketId: number, rolloutPercentage: number) => {
  const higherBoundActivationThreshold =
    BUCKET_COUNT * (rolloutPercentage / 100);

  return bucketId < higherBoundActivationThreshold;
};

export const genBucket = (key: string, userId: string) => {
  const bucketKey = `${userId}-${key}`;
  const bucketHash: number = murmur.hash32(bucketKey, 1);
  const bucketHashRatio = bucketHash / MAX_INT_32; // int 32 hash divided by the max number of int 32
  return Math.floor(bucketHashRatio * BUCKET_COUNT);
};

export const parseBase64Params = (b64: string): FieldRecord => {
  try {
    return JSON.parse(Buffer.from(b64, 'base64').toString('ascii'));
  } catch (e) {
    throw new BadRequestException();
  }
};

export const resolveUserId = async (
  fields: FieldRecord,
  userAgent: string,
  ip: string,
) => {
  if (fields?.id) {
    // User exists, but initial request
    return String(fields.id);
  }

  // User exists, subsequent requests
  return await CryptoService.hash(`${userAgent}${ip}`);
};

export const getStringOfTypes = (flagEnvs: Array<PopulatedFlagEnv>) => {
  let definition = `export interface FlagDict {`;

  flagEnvs.forEach((flagEnv) => {
    const flagKey = flagEnv.flag.key;
    const variants: Array<string | boolean> = flagEnv.variants.map(
      (v) => `"${v.value}"`,
    );

    if (variants.length > 0) {
      definition += `    ${flagKey}:  boolean | ${variants.join(' | ')};\n`;
    } else {
      definition += `    ${flagKey}:  boolean;\n`;
    }
  });

  definition += `    };`;

  return definition;
};

export const getStringOfTypesWithCustomStrings = (
  flagEnvs: Array<PopulatedFlagEnv>,
) => {
  let definition = `export interface FlagDictWithCustomString {`;

  flagEnvs.forEach((flagEnv) => {
    const flagKey = flagEnv.flag.key;

    definition += `    ${flagKey}:  string | boolean;\n`;
  });

  definition += `    };`;

  return definition;
};
