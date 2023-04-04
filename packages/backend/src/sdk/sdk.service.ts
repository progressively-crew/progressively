import { BadRequestException, Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { EnvironmentsService } from '../environments/environments.service';
import { FlagsService } from '../flags/flags.service';
import { PopulatedFlagEnv, Variant } from '../flags/types';
import { FieldRecord } from '../strategy/types';
import { EventHit } from './types';
import { PrismaService } from '../database/prisma.service';
import { StrategyService } from '../strategy/strategy.service';
import { FlagStatus } from '../flags/flags.status';
import { genBucket, getVariation, isInBucket } from './utils';
import { EligibilityService } from '../eligibility/eligibility.service';
import { SchedulingService } from '../scheduling/scheduling.service';
import { SegmentsService } from '../segments/segments.service';

@Injectable()
export class SdkService {
  constructor(
    private prisma: PrismaService,
    private readonly envService: EnvironmentsService,
    private readonly strategyService: StrategyService,
    private readonly scheduleService: SchedulingService,
    private readonly eligibilityService: EligibilityService,
    private readonly segmentService: SegmentsService,
    private readonly flagService: FlagsService,
  ) {}

  resolveUserId(params: FieldRecord, cookieUserId?: string) {
    if (params?.id) {
      // User exists, but initial request
      return String(params.id);
    }

    if (cookieUserId) {
      // User exists, subsequent requests
      return cookieUserId;
    }

    // first visit but anonymous
    return nanoid();
  }

  parseBase64Params(b64: string): FieldRecord {
    try {
      return JSON.parse(Buffer.from(b64, 'base64').toString('ascii'));
    } catch (e) {
      throw new BadRequestException();
    }
  }

  private getUserVariant(
    flagEnv: PopulatedFlagEnv,
    fields: FieldRecord,
  ): boolean | Variant {
    // When at least one variant is created, we cant rely on rolloutPercentage at the flag level
    // we need to rely on the percentage at the variant level
    if (flagEnv.variants?.length === 0 && flagEnv.rolloutPercentage === 100) {
      return true;
    }

    // No users, we can't make assumptions, should be very rare
    if (!fields?.id) return false;

    const bucketId = genBucket(flagEnv.flag.key, fields.id as string);
    const isMultiVariate = flagEnv.variants.length > 0;

    if (isMultiVariate) {
      return getVariation(bucketId, flagEnv.variants);
    }

    return isInBucket(bucketId, flagEnv.rolloutPercentage);
  }

  resolveFlagStatus(flagEnv: PopulatedFlagEnv, fields: FieldRecord) {
    if (flagEnv.status !== FlagStatus.ACTIVATED) return false;

    // By attributes
    const additionalAudienceValue =
      this.strategyService.resolveAdditionalAudienceValue(
        flagEnv.strategies,
        fields,
      );

    if (additionalAudienceValue) return additionalAudienceValue;

    // By segment
    if (flagEnv.Segment.length > 0) {
      const isInSegment = this.segmentService.isInSegment(
        flagEnv.Segment,
        fields,
      );

      if (isInSegment) {
        const userVariant = this.getUserVariant(flagEnv, fields);

        if (Boolean(userVariant)) {
          return userVariant;
        }
      }
    }

    // By attributes and percentage
    const isEligible = this.eligibilityService.isEligible(flagEnv, fields);
    if (!isEligible) return false;

    const userVariant = this.getUserVariant(flagEnv, fields);

    if (Boolean(userVariant)) {
      return userVariant;
    }

    return false;
  }

  async resolveFlagStatusRecord(
    flagEnv: PopulatedFlagEnv,
    fields: FieldRecord,
  ) {
    const flagStatusRecord = this.resolveFlagStatus(flagEnv, fields);

    let valueResolved;
    if (typeof flagStatusRecord === 'object') {
      valueResolved = flagStatusRecord.value;
    } else {
      valueResolved = flagStatusRecord;
    }

    await this.flagService.hitFlag(
      flagEnv.environmentId,
      flagEnv.flagId,
      String(fields?.id || ''),
      String(valueResolved),
    );

    return {
      [flagEnv.flag.key]: valueResolved,
    };
  }

  async resolveSdkFlags(fields: FieldRecord, skipHit: boolean) {
    const clientKey = String(fields.clientKey);
    const flagEnvs = (await this.envService.getFlagEnvironmentByClientKey(
      clientKey,
    )) as unknown as Array<PopulatedFlagEnv>;

    const flags = {};

    for (const flagEnv of flagEnvs) {
      let nextFlag = flagEnv;

      if (flagEnv.scheduling.length > 0) {
        nextFlag = await this.scheduleService.manageFlagScheduling(
          clientKey,
          flagEnv,
        );
      }

      const flagStatusOrVariant = this.resolveFlagStatus(nextFlag, fields);

      if (typeof flagStatusOrVariant === 'object') {
        flags[nextFlag.flag.key] = flagStatusOrVariant.value;
      } else {
        flags[nextFlag.flag.key] = flagStatusOrVariant;
      }

      if (!skipHit) {
        let valueResolved = '';
        if (typeof flagStatusOrVariant === 'object') {
          valueResolved = flagStatusOrVariant.value;
        } else {
          valueResolved = String(flagStatusOrVariant);
        }
        await this.flagService.hitFlag(
          nextFlag.environmentId,
          nextFlag.flagId,
          String(fields?.id || ''),
          valueResolved,
        );
      }
    }

    return flags;
  }

  async hitEvent(clientKey: string, visitorId: string, hit: EventHit) {
    const metric = await this.prisma.pMetric.findFirst({
      where: {
        name: hit.name,
        flagEnvironment: {
          environment: {
            clientKey,
          },
        },
      },
    });

    if (!metric) {
      return null;
    }

    const date = new Date();
    date.setHours(2);
    date.setMinutes(2);
    date.setSeconds(2);
    date.setMilliseconds(2);

    return this.prisma.pMetricHit.create({
      data: {
        flagEnvironmentFlagId: metric.flagEnvironmentFlagId,
        flagEnvironmentEnvironmentId: metric.flagEnvironmentEnvironmentId,
        pMetricUuid: metric.uuid,
        visitorId,
        date,
        data:
          typeof hit.data === 'object'
            ? JSON.stringify(hit.data)
            : String(hit.data),
      },
    });
  }
}
