import { Button } from "flowbite-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import userService from "../services/userService";
import Notification from "./Notification";

const confetti = require("../img/confetti.png");

const ChangePasswd = () => {
  const { verifyCode } = useParams();
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState([]);
  const [passwd, setPasswd] = useState("");
  const [confPw, setConfPasswd] = useState("");

  const [pwLengthFocus, setPwLengthFocus] = useState(false);
  const [pwLengthMsg, setPwLengthMsg] = useState(null);

  const [pwNumberFocus, setPwNumberFocus] = useState(false);
  const [pwNumberMsg, setPwNumberMsg] = useState(null);

  const [pwUpperFocus, setPwUpperFocus] = useState(false);
  const [pwUpperMsg, setPwUpperMsg] = useState(null);

  const [pwSpecialFocus, setPwSpecialFocus] = useState(false);
  const [pwSpecialMsg, setPwSpecialMsg] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await userService.getForgot(verifyCode);
        setUser(res.user);
        console.log("changg", res);
      } catch (error) {
        setMessage(error.message);
      }
    };
    verifyUser();
  }, [verifyCode, message]);
  console.log("user", user);

  console.log("passwords", passwd, confPw);

  const handleValidPw = (event) => {
    const value = event.target.value;
    setPasswd(value);

    if (value.length < 8) {
      setPwLengthMsg("Password must have at least 8 characters.");
    } else {
      setPwLengthMsg(null);
    }

    if (!/\d/.test(value)) {
      setPwNumberMsg("Password must contain at least one number.");
    } else {
      setPwNumberMsg(null);
    }

    if (!/[A-Z]/.test(value)) {
      setPwUpperMsg("Password must have at least one Uppercase letter.");
    } else {
      setPwUpperMsg(null);
    }

    if (!/[-!_]/.test(value)) {
      setPwSpecialMsg("Password must have at least one special character -!_");
    } else {
      setPwSpecialMsg(null);
    }
  };

  const handlePwLengthFocus = () => {
    setPwLengthFocus(true);
  };

  const handlePwNumberFocus = () => {
    setPwNumberFocus(true);
  };

  const handlePwUpperFocus = () => {
    setPwUpperFocus(true);
  };

  const handlePwSpecialFocus = () => {
    setPwSpecialFocus(true);
  };

  const handlePwBlur = () => {
    setPwLengthFocus(false);
    setPwNumberFocus(false);
    setPwUpperFocus(false);
    setPwSpecialFocus(false);
  };

  const resetPw = async () => {
    try {
      const res = await userService.changeForgot(verifyCode, passwd);
      console.log("RESSSP", res);
      setMessage({
        message: res.message,
        style: res.style,
      });
    } catch (error) {
      console.error("Error Reseting Password");
    }
    setTimeout(() => {
      setMessage(null);
    }, 5000);
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
        {user ? (
          <>
            <h1 className="m-4 flex justify-center text-center text-2xl font-bold">
              CHANGE PASSWORD PLEASE:
            </h1>
            <div className="m-4 grid grid-cols-2 gap-2 px-4">
              <div className="font-bold">Username:</div>
              <div className="">{user.username}</div>
              <div className="font-bold">Email:</div>
              <div className="">{user.email}</div>
              <div className="flex items-center font-bold">New Password:</div>
              <div className="">
                <input
                  type="password"
                  className="rounded-md"
                  onChange={handleValidPw}
                  value={passwd}
                  onFocus={() => {
                    handlePwLengthFocus();
                    handlePwNumberFocus();
                    handlePwUpperFocus();
                    handlePwSpecialFocus();
                  }}
                  onBlur={handlePwBlur}
                />
              </div>
              {pwLengthFocus && pwLengthMsg && (
                <div className="col-span-2 text-xs font-light text-red-500">
                  {pwLengthMsg}
                </div>
              )}
              {pwNumberFocus && pwNumberMsg && (
                <div className="col-span-2 text-xs font-light text-red-500">
                  {pwNumberMsg}
                </div>
              )}
              {pwUpperFocus && pwUpperMsg && (
                <div className="col-span-2 text-xs font-light text-red-500">
                  {pwUpperMsg}
                </div>
              )}
              {pwSpecialFocus && pwSpecialMsg && (
                <div className="col-span-2 text-xs font-light text-red-500">
                  {pwSpecialMsg}
                </div>
              )}
              <div className="flex items-center font-bold">
                Confirm Password:
              </div>
              <div className="">
                <input
                  type="password"
                  className="rounded-md"
                  onChange={(event) => setConfPasswd(event.target.value)}
                />
              </div>
              {message ? (
                <div className="col-span-2 text-center">
                  <Notification message={message} />
                </div>
              ) : null}
              <Button
                className="col-span-2"
                onClick={() => {
                  resetPw();
                }}
              >
                Change!
              </Button>
            </div>
          </>
        ) : (
          <>
            <h1 className="m-4 flex justify-center text-center text-2xl font-bold">
              CHANGE PASSWORD PLEASE:
            </h1>
            <div className="m-4 px-4">
              <div className="flex justify-center">User Not Found!</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChangePasswd;
