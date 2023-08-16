const Sum = ({parts}) =>{

  const getNumberOfExercises = () =>{
   return parts.reduce((sum, number)=>{
      return sum+number.exercises
    }, 0)
  }

  return(
    <>
    <h4>total of {getNumberOfExercises()} exercises</h4>
    </>
  )
}

export default Sum;