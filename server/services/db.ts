import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_ROOT_HOST,
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DATABASE,
  password: process.env.MYSQL_ROOT_PASSWORD
});

console.log('Successfully created DB');

export default pool.promise();