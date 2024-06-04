import express from 'express';
import userRouter from './route/userRoute.js';
import cors from 'cors';
import AppError from './utils/appError.js';
import globalErrorHandler from './controllers/errorController.js';
import cookieParser from 'cookie-parser';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';

const app = express();
app.use(express.json());
app.use(ExpressMongoSanitize());
app.use(xss());

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.PORT || 'http://localhost:5173',
    credentials: true,
    //allowedHeaders: ['Authorization', 'content-type', 'authorization'],
    //exposedHeaders: ['Authorization', 'content-type', 'authorization'],
  }),
);
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.headers);
  next();
});

export default app;
