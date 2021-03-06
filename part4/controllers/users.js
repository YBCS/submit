const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { url: 1, title: 1, author: 1, id: 1 })
  response.json(users.map(u => u.toJSON()))
})

// add verification for password
usersRouter.post('/', async (request, response) => {
  const body = request.body

  const password = body.password
  if (password === undefined) {
    return response.status(400).json({ error : 'password missing' })
  }
  if (password.length < 3) {
    return response.status(400).json({ error: 'password should be atleast 3 characters' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = usersRouter