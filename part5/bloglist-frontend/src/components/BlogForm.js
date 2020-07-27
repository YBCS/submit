import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newUrl, setUrl] = useState('')
  // const [newBlog, setNewBlog] = useState([{ title: '', author: '', url: '' }])

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id='title'
            type='text'
            // value={newBlog.title}
            value={newTitle}
            name='Title'
            // hope this works -- check -- wont work -- setTitle is in App.js
            onChange={({ target }) => setTitle(target.value)}
            // onChange={handleTitleChange}
          />
        </div>
        <div>
          author:
          <input
            id='author'
            type='text'
            value={newAuthor}
            name='Author'
            onChange={({ target }) => setAuthor(target.value)}
            // onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:
          <input
            id='url'
            type='text'
            value={newUrl}
            name='Url'
            onChange={({ target }) => setUrl(target.value)}
            // onChange={handleUrlChange}
          />
        </div>

        <button id='create-blog' type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm
