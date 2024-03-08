const Form = ({newName, newNumber, addNewName, addNewNumber, addNewPerson}) =>{
  return (
    <form onSubmit={addNewPerson}>
        <div>
          name: <input onChange={addNewName} value={newName}/>
        </div>
        <div>
          number: <input onChange={addNewNumber} value={newNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}
export default Form;