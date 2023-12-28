import React, { useState, useEffect, useRef } from "react";
import { getAllDiaries, addDiaryEntry} from "./services/diaryService";
import { NewDiaryEntry, NonSensitiveDiaryEntry } from "./types";

const App = ():JSX.Element =>{
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [notification, setNotification] = useState<string>("");

  useEffect(()=>{
    getAllDiaries().then(data => setDiaries(data));
  }, []);

  const Content = ():JSX.Element => {
    return(
      <div>
        <h2>Diary Entries</h2>
        {diaries.map(entry => 
          <div key={entry.id}>
            <h4>{entry.date}</h4>
            <p>visibility: {entry.visibility}</p>
            <p>weather: {entry.weather}</p>
          </div>
        )}
      </div>
    )
  }

  const DiaryForm = ():JSX.Element => {
    const date = useRef<string>("");
    const visibility = useRef<string>("");
    const weather = useRef<string>("");
    const comment = useRef<string>("");

    const handleSubmit = (event:React.SyntheticEvent) => {
      event.preventDefault();
      if(!date.current || !visibility.current || !weather.current || !comment.current){
        throw new Error("Malformatted data");
      }
      const newEntry:NewDiaryEntry={
          date:date.current,
          visibility: visibility.current,
          weather: weather.current,
          comment: comment.current
      }
      try{
        addDiaryEntry(newEntry).then(response=>{
          const nonSensitiveEntry:NonSensitiveDiaryEntry = {
            id:response.id,
            date:response.date,
            visibility:response.visibility,
            weather:response.weather
          }
          setDiaries(prev=>[...prev, nonSensitiveEntry])
        setNotification("Added new Diary Entry");
        })
      }
      catch(error:unknown){
        if(error instanceof Error){
          setNotification(`Couldn't add Diary Entry: ${error.message}`);
        }
      }
      finally{
        setTimeout(()=>{
          setNotification("");
        }, 5000);
      }
    }

    const handleDate = (event: React.SyntheticEvent) => {
      if('valueAsDate' in event.target && event.target.valueAsDate instanceof Date){
        const formDate = event.target.valueAsDate;
        const day = formDate.getDate().toString();
        const month = formDate.getMonth().toString();
        const year = formDate.getFullYear().toString();
        date.current = `${year}-${month}-${day}`;  
      }
    }

    const isString = (text:unknown): text is string =>{
      return typeof text === 'string' || text instanceof String;
    }

    const handleVisibility = (event: React.SyntheticEvent) => {
      if('value' in event.target && isString(event.target.value)){
          visibility.current = event.target.value;
      }
    }

    const handleWeather = (event: React.SyntheticEvent) => {
      if('value' in event.target && isString(event.target.value)){
          weather.current = event.target.value;
      }
    }

    const handleComment = (event: React.SyntheticEvent) => {
      if('value' in event.target && isString(event.target.value)){
          comment.current = event.target.value;
      }
    }

    const visibilityArr = ['great', 'good', 'ok', 'poor'];
    const weatherArr = ['sunny', 'rainy', 'cloudy', 'stormy', 'windy'];
    return(
      <form action="post" onSubmit={handleSubmit}>

        <div>
        <label htmlFor="date">date</label>
        <input type="date" name="date" id="date" onChange={handleDate}/>
        </div>
        
        <div>
        <span>visibility: </span>
        {visibilityArr.map(e=>{
          return(
            <label htmlFor="visibility" key={e}>
            <input type="radio" name="visibility" id={e} value={e} onInput={handleVisibility}/>
            {e}</label>
          )
        })}
        </div>

        <div>
        <span>weather: </span>
        {weatherArr.map(e=>{
          return(
            <label htmlFor="weather" key={e}>
            <input type="radio" name="weather" id={e} value={e} onInput={handleWeather}/>
            {e}</label>
          )
        })}
        </div>

        <div>
          <label htmlFor="comment">comment: </label>
          <input type="text" id="comment" name="comment" onChange={handleComment}/>
        </div>

        <button>add</button>
      </form>
    )
  }

  return(
    <div>
      <h1>Add new entry</h1>
      {notification.length>0 && <h2 style={{color:'green'}}>{notification}</h2>}
      <DiaryForm/>
      <Content/>
    </div>
  )
}

export default App;