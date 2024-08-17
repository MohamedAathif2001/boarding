import express from 'express';
import dotenv from 'dotenv'

import authRoutes from './routes/authRoutes.js';
import connectMongoDB from './db/connectDB.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);

app.listen(3000, () => {

    connectMongoDB();
    console.log('Server started at http://localhost:3000');
});