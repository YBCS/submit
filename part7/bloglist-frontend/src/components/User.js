import React from 'react'

const User = ({ auser }) => {
  if (!auser) {
    return null
  }
  // console.log('the user ',auser)
  return (
    <div>
      <h2> {auser.username} </h2>
      <h3> added blogs</h3>
      <ul>
        {auser.blogs.map(blog => (
          <li key = {blog.id}> {blog.title} </li>
        ))}
      </ul>

    </div>
  )
}

export default User