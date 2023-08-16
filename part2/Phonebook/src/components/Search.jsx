const Search = ({searchPeople, setSearchPeople}) =>{
  return(
    <>
    <h2>Phonebook</h2>
    <div>
      filter shown with <input onChange={(event)=>setSearchPeople(event.target.value)} value={searchPeople}/>
    </div>
    </>
  )
}

export default Search;