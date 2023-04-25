import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv';
import { loginRouter } from './routes/login/login.router'
import { signupRouter } from './routes/signup/signup.router'
import cors from 'cors'

dotenv.config();

const app : Express = express();
const port = process.env.PORT;

app.get('/', (req : Request, res: Response) => {
    res.send('Server is working');
})

app.use(express.json());
app.use(cors());

app.use('/login', loginRouter);
app.use('/signup', signupRouter);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})
