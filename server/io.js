const http = require('http');
const {Server} = require('socket.io');

let io;

const handleChatMessage = (msg) => {
    const rooms = socket.rooms;
    rooms.forEach(room => {
        if(room == socket.id) return;

        io.to(room).emit('chat message', msg);
    });
}

const handleRoomChange = (socket, roomName) => {
    const rooms = socket.rooms;
    rooms.forEach(room => {
        if(room == socket.id) return;

        socket.leave(room);
    });
    socket.join(roomName);
}

const socketSetup = (app) => {
    const server = http.createServer(app);
    io = new Server(server);

    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.join('general');

        socket.on('disconnect', () => {
            console.log('a user disconnected');
        });

        socket.on('chat message', handleChatMessage);
        socket.on('room change', room => handleRoomChange(socket, room));

    });

    return server;
}

module.exports = {socketSetup};