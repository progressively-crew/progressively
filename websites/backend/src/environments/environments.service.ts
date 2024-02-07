import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../database/prisma.service';
import { PopulatedFlagEnv } from '../flags/types';
import { CreateFunnelEntryDTO } from '../funnels/funnels.dto';

@Injectable()
export class EnvironmentsService {
  constructor(private prisma: PrismaService) {}
}
