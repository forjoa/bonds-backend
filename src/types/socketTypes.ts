import { Server, Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'

interface UserInSocket {
  userid: number
}

export type Io = Server<
  DefaultEventsMap,
  DefaultEventsMap,
  DefaultEventsMap,
  UserInSocket
>

export interface CustomSocket extends Socket {
  userid: number
}
