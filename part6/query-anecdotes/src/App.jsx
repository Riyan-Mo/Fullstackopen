import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote } from './services/services'
import NotificationContext from './components/NotificationContext'
import { useContext } from 'react'

const App = () => {
  const [notification, dispatch] = useContext(NotificationContext);
  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation({
    mutationFn:updateAnecdote,
    onSuccess: ()=>{
      queryClient.invalidateQueries({queryKey: ['anecdotes']})
    }
  })

  const handleVote = (anecdote) => {
    newAnecdoteMutation.mutate(anecdote);
    dispatch({type:'VOTE', payload:anecdote});
    setTimeout(()=>{
      dispatch({type: "CLEAR"});
    },5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false,
    refetchOnWindowFocus: false,
  })
  console.log(JSON.parse(JSON.stringify(result)));

  if(result.isError){
    return <div>anecdote service not available due to problem in server</div>
  }

  let anecdotes = [
    {
      "content": "If it hurts, do it more often",
      "id": "47145",
      "votes": 0
    },
  ]

  if(result.isFetched){
    anecdotes = JSON.parse(JSON.stringify(result.data));
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
