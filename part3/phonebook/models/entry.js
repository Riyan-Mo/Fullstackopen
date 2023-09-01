require("dotenv").config()
const mongoose = require("mongoose")

const url = process.env.MONGODB_URI

mongoose.set("strictQuery",false)
mongoose.connect(url)
  .then(result=>{
    console.log("connected to MongoDB")
  })
  .catch(error=>{
    console.log("Couldn't connect to database", error)
  })

const phonebookSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: function(v){
        return /\d{2,3}-\d{5,6}/.test(v)
      },
      message: props=>`${props.value} is not a valid phone number!`
    },
    required: true
  }
})

phonebookSchema.set("toJSON",{
  transform:(document, returnedObject)=>{
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model("Phonebook", phonebookSchema)