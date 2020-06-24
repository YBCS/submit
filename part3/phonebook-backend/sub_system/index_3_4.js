// 3.1 
// set up and display persons 

// console.log("tombi is comfy")
const express = require('express')
const nodemon = require('nodemon')
const app = express()

app.use(express.json())

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

// 3.2
app.get('/info', (req, res) => {
  const len = persons.length
  const day = new Date()
  // console.log(day)
  const data = '<div>Phonebook has info for '+ len +' people</div> <br>' +'\n' + day + ''
  res.send(data)
})

// 3.3
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

// 3.4 ---> implement delete 
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})



const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})