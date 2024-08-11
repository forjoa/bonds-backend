export default function handleChatEvents(io, socket) {
    socket.on('joinRoom', (room) => {
        socket.join(room);
        console.log(`User joined room ${room}`);
    });

    socket.on('chat message', ({ room, msg }) => {
        io.to(room).emit('chat message', msg);
    });
}
