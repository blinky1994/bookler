import express, { Express, Request, Response } from 'express'
import { loginRouter } from './routes/login/login.router'
import { signupRouter } from './routes/signup/signup.router'
import { bookingsRouter } from './routes/bookings/bookings.router'
import { facilitiesRouter } from './routes/facilities/facilities.router'
import cors from 'cors'
import path from 'path'

const app : Express = express();

app.use(express.json());
app.use(cors());

app.use('/api/login', loginRouter);
app.use('/api/signup', signupRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/facilities', facilitiesRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

export default app;

