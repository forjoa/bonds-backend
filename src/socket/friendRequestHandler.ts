import { CustomSocket, Io } from '../types/socketTypes.js'

export default function handleFriendRequestEvents(
  io: Io,
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
