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
import { PopulatedFlag } from '../flags/types';
import { IPubsubService } from '../pubsub/types';
import { Inject } from '@nestjs/common';
import { parseBase64Params, resolveUserId } from '../sdk/utils';

@WebSocketGateway()
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  private rooms: Rooms;
  private subscribers: Array<Subscriber<PopulatedFlag>>;
  private heartBeatIntervalId: NodeJS.Timeout;

  constructor(
    @Inject('PubsubService') private readonly pubsubService: IPubsubService,
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

    this.initSubscription();
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

    const urlParams = parseBase64Params(searchParams.get('opts'));
    const userAgent = req.headers['user-agent'] || '';
    const ip = req.socket.remoteAddress;

    if (urlParams.clientKey) {
      const { clientKey, ...fields } = urlParams;
      fields.id = resolveUserId(fields, userAgent, ip);

      socket.__FIELDS = fields || {};
      socket.__ROOMS = [];

      this.rooms.join(String(clientKey), socket);
    }
  }

  initSubscription() {
    this.pubsubService.subscribe(
      'flag-env-changed',
      async (subscribedEntity: PopulatedFlag) => {
        const sockets = this.rooms.getSockets(
          subscribedEntity.Project.clientKey,
        );

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

  registerSubscriptionHandler(subscriber: Subscriber<PopulatedFlag>) {
    this.subscribers.push(subscriber);
  }

  async teardown() {
    await this.pubsubService.teardown();
  }

  notifyChanges(entity: unknown) {
    this.pubsubService.notifyChannel('flag-env-changed', entity);
  }
}
