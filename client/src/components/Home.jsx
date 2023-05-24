import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import imageService from "../services/imageService";

const confetti = require("../img/confetti.png");

const Home = ({ user }) => {
  const [comment, setComment] = useState("");

  const [imagesFromDb, setImagesFromDb] = useState([]);
  // const [commentsFromDb, setCommentsFromDb] = useState([]);

  useEffect(() => {
    console.log("TOIMIIKS");
    const feedImages = async () => {
      const res = await imageService.getFromDb();
      setImagesFromDb(res);
    };
    feedImages();
  }, [comment]);

  const addComment = (event) => {
    event.preventDefault();
    console.log(comment);
    setComment("");
  };

  console.log("user", user);
  console.log("Feed Imgs", imagesFromDb);

  if (!imagesFromDb.length) {
    return <div>loading...</div>;
  }

  return (
    <div
      className="flex min-h-screen flex-col items-center pb-4"
      style={{
        backgroundImage: `url(${confetti})`,
        // backgroundImage: `url(${chinese})`,
      }}
    >
      {user ? (
        <h1 className="text-white">Logged in as {user.user.username} </h1>
      ) : (
        <h1 className="text-white">Welcome to Camagru</h1>
      )}
      {imagesFromDb.map((post) => (
        <div
          key={post._id}
          className="mb-4 mt-4 flex h-2/3 w-1/2 flex-col items-center justify-center rounded-md border-4 border-white bg-cyan-800"
        >
          <div className="oma mb-2 h-8 w-full border-2 border-orange-300 pl-2">
            Username
          </div>
          <div className="mb-2 h-64 w-3/4 border-2 border-orange-400">
            <img
              src={post.image.path}
              alt={post.image.desc}
              className="h-full w-full"
            />
          </div>
          {user ? (
            <div className="flex h-12 w-full flex-row border-2 border-orange-500">
              <input
                type="text"
                placeholder="add comment..."
                className="h-auto flex-grow"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button className="w-auto" onClick={addComment}>
                Add
              </Button>
            </div>
          ) : null}
          <div className="h-32 w-full border-2 border-orange-600">
            all the comments
          </div>
          <div className="oma h-8 w-full border-2 border-orange-700 pb-2"></div>
        </div>
      ))}
    </div>
  );
};

export default Home;
