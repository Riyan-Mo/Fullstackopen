import axios from 'axios'

const userUrl = 'http://localhost:3003/api/users'

const getAllUsers = async() => {
  const response = await axios.get(userUrl)
  return response.data
}

export default { getAllUsers }