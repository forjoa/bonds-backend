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
            socket.userid = user.userid;  
            socket.join(`user_${user.userid}`);  
            next();
        } else {
            next(new Error('Authentication error'));
        }
    });

    io.on('connection', (socket) => {
        console.log(`User ${socket.userid} connected`);

        handleChatEvents(io, socket);
        handleLikeEvents(io, socket);
        handleCommentEvents(io, socket);
        handleFriendRequestEvents(io, socket);

        socket.on('disconnect', () => {
            console.log(`User ${socket.userid} disconnected`);
        });
    });
}
