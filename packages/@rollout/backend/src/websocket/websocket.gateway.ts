import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Rooms } from './rooms';

@WebSocketGateway(4001)
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private rooms: Rooms;

  constructor() {
    this.rooms = new Rooms();
  }

  handleDisconnect(socket: any) {
    this.rooms.leave(socket);
  }

  handleConnection(socket: any, req: any) {
    const useLessPrefix = `http://localhost`; // just to be able to rely on the URL class
    const url = new URL(`${useLessPrefix}${req.url}`);
    const clientKey = url.searchParams.get('client_key');

    if (clientKey) {
      socket.__ROLLOUT_ROOMS = [];
      this.rooms.join(clientKey, socket);
    }
  }

  notify(room: string, data: any) {
    this.rooms.emit(room, data);
  }
}
