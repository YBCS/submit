// [X] 3.15, 3.16
// Change the backend so that deleting phonebook entries is reflected in the database.
// Verify that the frontend still works after making the changes.

const express = require('express')
const nodemon = require('nodemon')

// var morgan = require('morgan')

require('dotenv').config()
const Person = require('./models/person')

const cors = require ('cors')
const { response } = require('express')

const app = express()
// to show static content
app.use(express.static('build'))

app.use(cors())
app.use(express.json())

var morgan = require('morgan')
morgan.token('body', function (req, res) { return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'
))


app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()))    
  })
})

// app.get('/info', (req, res) => {
//   const len = persons.length
//   const day = new Date()
//   const data = '<div>Phonebook has info for '+ len +' people</div> <br>' +'\n' + day + ''
//   res.send(data)
// })

// app.get('/api/persons/:id', (req, res) => {
//   const id = Number(req.params.id)
//   const person = persons.find(p => p.id === id)
//   if (person) {
//     res.json(person)
//   } else {
//     res.status(404).end()
//   }
// })

// not really a part of exercise
app.get('/api/persons/:id', (req, res, next) => {
  // const id = Number(req.params.id)
  Person.findById(req.params.id)
    .then(person => {
      if(person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
    // .catch(error => {
    //   console.log(error)
    //   res.status(400).send({error: 'malformatted id '})
    // })
})

app.delete('/api/persons/:id', (req, res, next) => {
  // const id = Number(req.params.id)
  // persons = persons.filter(person => person.id !== id)
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})


app.post('/api/persons', (request, response) => {
  const body = request.body

  // means if they missing
  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  // console.log("body here", body)

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
  // where is the connection being closed
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)

// const PORT = process.env.PORT || 3001
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})