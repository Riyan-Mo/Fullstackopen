import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../services/services"
import { useContext } from "react";
import NotificationContext from "./NotificationContext";

const AnecdoteForm = () => {
  const [notification, dispatch] = useContext(NotificationContext);

  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation({
    mutationFn:createAnecdote,
    onSuccess: ()=>{
      queryClient.invalidateQueries({queryKey: ['anecdotes']});
    },
    onError: (error) =>{
      dispatch({type:'ERROR', payload: error.response.data.error})
      setTimeout(()=>{
        dispatch({type: "CLEAR"});
      },5000);
    }
  });

  const createId = () => Math.round(Math.random() * 100000);

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const anecdote = {content, id:createId(), votes: 0}
    newAnecdoteMutation.mutate(anecdote)
    dispatch({type:"CREATE", payload:anecdote})
    setTimeout(()=>{
      dispatch({type: "CLEAR"});
    },5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
