// [X] 3.19 till 3.21

const express = require("express")
const nodemon = require("nodemon")
const app = express()
const cors = require("cors")
require("dotenv").config()
const Person = require("./models/person")

// waht si this
// const { response } = require("express")

app.use(cors())
app.use(express.json())
app.use(express.static("build"))

var morgan = require("morgan")
morgan.token("body", function (req, res) {
  return JSON.stringify(req.body)
})
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
)

// 3.18
app.get("/info", (req, res) => {
  const len = Person.length
  const day = new Date()
  const data =
    "<div>Phonebook has info for " +
    len +
    " people</div> <br>" +
    "\n" +
    day +
    ""
  res.send(data)
})

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons.map((person) => person.toJSON()))
  })
})

// 3.18
app.get("/api/persons/:id", (req, res, next) => {
  // const id = Number(req.params.id)
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

app.post("/api/persons", (request, response, next) => {
  const body = request.body

  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({ error: "content missing" })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson)
    })
    .catch((error) => next(error))
})

// 3.17
app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }
  // {new: true} makes sure that updatedNote is actual
  // {runValidators: true} is to enable validators
  Person.findByIdAndUpdate(request.params.id, person, {
    new: true,
    runValidators: true,
  })
    .then((updatedNote) => {
      response.json(updatedNote.toJSON())
    })
    .catch((error) => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  // console.error(error.message)

  if (error.name === "CastError" && error.kind == "ObjectId") {
    return response.status(400).send({ error: "malformatted id" })
  } else if (error.name === "ValidationError") {
    // had a typo here *facepalm*
    return response.status(400).json({ error: error.message })
    console.log("error func here ")
    // return response.status(400).json({error: "there was an error"})
  }

  next(error)
}

app.use(errorHandler)

// const PORT = process.env.PORT || 3001
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
