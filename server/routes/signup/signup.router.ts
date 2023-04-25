import express from 'express'
import { signup } from './signup.controller.js'

export const signupRouter = express.Router();

signupRouter.post('/', signup);

