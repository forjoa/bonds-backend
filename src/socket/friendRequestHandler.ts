import { Server, Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'

interface User {
  userid: number
}

interface CustomSocket extends Socket {
  userid: number
}

export default function handleFriendRequestEvents(
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, User>,
  socket: CustomSocket
) {
  socket.on('friendRequest', ({ senderId, receiverId }) => {
    if (!senderId || !receiverId) {
      socket.emit('error', {
        message: 'Invalid data for friend request event',
      })
      return
    }
    io.to(`user_${receiverId}`).emit('notification', {
      type: 'friendRequest',
      senderId,
      receiverId,
      message: `User ${senderId} sent you a friend request`,
    })
  })
}
