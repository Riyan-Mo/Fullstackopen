import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers:{
    setNotification(state="", action){
      console.log("State", state);
      console.log("Action", action);
      return action.payload;
    },
    removeNotification(state="", action){
      console.log("State", state);
      console.log("Action", action);
      return "";
    }
  }
})

export const {setNotification, removeNotification} = notificationSlice.actions;
export default notificationSlice.reducer;