import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    appendBlogs(state, action){
      state.push(action.payload)
    },
    setBlogs(state, action){
      return action.payload
    },
    updateBlog(state, action){
      const blog = action.payload
      return state.map(prevBlog => prevBlog.id===blog.id?blog:prevBlog)
    }
  }
})

export const { appendBlogs, setBlogs, updateBlog } = blogSlice.actions

export const addBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.postBlog(blog)
    dispatch(appendBlogs(newBlog))
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    const returnedBlog = await blogService.updateLikes({ ...blog })
    console.log(returnedBlog)
    dispatch(updateBlog(returnedBlog))
  }
}

export const deleteBlog = blog => {
  return async dispatch => {
    await blogService.removeBlog(blog.id)
    dispatch(initializeBlogs())
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const response = await blogService.getAll()
    const blogs = [ ...response ]
    dispatch(setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }
}

export default blogSlice.reducer