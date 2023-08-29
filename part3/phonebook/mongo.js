const mongoose = require('mongoose')

const password = process.argv[2]
const url =  `mongodb+srv://riyan8308151899:${password}@cluster0.p7kg3hs.mongodb.net/Phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: Number
})

const phonebook = mongoose.model('Phonebook', phonebookSchema)

if(process.argv.length===5){
    const personName = process.argv[3]
    const personNumber = process.argv[4]

    const entry = new phonebook({
      name: personName,
      number: personNumber
    })
    entry.save().then(result=>{
      console.log(`added ${entry.name} number ${entry.number} to phonebook`);
      mongoose.connection.close()
    })
}
else{
    phonebook.find({}).then(result=>{
      console.log("phonebook:")
      result.forEach(entry=>{
        console.log(`${entry.name} ${entry.number}`)
      })
      mongoose.connection.close()
    })
}
