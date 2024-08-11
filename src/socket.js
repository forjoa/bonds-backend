import { validateToken } from './socket/auth.js';
import handleChatEvents from './socket/chatHandler.js';
import handleLikeEvents from './socket/likeHandler.js';
import handleCommentEvents from './socket/commentHandler.js';
import handleFriendRequestEvents from './socket/friendRequestHandler.js';

export default function socketHandlers(io) {
    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        const user = validateToken(token);
        if (user) {
            socket.userId = user.id;  // Asigna el ID del usuario al socket
            socket.join(`user_${user.id}`);  // Une al usuario a un room específico
            next();
        } else {
            next(new Error('Authentication error'));
        }
    });

    io.on('connection', (socket) => {
        console.log(`User ${socket.userId} connected`);

        handleChatEvents(io, socket);
        handleLikeEvents(io, socket);
        handleCommentEvents(io, socket);
        handleFriendRequestEvents(io, socket);

        socket.on('disconnect', () => {
            console.log(`User ${socket.userId} disconnected`);
        });
    });
}
