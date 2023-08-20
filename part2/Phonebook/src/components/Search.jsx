const Search = ({searchPeople, setSearchPeople}) =>{
  return(
    <>
    <div>
      filter shown with <input onChange={(event)=>setSearchPeople(event.target.value)} value={searchPeople}/>
    </div>
    </>
  )
}

export default Search;