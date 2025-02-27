const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.BASE_URL,
    credentials: true,
  },
});

const socketUserMap = {};
let room = "";

const getAllConnectedUsers = (roomCode) => {
  // console.log(io.sockets.adapter.rooms.get(room));
  return Array.from(io.sockets.adapter.rooms.get(roomCode) || []).map(
    (socketId) => ({
      socketId,
      ...socketUserMap[socketId],
    })
  );
};

io.on("connection", (socket) => {
  socket.on("join", ({ roomCode, user }) => {
    socketUserMap[socket.id] = user;
    room = roomCode;

    socket.join(room);
    const users = getAllConnectedUsers(room);
    console.log(users);
    socket.broadcast.to(room).emit("joined", {
      socketId: socket.id,
      ...user,
    });
    socket.emit("newuser", {
      users,
    });
  });
  socket.on("code-change", ({ roomCode, code }) => {
    socket.broadcast.to(roomCode).emit("code-changed", { code });
  });
  socket.on("sync-code", ({ socketId, code, language }) => {
    io.to(socketId).emit("language-selected", { language });
    io.to(socketId).emit("code-changed", { code });
  });
  socket.on("language-select", ({ roomCode, language }) => {
    socket.broadcast.to(roomCode).emit("language-selected", {
      language,
    });
  });
  socket.on("disconnecting", () => {
    console.log(socket.rooms);
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
      socket.broadcast.to(roomId).emit("disconnected", {
        socketId: socket.id,
        username: socketUserMap[socket.id]?.name,
      });
    });

    delete socketUserMap[socket.id];
    socket.leave();
  });
});

module.exports = { app, server, io };
