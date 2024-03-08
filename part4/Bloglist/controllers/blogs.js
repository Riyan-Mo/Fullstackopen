/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable consistent-return */
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 });
  response.json(blogs);
});

blogsRouter.delete('/:id', async (request, response) => {
  const { user } = request;
  const userId = user.id;
  const blogId = request.params.id;
  const blog = await Blog.findById(blogId);
  if (blog.user.toString() === userId.toString()) {
    await Blog.findOneAndDelete(blog);
    return response.status(204).end();
  }
  return response.status(401).json({ error: 'Unauthorised user' });
});

blogsRouter.put('/:id', async (request, response) => {
  const blogId = request.params.id;
  const { body } = request;
  const oldBlog = await Blog.findById(blogId);
  const newBlog = new Blog({
    title: body.title || oldBlog.title,
    author: body.author || oldBlog.author,
    url: body.url || oldBlog.url,
    likes: body.likes || oldBlog.likes,
    id: blogId,
  });
  const updatedBlog = await Blog.findByIdAndUpdate(blogId, newBlog, { new: true });
  response.status(201).json(updatedBlog);
});

blogsRouter.post('/', async (request, response) => {
  const { body } = request;
  if (!body.title || !body.url) {
    return response.status(400).end();
  }
  if (!request.user) { return response.status(401).json({ error: 'Unauthorized' }); }
  const { user } = request;
  const blog = new Blog({
    title: body.title,
    author: body.author || user.name,
    url: body.url,
    likes: body.likes,
    user: body.userId || user._id,
  });
  const result = await blog.save();
  user.blogs = user.blogs.concat(blog.id);
  await user.save();
  response.status(201).json(result);
});

module.exports = blogsRouter;
