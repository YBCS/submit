import React, { useState } from 'react'
// import blogs from '../services/blogs'

const Blog = ({ blog, user, updateLike, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  // const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleView = () => {
    setVisible(!visible)
  }

  const buttonStyle = { display: user.name === blog.user.name ? '' : 'none' }

  // maybe this has to Be inside BlogForm -- NO
  const newLike = (event) => {
    event.preventDefault()
    updateLike({
      id: blog.id,
      body: {
        user: blog.user.id,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url,
      },
    })
  }
  // debugger

  const removeBlog = (event) => {
    event.preventDefault()
    deleteBlog({
      id: blog.id,
      author: blog.author,
      title: blog.title,
    })
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleView}> {visible ? 'hide' : 'show'} </button>
      </div>

      <div style={showWhenVisible} className='togglableContent'>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button id='like-button' onClick={newLike}>like</button>
        </div>
        <div>{blog.user.name}</div>
        <div style={buttonStyle}>
          <button onClick={removeBlog}>remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog
