import { useState, useEffect } from 'react'
import axios from "axios";
import Form from "./components/Form"
import Numbers from './components/Numbers'
import Search from './components/Search'
import Backend from './services/Backend';

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
    const filteredPeople = persons.filter(element=>element.name===newName);
    if(filteredPeople.length!==0){
      const [existingContact] = filteredPeople;
      const shouldUpdate = window.confirm(`Update ${existingContact.name} is already added to phonebook, replace the old number with a new one?`);
      shouldUpdate?Backend.updateContact(existingContact, newNumber)
      .then((data)=>setPersons(persons.map(person=>person.id===data.id?{...person, number:data["number"]}:person))):
      null
      return;
    }
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    Backend.addContact(newPerson)
    .then(data=>{ 
      setPersons(prevPersons=>([...prevPersons,data]))
    })
  }

  const addNewNumber = event =>{
    setNumber(event.target.value);
  }

  const deletePeople = (people) =>{
    const shouldDelete = window.confirm(`Delete ${people.name} ?`)
    shouldDelete?Backend.deleteContact(people.id)
    .then(()=>setPersons(prevPersons=>prevPersons.filter(person=>person.id!==people.id)))
    :"";
  }

  const filteredPeople = () =>{
    return persons.filter(person=> person.name.toLowerCase().includes(searchPeople.toLowerCase()));
  }

  const showNumbers = () => {
    const isFinding = searchPeople.length!==0;
    const personsToShow = isFinding?filteredPeople():persons;
    return personsToShow.map(person=>{
      return <div
       key={person.name}
      >
      {person.name} {person.number}
      <button type='button' onClick={()=>deletePeople(person)}>delete</button>
      </div>
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