// backend
// npm run dev

// install cors to make it work
// 3.9
// mistake was in package.json
// test compatibility with front end 

const express = require('express')
const nodemon = require('nodemon')
var morgan = require('morgan')
const cors = require ('cors')

const app = express()

app.use(cors())
app.use(express.json())

// create new token; stringify
// improve -- conditional return null
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
  res.send('<h1>Hello hopeful World!</h1>')
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

// problem here too
// random function
const generateId = () => {
  const min = persons.length + 1
  // const max = 10000
  const max = min + 100

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
  
  // problem most likely here 
  // res.json(persons)
  res.json(person)
})


// 3.10
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})