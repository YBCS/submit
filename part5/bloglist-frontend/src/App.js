import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
// import Toggleable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [blogFormVisible, setBlogFormVisible] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserBlog = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserBlog) {
      const user = JSON.parse(loggedUserBlog)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // const tolog = blogs.sort((a, b) => b.likes - a.likes)
  // // sort by likes here
  // console.log(tolog)

  const notifiyWith = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      notifiyWith(`a new blog ${returnedBlog.title} by ${returnedBlog.author}`)
    } catch (exception) {
      console.log(exception)
      notifiyWith('cannot create blog', 'error')
    }
  }

  const newLike = async (blogObject) => {
    // here
    try {
      const returnedBlog = await blogService.update(
        blogObject.id,
        blogObject.body
      )
      setBlogs(
        blogs.map((blog) => (blog.id !== returnedBlog.id ? blog : returnedBlog))
      )
      // const finalBlogs = await blogService.getAll()
      // setBlogs(finalBlogs)
      // console.log(blogs)
    } catch (exception) {
      console.log(exception)
    }
  }

  const removeBlog = async (blogObject) => {
    if (
      window.confirm(`Remove blog ${blogObject.author} by ${blogObject.title} `)
    ) {
      try {
        const returnedBlog = await blogService.remove(blogObject.id)
        console.log(returnedBlog, 'item deleted')
        // update the blog
        setBlogs(blogs.filter((blog) => blog.id !== blogObject.id))
      } catch (exception) {
        console.log(exception)
      }
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      // console.log(user)
      notifiyWith(`${user.username} logged in`)
    } catch (exception) {
      console.log(exception)
      notifiyWith('wrong username or password', 'error')
    }
    setUsername('')
    setPassword('')
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  const blogForm = () => {
    const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
    const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogFormVisible(true)}>
            create new blog
          </button>
          {/* {blogs.map((blog) => ( */}
          {blogsSorted.map((blog) => (
            // update here probably -- updateBlog, deleteBlog
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              updateLike={newLike}
              deleteBlog={removeBlog}
            />
            // <Blog key={blog.id} blog={blog} />
          ))}
        </div>
        <div style={showWhenVisible}>
          <BlogForm createBlog={addBlog} />
          <div>
            <button id='hide-form' onClick={() => setBlogFormVisible(false)}>
              cancel
            </button>
          </div>
        </div>
      </div>
    )
  }

  const blogsSorted = blogs.sort((a, b) => b.likes - a.likes)

  if (user === null) {
    return (
      <div>
        <Notification notification={notification} />
        <LoginForm
          // notification={notification}
          handleLogin={handleLogin}
          username={username}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          password={password}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      {blogForm()}
    </div>
  )
}

export default App
