import { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { useParams, useNavigate } from "react-router-dom";
import imageService from "../../services/imageService";
import Notification from "../common/Notification";

const confetti = require("../../img/confetti.png");

const AddPost = ({ user }) => {
  const [desc, setDesc] = useState("");
  const [descLenFocus, setDescLenFocus] = useState(false);
  const [descLenMsg, setDescLenMsg] = useState(null);

  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const findImage = async (imageId) => {
      console.log("id", imageId);
      const res = await imageService.getImage(imageId);
      console.log("res", res);
      if (res.message === "fail") {
        navigate("/");
      } else {
        setImage(res);
      }
      setIsLoading(false);
    };
    findImage(id);
  }, [id, navigate]);

  console.log("Confetti user", user);
  console.log("Image", image);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const description = {
      desc: desc,
    };
    console.log("des", description, image._id);
    const res = await imageService.makePost(description, image._id);
    console.log("BAAACKKK", res);
  };

  const handleDesc = (event) => {
    const value = event.target.value;
    setDesc(value);

    if (value.length < 2 || value.length > 160) {
      setDescLenMsg("2-160 characters.");
    } else {
      setDescLenMsg(null);
    }
  };

  const goBack = () => {
    navigate("/loggedIn");
  };

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div
      className="flex h-screen items-center justify-center rounded-sm bg-cover bg-center"
      style={{
        backgroundImage: `url(${confetti})`,
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="rounded-md border-2 border-red-600 bg-slate-200 md:flex md:h-4/5 md:w-4/5 md:flex-col md:items-center md:justify-center"
      >
        <div className="border-2 border-orange-400 p-1 md:m-4 md:flex md:aspect-square md:w-3/4">
          <img src={image.image.path} alt="preview" />
        </div>
        <Notification notification={notification} />
        <div className="border-2 border-violet-400 md:m-2 md:flex md:h-auto md:w-3/5 md:p-1">
          <input
            type="text"
            placeholder="Picture description..."
            className="w-full rounded-md"
            value={desc}
            onChange={handleDesc}
            onFocus={() => {
              setDescLenFocus(true);
            }}
            onBlur={() => {
              setDescLenFocus(false);
            }}
          />
        </div>
        {descLenFocus && descLenMsg && (
          <div className="flex justify-start text-xs font-light text-red-500">
            <li>{descLenMsg}</li>
          </div>
        )}
        <div className="border-2 border-violet-400 md:m-2 md:flex md:h-auto md:w-2/5 md:justify-between md:p-1">
          <Button type="submit">post</Button>
          <Button
            className="border-2 border-gray-500"
            color="gray"
            onClick={() => goBack()}
          >
            cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
