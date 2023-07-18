import axios from "axios"
// eslint-disable-next-line no-undef
const baseUrl = process.env.REACT_APP_BACKEND_URL + "/users"

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getUser = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

export default {
  getAll,
  getUser,
}
