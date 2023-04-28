import express, { Express, Request, Response } from 'express'
import { loginRouter } from './routes/login/login.router'
import { signupRouter } from './routes/signup/signup.router'
import { bookingsRouter } from './routes/bookings/bookings.router'
import cors from 'cors'

const app : Express = express();

app.get('/', (req : Request, res: Response) => {
    res.send('Server is working');
})

app.use(express.json());
app.use(cors());

app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/bookings', bookingsRouter);

export default app;

