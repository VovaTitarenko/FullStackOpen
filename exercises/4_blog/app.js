const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const logger = require('./utils/logger');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
// const { errorHandler } = require('./utils/middleware');

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

app.get('/api/blogs', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

app.post('/api/blogs', async (request, response) => {
  const blog = new Blog(request.body);
  try {
    const result = await blog.save();
    response.status(201).json(result);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message });
    }
  }
});

module.exports = app;
