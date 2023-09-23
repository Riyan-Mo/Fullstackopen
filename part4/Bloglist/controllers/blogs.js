const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.delete('/:id', async (request, response) => {
  const blogId = request.params.id;
  await Blog.findByIdAndDelete(blogId);
  response.status(204).end();
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
  if (!request.body.title || !request.body.url) {
    response.status(400).end();
  } else {
    const blog = new Blog(request.body);
    const result = await blog.save();
    response.status(201).json(result);
  }
});

module.exports = blogsRouter;
