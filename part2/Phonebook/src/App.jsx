import { useState, useEffect } from 'react'
import axios from "axios";
import Form from "./components/Form"
import Numbers from './components/Numbers'
import Search from './components/Search'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [searchPeople, setSearchPeople] = useState('');

  const getContacts = () =>{
    axios
    .get('http://localhost:3001/persons')
    .then(response=>setPersons(response.data));
  }

  useEffect(getContacts, [])

  const addNewName = event =>{
    setNewName(event.target.value);
  }

  const addNewPerson = event =>{
    event.preventDefault();
    const isPresent = persons.filter(element=>element.name===newName).length===0;
    if(!isPresent){
      alert(`${newName} already added to phonebook`);
      return;
    }
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    setPersons(prev=>prev.concat(newPerson));
  }

  const addNewNumber = event =>{
    setNumber(event.target.value);
  }

  const filteredPeople = () =>{
    return persons.filter(person=> person.name.toLowerCase().includes(searchPeople.toLowerCase()));
  }

  const showNumbers = () => {
    const isFinding = searchPeople.length!==0;
    const personsToShow = isFinding?filteredPeople():persons;
    return personsToShow.map(person=>{
      return <p
       key={person.name}
      >
      {person.name} {person.number}
      </p>
    })
  }

  return (
    <div>
      <Search searchPeople={searchPeople} setSearchPeople={setSearchPeople}/>
      <h2>Add a new</h2>
      <Form 
        addNewName={addNewName}
        addNewPerson={addNewPerson}
        addNewNumber={addNewNumber}
        newName={newName}
        newNumber={newNumber}
      />
      <Numbers showNumbers={showNumbers}/>
    </div>
  )
}

export default App