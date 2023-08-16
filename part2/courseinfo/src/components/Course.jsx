import Content from "./Content";
import Header from "./Header";
import Sum from "./Sum";

const Course = ({courses})=>{
  return(
    <>
    {courses.map(course=>
      <div key={course.id}>
        <Header course={course.name}/>
        <Content parts={course.parts}/>
        <Sum parts={course.parts}/>
      </div>
    )}
    </>
  )
}

export default Course;