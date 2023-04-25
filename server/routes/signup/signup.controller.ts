import { Request, Response } from "express";

export async function signup(req : Request, res: Response) {
    const { formDetails } = req.body;

    if (!formDetails) {
        res.status(404).json({
            message: 'Incomplete form details'
        })
    }  else {
        const { login, password } = formDetails;

        // Add user here

        res.status(200).json({
            user: {
                id: '123',
                name: 'Alan Walker'
            }
        })
    }
}
