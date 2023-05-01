import db from '../../services/db';
import { hashPassword } from "../../utils/bcrypt";

export async function createUser(email: string, password: string) {
    let sql = `
    SELECT email FROM users WHERE email = '${email}';
    `;

    const response = await db.query(sql);
    console.log('create user:' ,response[0][0]);
    if (response[0][0]) throw new Error('User already exists!');

    let hashedPassword = await hashPassword(password);
    await insertUserIntoDB(email, hashedPassword);
    return await getUserFromDB(email);
}


async function getUserFromDB(email: string) {
    let sql = `
        SELECT id, email FROM users WHERE email = '${email}';
    `;

    const response = await db.query(sql);

    return {
        id: response[0][0].id,
        email: response[0][0].email
    }
}


async function insertUserIntoDB(email: string, hashedPassword: string) {
    let sql = `
    INSERT INTO users (
        email, password
    )
    VALUES (
        '${email}', '${hashedPassword}' 
    );
    `;

    return await db.query(sql);
}