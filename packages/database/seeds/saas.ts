import { PrismaClient, User } from "@prisma/client";

export const seedForSaas = async (prismaClient: PrismaClient, user: User) => {
  await prismaClient.plan.create({
    data: {
      uuid: "1",
      userUuid: user.uuid,
      evaluationCount: 10000,
    },
  });

  await new Promise((resolve) => setTimeout(resolve, 100));

  await prismaClient.plan.create({
    data: {
      uuid: "2",
      userUuid: user.uuid,
      evaluationCount: 20000,
      status: "ACTIVE",
    },
  });

  const project = await prismaClient.project.create({
    data: {
      name: "Saas Project",
    },
  });

  await prismaClient.userProject.create({
    data: {
      projectId: project.uuid,
      userId: user.uuid,
      role: "admin",
    },
  });

  const env = await prismaClient.environment.create({
    data: {
      uuid: "10",
      name: "Production",
      projectId: project.uuid,
      clientKey: "valid-sdk-key-saas",
    },
  });

  const flag = await prismaClient.flag.create({
    data: {
      name: "Saas Flag",
      key: "saas-flag",
      uuid: "10",
      description: "Super flag",
    },
  });

  await prismaClient.flagEnvironment.create({
    data: {
      environmentId: env.uuid,
      flagId: flag.uuid,
    },
  });

  // hit one month ago
  const date = new Date();
  date.setMonth(date.getMonth() - 1);

  for (let i = 0; i < 21; i++) {
    await prismaClient.flagHit.create({
      data: {
        valueResolved: "true",
        flagEnvironmentEnvironmentId: env.uuid,
        flagEnvironmentFlagId: flag.uuid,
        visitorId: "123",
        date,
      },
    });
  }

  //hit this month
  const date2 = new Date();

  for (let i = 0; i < 19; i++) {
    await prismaClient.flagHit.create({
      data: {
        valueResolved: "true",
        flagEnvironmentEnvironmentId: env.uuid,
        flagEnvironmentFlagId: flag.uuid,
        visitorId: "123",
        date: date2,
      },
    });
  }
};
