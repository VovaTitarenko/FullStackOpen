const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.post('/', async (request, response) => {
  const body = request.body;
  console.log(body);
  console.log(request.token);
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  console.log(decodedToken.id, typeof decodedToken.id);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: decodedToken.id,
  });

  const savedBlog = await blog.save();
  //   console.log(savedBlog);
  const user = await User.findById(decodedToken.id);
  //   console.log(user);
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  let requestedBlog = await Blog.findById(request.params.id);
  if (decodedToken.id.toString() !== requestedBlog.user.toString()) {
    return response.status(401).json({ error: 'token invalid' });
  }
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  let requestedBlog = await Blog.findById(request.params.id);
  if (decodedToken.id.toString() !== requestedBlog.user.toString()) {
    return response.status(401).json({ error: 'token invalid' });
  }

  const blog = {
    title: body.title,
    author: body.author,
    user: decodedToken.id,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.json(updatedBlog);
});

module.exports = blogsRouter;
