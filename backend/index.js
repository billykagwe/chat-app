/** @format */

import { createServer } from "http";
import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import router from "./router.js";
import { Users } from "./users.js";

const PORT = 5000;
const app = express();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
  allowEIO3: true,
});

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = Users.addUser({ id: socket.id, name, room });
    if (error) {
      return callback(error);
    }

    socket.join(user.room);
    socket.emit("message", {
      user: "admin",
      text: `Welcome to chatroom ${user.room}, ${user.name}`,
    });
    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      text: `${user.name} has joined the chatroom!`,
    });
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: Users.getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = Users.getUser(socket.id);
    console.log("send message");
    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    const user = Users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} has left.`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: Users.getUsersInRoom(user.room),
      });
    }
  });
});

app.use(cors());
app.use(router);

server.listen(PORT, () => console.log("Server has started"));
