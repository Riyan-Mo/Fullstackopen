import { useSelector, useDispatch } from 'react-redux'
import { incrementVote}  from '../reducers/anecdoteReducer';

const AnecdoteList = () => {

  let anecdotes = useSelector(state => state)
  const dispatch = useDispatch();

  anecdotes.sort((a,b)=>b.votes-a.votes);

    const vote = (id) => {
      dispatch(incrementVote(id));
    }
    return(
      <div>
      {anecdotes.map(anecdote =>
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