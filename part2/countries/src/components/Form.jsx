const Form = ({country, setCountry}) =>{
  return(
    <form onSubmit={(e)=>e.preventDefault()}>
      find countries <input value={country} onChange={(e)=>setCountry(e.target.value)}/>
    </form>
  )
}
export default Form