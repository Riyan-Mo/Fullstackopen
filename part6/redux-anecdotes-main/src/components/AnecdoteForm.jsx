import { useDispatch } from 'react-redux'
import { createAnecdote }  from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () =>{
  const dispatch = useDispatch();

  const handleSubmit = (e)=>{
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = "";
    dispatch(createAnecdote(content))
    dispatch(setNotification(`Blog '${content}' was added`, 10));
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