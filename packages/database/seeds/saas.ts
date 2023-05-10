import { PrismaClient, User } from "@prisma/client";

export const seedForSaas = async (prismaClient: PrismaClient, user: User) => {
  await prismaClient.plan.create({
    data: {
      userUuid: user.uuid,
      projectCount: 1,
      environmentCount: 1,
      evaluationCount: 10000,
    },
  });

  await new Promise((resolve) => setTimeout(resolve, 100));

  await prismaClient.plan.create({
    data: {
      userUuid: user.uuid,
      projectCount: 2,
      environmentCount: 2,
      evaluationCount: 20000,
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

  await prismaClient.environment.create({
    data: {
      uuid: "10",
      name: "Production",
      projectId: project.uuid,
      clientKey: "valid-sdk-key-saas",
    },
  });
};
