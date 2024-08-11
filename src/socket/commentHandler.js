export default function handleCommentEvents(io, socket) {
    socket.on('comment', ({ postId, userId, targetUserId, comment }) => {
        if (!postId || !userId || !targetUserId || !comment) {
            socket.emit('error', { message: 'Invalid data for comment event' });
            return;
        }
        io.to(`user_${targetUserId}`).emit('notification', {
            type: 'comment',
            postId,
            userId,
            comment,
            message: `User ${userId} commented on your post ${postId}`
        });
    });
}
