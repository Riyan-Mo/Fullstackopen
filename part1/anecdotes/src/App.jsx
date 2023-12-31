import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const getRandomNumber = () => {
    return Math.floor(Math.random() * anecdotes.length);
  }

  const createArray = () =>{
    const arr = [];
    for (let i = 0; i < anecdotes.length; i++) {
        arr[i] = 0;
    }
    return arr;
  }

  const [selected, setSelected] = useState(getRandomNumber())
  const [votes, setVotes] = useState(createArray());

  const incrementVote = () => {
    setVotes(prevVotes=>{
      return prevVotes.map((element, index)=>{
        if(index===selected){
          element++;
        }
        return element;
      })
    })
  }

  const findMaxVotes = () =>{
    let max = 0;
    for(let i = 0; i<votes.length; i++){
      if(votes[i]>max){
        max = i;
      }
    }
    return max;
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={incrementVote}>vote</button>
      <button onClick={()=>setSelected(getRandomNumber())}>next anecdote</button>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[findMaxVotes()]}</p>
      <p>has {votes[findMaxVotes()]} votes</p>
    </div>
  )
}

export default App