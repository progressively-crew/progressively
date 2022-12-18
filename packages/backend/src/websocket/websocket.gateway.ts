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
import { getEnvVars } from '../envVariable';

@WebSocketGateway()
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  private rooms: Rooms;
  private subscribers: Array<Subscriber<PopulatedFlagEnv>>;
  private heartBeatIntervalId: NodeJS.Timer;

  constructor(private readonly redisService: RedisService) {
    this.rooms = new Rooms();
    this.subscribers = [];
  }

  afterInit(server: WSServer) {
    server.on('close', () => {
      clearInterval(this.heartBeatIntervalId);
    });

    const env = getEnvVars();
    const timeout = env.SocketTimeout;

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

      this.initRedisSubscription(clientKey);
    }
  }

  initRedisSubscription(clientKey: string) {
    this.redisService.subscribe(
      clientKey,
      async (subscribedEntity: PopulatedFlagEnv) => {
        const sockets = this.rooms.getSockets(clientKey);

        for (const sock of sockets) {
          for (const subscriber of this.subscribers) {
            const nextEntity = await subscriber(
              subscribedEntity,
              sock.__FIELDS,
            );

            if (nextEntity) {
              this.rooms.emit(sock, nextEntity);
            }
          }
        }
      },
    );
  }

  registerSubscriptionHandler(subscriber: Subscriber<PopulatedFlagEnv>) {
    this.subscribers.push(subscriber);
  }

  notifyChanges(channel: string, entity: unknown) {
    this.redisService.notifyChannel(channel, entity);
  }
}
