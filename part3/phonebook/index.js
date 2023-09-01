const Phonebook = require('./models/entry')
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
app.use(express.static('dist'));

app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}))

app.get('/api/persons/:id', (request, response)=>{
  Phonebook.findById(request.params.id).then(result=>{
    response.json(result);
  })
})

app.get('/api/persons/', (request, response)=>{
  Phonebook.find({}).then(result=>{
    response.json(result);
  })
})

app.get('/info', (request, response)=>{
  const date = new Date();
  response.send(`
  <p>Phonebook has info for ${phonebook.length} people</p>
  <p>${date}</p>
  `)
})

const generateId = () =>{
  const id = phonebook.length>0?(Math.floor(Math.random()*1200)):0;
  return id;
}

app.post('/api/persons/', (request, response)=>{
  const body = request.body;
  if(!body){
    return response.status(404).json({
      error:'content missing'
    })
  }
  else if(!body.name||!body.number){
    return response.status(404).json({
      error: 'name or number missing'
    })
  }
  // else if(alreadyExists){
  //   return response.status(404).json({
  //     error: 'name already exists in records',
  //   })
  // }
  const newPerson = new Phonebook({
    name:body.name,
    number:body.number
  })
  newPerson.save().then(result=>{
    console.log(newPerson)
    mongoose.connection.close();
    response.json(newPerson);
  })
  .catch(error=>{
    const errorPath = error.errors;
    let errorMessage="";
    if(errorPath.number){
      errorMessage = errorPath.number.properties.message;
    }
    else if(errorPath.name){
      errorMessage = errorPath.name.properties.message;
    }
    return response.status(400).json({error: `${errorMessage}`})
  })
})

app.put('/api/persons/:id', (request, response, next)=>{
  const body = request.body

  const entry = new Phonebook({
    name: body.name,
    number: body.number,
    id: request.params.id
  })

  Phonebook.findByIdAndUpdate(request.params.id, entry, {new: true})
  .then(updatedEntry=>{
    response.json(updatedEntry)
  })
  .catch(error=>next(error))
})

app.delete('/api/persons/:id', (request, response, next)=>{
  Phonebook.findByIdAndDelete(request.params.id)
  .then(result=>{
    response.status(204).end()
  })
  .catch(error=>next(error))
})

const errorHandler = (error, request, response, next)=>{
  console.log(error.message);
  if(error.name==='CastError'){
    return response.status(400).send({error: 'malformatted id'})
  }
  next(error)
}

app.use(errorHandler)

app.get('/api/persons/:id', (request, response)=>{
  const id = Number(request.params.id);
  const person = phonebook.find(num=>num.id===id);
  if(person){
    response.json(person);
  }
  else{
    response.status(404).end();
  }
})

const PORT = 3001
app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`);
});
