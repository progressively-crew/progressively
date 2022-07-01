import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AbService {
  constructor(private prisma: PrismaService) {}

  experimentsByEnv(envId: string) {
    return this.prisma.experiment.findMany({
      where: {
        ExperimentEnvironment: {
          some: {
            environmentId: envId,
          },
        },
      },
    });
  }
}
