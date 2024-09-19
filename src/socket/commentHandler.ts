import { Server, Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'

interface User {
  userid: number
}

interface CustomSocket extends Socket {
  userid: number
}

export default function handleCommentEvents(
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, User>,
  socket: CustomSocket
) {
  socket.on('comment', ({ postId, userId, targetUserId, comment }) => {
    if (!postId || !userId || !targetUserId || !comment) {
      socket.emit('error', { message: 'Invalid data for comment event' })
      return
    }
    io.to(`user_${targetUserId}`).emit('notification', {
      type: 'comment',
      postId,
      userId,
      comment,
      message: `User ${userId} commented on your post ${postId}`,
    })
  })
}
