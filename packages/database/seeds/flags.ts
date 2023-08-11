import { PrismaClient } from "@prisma/client";

const SEED_ROUND_EVENT_HITS = process.env.SEED_ROUND_EVENT_HITS
  ? Number(process.env.SEED_ROUND_EVENT_HITS)
  : 90;

export const seedFlags = async (prismaClient: PrismaClient) => {
  const homePageFlag = await prismaClient.flag.create({
    data: {
      uuid: "1",
      name: "New homepage",
      description: "Switch the new homepage design",
      key: "newHomepage",
    },
  });

  const footerFlag = await prismaClient.flag.create({
    data: {
      uuid: "2",
      name: "New footer",
      description: "Switch the new footer design",
      key: "newFooter",
    },
  });

  const asideFlag = await prismaClient.flag.create({
    data: {
      uuid: "3",
      name: "New aside",
      description: "Switch the new aside design",
      key: "newAside",
    },
  });

  const multiVariate = await prismaClient.flag.create({
    data: {
      uuid: "4",
      name: "With multivariate",
      description: "Switch the multivariate flag",
      key: "multivariate",
    },
  });

  return [homePageFlag, footerFlag, asideFlag, multiVariate] as const;
};

export const seedFlagHits = async (
  prismaClient: PrismaClient,
  flagEnv: any,
  date: Date,
  count = 10
) => {
  date.setHours(2);
  date.setMinutes(2);
  date.setSeconds(2);
  date.setMilliseconds(2);

  for (let i = 0; i < count; i++) {
    await prismaClient.event.create({
      data: {
        flagEnvironmentFlagId: flagEnv.flagId,
        flagEnvironmentEnvironmentId: flagEnv.environmentId,
        data: "true",
        date,
        visitorId: "1",
        type: "evaluation",
      },
    });

    if (i < count / 2) {
      await prismaClient.event.create({
        data: {
          flagEnvironmentFlagId: flagEnv.flagId,
          flagEnvironmentEnvironmentId: flagEnv.environmentId,
          data: "false",
          date,
          visitorId: "1",
          type: "evaluation",
        },
      });
    }
  }
};

export const seedFlagHitsVariants = async (
  prismaClient: PrismaClient,
  flagEnv: any
) => {
  // Modify this value to see more real logs on N days
  const dayCount = SEED_ROUND_EVENT_HITS;
  for (let i = 1; i <= dayCount; i++) {
    const date = new Date();
    date.setDate(date.getDate() - dayCount + i);

    date.setHours(2);
    date.setMinutes(2);
    date.setSeconds(2);
    date.setMilliseconds(2);

    const count = i / 2;

    for (let y = 0; y < count; y++) {
      await prismaClient.event.create({
        data: {
          flagEnvironmentFlagId: flagEnv.flagId,
          flagEnvironmentEnvironmentId: flagEnv.environmentId,
          data: "Control",
          date,
          visitorId: "1",
          type: "evaluation",
        },
      });

      if (y < count / 2) {
        await prismaClient.event.create({
          data: {
            flagEnvironmentFlagId: flagEnv.flagId,
            flagEnvironmentEnvironmentId: flagEnv.environmentId,
            data: "Second",
            date,
            visitorId: "1",
            type: "evaluation",
          },
        });
      }
    }
  }
};

export const seedFlagMetricHits = async (
  prismaClient: PrismaClient,
  flagEnv: any,
  metricA: any,
  metricB: any
) => {
  const dayCount = SEED_ROUND_EVENT_HITS;
  for (let i = 1; i <= dayCount; i++) {
    const date = new Date();
    date.setDate(date.getDate() - dayCount + i);

    date.setHours(2);
    date.setMinutes(2);
    date.setSeconds(2);
    date.setMilliseconds(2);

    const count = i / 2;

    for (let y = 0; y < count; y++) {
      await prismaClient.event.create({
        data: {
          flagEnvironmentFlagId: flagEnv.flagId,
          flagEnvironmentEnvironmentId: flagEnv.environmentId,
          pMetricUuid: metricB.uuid,
          date,
          visitorId: "1",
          type: "metric",
        },
      });

      if (y < count / 2) {
        await prismaClient.event.create({
          data: {
            flagEnvironmentFlagId: flagEnv.flagId,
            flagEnvironmentEnvironmentId: flagEnv.environmentId,
            pMetricUuid: metricA.uuid,
            date,
            visitorId: "1",
            type: "metric",
          },
        });
      }
    }
  }
};
