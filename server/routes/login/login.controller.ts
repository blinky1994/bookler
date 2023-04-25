import { Request, Response } from "express";
import bcrypt from 'bcrypt'

export async function login(req : Request, res: Response) {
    const { formDetails } = req.body;

    if (!formDetails) {
        res.status(404).json({
            message: 'Incomplete form details'
        })
    }  else {
        const { login, password } = formDetails;

        let hashedPassword = '';
        // Retrieve user here
        bcrypt
        .hash(password, 5)
        .then((hash : string) => {
            console.log('Hash ', hash)
            bcrypt.compare('testpassword', hash).then((result : boolean) => {
                console.log({result});
            });
        })
        .catch((err : Error) => console.error(err.message));

       

        res.status(200).json({
            user: {
                id: '123',
                name: 'Alan Walker'
            }
        })
    }
}

export async function logout(req : Request, res: Response) {
    res.status(200).json({
        message: 'logut success'
    })
}