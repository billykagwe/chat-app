/** @format */

export class Users {
  static users = [];
  constructor() {
    this.users = [];
  }

  static addUser({ id, name, room }) {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    if (
      this.users.find((user) => user.room === this.room && user.name === name)
    ) {
      return { error: "Username is taken." };
    }

    if (!name || !room) {
      return { error: "Missing username or room." };
    }

    const user = { id, room, name };
    this.users.push(user);
    return { user };
  }

  static removeUser(id) {
    const index = this.users.findIndex((user) => user.id === id);
    return this.users.splice(index, 1)[0];
  }

  static getUser(id) {
    return this.users.find((user) => user.id === id);
  }

  static getUsersInRoom(room) {
    this.users.find((user) => user.room === room);
  }
}
