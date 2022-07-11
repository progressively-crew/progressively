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
import { PopulatedFlagEnv } from '../flags/types';
import { PopulatedExperimentEnv } from '../ab/types';

@WebSocketGateway(4001)
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  private rooms: Rooms;
  private subscribers: Array<Subscriber<unknown>>;
  private heartBeatIntervalId: NodeJS.Timer;

  constructor(private readonly redisService: RedisService) {
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

      this.initRedisSubscription(clientKey, socket);
    }
  }

  initRedisSubscription(clientKey: string, connectedSocket: LocalWebsocket) {
    this.redisService.subscribe(clientKey, (subscribedEntity: unknown) => {
      const sockets = this.rooms.getSockets(clientKey);
      for (const sock of sockets) {
        for (const subscriber of this.subscribers) {
          const nextEntity = subscriber(
            subscribedEntity,
            connectedSocket.__FIELDS,
          );

          if (nextEntity) {
            this.rooms.emit(sock, nextEntity);
          }
        }
      }
    });
  }

  registerSubscriptionHandler<T>(subscriber: Subscriber<T>) {
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
