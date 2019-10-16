import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index';
import usersRouter from './routes/users';
import sessionsRouter from './routes/sessions';
import filesRouter from './routes/files';
import providersRouter from './routes/providers';
import authMiddleware from './app/middlewares/auth';

// open db connection
import './database';

class App {
  constructor() {
    // create server
    this.server = express();

    // load middlewares and routes
    this.middlewares();
    this.routes();
  }

  middlewares() {
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

    // authenticated routes
    this.server.use(authMiddleware);
    this.server.use('/sessions', sessionsRouter);
    this.server.use('/files', filesRouter);
    this.server.use('/providers', providersRouter);
  }
}

export default new App().server;
