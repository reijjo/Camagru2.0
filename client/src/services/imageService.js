import axios from "axios";

const baseUrl = "http://localhost:3001/api/images";

// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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

const imageService = { savePreview };

export default imageService;
