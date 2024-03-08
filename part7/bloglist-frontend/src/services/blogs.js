import axios from 'axios'
const blogUrl = 'http://localhost:3003/api/blogs'
const loginUrl = 'http://localhost:3003/api/login'

const getAll = async () => {
  const response = await axios.get(blogUrl)
  return response.data
}

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const updateLikes = async (blog) => {
  blog.likes++
  const response = await axios.put(`${blogUrl}/${blog.id}`, blog)
  return response.data
}

const removeBlog = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  }
  await axios.delete(`${blogUrl}/${blogId}`, config)
}

const loginUser = async (user) => {
  const response = await axios.post(loginUrl, user)
  return response.data
}

const postBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(blogUrl, blog, config)
  return response.data
}

const postComment = async(blog, comment) => {
  const updatedBlog = { ...blog, ['comments']: [...blog.comments, comment] }
  const response = await axios.post(`${blogUrl}/${blog.id}/comments`, updatedBlog)
  return response.data
}

export default {
  getAll,
  loginUser,
  postBlog,
  updateLikes,
  setToken,
  removeBlog,
  postComment,
}
