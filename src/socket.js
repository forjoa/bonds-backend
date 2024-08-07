// TODO: change all this file 
export default function socketHandlers(io) {
    io.on('connection', (socket) => {
        console.log('a user is connected');

        socket.on('joinRoom', (room) => {
            socket.join(room);
            console.log(`User joined room ${room}`);
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });

        socket.on('chat message', ({ room, msg }) => {
            io.to(room).emit('chat message', msg);
        });
    });
}