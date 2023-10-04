import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = () => {
  
  const [blogs, setBlogs] = useState([])
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("")
  const [blog, setBlog] = useState({
    title: "",
    author: "",
    url: "",
  })
  const [notification, setNotification] = useState("");

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [blogs])

  useEffect(()=>{
    const storedUser = JSON.parse(window.localStorage.getItem('user'));
    storedUser !== ""?setUser(storedUser):null;
  }, [])

  useEffect(()=>{
    window.localStorage.setItem('user', JSON.stringify(user));
  }, [user])

  const handleLogin = async(e) =>{
    e.preventDefault();
    try{
      const response = await blogService.loginUser({username, password});
      setUser(response);
      setPassword('');
      setUserName('');
    }
    catch(error){
      console.log("Invalid");
      setNotification("Wrong username or password")
      setTimeout(()=>{
        setNotification("");
      }, 5000)
    }
  }

  const logoutUser = () =>{
    setUser(null);
    window.localStorage.removeItem('user');    
    setNotification("Logged out successfully")
    setTimeout(()=>{
      setNotification("");
    }, 5000)
  }

  const handleBlogDetails = (e) =>{
    const {name, value} = e.target;
    console.log(blog)
    setBlog(prevBlog=> ({...prevBlog , [name]: value }))
  }

  const postBlog = async(e) =>{
    e.preventDefault();
    try{
    const response = await blogService.postBlog(blog, user.token);
    setBlogs(prevBlogs => prevBlogs.concat(response))
    setNotification(`New blog ${blog.title} added`)
    setTimeout(()=>{
      setNotification("");
    }, 5000)
    }
    catch(error){
      setNotification("New blog couldn't be added")
      setTimeout(()=>{
        setNotification("");
      }, 5000)
    }
  }

  if(user){
    return (
      <div>
        <h2>blogs</h2>
        <h2>{notification}</h2>
        <p>{user.username} logged in</p>
        <button onClick={logoutUser}>logout</button>
        <h2>Create new</h2>
        <form onSubmit={postBlog}>
          <label htmlFor="title">Title:</label>
          <input type="text" id='title' onChange={handleBlogDetails} value={blog.title} name='title'/>
          <br />
          <label htmlFor="author">Author:</label>
          <input type="text" id='author' onChange={handleBlogDetails} value={blog.author} name='author'/>
          <br />
          <label htmlFor="url">url:</label>
          <input type="text" id='url' onChange={handleBlogDetails} value={blog.url} name='url'/>
          <br />
          <button>Create</button>
        </form>
        <hr />
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }
  else{
    return(
      <div>
      <h2>Login</h2>
      <h2>{notification}</h2>
      <form onSubmit={handleLogin}>
      <label htmlFor="username">Username</label>
      <input type="text" id="username" value={username} onChange={(e)=>{setUserName(e.target.value)}}/>
      <br />
      <label htmlFor="password">Password</label>
      <input type="password" id="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
      <br />
      <button>login</button>
      </form>
      </div>
    )
  }
}

export default App