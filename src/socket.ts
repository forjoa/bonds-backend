import { Server, Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { validateToken } from './socket/auth.js'
import handleChatEvents from './socket/chatHandler.js'
import handleLikeEvents from './socket/likeHandler.js'
import handleCommentEvents from './socket/commentHandler.js'
import handleFriendRequestEvents from './socket/friendRequestHandler.js'

interface User {
  userid: number
}

interface CustomSocket extends Socket {
  userid: number
}

export default function socketHandlers(
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, User>
) {
  io.use((socket: Socket, next) => {
    const token = socket.handshake.auth.token
    const user = validateToken(token) as User | null

    if (user) {
      ;(socket as CustomSocket).userid = user.userid
      socket.join(`user_${user.userid}`)
      next()
    } else {
      next(new Error('Authentication error'))
    }
  })

  io.on('connection', (socket: Socket) => {
    const customSocket = socket as CustomSocket
    console.log(`User ${customSocket.userid} connected`)

    handleChatEvents(io, customSocket)
    handleLikeEvents(io, customSocket)
    handleCommentEvents(io, customSocket)
    handleFriendRequestEvents(io, customSocket)

    customSocket.on('disconnect', () => {
      console.log(`User ${customSocket.userid} disconnected`)
    })
  })
}
