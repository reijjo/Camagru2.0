import axios from "axios";

const baseUrl = "/";
// const baseUrl = "http://localhost:3001";

const justget = () => {
  const req = axios.get(baseUrl);
  return req.then((res) => res.data);
};

const getAll = () => {
  const req = axios.get(`${baseUrl}/api/notes`);
  return req.then((res) => res.data);
};

const getId = (id) => {
  const req = axios.get(`${baseUrl}/api/notes/${id}`);
  return req.then((res) => res.data);
};

const testService = { justget, getAll, getId };

export default testService;
