import dotenv from 'dotenv';
import http from 'http';
import app from './app';
import pool from './services/db';

dotenv.config();

const server = http.createServer(app);
const port = process.env.PORT || 3001;

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})
