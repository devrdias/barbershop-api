import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import * as Sentry from '@sentry/node';
import sentryConfig from './config/sentry';

// capture async errors from express
import 'express-async-errors';

import indexRouter from './routes/index';
import usersRouter from './routes/users';
import sessionsRouter from './routes/sessions';
import filesRouter from './routes/files';
import providersRouter from './routes/providers';
import appointmentsRouter from './routes/appointments';
import schedulesRouter from './routes/schedules';
import notificationsRouter from './routes/notifications';

import authMiddleware from './app/middlewares/auth';

// open db connection
import './database';

class App {
  constructor() {
    // create server
    this.server = express();

    Sentry.init(sentryConfig);

    // load middlewares and routes
    this.middlewares();
    this.routes();
  }

  middlewares() {
    // The request handler must be the first middleware on the app
    this.server.use(Sentry.Handlers.requestHandler());

    this.server.use(express.json());
    this.server.use(logger('dev'));
    this.server.use(express.urlencoded({ extended: false }));
    this.server.use(cookieParser());
    // this.server.use(express.static(path.join(__dirname, 'public')));
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'public', 'uploads'))
    );
  }

  routes() {
    this.server.use('/', indexRouter);
    this.server.use('/users', usersRouter);
    this.server.use('/sessions', sessionsRouter);

    // authenticated routes
    this.server.use(authMiddleware);
    this.server.use('/files', filesRouter);
    this.server.use('/providers', providersRouter);
    this.server.use('/appointments', appointmentsRouter);
    this.server.use('/schedules', schedulesRouter);
    this.server.use('/notifications', notificationsRouter);

    // The error handler must be before any other error middleware and after all controllers
    this.server.use(Sentry.Handlers.errorHandler());
  }
}

export default new App().server;
