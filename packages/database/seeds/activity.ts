import { FlagEnvironment, PrismaClient } from "@prisma/client";

const rawActivities = [
  {
    type: "create-variant",
    data: `{"uuid":"722200c6-6b1c-4926-9d56-e39b9d97ce83","rolloutPercentage":0,"isControl":false,"value":"Hello world","flagEnvironmentFlagId":"4","flagEnvironmentEnvironmentId":"1"}`,
  },
  {
    type: "create-webhook",
    data: `{"uuid":"0da72f86-1675-4567-9be7-d58a07728728","endpoint":"https://hello-world.api","secret":"FjB_C7iQDiI9adbAxKNOF","event":"ACTIVATION","flagEnvironmentFlagId":"4","flagEnvironmentEnvironmentId":"1"}`,
  },
  { type: "change-flag-percentage", data: "39" },
];

export const seedActivity = (
  flagEnv: FlagEnvironment,
  prismaClient: PrismaClient
) => {
  return prismaClient.activityLog.createMany({
    data: rawActivities.map((activity, index) => ({
      concernedEntity: "flag",
      type: activity.type,
      userUuid: "1",
      flagEnvironmentFlagId: flagEnv.flagId,
      flagEnvironmentEnvironmentId: flagEnv.environmentId,
      data: activity.data,
      utc: new Date("2023-01-21"),
    })),
  });
};
