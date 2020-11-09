import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import appRouter from './app/app.router';

import { loggerMiddleware, logger } from './bootstrap/logger';
import { executeAsync } from './helpers/app.helper';
import { APP_BASE } from './configs/app';
import { sequelize } from './app/models';
import userAuth from './app/middlewares/user-auth';
import errorHandle from './app/middlewares/error-handle';

// console.log(process.env.NODE_ENV);
const app = express();

sequelize
  .sync()
  .then(function () {
    logger.info('Successfully synced all tables');
  })
  .catch(function (err) {
    logger.error('Tables sync failed ', err);
  });

app.use(cors());
app.use(helmet());
app.use(loggerMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(APP_BASE, 'public')));
app.use('/uploads', express.static(path.join(APP_BASE, 'uploads')));

app.use(userAuth);

app.use('/api/v1/', appRouter);

app.use(
  '*',
  executeAsync(() => {
    throw new Error('404');
  })
);
app.use(errorHandle);

module.exports = app;
