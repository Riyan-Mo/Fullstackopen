import { useState } from "react";
import Content from "./Content";

const Country = ({country}) =>{    
  const [show, setShow] = useState(false);    
  return(
        <div key={country.name.common}>
          <p>{country.name.common} <button type="button" onClick={()=>setShow(prev=>!prev)}>show</button>
         </p>
          {show && <Content country={country}/>}
        </div>
      )
}

export default Country;