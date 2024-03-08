import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLikes, user, deleteBlog }) => {
  const [showBlogDetails, setShowBlogDetails] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    <div style={blogStyle} className='blog'>
      <div className='blogTitleAuthor'>{blog.title} {blog.author} <button className='blogDetailsButton' onClick={() => setShowBlogDetails(pre => !pre)}>{showBlogDetails?'hide':'view'}</button></div>
      {showBlogDetails && <div className='blogDetails'>
        <div>{blog.url}</div>
        <div className='blogLike'>likes {blog.likes} <button type='button' className="likeBtn" onClick={() => handleLikes(blog)}>like</button></div>
        <div>{blog.user?blog.user.name:''}</div>
        {blog.user? blog.user.id === user.id && <button type="button" className="deleteBtn" onClick={() => deleteBlog(blog)}>remove</button>:null}
      </div>}
    </div>
  )}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleLikes: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}

export default Blog