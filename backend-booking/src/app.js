import express from 'express';
import authRouter from './routes/auth';
import roomRouter from './routes/room';
import categoryRouter from './routes/category';
import cors from 'cors';
import bookingroom from './routes/bookingroom';
import mongoose from 'mongoose';
import user from './routes/user';
const app = express();

// đăng ký middleware" giải mã dữ liệu json
app.use(express.json());
app.use(cors());
// router
app.use('/api', roomRouter);
app.use('/api', categoryRouter);
app.use('/api', authRouter);
app.use('/api', user);
app.use('/api', bookingroom);

mongoose.connect('mongodb://127.0.0.1:27017/AsmFE2');

export const viteNodeApp = app;
