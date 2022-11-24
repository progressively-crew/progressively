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

@Injectable()
export class SdkService {
  constructor(
    private prisma: PrismaService,
    private readonly envService: EnvironmentsService,
    private readonly strategyService: StrategyService,
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

  resolveFlagStatus(flagEnv: PopulatedFlagEnv, fields: FieldRecord) {
    let status: boolean | Variant;

    if (flagEnv.status === FlagStatus.ACTIVATED) {
      status = this.strategyService.resolveStrategies(
        flagEnv,
        flagEnv.strategies,
        fields,
      );
    } else {
      status = false;
    }

    return status;
  }

  async resolveFlagStatusRecord(
    flagEnv: PopulatedFlagEnv,
    fields: FieldRecord,
  ) {
    const flagStatusRecord = this.resolveFlagStatus(flagEnv, fields);

    let flagVariant: Variant | undefined;
    let flagStatus: boolean;
    if (typeof flagStatusRecord === 'boolean') {
      flagStatus = flagStatusRecord;
    } else {
      flagVariant = flagStatusRecord;
      flagStatus = false;
    }

    await this.flagService.hitFlag(
      flagEnv.environmentId,
      flagEnv.flagId,
      String(fields?.id || ''),
      flagStatus,
      flagVariant,
    );

    return {
      [flagEnv.flag.key]: flagStatusRecord,
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
        nextFlag = await this.flagService.manageScheduling(clientKey, flagEnv);
      }

      const flagStatusOrVariant = this.resolveFlagStatus(nextFlag, fields);

      let flagVariant: Variant | undefined;
      let flagStatus: boolean;

      if (typeof flagStatusOrVariant === 'boolean') {
        flagStatus = flagStatusOrVariant;
        flags[nextFlag.flag.key] = flagStatus;
      } else {
        flagVariant = flagStatusOrVariant;
        flagStatus = false;
        flags[nextFlag.flag.key] = flagVariant.value;
      }

      if (!skipHit) {
        await this.flagService.hitFlag(
          nextFlag.environmentId,
          nextFlag.flagId,
          String(fields?.id || ''),
          flagStatus,
          flagVariant,
        );
      }
    }

    return flags;
  }

  async hitEvent(clientKey: string, visitorId: string, hit: EventHit) {
    const metric = await this.prisma.pMetric.findFirst({
      where: {
        name: hit.name,
        FlagEnvironment: {
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
