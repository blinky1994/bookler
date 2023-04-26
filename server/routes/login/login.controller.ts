import { Request, Response } from "express";
import db from "../../services/db";
import { comparePassword } from "../../utils/bcrypt";

export async function login(req : Request, res: Response) {
    const { email, password } = req.body;
    try {
        const user = await checkUserInDB(email, password);
        console.log('Successfully logged in');
        res.status(200).json({
            user
        })
    } catch (err : any) {
        console.log('Error logging in: ', err);
        res.status(400).json({
            error: err.toString()
        })
    }
}

async function checkUserInDB(email: string, password: string) {
    let sql = `
        SELECT id, email, password FROM users WHERE email = '${email}';
    `;

    const response = await db.query(sql);

    if (!response[0][0]) throw new Error('User does not exist');
    const hashedPassword = await response[0][0].password;
    const validatePassword = await comparePassword(password, hashedPassword);

    if (!validatePassword) throw new Error('Wrong user or password');

    return {
        id: response[0][0].id,
        email: response[0][0].email,
    }
}
