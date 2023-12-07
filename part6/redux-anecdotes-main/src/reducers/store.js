import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './anecdoteReducer';
import anecdoteFilterReducer from './anecdoteFilterReducer';
import notificationReducer from "./notificationReducer"

const store = configureStore({
  reducer:{
    anecdotes: anecdoteReducer,
    filter: anecdoteFilterReducer,
    notification: notificationReducer,
  }
})

export default store;