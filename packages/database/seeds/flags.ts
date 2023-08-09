import { PrismaClient } from "@prisma/client";

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
        data: "Control",
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
          data: "Second",
          date,
          visitorId: "1",
          type: "evaluation",
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
        date,
        pMetricUuid: metric.uuid,
        visitorId: "1",
        type: "metric",
      },
    });
  }
};
