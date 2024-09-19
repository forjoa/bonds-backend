import { Server, Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'

interface User {
  userid: number
}

interface CustomSocket extends Socket {
  userid: number
}

export default function handleLikeEvents(
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, User>,
  socket: CustomSocket
) {
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
