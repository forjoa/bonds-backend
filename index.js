import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes.js';
import './config/database.js';
import { config } from 'dotenv';

config();

const app = express();
const port = process.env.PORT || 3000;
const hostname = process.env.HOSTNAME || 'localhost';

app.use(bodyParser.json());

app.use('/api/users', userRoutes);

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

import socketHandlers from './socket.js';
socketHandlers(io);

httpServer.listen(port, () => {
    console.log(`> Server running on http://${hostname}:${port}`);
});