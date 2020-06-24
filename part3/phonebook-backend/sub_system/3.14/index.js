// [X] 3.14
// implement GET api/persons using mongodb

const express = require('express')
const nodemon = require('nodemon')

var morgan = require('morgan')

require('dotenv').config()
const Person = require('./models/person')

const cors = require ('cors')

const app = express()
// to show static content
app.use(express.static('build'))

app.use(cors())
app.use(express.json())


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

// app.delete('/api/persons/:id', (req, res) => {
//   const id = Number(req.params.id)
//   persons = persons.filter(person => person.id !== id)

//   res.status(204).end()
// })


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


// const PORT = process.env.PORT || 3001
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})