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

io.on("connection", (socket) => {
    console.log(` user connected ${socket.id}`);

    socket.on("join_room", (data) => {

    })
})

app.get('/test', (req, res) => {
    res.send("Hi I am chitti")
})


server.listen(5400, (req, res) => {
    console.log("server is started")
})