import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import userService from "../services/userService";

const confetti = require("../img/confetti.png");

const Verify = () => {
  const { verifyCode } = useParams();
  const [message, setMessage] = useState("");
  const [user, setUser] = useState([]);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await userService.verifyUser(verifyCode);
        console.log("RESSSP", res);
        setMessage(res.message);
        setUser(res.user);
      } catch (error) {
        setMessage(error.message);
      }
    };
    verifyUser();
  }, [verifyCode, message]);

  return (
    <div
      className="flex h-screen items-start justify-center rounded-sm bg-cover bg-center"
      style={{
        backgroundImage: `url(${confetti})`,
        // backgroundImage: `url(${chinese})`,
      }}
    >
      <div className="mx-auto mt-12 w-1/3 max-w-screen-sm rounded-md bg-white p-4 px-4">
        <h1 className="m-4 flex justify-center text-center text-2xl font-bold">
          {message}
        </h1>
        {user ? (
          <div className="grid grid-cols-2">
            <div className="font-bold">Username:</div>
            <div className="">{user.username}</div>
            <div className="font-bold">Email:</div>
            <div>{user.email}</div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Verify;
