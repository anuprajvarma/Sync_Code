const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const path = require("path");
//const cors = require('cors');

const app = express();
//app.use(cors());

const server = http.createServer(app);

const PORT = process.env.PORT || 5400;

const io = new Server(server);

app.use(express.static("build"));
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const userSocketMap = {};

const getAllConnectedClients = (id) => {
  return Array.from(io.sockets.adapter.rooms.get(id) || []).map((socketId) => {
    return {
      socketId,
      username: userSocketMap[socketId],
    };
  });
};
const doubts = {};
io.on("connection", (socket) => {
  // console.log(` user connected ${socket.id}`);

  socket.on("join_room", (data) => {
    // console.log("join one person");
    const username = data.username;
    userSocketMap[socket.id] = username;
    socket.join(data.roomId);
    const clients = getAllConnectedClients(data.roomId);
    //console.log(clients)
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit("joined_user", {
        clients,
        username,
        socketId: socket.id,
      });
    });
  });

  socket.on("codeChange", ({ roomId, code }) => {
    //console.log('receving',code)
    socket.in(roomId).emit("codeChange", {
      code,
    });
  });

  socket.on("sync_code", ({ socketId, code }) => {
    //console.log('receving',code)
    io.to(socketId).emit("codeChange", {
      code,
    });
  });

  socket.on("doubt", ({ id, username, doubt }) => {
    doubts[username] = doubt;
    console.log(doubts);
    const clients = getAllConnectedClients(id);
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit("doubt", {
        doubts,
        username,
        socketId: socket.id,
      });
    });
  });

  socket.on("disconnecting", () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
      socket.in(roomId).emit("disconnected", {
        socketId: socket.id,
        username: userSocketMap[socket.id],
      });
    });
    delete userSocketMap[socket.id];
    socket.leave();
  });
});

app.get("/test", (req, res) => {
  res.send("Hi I am chitti");
});

server.listen(PORT, (req, res) => {
  console.log("server is started");
});
