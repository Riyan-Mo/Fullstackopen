import {CoursePart} from "../types"

const Part = ({part}:{part:CoursePart}):JSX.Element => {
    switch(part.kind){
        case "basic":
            return <p><em>{part.description}</em></p>
        case "group":
          return <p>project exercises: {part.groupProjectCount}</p>
        case "background":
          return (<>
          <p><em>{part.description}</em></p>
          <p>{part.backgroundMaterial}</p>
          </>)
        case "special":
          return (<>
            <p><em>{part.description}</em></p>
            <p>required skills: {part.requirements.toString()}</p>
            </>)
        default:
          throw new Error("Unhandled discriminated union member");
  }
}

  export default Part;