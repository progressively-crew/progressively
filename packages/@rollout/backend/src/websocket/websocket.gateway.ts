import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
} from '@nestjs/websockets';
import { URL } from 'url';
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
    const searchParams = new URL(`${useLessPrefix}${req.url}`).searchParams;
    const queryParams = Object.fromEntries(searchParams);

    if (queryParams.client_key) {
      const { queryClient, ...fields } = queryParams;
      socket.__ROLLOUT_ROOMS = [];
      socket.__ROLLOUT_FIELDS = fields;
      this.rooms.join(queryParams.client_key, socket);
    }
  }

  notify(room: string, data: any) {
    this.rooms.emit(room, data);
  }
}
