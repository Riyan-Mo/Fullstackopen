import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = {
  token: '',
  username: '',
  name: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action){
      return action.payload
    }
  }
})
export const { setUser } = userSlice.actions

export const getUser = (userDetails) => {
  return async dispatch => {
    const response = await blogService.loginUser(userDetails)
    dispatch(setUser(response))
  }
}

export default userSlice.reducer