const Notification = ({message, style}) =>{
  if(message.length===0){
    return null
  }
  return(
    <div className={`notification ${style}`}>
      {message}
    </div>
  )
}
export default Notification