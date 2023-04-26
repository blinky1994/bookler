import { Request, Response } from "express";
import db from '../../services/db';
import { hashPassword } from "../../utils/bcrypt";

export async function signup(req : Request, res: Response) {
    const { email, password } = req.body;
    try {
        const user = await createUser(email, password);
        console.log('Successfully created user');
        res.status(200).json({
            user
        })
    } catch (err : any) {
        console.log('Error creating user: ', err);
        res.status(400).json({
            error: err.toString()
        })
    }
}

async function createUser(email: string, password: string) {
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