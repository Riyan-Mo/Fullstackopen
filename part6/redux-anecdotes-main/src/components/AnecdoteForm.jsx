import { useDispatch } from 'react-redux'
import { addNewAnecdote }  from '../reducers/anecdoteReducer';
import { removeNotification, setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () =>{
  const dispatch = useDispatch();

  const handleSubmit = (e)=>{
    e.preventDefault();
    const content = e.target.anecdote.value;
    dispatch(addNewAnecdote(content));
    dispatch(setNotification(`Blog '${content}' was added`));
    setTimeout(()=>{
        dispatch(removeNotification(""));
    }, 5000)
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