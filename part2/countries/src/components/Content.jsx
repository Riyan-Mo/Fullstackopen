import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Languages = ({langObj}) =>{    
  const showLanguages = () =>{
    const languages = [];
    for(let key in langObj){
      languages.push(langObj[key]);
    }
    return languages;
  }
  showLanguages();

  return(
    <div>
      <h4>languages:</h4>
      <ul>
      {showLanguages().map(lang=><li key={lang}>{lang}</li>)}
      </ul>
    </div>
  )
}

const Content = ({country}) =>{
  const[weather, setWeather] = useState({});
  
  const configureWeatherData = (data) =>{
    const weatherObj = {
      temperature: data.current.temp_c,
      imgLink: data.current.condition.icon,
      wind: data.current.wind_kph,
    }
    setWeather(weatherObj);
  }

  useEffect(()=>{
    const api_key = import.meta.env.VITE_SOME_KEY
    const longitude = country.latlng[1];
    const latitude = country.latlng[0];
    axios
    .get(`http://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${latitude+","+longitude}`)
    .then(response=>configureWeatherData(response.data));
  },[])
  
  return(
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital {country.capital[0]}</p>
      <p>area: {country.area}</p>
      <Languages langObj={country.languages} />
      <h2>{country.flag}</h2>
      <h2>Weather in {country.name.common}</h2>
      <p>Temperature {weather.temperature} Celcius</p>
      <img src={weather.imgLink}/>
      <p>wind {weather.wind} km/h</p>
    </div>
  )
}

export default Content;