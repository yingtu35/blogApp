import axios from "axios";
// eslint-disable-next-line no-undef
const baseUrl = process.env.REACT_APP_BACKEND_URL + "/blogs";

let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.get(baseUrl, config);
  return response.data;
};

const create = async (newBlog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const update = async (newBlog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.put(`${baseUrl}/${newBlog.id}`, newBlog, config);
  return response.data;
};

const remove = async (blog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  await axios.delete(`${baseUrl}/${blog.id}`, config);
};

const addComment = async (id, comment) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const response = await axios.post(
    `${baseUrl}/${id}/comments`,
    comment,
    config,
  );
  return response.data;
};

export default { getAll, create, update, remove, setToken, addComment };
