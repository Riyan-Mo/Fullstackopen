const listHelper = require('../utils/list_helper');

describe('total likes', () => {
  test('of dummy returns one', () => {
    const blogs = [];
    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
  });

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
  ];

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });
});

describe('return', () => {
  const listWithBlogs = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    },
    {
      title: 'Canonical string reduction',
      author: 'E W. Dijkstra',
      likes: 12,
    },
    {
      title: 'Canonical string reduction',
      author: 'E W. Dijkstra',
      likes: 12,
    },
    {
      title: 'Canonical string reduction',
      author: 'E W. Dijkstra',
      likes: 12,
    },
    {
      title: 'Canonical string reduction',
      author: 'Riyan Mohammad',
      likes: 102,
    },
  ];

  test('the favourite blog', () => {
    const result = listHelper.favouriteBlog(listWithBlogs);
    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'E W. Dijkstra',
      likes: 12,
    });
  });

  test('author with most blogs', () => {
    const result = listHelper.mostBlogs(listWithBlogs);
    expect(result).toEqual({
      author: 'E W. Dijkstra',
      blogs: 3,
    });
  });

  test('author with most likes', () => {
    const result = listHelper.mostLikes(listWithBlogs);
    expect(result).toEqual({
      author: 'Riyan Mohammad',
      likes: 102,
    });
  });
});
