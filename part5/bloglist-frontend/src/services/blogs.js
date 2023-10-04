import axios from 'axios'
const blogUrl = 'http://localhost:3003/api/blogs'
const loginUrl = 'http://localhost:3003/api/login'

const getAll = async() => {
  const response = await axios.get(blogUrl)
  return response.data
}

const setToken = newToken =>{
  return `Bearer ${newToken}`
}

const loginUser = async(user) =>{
  const response = await axios.post(loginUrl, user)
  return response.data;
}

const postBlog = async(blog, token) =>{
  const config = {
    headers: { Authorization: setToken(token) },
  }
  console.log(config)
  const response = await axios.post(blogUrl, blog, config)
  console.log(response);
  return response.data;
}

export default { getAll, loginUser, postBlog }