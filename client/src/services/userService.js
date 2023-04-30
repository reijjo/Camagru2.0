import axios from "axios";

const baseUrl = "http://localhost:3001/api/users";

const getUsers = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const forgotPasswd = async (email) => {
  console.log("axx", email);
  const res = await axios.post(`${baseUrl}/forgot`, { email: email });
  return res.data;
};

const getForgot = async (verifyCode) => {
  const res = await axios.get(`${baseUrl}/forgot/${verifyCode}`);
  return res.data;
};

const changeForgot = async (verifyCode, newPassword) => {
  console.log("AXIOOS", verifyCode, newPassword);
  const res = await axios.put(`${baseUrl}/forgot`, {
    verifyCode: verifyCode,
    newPassword: newPassword,
  });
  return res.data;
};

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

const userService = {
  getUsers,
  createUser,
  forgotPasswd,
  changeForgot,
  getForgot,
  verifyUser,
};

export default userService;
