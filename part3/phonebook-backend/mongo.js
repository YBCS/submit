// [] 3.12 implement moongoose into this shit 
// modify this file to make it work
// `node mongo.js <password> <name> <number>`

const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

// if not checked : new person is created anyway ?
if (process.argv.length !==3 &&  process.argv.length < 5) {
  console.log('Please provide the password, name, number as argument: node mongo.js <password> <name> <number>')
  process.exit(1)
}

const password = process.argv[2]
const aname = process.argv[3]     // a means argument
const anumber = process.argv[4]

const url =
  `mongodb+srv://fullstack:${password}@cluster0-wsqxa.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String    // is this ok ?
})

const Person = mongoose.model('Person', personSchema)

// this is a model
const person = new Person({
  name: aname,
  number: anumber,
})

person.save().then(result => {
  console.log('added '+result.name+" number "+result.number+" to phonebook")
  mongoose.connection.close()
})

if (process.argv.length === 3) {
  console.log("phonebook:")
  // if there is no entry (start case); then what
  Person.find({}).then(result => {
    result.forEach(p => {
      console.log(p.name, p.number)
    })
    mongoose.connection.close()
  })
}