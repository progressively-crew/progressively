import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
} from '@nestjs/websockets';
import { WebSocketServer as WSServer } from 'ws';
import { URL } from 'url';
import { Rooms } from './rooms';
import { LocalWebsocket, Subscriber } from './types';
import { RedisService } from './redis.service';
import { FlagsService } from '../flags/flags.service';
import { PopulatedFlagEnv } from '../flags/types';
import { PopulatedExperimentEnv } from '../ab/types';
import { AbService } from '../ab/ab.service';

@WebSocketGateway(4001)
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  private rooms: Rooms;
  private subscribers: Array<Subscriber>;
  private heartBeatIntervalId: NodeJS.Timer;

  constructor(
    private readonly redisService: RedisService,
    private readonly flagService: FlagsService,
    private readonly abService: AbService,
  ) {
    this.rooms = new Rooms();
    this.subscribers = [];
  }

  afterInit(server: WSServer) {
    server.on('close', () => {
      clearInterval(this.heartBeatIntervalId);
    });

    const timeout = Number(process.env.SOCKET_TIMEOUT || 10000);

    this.heartBeatIntervalId = setInterval(function ping() {
      server.clients.forEach(function each(ws: LocalWebsocket) {
        if (!ws.isAlive) return ws.terminate();

        ws.isAlive = false;
        ws.ping();
      });
    }, timeout);
  }

  handleDisconnect(socket: LocalWebsocket) {
    this.rooms.leave(socket);
  }

  handleConnection(socket: LocalWebsocket, req: any) {
    // Heart-beating
    socket.isAlive = true;

    socket.on('pong', () => {
      socket.isAlive = true;
    });
    // End of heart-beating

    const useLessPrefix = `http://localhost`; // just to be able to rely on the URL class
    const searchParams = new URL(`${useLessPrefix}${req.url}`).searchParams;

    const urlParams = JSON.parse(
      Buffer.from(searchParams.get('opts'), 'base64').toString('ascii'),
    );

    if (urlParams.clientKey) {
      const { clientKey, ...fields } = urlParams;

      socket.__FIELDS = fields || {};
      socket.__ROOMS = [];

      this.rooms.join(clientKey, socket);

      this.redisService.subscribe(
        clientKey,
        (nextEntity: PopulatedExperimentEnv | PopulatedFlagEnv) => {
          const sockets = this.rooms.getSockets(clientKey);

          if (nextEntity._type === 'Flag') {
            for (const socket of sockets) {
              const updatedFlag = this.flagService.resolveFlagStatusRecord(
                nextEntity,
                socket.__FIELDS,
              );

              this.rooms.emit(socket, updatedFlag);
            }
          } else if (nextEntity._type === 'Experiment') {
            const experimentStatusRecord =
              this.abService.resolveExperimentVariantValue(
                nextEntity,
                socket.__FIELDS,
              );

            this.rooms.emit(socket, experimentStatusRecord);
          }
        },
      );
    }
  }

  register(subscriber: Subscriber) {
    this.subscribers.push(subscriber);
  }

  notifyFlagChanging(flagEnv: PopulatedFlagEnv) {
    this.redisService.notifyChannel(flagEnv.environment.clientKey, flagEnv);
  }

  notifyExperimentChanging(experimentEnv: PopulatedExperimentEnv) {
    this.redisService.notifyChannel(
      experimentEnv.environment.clientKey,
      experimentEnv,
    );
  }
}
