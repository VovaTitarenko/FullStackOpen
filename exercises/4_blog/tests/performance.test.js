const { test, describe, beforeEach, after } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const listHelper = require('../utils/list_helper');
const Blog = require('../models/blog');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(listHelper.initialBlogList);
});

test('valid signup succeeds', async () => {
  const user = {
    username: `yurka${Math.floor(Math.random() * 1000)}`,
    name: 'Yura',
    password: 'bcdef',
  };
  await api.post('/api/users').send(user).expect(201);
});

describe('invalid signup inputs should return status 400', () => {
  test('short username', async () => {
    const user = {
      username: 'MJ',
      name: 'Mohammad-Jamal',
      password: 'xxyyzz',
    };
    await api.post('/api/users').send(user).expect(400);
  });
  test('short password', async () => {
    const user = {
      username: 'MJamal',
      name: 'Mohammad-Jamal',
      password: 'xyz',
    };
    await api.post('/api/users').send(user).expect(400);
  });
  test('repeating an existing username', async () => {
    const user = {
      username: 'MJay',
      name: 'MoJal',
      password: 'xxyyzz',
    };
    await api.post('/api/users').send(user).expect(400);
  });
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');
  const blogsAtStart = response.body;

  assert.strictEqual(blogsAtStart.length, listHelper.initialBlogList.length);
});

test('a valid blog item can be posted', async () => {
  const user = {
    username: 'MJay',
    password: 'xxyyzz',
  };

  const postResponse = await api.post('/api/login').send(user).expect(200);
  const token = postResponse.body.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);

  const blogItem = {
    title: 'On cool names and beyond',
    author: 'MJay',
    user: decodedToken.id,
    url: 'https://vk.com',
    likes: 210,
  };

  await api
    .post('/api/blogs')
    .auth(token, { type: 'bearer' })
    .send(blogItem)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const getResponse = await api.get('/api/blogs');
  const blogsAtEnd = getResponse.body;
  const titles = blogsAtEnd.map((r) => r.title);

  assert.strictEqual(blogsAtEnd.length, listHelper.initialBlogList.length + 1);
  assert(titles.includes('On cool names and beyond'));
});

test('blogs have "id" property instead of "_id"', async () => {
  const response = await api.get('/api/blogs');
  const blogToTest = response.body[0];
  assert(blogToTest.hasOwnProperty('id'));
  assert(!blogToTest.hasOwnProperty('_id'));
});

test('blog with a missing likes property defaults to 0', async () => {
  //Login
  const user = {
    username: 'MJay',
    password: 'xxyyzz',
  };
  const postResponse = await api.post('/api/login').send(user).expect(200);
  const token = postResponse.body.token;
  // const decodedToken = jwt.verify(token, process.env.SECRET);
  //Logged in
  const newBlog = {
    title: 'A new idea',
    author: 'vovka',
    url: 'missing',
  };

  await api
    .post('/api/blogs')
    .auth(token, { type: 'bearer' })
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogToTest = await Blog.findOne({ title: 'A new idea' });
  assert.strictEqual(blogToTest.likes, 0);
});

test('posts with missing title receive 400 Bad Request status', async () => {
  //Login
  const user = {
    username: 'MJay',
    password: 'xxyyzz',
  };
  const postResponse = await api.post('/api/login').send(user).expect(200);
  const token = postResponse.body.token;
  // const decodedToken = jwt.verify(token, process.env.SECRET);
  //Logged in
  const newBlog = {
    author: 'vovka',
    url: 'vk.com',
    likes: 210,
  };

  await api
    .post('/api/blogs')
    .auth(token, { type: 'bearer' })
    .send(newBlog)
    .expect(400);
});

test('posts with missing url receive 400 Bad Request status', async () => {
  //Login
  const user = {
    username: 'MJay',
    password: 'xxyyzz',
  };
  const postResponse = await api.post('/api/login').send(user).expect(200);
  const token = postResponse.body.token;
  // const decodedToken = jwt.verify(token, process.env.SECRET);
  //Logged in
  const newBlog = {
    title: 'A new idea',
    author: 'vovka',
    likes: 210,
  };

  await api
    .post('/api/blogs')
    .auth(token, { type: 'bearer' })
    .send(newBlog)
    .expect(400);
});

test('update blog', async () => {
  //Login
  const user = {
    username: 'MJay',
    password: 'xxyyzz',
  };
  const postResponse = await api.post('/api/login').send(user).expect(200);
  const token = postResponse.body.token;
  // const decodedToken = jwt.verify(token, process.env.SECRET);
  //Logged in
  const blogsAtStart = (await Blog.find({})).map((b) => b.toJSON());
  const blogToUpdate = blogsAtStart[0];
  const newLikesCount = 2500;
  blogToUpdate.likes = newLikesCount;
  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .auth(token, { type: 'bearer' })
    .send(blogToUpdate)
    .expect(200);
  const blogToTest = await Blog.findById(blogToUpdate.id);
  assert.strictEqual(blogToTest.likes, newLikesCount);
});

test('delete a specific blog', async () => {
  //Login
  const user = {
    username: 'MJay',
    password: 'xxyyzz',
  };
  const postResponse = await api.post('/api/login').send(user).expect(200);
  const token = postResponse.body.token;
  // const decodedToken = jwt.verify(token, process.env.SECRET);
  //Logged in
  const blogsAtStart = await Blog.find({});
  const blogToDelete = blogsAtStart[0];
  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .auth(token, { type: 'bearer' })
    .expect(204);
  const blogsAtEnd = await Blog.find({});
  assert.strictEqual(blogsAtEnd.length, listHelper.initialBlogList.length - 1);

  const titles = blogsAtEnd.map((r) => r.title);
  assert(!titles.includes(blogToDelete.title));
});

after(async () => {
  await mongoose.connection.close();
});
