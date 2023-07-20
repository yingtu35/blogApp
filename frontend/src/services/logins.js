import axios from "axios";
// eslint-disable-next-line no-undef
const baseUrl = process.env.REACT_APP_BACKEND_URL + "/login";

const login = async (credential) => {
  const response = await axios.post(baseUrl, credential);
  return response.data;
};

export default {
  login,
};
