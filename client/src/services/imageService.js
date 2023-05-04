import axios from "axios";

const baseUrl = "http://localhost:3001/api/images";

// const getStickers = async () => {
//   const res = await axios.get(`${baseUrl}/stickers`);
//   return res.data;
// };

const savePreview = async (image, user) => {
  console.log("AXIXIO", image);
  console.log("imgAXIIOS", user);
  const formData = new FormData();
  formData.append("image", image);
  formData.append("user", JSON.stringify(user));

  const res = await axios.post(`${baseUrl}/preview`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log("AXXXIOSOS RES", res);
  return res.data;
};

const imageService = { savePreview };

export default imageService;
