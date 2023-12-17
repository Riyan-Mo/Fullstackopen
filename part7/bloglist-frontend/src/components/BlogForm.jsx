import { useState } from 'react'
import PropTypes from 'prop-types'

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
        <button id="newBlogBtn" onClick={() => setVisibility(!visibility)}>
          New Blog
        </button>
      </div>
      <div style={showWhenVisible}>
        <h2>Create new</h2>
        <form onSubmit={postBlog}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            onChange={handleBlogDetails}
            value={blog.title}
            name="title"
          />
          <br />
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            onChange={handleBlogDetails}
            value={blog.author}
            name="author"
          />
          <br />
          <label htmlFor="url">url:</label>
          <input
            type="text"
            id="url"
            onChange={handleBlogDetails}
            value={blog.url}
            name="url"
          />
          <br />
          <button id="submitBtn" type="submit">
            Create
          </button>
          <button
            id="closeFormBtn"
            onClick={() => setVisibility(!visibility)}
            type="button"
          >
            close
          </button>
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
