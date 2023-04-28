import { Request, Response } from "express";
import { createUser } from "./signup.model";

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