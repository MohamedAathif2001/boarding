import express from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';

import authRoutes from './routes/authRoutes.js';
import boardingRoutes from './routes/boardingRoutes.js'
import connectMongoDB from './db/connectDB.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/boarding', boardingRoutes)

app.listen(process.env.PORT, () => {

    connectMongoDB();
    console.log('Server started at port', process.env.PORT);
});