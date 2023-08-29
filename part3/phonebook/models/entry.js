require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)
mongoose.connect(url)
.then(result=>{
  console.log('connected to MongoDB')
})
.catch(error=>{
  console.log("Couldn't connect to database", error);
})

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: Number
})

phonebookSchema.set('toJSON',{
  transform:(document, returnedObject)=>{
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Phonebook', phonebookSchema)