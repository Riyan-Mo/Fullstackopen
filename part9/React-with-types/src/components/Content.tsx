import Part from "./Part";
import { CoursePart } from "../types";

const Content = ({courseParts}: {courseParts: CoursePart[]}):JSX.Element =>{
    return(
        <div>
        {courseParts.map(c=>{
            return(
                <div key={c.name}>
                <h3>{c.name} {c.exerciseCount}</h3>
                <Part part={c}/>
                </div>
            )
        })}
        </div>
    )
}

export default Content;