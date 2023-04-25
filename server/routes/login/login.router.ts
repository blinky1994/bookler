import express from 'express'
import { login } from './login.controller.js'

export const loginRouter = express.Router();

loginRouter.post('/', login);

