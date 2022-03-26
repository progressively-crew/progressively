import { Test, TestingModule } from '@nestjs/testing';
import { WebsocketGateway } from './websocket.gateway';
import { PrismaService } from '../prisma.service';
import { StrategyService } from '../strategy/strategy.service';

describe('WebsocketGateway', () => {
  let gateway: WebsocketGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebsocketGateway, StrategyService, PrismaService],
    }).compile();

    gateway = module.get<WebsocketGateway>(WebsocketGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
