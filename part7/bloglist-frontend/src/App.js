import React, { useState, useEffect } from 'react'
// import React, { useEffect } from 'react'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'
// import BlogView from './components/BlogView'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import { setNotification } from './reducers/notificationReducer'
import { login, setUser, initializeUser } from './reducers/loginReducer'
import userService from './services/users'
import {
  initializeBlogs,
  createaBlog,
  likeBlog,
  commentBlog,
  // removeBlog,
} from './reducers/blogReducer'
import {
  Switch,
  Route,
  Link,
  // Redirect,
  useRouteMatch,
  // useHistory,
} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Form, Navbar, Nav } from 'react-bootstrap'

const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  // console.log('user in each reload ', user)

  // convert to a redux state
  const [users, setUsers] = useState([])
  // rename this shit
  const match = useRouteMatch('/users/:id')
  const auser = match
    ? users.find(user => user.id === match.params.id)
    : null
  // console.log(auser)

  const blogFormRef = React.createRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  useEffect(() => {
    userService.getAll().then((users) => setUsers(users))
  }, [])
  // console.log('users state ', users)

  const blogMatch = useRouteMatch('/blogs/:id')
  const ablog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null
  // console.log('blog here ', ablog)

  const notifyWith = (message, type = 'success') => {
    dispatch(
      setNotification(
        {
          message,
          type,
        },
        5
      )
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    dispatch(login({ username, password }))

    event.target.username.value = ''
    event.target.password.value = ''
  }

  const createBlog = async (blog) => {
    try {
      dispatch(createaBlog(blog))
      blogFormRef.current.toggleVisibility()
      notifyWith(`a new blog '${blog.title}' by ${blog.author} added!`)
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleLike = async (id) => {
    // I think you can get the blog directly here
    const blogToLike = blogs.find((b) => b.id === id)
    // console.log(blogToLike)
    dispatch(likeBlog(blogToLike))
  }

  const handleComment = async (comment, id) => {
    // I think you can get the blog directly here
    const blogToComment = blogs.find((b) => b.id === id)
    console.log('the blg to cmmt', blogToComment)
    console.log('the comment in App, from Blog ', comment)
    dispatch(commentBlog(comment, blogToComment))
  }

  // const handleRemove = async (id) => {
  //   const blogToRemove = blogs.find((b) => b.id === id)
  //   const ok = window.confirm(
  //     `Remove blog ${blogToRemove.title} by ${blogToRemove.author}`
  //   )
  //   if (ok) {
  //     dispatch(removeBlog(id))
  //   }
  // }

  const handleLogout = () => {
    dispatch(setUser(null))
    // storage.logoutUser()
  }

  if (!user) {
    return (
      <div className='container'>
        <h2>login to application</h2>

        <Notification notification={notification} />

        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>username</Form.Label>
            <Form.Control
              type='text'
              id='username'
              name='username'
            />
            <Form.Label>password</Form.Label>
            <Form.Control
              type='password'
              id='password'
              name='password'
            />
          </Form.Group>
          {/* <div>
            username
            <input
              id='username'
              name='username'
            />
          </div>
          <div>
            password
            <input
              id='password'
              name='password'
            />
          </div> */}
          {/* <button id='login'>login</button> */}
          <Button variant='primary' type='submit' id='login'>login</Button>
        </Form>
      </div>
    )
  }

  const padding = { padding : 5 }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div className='container'>
      {/* maybe a nav bar or some styles? */}
      <div>
        {/* add those navbarrrrzzzz */}
        <Navbar collapseOnSelect='lg' bg='dark' variant='dark'>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className='mr-auto'>
              <Nav.Link href='#' as='span'>
                <Link style={padding} to='/' >blogs</Link>
              </Nav.Link>
              <Nav.Link href='#' as='span'>
                <Link style={padding} to='/users' >Users</Link>
              </Nav.Link>
            </Nav>
            {user.name} logged in <Button variant='primary' onClick={handleLogout}>logout</Button>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <h2>blog App</h2>
      <Notification notification={notification} />
      <Switch>
        {/* you cant mess this order up */}
        <Route path='/users/:id'>
          <User auser={auser} />
        </Route>

        <Route path='/users'>
          <Users users={users} />
        </Route>

        <Route path='/blogs/:id'>
          <Blog
            blog={ablog}
            handleLike={handleLike}
            handleComment={handleComment}
          />
        </Route>

        <Route path='/'>
          <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <NewBlog createBlog={createBlog} />
          </Togglable>
          {blogs.sort(byLikes).map((blog) => (
            <div key={blog.id} style={blogStyle}>
              <Link to={`/blogs/${blog.id}`}>
                <i>{blog.title}</i>
              </Link>
            </div>
          ))}
        </Route>
      </Switch>
    </div>
  )
}

export default App
