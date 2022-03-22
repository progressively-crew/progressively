export class Rooms {
  private _rooms: { [key: string]: Array<{ send: (args: any) => void }> };

  constructor() {
    this._rooms = {};
  }

  public join(room: string, socket: any) {
    if (!this._rooms[room]) {
      this._rooms[room] = [];
    }

    socket.__ROLLOUT_ROOMS.push(room);
    this._rooms[room].push(socket);
  }

  public leave(socket) {
    const rooms = socket.__ROLLOUT_ROOMS || [];

    for (const room of rooms) {
      this._rooms[room] = this._rooms[room].filter((sock) => sock !== socket);
    }

    socket.__ROLLOUT_ROOMS = undefined;
  }

  public emit(room, data) {
    const sockets = this._rooms[room] || [];

    for (const socket of sockets) {
      socket.send(JSON.stringify({ data }));
    }
  }
}
