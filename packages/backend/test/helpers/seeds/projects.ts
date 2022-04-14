import { PrismaClient } from '@prisma/client';

export const seedProjects = async (prismaClient: PrismaClient) => {
  const projectFromSeeding = await prismaClient.project.create({
    data: {
      uuid: '1',
      name: 'Project from seeding',
    },
  });

  return [projectFromSeeding] as const;
};
