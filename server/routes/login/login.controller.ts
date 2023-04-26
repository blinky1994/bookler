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

        // bcrypt.compare('testpassword', hash).then((result : boolean) => {
        //     console.log({result});
        // });
        
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