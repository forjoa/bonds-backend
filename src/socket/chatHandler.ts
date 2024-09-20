import { CustomSocket, Io } from '../types/socketTypes.js'

export default function handleChatEvents(io: Io, socket: CustomSocket) {
  socket.on('joinRoom', (room) => {
    socket.join(room)
    console.log(`User joined room ${room}`)
  })

  socket.on('chat message', ({ room, msg }) => {
    io.to(room).emit('chat message', msg)
  })
}
