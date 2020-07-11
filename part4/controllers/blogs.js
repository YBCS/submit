const blogsRouter = require("express").Router()
const jwt = require('jsonwebtoken')
const Blog = require("../models/blog")
const User = require("../models/user")

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs.map((blog) => blog.toJSON()))
  // response.json(blogs)
})


blogsRouter.post("/", async (request, response) => {
  const body = request.body
  const token = getTokenFrom(request)
  // const user = await User.findById(body.userId)

  // find the first one and get its id
  // const users = await User.find({})
  // const user = users[1]

  // const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user : user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  // response.json(savedBlog.toJson)
  response.json(savedBlog)
})

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

//  bug -- toJSON
blogsRouter.put("/:id", async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })
  response.json(updatedBlog.toJSON())
})

// blogsRouter.delete("/:id", async (request, response) => {
//   await Blog.findByIdAndRemove(request.params.id)
//   response.status(204).end()
// })


blogsRouter.delete("/:id", async (request, response) => {
  // find blog.user (id of user who created the blog)
  // find userid with token
  // compare their id's (nested)

  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if(!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  // decoded token contains : username, _id

  // const  user = await User.findById(decodedToken.id)
  const userid = decodedToken.id
  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() === userid.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'not the same user' })
  }


})

module.exports = blogsRouter
