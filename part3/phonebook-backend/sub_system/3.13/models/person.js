// 3.13
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result => {
  console.log('connected to MongoDB')
})
.catch((error) => {
  console.log('error connecting to MongoDB:', error.message)
})

const personSchema = new mongoose.Schema({
  name: String,
  number: String    // is this ok ?
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


// const Person = mongoose.model('Person', personSchema)

// const person = new Person({
//   name: aname,
//   number: anumber,
// })

// person.save().then(result => {
//   console.log('added '+result.name+" number "+result.number+" to phonebook")
//   mongoose.connection.close()
// })

// if (process.argv.length === 3) {
//   console.log("phonebook:")
//   // if there is no entry (start case); then what 
  // Person.find({}).then(result => {
  //   result.forEach(p => {
  //     console.log(p.name, p.number)
  //   })
  //   mongoose.connection.close()
  // })
// }

module.exports = mongoose.model('Person', personSchema)