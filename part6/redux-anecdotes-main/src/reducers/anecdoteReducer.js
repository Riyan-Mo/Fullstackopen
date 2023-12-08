/* eslint-disable no-undef */
import { createSlice } from "@reduxjs/toolkit"
import anecdotesService from "../services/anecdotesService"

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name:'anecdotes',
  initialState: [],
  reducers:{
    appendAnecdote(state, action){
      state.push(action.payload);
    },
    setAnecdotes(state=initialState, action){
      console.log("State", state);
      console.log("Action", action);
      return action.payload;
    }
  }
})
export const {appendAnecdote, setAnecdotes} = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async dispatch =>{
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes));
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNewAnecdote(content);
    dispatch(appendAnecdote(newAnecdote));
  }
}

export const incrementVote = id => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.increaseVote(id);
    const newState = await anecdotesService.getAll();
    newState.map(anecdote=>anecdote.id===id?newAnecdote:anecdote);
    dispatch(setAnecdotes(newState));
  }
}

export default anecdoteSlice.reducer;
export {asObject}