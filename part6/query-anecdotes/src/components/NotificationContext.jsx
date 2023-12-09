/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  console.log(action);
  switch(action.type){
    case "VOTE":
      return `You voted for '${action.payload.content}'`;
    case "CREATE":
      return `You created a new anecdote '${action.payload.content}'`;
    case "ERROR":
      return `${action.payload}`;
    case "CLEAR":
      return "";
    default: 
      return state;
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, "");
  return(
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
};

export default NotificationContext;