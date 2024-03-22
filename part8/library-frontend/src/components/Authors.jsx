import { EDIT_AUTHOR, GET_AUTHORS } from "../queries"
import { useQuery, useMutation } from "@apollo/client"
import { useState } from "react"

const Authors = (props) => {
  const result = useQuery(GET_AUTHORS)
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: GET_AUTHORS }]
  })

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>Loading...</div>
  }

  const authors = result.data.allAuthors;

  const handleSubmit = (e) => {
    e.preventDefault()
    editAuthor({ variables: { name, setBornTo: Number(born) } });
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">name</label>
          <select name="name" id="name" onChange={(e)=>setName(e.target.value)}>
            <option value="" hidden></option>
            {authors.map(author => {
              return (
                <option
                  value={author.name}
                  key={author.id}
                >{author.name}</option>
              )
            })}
          </select>
        </div>
        <div>
          <label htmlFor="born">born</label>
          <input type="text" id="born" name="born" required value={born} onChange={(e) => setBorn(e.target.value)} />
        </div>
        <button>update author</button>
      </form>
    </div>
  )
}

export default Authors
