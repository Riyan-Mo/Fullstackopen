import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers:{
    setNotificationAction(state="", action){
      console.log("State", state);
      console.log("Action", action);
      return action.payload;
    },
    removeNotificationAction(state="", action){
      console.log("State", state);
      console.log("Action", action);
      return "";
    }
  }
})

export const { setNotificationAction, removeNotificationAction } = notificationSlice.actions;

export const setNotification = (message, time)=>{
  return dispatch =>{
    dispatch(setNotificationAction(message));
    setTimeout(()=>{
        dispatch(removeNotificationAction());
    }, time*1000);
  }
}

export default notificationSlice.reducer;