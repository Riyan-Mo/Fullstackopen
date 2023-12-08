/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector, useDispatch } from 'react-redux'
import { incrementVote, initializeAnecdotes}  from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';
import { useEffect } from 'react';

const AnecdoteList = () => {
  let anecdotes = useSelector(state => state.anecdotes)
  const filterWord = useSelector(state=>state.filter);
  const dispatch = useDispatch();

  let filteredAnecdotes = anecdotes.filter(anecdote=>anecdote.content.includes(filterWord));
  filteredAnecdotes = filteredAnecdotes.sort((a,b)=>b.votes-a.votes);

  const vote = (id) => {
    dispatch(incrementVote(id));
    const votedAnecdote = filteredAnecdotes.find(anecdote=>anecdote.id === id);
    dispatch(setNotification(`You voted '${votedAnecdote.content}'`, 5))
  }

  useEffect(()=>{
    dispatch(initializeAnecdotes())
  }, [])

    return(
      <div>
      {filteredAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      </div>
    )
  }


export default AnecdoteList;