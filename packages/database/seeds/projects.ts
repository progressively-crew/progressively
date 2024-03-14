import { PrismaClient } from "@prisma/client";

export const seedProjects = async (prismaClient: PrismaClient) => {
  const projectFromSeeding = prismaClient.project.create({
    data: {
      uuid: "1",
      name: "Project from seeding",
      clientKey: "valid-sdk-key",
      secretKey: "secret-key",
      domain: "**",
    },
  });

  const otherFromSeeding = prismaClient.project.create({
    data: {
      uuid: "2",
      name: "Other from seeding",
      clientKey: "valid-sdk-key-2",
      secretKey: "secret-key-2",
      domain: "hello-world",
    },
  });

  return Promise.all([projectFromSeeding, otherFromSeeding]);
};
