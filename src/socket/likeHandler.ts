import { CustomSocket, Io } from '../types/socketTypes.js'

export default function handleLikeEvents(io: Io, socket: CustomSocket) {
  socket.on('like', ({ postId, userId, targetUserId }) => {
    if (!postId || !userId || !targetUserId) {
      socket.emit('error', { message: 'Invalid data for like event' })
      return
    }
    io.to(`user_${targetUserId}`).emit('notification', {
      type: 'like',
      postId,
      userId,
      message: `User ${userId} liked your post ${postId}`,
    })
  })
}
