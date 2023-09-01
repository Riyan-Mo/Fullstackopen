import axios from "axios"
const receiveContacts = () =>{
  const request = axios.get('/api/persons')
  return request.then(response=>response.data);
}

const addContact = (newPerson) =>{
  const request = axios.post('/api/persons', newPerson)
  return request.then(response=>response.data);  
}

const deleteContact = (id) =>{
  const request = axios.delete(`/api/persons/${id}`);
  return request.then(response=>response.data)
}

const updateContact = (contact, updatedNumber) =>{
  const request = axios.put(`/api/persons/${contact.id}`, {...contact, number:updatedNumber})
  return request.then(response=>response.data); 
}

export default {receiveContacts, addContact, deleteContact, updateContact}