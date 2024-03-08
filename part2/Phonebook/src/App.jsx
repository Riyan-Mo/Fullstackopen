import { useState, useEffect } from 'react'
import axios from "axios";
import Form from "./components/Form"
import Numbers from './components/Numbers'
import Search from './components/Search'
import Backend from './services/Backend';
import Notification from './components/Notification';
import './style.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [searchPeople, setSearchPeople] = useState('');
  const [notification, setNotification] = useState('');
  const [notificationClass, setNotificationClass] = useState('');

  const getContacts = () =>{
    axios
    .get('/api/persons')
    .then(response=>setPersons(response.data));
  }

  useEffect(getContacts, [])

  const notificationUpdate = (message, style) =>{
    setNotification(message);
    setNotificationClass(style);
    setTimeout(()=>{
      setNotification('');
      setNotificationClass('');
    }, 5000)
  }

  const addNewName = event =>{
    setNewName(event.target.value);
  }

  const addNewPerson = event =>{
    event.preventDefault();
    const filteredPeople = persons.filter(element=>element.name===newName);
    if(filteredPeople.length!==0){
      const [existingContact] = filteredPeople;
      const updateContact = () =>{
        Backend.updateContact(existingContact, newNumber)
        .then((data)=>{
          setPersons(persons.map(person=>person.id===data.id?{...person, number:data["number"]}:person));
          notificationUpdate(`Updated ${data.name}`);
        })  
      }
      const shouldUpdate = window.confirm(`${existingContact.name} is already added to phonebook, replace the old number with a new one?`);
      shouldUpdate?updateContact():null
      return;
    }
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    Backend.addContact(newPerson)
    .then(data=>{ 
      setPersons(prevPersons=>([...prevPersons,data]));
      notificationUpdate(`Added ${data.name} to phonebook`);
    })
    .catch(error=>{
      notificationUpdate(error.response.data.error, 'error')
    })
  }

  const addNewNumber = event =>{
    setNumber(event.target.value);
  }

  const deletePeople = (people) =>{
    const shouldDelete = window.confirm(`Delete ${people.name} ?`)
    const deleteFunction = () =>{
    Backend.deleteContact(people.id)
    .then(()=>{
      setPersons(prevPersons=>prevPersons.filter(person=>person.id!==people.id))
      const message = `Information of ${people.name} has been deleted`;
      notificationUpdate(message, 'error');
    })
    .catch((error)=>{
      const message = `Information of ${people.name} has already been removed from the server`
      notificationUpdate(message, 'error');
    })
    }
    shouldDelete?deleteFunction():"";
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
      <h1>Phonebook</h1>
      <Notification message={notification} style={notificationClass}/>
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