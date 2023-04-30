import { useState } from "react";
import { Button } from "flowbite-react";
import userService from "../services/userService";

const confetti = require("../img/confetti.png");

const Verify = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  console.log(email);

  const getPw = async () => {
    try {
      const res = await userService.forgotPasswd(email);
      setMessage(res.message);
    } catch (error) {
      console.error("Error sending password link.", error);
    }
    setTimeout(() => {
      setMessage(null);
    }, 5000);
    console.log("repe on paras", email);
  };

  return (
    <div
      className="flex h-screen items-start justify-center rounded-sm bg-cover bg-center"
      style={{
        backgroundImage: `url(${confetti})`,
        // backgroundImage: `url(${chinese})`,
      }}
    >
      <div className="mx-auto mt-12 w-auto max-w-screen-sm rounded-md bg-white p-4 px-4">
        <h1 className="m-4 flex justify-center text-center text-2xl font-bold">
          FORGOT YOUR PASSWORD? NO WORRIES!
        </h1>
        <div className="m-4 grid grid-cols-3 items-center px-4">
          <div className="text-lg">Enter your email:</div>
          <div>
            <input
              className="rounded-md"
              type="text"
              placeholder="your@email.com"
              onChange={handleEmail}
              value={email}
            />
          </div>
          <div className="flex justify-end">
            <Button
              onClick={() => {
                getPw();
                setEmail("");
              }}
            >
              Send!
            </Button>
          </div>
        </div>
        {message ? (
          <div className="flex items-center justify-center rounded-lg border-4 border-blue-300">
            <h3>{message}</h3>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Verify;
