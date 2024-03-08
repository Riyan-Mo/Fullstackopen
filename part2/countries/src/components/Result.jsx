import Content from "./Content";
import Country from "./Country";

const Result = ({filterData}) =>{
  const dataLength = filterData.length;
  if(dataLength>10){
    return(
      <div>
        Too many matches, specify another filter
      </div>
    )
  }

  else if(dataLength>1 && dataLength<=10){
    return(
      <div>
        {filterData.map(country=><Country country={country} key={country.name.common}/>)}
      </div>
    )
  }

  else if(dataLength===1){
    return(
      <div>
        <Content country={filterData[0]}/>
      </div>
    )
  }
}

export default Result