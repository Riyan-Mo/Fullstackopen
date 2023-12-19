/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import userService from './services/user'
import { setNotification, resetNotification } from './reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'
import { addBlog, initializeBlogs, likeBlog, deleteBlog } from './reducers/blogReducer'
import { setUser, getUser } from './reducers/userReducer'
import { Routes, Route, Link, useParams } from 'react-router-dom'
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Alert } from '@mui/material'
import { TextField, Button } from '@mui/material'
import { AppBar, Toolbar, IconButton } from '@mui/material'

const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const [users, setUsers] = useState([])
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [blog, setBlog] = useState({
    title: '',
    author: '',
    url: '',
  })

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const storedUser = JSON.parse(window.localStorage.getItem('user'))
    if (storedUser) {
      dispatch(setUser(storedUser))
      blogService.setToken(storedUser.token)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  useEffect(() => {
    userService.getAllUsers().then(response => setUsers(response))
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      dispatch(getUser({ username, password }))
      setPassword('')
      setUserName('')
      blogService.setToken(user.token)
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

  const handleLikes = async (blog) => {
    dispatch(likeBlog(blog))
  }

  const removeBlog = async (blog) => {
    const confirmation = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}?`,
    )
    if (!confirmation) return
    try {
      dispatch(deleteBlog(blog))
      dispatch(setNotification(`Deleted blog ${blog.title} by ${blog.author}`))
      setTimeout(() => {
        dispatch(resetNotification())
      }, 5000)
    } catch (error) {
      console.log(error)
    }
  }

  const logoutUser = () => {
    dispatch(setUser({}))
    window.localStorage.removeItem('user')
    dispatch(setNotification('Logged out successfully'))
    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000)
  }

  const UserInfo = () => {
    return(
      <>
        <AppBar position='static'>
          <Toolbar>
            <IconButton edge='start' color='inherit' aria-label='menu'>
            </IconButton>
            <Button color='inherit' component={Link} to='/'>
              blogs
            </Button>
            <Button color='inherit' component={Link} to='/users'>
              users
            </Button>
            <em>{user.username} logged in</em>
            <Button onClick={logoutUser} type='button' color='inherit'>Logout</Button>
          </Toolbar>
        </AppBar>
        <h2>blog app</h2>
        {(notification &&
        <Alert severity='info' id="notification">{notification}</Alert>
        )}
      </>
    )
  }

  const Home = () => {
    return(
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                deleteBlog={removeBlog}
                handleLikes={handleLikes}
                user={user}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  const Users = () => {
    return(
      <>
        <h2>Users</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Blogs Created</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(user => {
                return(
                  <TableRow key={user.id}>
                    <TableCell><Link to={`/users/${user.id}`}>{user.name}</Link></TableCell>
                    <TableCell>{user.blogs.length}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    )
  }

  const User = ({ users }) => {
    const id = useParams().id
    const parameterisedUser = users.find(n => n.id===id)
    if(!parameterisedUser){
      return null
    }
    return (
      <>
        <h2>{parameterisedUser.name}</h2>
        <h3>added blogs</h3>
        <ul>
          {parameterisedUser.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
        </ul>
      </>
    )
  }

  const IndividualBlog = ({ blogs }) => {
    const comment = useRef('')
    const id = useParams().id
    const parameterisedBlog = blogs.find(n => n.id === id)
    if(!parameterisedBlog){
      return null
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      try{
        blogService.postComment(parameterisedBlog, comment.current)
        comment.current = ''
        dispatch(setNotification(`Comment '${comment.current}' was added to the blog '${parameterisedBlog.title}'`))
        setTimeout(() => {
          dispatch(resetNotification())
        }, 5000)
      }
      catch(e){
        dispatch(setNotification(`Comment '${comment.current}' could not be added to the blog '${parameterisedBlog.title}'`))
        setTimeout(() => {
          dispatch(resetNotification())
        }, 5000)
      }
    }

    return(
      <div>
        <h2>{parameterisedBlog.title}</h2>
        <a href={parameterisedBlog.url}>{parameterisedBlog.url}</a>
        <p>{parameterisedBlog.likes}<button onClick={() => dispatch(likeBlog(parameterisedBlog))}>like</button></p>
        <p>added by {parameterisedBlog.author}</p>
        <h4>comments</h4>
        <form onSubmit={handleSubmit}>
          <TextField label='comment' onChange={(e) => comment.current=e.target.value}/>
          <div>
            <Button variant="contained" color="primary" type="submit">add comment</Button>
          </div>
        </form>
        <ul>
          {parameterisedBlog.comments?parameterisedBlog.comments.map(comment => <li key={comment}>{comment}</li>):null}
        </ul>
      </div>
    )
  }

  if (user && user.username) {
    return (
      <div>
        <UserInfo/>
        <Routes>
          <Route path='/users' element={<Users/>}/>
          <Route path='/users/:id' element={<User users={users} />} />
          <Route path='blogs/:id' element={<IndividualBlog blogs={blogs}/>}/>
          <Route path='/' element={
            <>
              <BlogForm postBlog={postBlog} blog={blog} setBlog={setBlog} />
              <Home/>
            </>}/>
        </Routes>
      </div>
    )
  } else {
    return (
      <div>
        <h2>Login</h2>
        <div>{( notification &&
          <Alert severity='info' className="error">{notification}</Alert>
        )}
        </div>
        <form onSubmit={handleLogin}>
          <div>
            <TextField
              label="username"
              type="text"
              id="username"
              value={username}
              onChange={(e) => {
                setUserName(e.target.value)
              }}
            />
          </div>
          <br />
          <div>
            <TextField
              label="password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
          </div>
          <br />
          <Button id="login" variant='contained' color='primary' type='submit'>Login</Button>
        </form>
      </div>
    )
  }

}

export default App