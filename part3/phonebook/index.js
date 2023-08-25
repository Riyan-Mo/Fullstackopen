const express = require('express');
const morgan = require('morgan');
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

let phonebook = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/api/persons', (request, response)=>{
  response.json(phonebook);
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
  const alreadyExists = phonebook.filter(entry=>entry.name===body.name).length!==0
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
  else if(alreadyExists){
    return response.status(404).json({
      error: 'name already exists in records',
    })
  }
  const newPerson = {
    content: body.content,
    important: body.important||false,
    id:generateId()
  }
  phonebook.concat(newPerson);
  response.json(newPerson);
})

app.delete('/api/persons/:id', (request, response)=>{
  const id = Number(request.params.id);
  phonebook = phonebook.filter(person=>person.id!==id);
  console.log(phonebook);
  response.status(204).end();
})

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
