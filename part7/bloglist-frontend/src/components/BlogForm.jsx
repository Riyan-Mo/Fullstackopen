import { useState } from 'react'
import PropTypes from 'prop-types'
import { TextField, Button } from '@mui/material'

const BlogForm = ({ blog, setBlog, postBlog }) => {
  const [visibility, setVisibility] = useState(true)
  const handleBlogDetails = (e) => {
    const { name, value } = e.target
    setBlog((prevBlog) => ({ ...prevBlog, [name]: value }))
  }

  const showWhenVisible = { display: visibility ? 'none' : '' }
  const hideWhenVisible = { display: visibility ? '' : 'none' }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button id="newBlogBtn" onClick={() => setVisibility(!visibility)} type='button'>
          Create New
        </Button>
      </div>
      <div style={showWhenVisible}>
        <h2>Create new</h2>
        <form onSubmit={postBlog}>
          <div>
            <TextField
              label='title'
              type="text"
              id="title"
              onChange={handleBlogDetails}
              value={blog.title}
              name="title"
            />
          </div>
          <br />
          <div>
            <TextField
              label='author'
              type="text"
              id="author"
              onChange={handleBlogDetails}
              value={blog.author}
              name="author"
            />
          </div>
          <br />
          <div>
            <TextField
              label='url'
              type="text"
              id="url"
              onChange={handleBlogDetails}
              value={blog.url}
              name="url"
            />
          </div>
          <br />
          <div>
            <Button id="submitBtn" type="submit">
            Create
            </Button>
            <Button
              id="closeFormBtn"
              onClick={() => setVisibility(!visibility)}
              type="button"
            >
            close
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

BlogForm.propTypes = {
  postBlog: PropTypes.func.isRequired,
  setBlog: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
}

export default BlogForm
