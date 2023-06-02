import axios from "axios";

const baseUrl = "/api/login";
// const baseUrl = "http://localhost:3001/api/login";

const login = async (credentials) => {
  const res = await axios.post(baseUrl, credentials);
  return res.data;
};

const loginService = { login };

export default loginService;
