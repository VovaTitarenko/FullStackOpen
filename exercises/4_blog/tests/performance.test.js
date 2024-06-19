const { test, describe, beforeEach, after } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const listHelper = require('../utils/list_helper');
const Blog = require('../models/blog');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(listHelper.initialBlogList);
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
  const blogItem = {
    title: 'My thoughts on love and friendship',
    author: 'vovka',
    url: 'https://vk.com',
    likes: 210,
  };

  await api
    .post('/api/blogs')
    .send(blogItem)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');
  const blogsAtEnd = response.body;
  const titles = blogsAtEnd.map((r) => r.title);

  assert.strictEqual(blogsAtEnd.length, listHelper.initialBlogList.length + 1);
  assert(titles.includes('My thoughts on love and friendship'));
});

test('blogs have "id" property instead of "_id"', async () => {
  const response = await api.get('/api/blogs');
  const blogToTest = response.body[0];
  assert(blogToTest.hasOwnProperty('id'));
  assert(!blogToTest.hasOwnProperty('_id'));
});

test('blog with a missing likes property defaults to 0', async () => {
  const newBlog = {
    title: 'A new idea',
    author: 'vovka',
    url: 'missing',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogToTest = await Blog.findOne({ title: 'A new idea' });
  assert.strictEqual(blogToTest.likes, 0);
});

test('posts with missing title receive 400 Bad Request status', async () => {
  const newBlog = {
    author: 'vovka',
    url: 'vk.com',
    likes: 210,
  };

  await api.post('/api/blogs').send(newBlog).expect(400);
});

test('posts with missing url receive 400 Bad Request status', async () => {
  const newBlog = {
    title: 'A new idea',
    author: 'vovka',
    likes: 210,
  };

  await api.post('/api/blogs').send(newBlog).expect(400);
});

test('delete a specific blog', async () => {
  const blogsAtStart = await Blog.find({});
  const blogToDelete = blogsAtStart[0];
  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
  const blogsAtEnd = await Blog.find({});
  assert.strictEqual(blogsAtEnd.length, listHelper.initialBlogList.length - 1);

  const titles = blogsAtEnd.map((r) => r.title);
  assert(!titles.includes(blogToDelete.title));
});

test('update blog', async () => {
  const blogsAtStart = (await Blog.find({})).map((b) => b.toJSON());
  const blogToUpdate = blogsAtStart[0];
  blogToUpdate.likes = 1000;
  await api.put(`/api/blogs/${blogToUpdate.id}`).send(blogToUpdate).expect(200);
  const blogToTest = await Blog.findById(blogToUpdate.id);
  assert.strictEqual(blogToTest.likes, 1000);
});

after(async () => {
  await mongoose.connection.close();
});
