import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
} from '@nestjs/websockets';
import { StrategyService } from '../strategy/strategy.service';
import { URL } from 'url';
import { Rooms } from './rooms';
import {
  Environment,
  Flag,
  FlagEnvironment,
  RolloutStrategy,
} from '@prisma/client';
import { FlagStatus } from '../flags/flags.status';

@WebSocketGateway(4001)
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private rooms: Rooms;

  constructor(private readonly strategyService: StrategyService) {
    this.rooms = new Rooms();
  }

  handleDisconnect(socket: any) {
    this.rooms.leave(socket);
  }

  handleConnection(socket: any, req: any) {
    const useLessPrefix = `http://localhost`; // just to be able to rely on the URL class
    const searchParams = new URL(`${useLessPrefix}${req.url}`).searchParams;
    const queryParams = Object.fromEntries(searchParams);

    if (queryParams.client_key) {
      const { client_key, ...fields } = queryParams;
      socket.__ROLLOUT_ROOMS = [];
      socket.__ROLLOUT_FIELDS = fields || {};
      this.rooms.join(client_key, socket);
    }
  }

  /**
   * TODO: if there is one thing to improve in terms of performances,
   * it's this function
   * it iterates of every socket available for the given client key
   * and get + computes every strategies available
   */
  async notifyFlagChanging(
    flagEnv: FlagEnvironment & {
      environment: Environment;
      flag: Flag;
      strategies: Array<RolloutStrategy>;
    },
  ) {
    const room = flagEnv.environment.clientKey;
    const sockets = this.rooms.getSockets(room);

    for (const socket of sockets) {
      let status: boolean;

      if (flagEnv.status === FlagStatus.ACTIVATED) {
        status = await this.strategyService.resolveStrategies(
          flagEnv,
          flagEnv.strategies,
          socket.__ROLLOUT_FIELDS,
        );
      } else {
        status = false;
      }

      const updatedFlag = {
        [flagEnv.flag.key]: status,
      };

      this.rooms.emit(socket, updatedFlag);
    }
  }
}
