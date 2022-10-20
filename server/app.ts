import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import userRouter from './routes/auth-route';

const app: Application = express();
const PORT: number | string = process.env.PORT || 8080;

dotenv.config();
import './db';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', userRouter);

app.listen(PORT, () => {
    console.log(`server is running in http://localhost:${PORT}`);
})