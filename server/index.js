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
        socket.join(data)
        console.log(`join room ${socket.id + data}`)
    })

    socket.on("disconnect", () => {
        console.log("USer Disconnceted")
    })
})

app.get('/test', (req, res) => {
    res.send("sdl;kfjldsjf;j")
})


server.listen(5400, (req, res) => {
    console.log("server is started")
})