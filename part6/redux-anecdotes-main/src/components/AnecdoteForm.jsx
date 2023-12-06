import { useDispatch } from 'react-redux'
import { addNewAnecdote }  from '../reducers/anecdoteReducer';

const AnecdoteForm = () =>{
  const dispatch = useDispatch();

  const handleSubmit = (e)=>{
    e.preventDefault();
    const content = e.target.anecdote.value;
    dispatch(addNewAnecdote(content));
  }

  return(
    <div>      
      <h2>create new</h2>
      <form action='post' onSubmit={handleSubmit}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
      </div>

  )
}

export default AnecdoteForm;