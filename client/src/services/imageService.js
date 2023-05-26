import axios from "axios";

const baseUrl = "http://localhost:3001/api/images";

// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getPreviews = async (user) => {
  console.log("Axios user", user);
  const res = await axios.get(`${baseUrl}/preview`, {
    params: {
      userId: user.user.id,
    },
  });
  // console.log("Axios res", res);
  return res.data;
};

const savePreview = async (image, user) => {
  const formData = new FormData();
  formData.append("image", image);
  formData.append("user", JSON.stringify(user));

  const res = await axios.post(`${baseUrl}/preview`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  // await delay(5000);
  return res.data;
};

const deletePreview = async (imageInfo) => {
  console.log("Axios ImageID", imageInfo);
  const res = await axios.delete(`${baseUrl}/preview`, {
    params: { image: imageInfo },
  });
  return res.data;
};

const getImage = async (id) => {
  console.log("Axios Id", id);
  const res = await axios.get(`${baseUrl}/loggedIn/${id}`);
  console.log("Axios res", res);
  return res.data;
};

const makePost = async (desc, id) => {
  console.log("Axios", desc, id);
  const res = await axios.put(`${baseUrl}/loggedIn/${id}`, desc);
  return res.data;
};

const getFromDb = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const addComment = async (comment, imageId, user) => {
  const res = await axios.post(`${baseUrl}/comment`, {
    comment: comment,
    imageId: imageId,
    user: user,
  });
  return res.data;
};

const getComments = async (id) => {
  const res = await axios.get(`${baseUrl}/comment`);
  return res.data;
};

const imageService = {
  getPreviews,
  savePreview,
  deletePreview,
  getImage,
  makePost,
  getFromDb,
  addComment,
  getComments,
};

export default imageService;
