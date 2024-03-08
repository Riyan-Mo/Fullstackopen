import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const anecdoteFilterReducer = createSlice({
  name: "filter",
  initialState,
  reducers:{
    anecdoteFilter(state=initialState, action){
      console.log("State", state);
      console.log("Action", action);
        return action.payload; 
    }
  }
})
export const {anecdoteFilter} = anecdoteFilterReducer.actions
export default anecdoteFilterReducer.reducer;