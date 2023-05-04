import axios from "axios";

const baseUrl = "http://localhost:3001/api/users";

const createUser = async (newUser) => {
  const res = await axios.post(`${baseUrl}/register`, newUser);
  return res.data;
};

const verifyUser = async (verifyCode) => {
  try {
    const res = await axios.get(`${baseUrl}/register/${verifyCode}`);
    return res.data;
  } catch (error) {
    throw new Error(`Error user ${error.message}`);
  }
};

const getUsers = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const forgotPasswd = async (email) => {
  const res = await axios.post(`${baseUrl}/forgot`, { email: email });
  return res.data;
};

const getForgot = async (verifyCode) => {
  const res = await axios.get(`${baseUrl}/forgot/${verifyCode}`);
  return res.data;
};

const changeForgot = async (verifyCode, newPassword) => {
  const res = await axios.put(`${baseUrl}/forgot/new`, {
    verifyCode: verifyCode,
    newPassword: newPassword,
  });
  console.log("RES", res);
  return res.data;
};

const updateInfo = async (id, newInfo) => {
  const res = await axios.put(`${baseUrl}/${id}`, newInfo);
  return res.data;
};

const userService = {
  createUser,
  verifyUser,
  getUsers,
  forgotPasswd,
  changeForgot,
  getForgot,
  updateInfo,
};

export default userService;
