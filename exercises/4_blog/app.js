const config = require('./utils/config');
const express = require('express');
const app = express();
require('express-async-errors');
const cors = require('cors');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const blogsRouter = require('./controllers/blogs.js');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login.js');
const mongoose = require('mongoose');

const mongoUrl = config.MONGODB_URI;
mongoose
  .connect(mongoUrl)
  .then((success) => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.info('error connecting to MongoDB', error);
  });

app.use(cors());
app.use(express.json());

// app.use(middleware.reqUrl);
app.use(middleware.tokenExtractor);
app.use(middleware.userExtractor);

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
