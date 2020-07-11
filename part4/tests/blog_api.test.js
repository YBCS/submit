const supertest = require("supertest")
const mongoose = require("mongoose")
const helper = require("./test_helper")
const app = require("../app")
const api = supertest(app) //using app.js

const Blog = require("../models/blog")
// const bcrypt = require('bcrypt')
const User = require('../models/user')


// use this to initiallize db if deleted
describe("when there is initially some blogs saved", () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    // console.log('cleared')

    const blogObject = helper.initialBlogs.map((blog) => new Blog(blog))

    const promiseArray = blogObject.map((blog) => {
      blog.save()
      // console.log('done')
    })
    await Promise.all(promiseArray)
  })

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)
  })

  test("there are two blogs", async () => {
    const response = await api.get("/api/blogs")

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test("the first blog is about React patterns", async () => {
    const response = await api.get("/api/blogs")
    const titles = response.body.map((r) => r.title) //array of titles

    // expect(response.body[0].title).toBe('React patterns')
    expect(titles).toContain("React patterns")
  })
})

// 4.9
// is this fine : I check only on one value
test("unique identifier property of the blog posts is named id", async () => {
  // const response = await api.get("/api/blogs")
  // expect(response.body[0].id).toBeDefined()

  const response = await helper.blogsInDb()
  expect(response[0].id).toBeDefined()
})

// 4.10, 4.22
describe("adding a blog", () => {
  // initiallize some users ?
  // beforeEach(async () => {
  //   await User.deleteMany({})
  //   const userObject = helper.initialBlogs.map((user) => new User(user))

  //   const promiseArray = userObject.map((user) => {
  //     user.save()
  //     // console.log('done')
  //   })
  //   await Promise.all(promiseArray)
  // })

  // deleting should also be modified likewise
  test("a blog can be added", async () => {

    // maybe have to log in to get token
    // const user = {
    //   username: "hellas",
    //   password: "salainen"
    // }

    // const res = await api
    //   .post("/api/login")
    //   .send(user)
    //   .expect(200)

    // [x] fix -- fails now coz where is header
    const newBlog = {
      title: "adding this ",
      author: "buda",
      url: "http://blog.cleancoder.addthis",
      likes: 0,
    }

    const token = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbGxhcyIsImlkIjoiNWYwOTk4YmZjZmNmNzUyZDQ0NGNlMjY4IiwiaWF0IjoxNTk0NDY4MjA5fQ.15ywg5Xgj9DXqK7xzsSwKh2vRLEcQ9ecEjFM448BJkQ'

    await api
      .post("/api/blogs")
      .send(newBlog)
      // .set({ Authorization : res[0].token })
      .set({ Authorization : token })
      .expect(200)
      .expect("Content-Type", /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    // expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map((blog) => blog.title)
    expect(titles).toContain("adding this ")
  })
})


// 4.11
test("if not provided, value of likes defaults to 0", async () => {
  const newBlog = {
    title: "re zero is starting well i think",
    author: "buda",
    url:
      "sharda.ac.in/results",
  }

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const likes = blogsAtEnd.map((b) => b.likes)

  expect(likes[helper.initialBlogs.length]).toBe(0) // not good ?
})

// 4.12
test("title and url properties are missing ", async () => {
  const newBlog = {
    author: "Edsger Ennis",
    likes: 5,
  }

  await api.post("/api/blogs").send(newBlog).expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

// bug : fix : beforeEach and helper.blogsInDb() clash
// [] test for illegal id with postman or something
describe("deletion of a blog", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    // const blogsAtStart = await api.get("/api/blogs")
    // const blogToDelete = blogsAtStart.body[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map(t => t.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('viewing a specific blog', () => {
  test("succeeds with valid id", async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultBlog.body).toEqual(blogToView)
  })

  // [x] bug, fixed -- defined wrong in nonExistingId
  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    console.log(validNonexistingId)

    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })

  // [x] fix failing -- get('/api/blogs')
  test('fails with statuscode 400 id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a34aaaa45'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})

// 4.14
// bug was there
test('updating likes', async () => {
  // find the blog to update
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const newBlog = {
    title: blogToUpdate.title,
    author: "buda",
    url: blogToUpdate.url,
    likes: 15,
  }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  // const updatedBlog = blogsAtEnd[0]

  // what was I doing wrong before
  expect(blogsAtEnd[0].likes).toBe(15)
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    // const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', password: 'sekret' })
    // const user = new User({ username: 'root', passwordHash })
    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if username len < 3', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Fa',
      name: 'Superuser-a',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('shorter than the minimum allowed length (3)')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if password len < 3', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Fait',
      name: 'Superuser-a',
      password: 'sa',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password should be atleast 3 characters')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if username is missing', async () => {
    const usersAtStart = await helper.usersInDb()

    // username: 'mr forget',
    const newUser = {
      name: 'Superuser-a',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` is required')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if password is missing', async () => {
    const usersAtStart = await helper.usersInDb()

    // password: 'salainen',
    const newUser = {
      username: 'mr forget',
      name: 'Superuser-a',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password missing')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

})


afterAll(() => {
  mongoose.connection.close()
})
