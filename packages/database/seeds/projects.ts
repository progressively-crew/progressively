import { PrismaClient } from "@prisma/client";

export const seedProjects = async (prismaClient: PrismaClient) => {
  const projectFromSeeding = await prismaClient.project.create({
    data: {
      uuid: "1",
      name: "Project from seeding",
      clientKey: "valid-sdk-key",
      secretKey: "secret-key",
      domain: "**",
    },
  });

  const otherFromSeeding = await prismaClient.project.create({
    data: {
      uuid: "2",
      name: "Other from seeding",
      clientKey: "valid-sdk-key-2",
      secretKey: "secret-key-2",
      domain: "hello-world",
    },
  });

  return [projectFromSeeding, otherFromSeeding] as const;
};
