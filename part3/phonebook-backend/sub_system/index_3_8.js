// 3.7 & 3.8
// work with middleware
//  morgan

const express = require('express')
const nodemon = require('nodemon')
var morgan = require('morgan')

const app = express()
app.use(express.json())

// create new token; stringify
// imporve -- conditional return null
morgan.token('body', function (req, res) { return JSON.stringify(req.body)})
// show pre-built and our built
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
  // console.log(day)
  const data = '<div>Phonebook has info for '+ len +' people</div> <br>' +'\n' + day + ''
  res.send(data)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)
  if (person) {
    res.json(person)
  } else {
    // 404 is not found 
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})

// random function
const generateId = () => {
  const min = persons.length + 1
  // const max = 10000
  const max = min + 10

  return Math.floor(Math.random() * (max - min)) + min
}

// 3.5 && 3.6
app.post('/api/persons', (req, res) => {
  const body = req.body
  
  if (!body.name || !body.number) {
    // return error 
    return res.status(400).json({
      error: "name or number is missing"
    })
  }

  // if name already exist 
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
  
  res.json(persons)
})



const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})