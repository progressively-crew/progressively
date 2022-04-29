import { PrismaClient } from '@prisma/client';

export const seedProjects = async (prismaClient: PrismaClient) => {
  const projectFromSeeding = await prismaClient.project.create({
    data: {
      uuid: '1',
      name: 'Project from seeding',
    },
  });

  const otherFromSeeding = await prismaClient.project.create({
    data: {
      uuid: '2',
      name: 'Other from seeding',
    },
  });

  return [projectFromSeeding, otherFromSeeding] as const;
};
