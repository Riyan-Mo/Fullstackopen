import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState({})
  const [notification, setNotification] = useState('')
  const [blog, setBlog] = useState({
    title: '',
    author: '',
    url: '',
  })

  useEffect(() => {
    blogService
      .getAll()
      .then((receivedBlogs) =>
        setBlogs(receivedBlogs.sort((a, b) => b.likes - a.likes)),
      )
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
      setNotification('Wrong username or password')
      setTimeout(() => {
        setNotification('')
      }, 5000)
    }
  }

  const postBlog = async (e) => {
    e.preventDefault()
    try {
      const response = await blogService.postBlog(blog, user.token)
      setBlogs((prevBlogs) => prevBlogs.concat(response))
      setNotification(`New blog ${blog.title} added`)
      setBlog({ title: '', author: '', url: '' })
      setTimeout(() => {
        setNotification('')
      }, 5000)
    } catch (error) {
      setNotification('New blog couldn\'t be added')
      setTimeout(() => {
        setNotification('')
      }, 5000)
    }
  }

  const handleLikes = async (blog) => {
    const likedBlog = await blogService.updateLikes({ ...blog })
    setBlogs((prevBlogs) =>
      prevBlogs.map((prevBlog) =>
        prevBlog.id === likedBlog.id ? likedBlog : prevBlog,
      ),
    )
  }

  const deleteBlog = async (blog) => {
    const confirmation = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}?`,
    )
    if (!confirmation) return
    try {
      await blogService.removeBlog(blog.id)
      setBlogs((prevBlogs) =>
        prevBlogs.filter((prevBlog) => prevBlog.id !== blog.id),
      )
    } catch (error) {
      console.log(error)
    }
  }

  const logoutUser = () => {
    setUser(null)
    window.localStorage.removeItem('user')
    setNotification('Logged out successfully')
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  if (user.username) {
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
            deleteBlog={deleteBlog}
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
