import axios from "axios";

const baseUrl = "http://localhost:3001/api/users";

const getUsers = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const createUser = async (newUser) => {
  const res = await axios.post(baseUrl, newUser);
  return res.data;
};

const userService = { getUsers, createUser };

export default userService;
