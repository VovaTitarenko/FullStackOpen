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
  console.log('cleared');
  for (let blog of listHelper.initialBlogList) {
    let blogObject = new Blog(blog);
    await blogObject.save();
    console.log('saved');
  }
  console.log('done');
});

test('blogs are returned as json', async () => {
  console.log('entered test');
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

after(async () => {
  await mongoose.connection.close();
});
