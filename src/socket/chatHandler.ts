import { Server, Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'

interface User {
  userid: number
}

interface CustomSocket extends Socket {
  userid: number
}

export default function handleChatEvents(
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, User>,
  socket: CustomSocket
) {
  socket.on('joinRoom', (room) => {
    socket.join(room)
    console.log(`User joined room ${room}`)
  })

  socket.on('chat message', ({ room, msg }) => {
    io.to(room).emit('chat message', msg)
  })
}
