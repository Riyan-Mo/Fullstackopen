import axios from 'axios'
import { asObject } from '../reducers/anecdoteReducer'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async()=>{
  const response = await axios.get(baseUrl)
  return response.data;
}

const createNewAnecdote = async(content)=>{
  const anecdote = asObject(content)
  const response = await axios.post(baseUrl, anecdote)
  return response.data;
}

const increaseVote = async(id) => {
  const anecdotes = await getAll();
  const [anecdote] = anecdotes.filter(ad => ad.id === id)
  const response = await axios.put(`${baseUrl}/${id}`, {...anecdote, ['votes']:(anecdote.votes)+1})
  return response.data;
}

export default {getAll, createNewAnecdote, increaseVote}