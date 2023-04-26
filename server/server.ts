import dotenv from 'dotenv';
import http from 'http';
import app from './app';
import pool from './services/db';

dotenv.config();

const server = http.createServer(app);
const port = process.env.PORT;

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})
