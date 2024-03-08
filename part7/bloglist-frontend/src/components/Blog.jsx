import { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { TableRow, TableCell, Button } from '@mui/material'

const Blog = ({ blog, user, deleteBlog }) => {

  return (
    <TableRow className="blog">
      <TableCell className="blogTitleAuthor">
        <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
        {blog.user
          ? blog.user.username === user.username && (
            <div>
              <Button
                variant="contained"
                color="primary"
                type="button"
                className="deleteBtn"
                onClick={() => deleteBlog(blog)}
              >
                  remove
              </Button>
            </div>
          ): null}
      </TableCell>
    </TableRow>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleLikes: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}

export default Blog
