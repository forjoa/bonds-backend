import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import bodyParser from 'body-parser'
import userRoute from './routes/userRoute.js'
import authRoute from './routes/authRoute.js'
import postRoute from './routes/postRoute.js'
import notificationRoute from './routes/notificationRoute.js'
import { config } from 'dotenv'
import cors from 'cors'

config()

const app = express()
const port = process.env.PORT || 3000
const hostname = process.env.HOSTNAME || 'localhost'

app.use(bodyParser.json())
app.use(cors())

app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)
app.use('/api/notifications', notificationRoute)

const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

import socketHandlers from './socket.js'
socketHandlers(io)

httpServer.listen(port, () => {
  console.log(`> Server running on http://${hostname}:${port}`)
})
