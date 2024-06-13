const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const logger = require('./utils/logger');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

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

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

module.exports = app;
