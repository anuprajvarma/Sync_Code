const express = require('express');
const { Server } = require('socket.io')
const http = require('http')
const cors = require('cors');


const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["Get", "POST"],
    }
})

const getAllConnectedClients = (id) => {
    return Array.from(io.sockets.adapter.rooms.get(id) || []).map((socketId) => {
        return {
            socketId,
            username: userSocketMap[socketId]
        }
    })
}

const userSocketMap = {};


io.on("connection", (socket) => {
    console.log(` user connected ${socket.id}`);

    socket.on("join_room", (data) => {
        //console.log(data)
        const username = data.username;
        userSocketMap[socket.id] = username;
        socket.join(data.roomId);
        const clients = getAllConnectedClients(data.roomId);
        //console.log(clients)
        clients.forEach(({ socketId }) => {
            io.to(socketId).emit("joined_user", {
                clients,
                username,
                socketId: socket.id
            })
        })
    });

    socket.on('disconnecting', () => {
        const rooms = [...socket.rooms]
        rooms.forEach((roomId) => {
            socket.in(roomId).emit("disconnected", {
                socketId: socket.id,
                username: userSocketMap[socket.id]
            })
        });
        delete userSocketMap[socket.id];
        socket.leave();
    })
})

app.get('/test', (req, res) => {
    res.send("Hi I am chitti")
})


server.listen(5400, (req, res) => {
    console.log("server is started")
})