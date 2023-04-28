import { Request, Response } from "express";
import { checkUserInDB } from "./login.model";

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