import { useState } from 'react'

const StatisticLine = ({text, value}) => {
  return(
    <tr>
    <td>{text}</td>
    <td>{value}</td>
    </tr>
  )
} 

const Statistics = ({good, neutral, bad, getTotal, getAverage, getPositive}) =>{
  return (
      <div>
      <h2>statistics</h2>
      {getTotal()>0?<table>
      <StatisticLine text="good" value={good}/>
      <StatisticLine text="neutral" value={neutral}/>
      <StatisticLine text="bad" value={bad}/>
      <StatisticLine text="all" value={getTotal()}/>
      <StatisticLine text="average" value={getAverage()}/>
      <StatisticLine text="positive" value={getPositive()}/>
      </table>:
      <p>No feedback given</p>
      }
      </div>
    )
}

const FeedBackButton = ({handleChange, text}) =>{
  return <button onClick={handleChange}>{text}</button>
}     

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const getTotal = () => good+bad+neutral;

  const getAverage = () => {
    return ((good + (bad * -1))/getTotal())||0;
  };

  const getPositive = () =>{
    return ((good/getTotal() * 100)||0)+"%";
  }

  return (
    <div>
      <h1>give feedback</h1>
      <FeedBackButton 
      handleChange={()=>setGood(prevValue=>prevValue+1)} 
      text="good"/>
      <FeedBackButton 
      handleChange={()=>setNeutral(prevValue=>prevValue+1)}
      text="neutral"
      />
      <FeedBackButton
      handleChange={()=>setBad(prevValue=>prevValue+1)}
      text='bad'
      />
      <Statistics 
        good={good}
        bad={bad}
        neutral={neutral}
        getAverage={getAverage}
        getPositive={getPositive}
        getTotal={getTotal}
      />
    </div>
  )
}

export default App