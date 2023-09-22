const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

const initialBlogs = [
  {
    title: 'New Blog',
    author: 'Riyan',
    url: 'idk.com',
    likes: 69,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
}, 100000);

test('returns correct amount of blogs', async () => {
  const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8');
  expect(response.body.length).toEqual(initialBlogs.length);
}, 1000000);

test('verifies that the id property of blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8');
  expect(response.body[0].id).toBeDefined();
}, 1000000);

test('creates a new blog post', async () => {
  const newBlog = {
    title: 'Canonical string reduction',
    author: 'E W. Dijkstra',
    likes: 12,
  };
  await api.post('/api/blogs')
    .send(newBlog);
  const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8');
  expect(response.body.length).toEqual(initialBlogs.length + 1);
}, 1000000);

test('creates a new blog post with 0 likes if likes property is missing', async () => {
  const newBlog = {
    title: 'Canonical string reduction',
    author: 'E W. Dijkstra',
  };
  const response = await api.post('/api/blogs').send(newBlog);
  expect(response.body.likes).toEqual(0);
}, 1000000);

test('verifies if title or url properties are missing from the request data', async () => {
  const newBlog1 = {
    title: 'Canonical string reduction',
  };
  const newBlog2 = {
    author: 'E W. Dijkstra',
  };
  await api.post('/api/blogs').send(newBlog1)
    .expect(400);
  await api.post('/api/blogs').send(newBlog2)
    .expect(400);
}, 100000);

afterAll(async () => {
  await mongoose.connection.close();
});
