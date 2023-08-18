import axios from "axios"
const receiveContacts = () =>{
  const request = axios.get('http://localhost:3001/persons')
  return request.then(response=>response.data);
}

const addContact = (newPerson) =>{
  const request = axios.post('http://localhost:3001/persons', newPerson)
  return request.then(response=>response.data);  
}

const deleteContact = (id) =>{
  const request = axios.delete(`http://localhost:3001/persons/${id}`);
  return request.then(response=>response.data)
}

const updateContact = (contact, updatedNumber) =>{
  const request = axios.put(`http://localhost:3001/persons/${contact.id}`, {...contact, number:updatedNumber})
  return request.then(response=>response.data); 
}

export default {receiveContacts, addContact, deleteContact, updateContact}