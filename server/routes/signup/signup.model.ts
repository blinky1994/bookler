import db from '../../services/db';
import { hashPassword } from "../../utils/bcrypt";

export async function createUser(email: string, password: string) {
    let hashedPassword;
    hashedPassword = await hashPassword(password);
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