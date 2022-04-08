import { LocalWebsocket } from './types';

export class Rooms {
  private _rooms: {
    [key: string]: Array<LocalWebsocket>;
  };

  constructor() {
    this._rooms = {};
  }

  public join(room: string, socket: LocalWebsocket) {
    if (!this._rooms[room]) {
      this._rooms[room] = [];
    }

    socket.__ROLLOUT_ROOMS.push(room);
    this._rooms[room].push(socket);
  }

  public leave(socket: LocalWebsocket) {
    const rooms = socket.__ROLLOUT_ROOMS || [];

    for (const room of rooms) {
      this._rooms[room] = this._rooms[room].filter((sock) => sock !== socket);
    }

    socket.__ROLLOUT_ROOMS = undefined;
    socket.__ROLLOUT_FIELDS = undefined;
  }

  public emit(socket: LocalWebsocket, data: any) {
    socket.send(JSON.stringify({ data }));
  }

  public getSockets(room) {
    return this._rooms[room] || [];
  }
}
