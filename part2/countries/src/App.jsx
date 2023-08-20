import {useState, useEffect} from "react"
import Form from "./components/Form";
import Result from "./components/Result";
import axios from "axios"

const App = () => {
  const [country, setCountry] = useState("");
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const filterCountires = (element) =>{
    const countryName = element.name;
    const commonName = countryName.common;
    const officialName = countryName.official;
    return commonName.includes(country)||officialName.includes(country);
  }

  useEffect(()=>{
    if(data){
    setFilterData(data.filter(element=>{
      return filterCountires(element)
    }))
    }
  }, [country])

  useEffect(()=>{
    axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    .then(response=>{
      setData(response.data);
      console.log("Fetched data...")
    });
  },[])

  return (
    <div>
    <Form country={country} setCountry={setCountry}/>
    <Result filterData={filterData}/>
    </div>
  )
}

export default App