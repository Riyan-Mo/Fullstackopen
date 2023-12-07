import { useDispatch } from 'react-redux'
import {anecdoteFilter} from '../reducers/anecdoteFilterReducer';

const Filter = () => {
  const dispatch = useDispatch();
  
  const handleChange = (event) => {
    const filterValue =  event.target.value;
    dispatch(anecdoteFilter(filterValue))
  }
  const style = {                   
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} name='filter'/>
    </div>
  )
}

export default Filter;