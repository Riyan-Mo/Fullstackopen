import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import { setNotification, resetNotification } from './reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'
import { addBlog, setBlogs, initializeBlogs, likeBlog, deleteBlog } from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)

  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState({})
  const [blog, setBlog] = useState({
    title: '',
    author: '',
    url: '',
  })

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }, [])

  useEffect(() => {
    const storedUser = JSON.parse(window.localStorage.getItem('user'))
    if (storedUser) {
      setUser(storedUser)
      blogService.setToken(storedUser.token)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await blogService.loginUser({ username, password })
      setUser(response)
      setPassword('')
      setUserName('')
      blogService.setToken(response.token)
    } catch (error) {
      console.log('Invalid', error)
      dispatch(setNotification('Wrong username or password'))
      setTimeout(() => {
        dispatch(resetNotification())
      }, 5000)
    }
  }

  const postBlog = async (e) => {
    e.preventDefault()
    try {
      dispatch(addBlog(blog))
      dispatch(setNotification(`New blog ${blog.title} added`))
      setBlog({ title: '', author: '', url: '' })
      setTimeout(() => {
        dispatch(resetNotification())
      }, 5000)
    } catch (error) {
      dispatch(setNotification('New blog couldn\'t be added'))
      setTimeout(() => {
        dispatch(resetNotification())
      }, 5000)
    }
  }

  const handleLikes = (blog) => {
    dispatch(likeBlog(blog))
  }

  const removeBlog = (blog) => {
    const confirmation = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}?`,
    )
    if (!confirmation) return
    try {
      dispatch(deleteBlog(blog))
    } catch (error) {
      console.log(error)
    }
  }

  const logoutUser = () => {
    setUser()
    window.localStorage.removeItem('user')
    dispatch(setNotification('Logged out successfully'))
    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000)
  }

  if (user && user.username) {
    return (
      <div>
        <h2>blogs</h2>
        <h2 id="notification">{notification}</h2>
        <p>{user.username} logged in</p>
        <button onClick={logoutUser}>logout</button>
        <BlogForm postBlog={postBlog} blog={blog} setBlog={setBlog} />
        <hr />
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            deleteBlog={removeBlog}
            handleLikes={handleLikes}
            user={user}
          />
        ))}
      </div>
    )
  } else {
    return (
      <div>
        <h2>Login</h2>
        <h2 className="error">{notification}</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => {
              setUserName(e.target.value)
            }}
          />
          <br />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
          <br />
          <button id="login">login</button>
        </form>
      </div>
    )
  }
}

export default App
