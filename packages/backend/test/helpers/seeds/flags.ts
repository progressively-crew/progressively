import { PrismaClient } from '@prisma/client';
import { FlagStatus } from '../../../src/flags/flags.status';
import { FlagType } from '../../../src/flags/types';

export const seedFlags = async (prismaClient: PrismaClient) => {
  const homePageFlag = await prismaClient.flag.create({
    data: {
      uuid: '1',
      name: 'New homepage',
      description: 'Switch the new homepage design',
      key: 'newHomepage',
      type: FlagType.EXPERIMENT,
    },
  });

  const footerFlag = await prismaClient.flag.create({
    data: {
      uuid: '2',
      name: 'New footer',
      description: 'Switch the new footer design',
      key: 'newFooter',
      type: FlagType.EXPERIMENT,
    },
  });

  const asideFlag = await prismaClient.flag.create({
    data: {
      uuid: '3',
      name: 'New aside',
      description: 'Switch the new aside design',
      key: 'newAside',
      type: FlagType.EXPERIMENT,
    },
  });

  const multiVariate = await prismaClient.flag.create({
    data: {
      uuid: '4',
      name: 'With multivariate',
      description: 'Switch the multivariate flag',
      key: 'multivariate',
      type: FlagType.EXPERIMENT,
    },
  });

  return [homePageFlag, footerFlag, asideFlag, multiVariate] as const;
};

export const seedFlagHits = async (
  prismaClient: PrismaClient,
  flagEnv: any,
  date: Date,
  count = 10,
  variant?: any,
) => {
  date.setHours(2);
  date.setMinutes(2);
  date.setSeconds(2);
  date.setMilliseconds(2);

  for (let i = 0; i < count; i++) {
    await prismaClient.flagHit.create({
      data: {
        flagEnvironmentFlagId: flagEnv.flagId,
        flagEnvironmentEnvironmentId: flagEnv.environmentId,
        valueResolved: 'true',
        date,
        visitorId: '1',
      },
    });

    if (i < count / 2) {
      await prismaClient.flagHit.create({
        data: {
          flagEnvironmentFlagId: flagEnv.flagId,
          flagEnvironmentEnvironmentId: flagEnv.environmentId,
          valueResolved: 'false',
          date,
          visitorId: '1',
        },
      });
    }
  }
};

export const seedFlagHitsVariants = async (
  prismaClient: PrismaClient,
  flagEnv: any,
  date: Date,
  count = 10,
) => {
  date.setHours(2);
  date.setMinutes(2);
  date.setSeconds(2);
  date.setMilliseconds(2);

  for (let i = 0; i < count; i++) {
    await prismaClient.flagHit.create({
      data: {
        flagEnvironmentFlagId: flagEnv.flagId,
        flagEnvironmentEnvironmentId: flagEnv.environmentId,
        valueResolved: 'Control',
        date,
        visitorId: '1',
      },
    });

    if (i < count / 2) {
      await prismaClient.flagHit.create({
        data: {
          flagEnvironmentFlagId: flagEnv.flagId,
          flagEnvironmentEnvironmentId: flagEnv.environmentId,
          valueResolved: 'Second',
          date,
          visitorId: '1',
        },
      });
    }
  }
};

export const seedFlagMetricHits = async (
  prismaClient: PrismaClient,
  flagEnv: any,
  metric: any,
  date: Date,
  count = 10,
) => {
  date.setHours(2);
  date.setMinutes(2);
  date.setSeconds(2);
  date.setMilliseconds(2);

  for (let i = 0; i < count; i++) {
    await prismaClient.pMetricHit.create({
      data: {
        flagEnvironmentFlagId: flagEnv.flagId,
        flagEnvironmentEnvironmentId: flagEnv.environmentId,
        date,
        pMetricUuid: metric.uuid,
        visitorId: '1',
      },
    });
  }
};
