import { FlagEnvironment, PrismaClient } from "@prisma/client";

const rawActivities = [
  {
    type: "create-variant",
    data: `{"uuid":"722200c6-6b1c-4926-9d56-e39b9d97ce83","rolloutPercentage":0,"isControl":false,"value":"Hello world","flagEnvironmentFlagId":"4","flagEnvironmentEnvironmentId":"1"}`,
  },
  {
    type: "create-scheduling",
    data: `{"uuid":"c680494a-7545-4567-bd79-df016de141b0","type":"UpdateVariantPercentage","data":[{"variantId":"1","variantNewPercentage":5},{"variantId":"2","variantNewPercentage":60},{"variantId":"722200c6-6b1c-4926-9d56-e39b9d97ce83","variantNewPercentage":35}],"utc":"2023-01-29T23:00:00.000Z","status":"ACTIVATED","schedulingStatus":"NOT_RUN","flagEnvironmentFlagId":"4","flagEnvironmentEnvironmentId":"1"}`,
  },
  {
    type: "create-metric",
    data: `{"uuid":"543ef936-4399-4b98-89f2-c4b5f7cd86fc","name":"New super metric","flagEnvironmentFlagId":"4","flagEnvironmentEnvironmentId":"1","variantUuid":null}`,
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
