import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import imageService from "../services/imageService";
import userService from "../services/userService";
import Notification from "./common/Notification";

// const confetti = require("../img/confetti.png");

const Home = ({ user }) => {
  const [comment, setComment] = useState({});
  const [clearInput, setClearInput] = useState(false);
  const [notification, setNotification] = useState(null);

  const [imagesFromDb, setImagesFromDb] = useState([]);
  const [postUser, setPostUser] = useState([]);

  useEffect(() => {
    const feedImages = async () => {
      const res = await imageService.getFromDb();
      const res2 = await userService.getUsers();
      setImagesFromDb(res.image);
      setPostUser(res2);
      setClearInput(false);
    };

    feedImages();
  }, [comment]);

  const addComment = async (id) => {
    // event.preventDefault();
    // console.log("imageid", id);
    // console.log("comment", comment);

    const res = await imageService.addComment(comment[id], id, user.user.id);
    // console.log("add comment res", res);
    setNotification(res);

    setComment({ ...comment, [id]: "" });
    setClearInput(true);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  if (!imagesFromDb.length) {
    return <div className="min-h-screen">loading...</div>;
  }

  const formatDate = (date) => {
    const dateObj = new Date(date);
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();

    const hours = String(dateObj.getHours()).padStart(2, "0");
    const minutes = String(dateObj.getMinutes()).padStart(2, "0");
    const seconds = String(dateObj.getSeconds()).padStart(2, "0");

    // const day = String(dateObj.getUTCDate()).padStart(2, "0");
    // const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
    // const year = dateObj.getUTCFullYear();

    // const hours = String(dateObj.getUTCHours()).padStart(2, "0");
    // const minutes = String(dateObj.getUTCMinutes()).padStart(2, "0");
    // const seconds = String(dateObj.getUTCSeconds()).padStart(2, "0");

    return {
      time: `${hours}:${minutes}:${seconds}`,
      date: `${day}/${month}/${year} `,
    };
  };

  const handleInputChange = (e, id) => {
    setComment({ ...comment, [id]: e.target.value });
  };

  const findUsername = (postId) => {
    const post = imagesFromDb.find((p) => p.user === postId);
    if (post) {
      const user = postUser.find((u) => u.id === post.user);
      if (user) {
        return user.username;
      }
    }
    return "";
  };

  if (!imagesFromDb) {
    return <div>loading...</div>;
  }

  return (
    <div
      className="oma1 flex min-h-screen flex-col items-center pb-4"
      // style={{
      //   backgroundImage: `url(${confetti})`,
      //   // backgroundImage: `url(${chinese})`,
      // }}
    >
      {user ? (
        <h1 className="text-black">Logged in as {user.user.username} </h1>
      ) : (
        <h1 className="text-black">Welcome to Camagru</h1>
      )}
      {imagesFromDb.map((post) => (
        <div
          key={post._id}
          className="post mb-4 mt-4 flex h-2/3 w-2/3 max-w-md flex-col items-center justify-center  rounded-md text-white"
        >
          {/* USERNAME */}
          <div className="oma4 mb-2 h-8 w-full pl-2">
            {findUsername(post.user)}
          </div>
          {/* IMAGE */}
          <div className="post mb-2 h-64 w-3/4 rounded-sm">
            <img
              src={post.image.path}
              alt={post.image.desc}
              className="h-full w-full"
            />
          </div>
          {/* DESCRIPTION */}
          <div className="oma2 h-8 w-full  px-2 pb-2 text-left text-white">
            {post.image.desc}
          </div>
          <Notification message={notification} />
          {/* COMMENT FIELD */}
          {user ? (
            <div className="flex h-12 w-full flex-col bg-blue-700 sm:flex-row">
              <input
                type="text"
                placeholder="add comment..."
                className="h-auto flex-grow text-black"
                // value={comment[post._id]}
                value={!clearInput ? comment[post._id] || "" : ""}
                onChange={(e) => handleInputChange(e, post._id)}
              />
              <Button
                className="h-full w-auto"
                onClick={() => addComment(post._id)}
              >
                Add
              </Button>
            </div>
          ) : null}
          {/* COMMENTS */}
          <div className="mt-12 h-48 w-full overflow-auto sm:mt-0">
            {/* all the comments */}
            {post.image.comments.map((comments) => (
              <div key={comments._id} className="grid grid-cols-2">
                <strong className="mr-4  text-black">
                  {comments.user.username}
                </strong>
                <div className="whitespace-pre-wrap  text-black">
                  {comments.comment}
                </div>
              </div>
            ))}
          </div>
          {/* PUBLISH TIME */}
          <div className="oma4 h-8 w-full pb-2 pr-2 text-right text-white">
            {formatDate(post.createdAt).time} {formatDate(post.createdAt).date}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
