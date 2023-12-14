import axios from "axios";
const blogUrl = "http://localhost:3003/api/blogs";
const loginUrl = "http://localhost:3003/api/login";

const getAll = async () => {
  const response = await axios.get(blogUrl);
  return response.data;
};

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
  console.log(token);
};

const updateLikes = async (blog) => {
  blog.likes++;
  const response = await axios.put(`${blogUrl}/${blog.id}`, blog);
  console.log(response.data);
  return response.data;
};

const removeBlog = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log(config, blogId);
  await axios.delete(`${blogUrl}/${blogId}`, config);
  console.log("Blog deleted");
};

const loginUser = async (user) => {
  const response = await axios.post(loginUrl, user);
  return response.data;
};

const postBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log(config);
  const response = await axios.post(blogUrl, blog, config);
  console.log(response);
  return response.data;
};

export default {
  getAll,
  loginUser,
  postBlog,
  updateLikes,
  setToken,
  removeBlog,
};
