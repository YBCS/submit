// 3.19
const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

mongoose.set("useFindAndModify", false)
// eslint-disable-next-line no-undef
const url = process.env.MONGODB_URI
console.log("connecting to", url)

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => {
    console.log("connected to MongoDB")
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message)
  })

// add error handler in front end
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    unique: true,
    required: true,
  },
  number: {
    // this need not be unique but how do I do it ????
    type: String,
    minlength: 8,
    unique: true,
    required: true,
  }, // is this ok ?
})

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

// personSchema.plugin(uniqueValidator, { message: 'Error, expected {VALUE} to be unique.' })
personSchema.plugin(uniqueValidator)

module.exports = mongoose.model("Person", personSchema)
