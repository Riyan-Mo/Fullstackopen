/* eslint-disable no-plusplus */
/* eslint-disable max-len */
const dummy = (blogs) => 1;

const totalLikes = (blogs) => (blogs.reduce((prev, curr) => prev + curr.likes, 0));

const favouriteBlog = (blogs) => blogs.reduce((prev, curr) => (prev.likes > curr.likes ? prev : curr), blogs[0]);

const returnMost = (blogs, feat) => {
  const blogCount = [];
  const authors = blogs.map((blog) => blog.author);
  authors.forEach((author) => {
    const index = blogCount.findIndex((obj) => obj.author === author);
    if (index === -1) {
      blogCount.push({ author, [feat]: 1 });
    } else {
      blogCount[index][feat]++;
    }
  });
  const authorWithMostBlogs = blogCount.reduce((prev, curr) => (prev[feat] > curr[feat] ? prev : curr), blogCount[0]);
  return authorWithMostBlogs;
};

const mostBlogs = (blogs) => returnMost(blogs, 'blogs');

const mostLikes = (blogs) => {
  const blogCount = [];
  const authorStats = blogs.map((blog) => ({ author: blog.author, likes: blog.likes }));
  authorStats.forEach((author) => {
    const index = blogCount.findIndex((obj) => obj.author === author.author);
    if (index === -1) {
      blogCount.push({ author: author.author, likes: author.likes });
    } else {
      blogCount[index].likes += author.likes;
    }
  });
  return blogCount.reduce((prev, curr) => (prev.likes > curr.likes ? prev : curr), blogCount[0]);
};

module.exports = {
  dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes,
};
