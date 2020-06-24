// backend
// deployed
// [X] (3.10) Create a README.md at the root of your repository, and add a link to your online application to it.
// [X] (3.11) deploy to internet 

const express = require('express')
const nodemon = require('nodemon')
var morgan = require('morgan')
const cors = require ('cors')

const app = express()
// to show static content
app.use(express.static('build'))

app.use(cors())
app.use(express.json())


morgan.token('body', function (req, res) { return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'
))

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
  const len = persons.length
  const day = new Date()
  const data = '<div>Phonebook has info for '+ len +' people</div> <br>' +'\n' + day + ''
  res.send(data)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})

// problem here 
// random function
const generateId = () => {
  const min = persons.length + 1
  const max = min + 100

  // can compare with min to avoid duplicate 
  return Math.floor(Math.random() * (max - min)) + min
}

app.post('/api/persons', (req, res) => {
  const body = req.body
  
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "name or number is missing"
    })
  }
  const name = persons.find(person => person.name === body.name)
  if(name) {
    // fix the status
    return res.status(406).json({
      error: "name must be unique"
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }
  persons = persons.concat(person)
  
  // problem here 
  // res.json(persons)
  res.json(person)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})