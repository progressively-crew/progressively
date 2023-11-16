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

    socket.__ROOMS.push(room);
    this._rooms[room].push(socket);
  }

  public leave(socket: LocalWebsocket) {
    const rooms = socket.__ROOMS || [];

    for (const room of rooms) {
      this._rooms[room] = this._rooms[room].filter((sock) => sock !== socket);
    }

    socket.__ROOMS = undefined;
    socket.__FIELDS = undefined;
  }

  public emit(socket: LocalWebsocket, data: unknown) {
    socket.send(JSON.stringify({ data }));
  }

  public getSockets(room) {
    return this._rooms[room] || [];
  }
}
