/* eslint-disable no-plusplus */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');

const api = supertest(app);

const initialBlogs = [
  {
    title: 'New Blog',
    url: 'idk.com',
    likes: 69,
  },
];

const initialUsers = [
  {
    username: 'Riyan-Mo',
    name: 'Riyan Mohammad',
    password: 'Thisisgood',
  },
];

const secretKey = process.env.SECRET;
const tokens = [];
describe('tests relating to blogs', () => {
  let temporaryBlog;
  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});
    for (let index = 0; index < initialUsers.length; index++) {
      const user = initialUsers[0];
      await api.post('/api/users').send(user);
      const { username, password } = user;
      const response = await api.post('/api/login').send({ username, password });
      const { body } = response;
      const { token } = body;
      tokens.push(token);
      await api.post('/api/blogs').set('Authorization', `${secretKey} ${token}`).send(initialBlogs[index]);
    }
    const response = await api.get('/api/blogs');
    [temporaryBlog] = response.body;
  }, 100000);

  test('returns correct amount of blogs', async () => {
    const response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8');
    expect(response.body.length).toEqual(initialBlogs.length);
  }, 100000);

  test('verifies that the id property of blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8');
    expect(response.body[0].id).toBeDefined();
  }, 10000);

  test('creates a new blog post', async () => {
    const newBlog = {
      title: 'Canonical string reduction',
      url: 'htt.com',
      likes: 12,
    };
    await api.post('/api/blogs')
      .set('Authorization', `${secretKey} ${tokens[tokens.length - 1]}`)
      .send(newBlog)
      .expect(201);

    const response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8');
    expect(response.body.length).toEqual(initialBlogs.length + 1);
  }, 10000);

  test('does not create a new blog post when token is not provided', async () => {
    const newBlog = {
      title: 'No token',
      url: 'hlocalhost',
      likes: 14,
    };
    await api.post('/api/blogs')
      .send(newBlog)
      .expect(401);

    const response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8');
    expect(response.body.length).toEqual(initialBlogs.length);
  }, 100000);

  test('creates a blog post with 0 likes if likes property is missing', async () => {
    const newBlog = {
      title: 'Canonical string reduction',
      url: 'lmao.com',
    };
    const response = await api.post('/api/blogs')
      .set('Authorization', `${secretKey} ${tokens[tokens.length - 1]}`)
      .send(newBlog);
    expect(response.body.likes).toEqual(0);
  }, 100000);

  test('verifies if title or url properties are missing from the request data', async () => {
    const newBlog1 = {
      title: 'Canonical string reduction',
    };
    const newBlog2 = {
      url: 'like.com',
    };
    await api.post('/api/blogs')
      .set('Authorization', `${secretKey} ${tokens[tokens.length - 1]}`)
      .send(newBlog1)
      .expect(400);
    await api.post('/api/blogs')
      .set('Authorization', `${secretKey} ${tokens[tokens.length - 1]}`)
      .send(newBlog2)
      .expect(400);
  }, 100000);

  test('updates information of an individual blog post', async () => {
    const changedBlog = {
      likes: 8,
    };
    const response = await api.put(`/api/blogs/${temporaryBlog.id}`)
      .set('Authorization', `${secretKey} ${tokens[tokens.length - 1]}`)
      .send(changedBlog)
      .expect(201);
    const updatedBlog = response.body;
    expect(updatedBlog.likes).toEqual(changedBlog.likes);
  }, 100000);

  test('deletes a blog when id is provided', async () => {
    await api.delete(`/api/blogs/${temporaryBlog.id}`)
      .set('Authorization', `${secretKey} ${tokens[tokens.length - 1]}`)
      .expect(204);
  }, 10000);
});

describe('Tests related to users', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const userObject = new User(initialUsers[0]);
    await userObject.save();
  }, 10000);

  test('returns error when invalid information about user is entered', async () => {
    const newUser = {
      name: 'Ll',
      username: 'o',
      password: 'veryuniquepassword',
    };
    const response = await api.post('/api/users')
      .send(newUser)
      .expect(400);
    expect(response.body.error).toEqual('Password and Username must be atleast 3 characters long.');
    const users = await User.find({});
    expect(users).not.toContain(newUser);
  }, 10000);

  test('checks that new user is unique', async () => {
    const newUser = { ...initialUsers[0] };
    const response = await api.post('/api/users')
      .send(newUser)
      .expect(400);
    expect(response.body.error).toContain('Error, expected `username` to be unique');
    const users = await User.find({});
    expect(users).not.toEqual(initialUsers);
  }, 10000);
});

afterAll(async () => {
  await mongoose.connection.close();
});
