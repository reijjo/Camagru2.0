import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import userService from "../../services/userService";
import Notification from "../common/Notification";

const confetti = require("../../img/confetti.png");

const Settings = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [pw, setPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  const [nameLenFocus, setNameLenFocus] = useState(false);
  const [nameLenMsg, setNameLenMsg] = useState(null);
  const [nameValidFocus, setNameValidFocus] = useState(false);
  const [nameValidMsg, setNameValidMsg] = useState(null);

  const [pwLenFocus, setPwLenFocus] = useState(false);
  const [pwLenMsg, setPwLenMsg] = useState(null);
  const [pwSpecialFocus, setPwSpecialFocus] = useState(false);
  const [pwSpecialMsg, setPwSpecialMsg] = useState(null);
  const [pwCapitalFocus, setPwCapitalFocus] = useState(false);
  const [pwCapitalMsg, setPwCapitalMsg] = useState(null);
  const [pwNumFocus, setPwNumFocus] = useState(false);
  const [pwNumMsg, setPwNumMsg] = useState(null);

  const [confirmPwFocus, setConfirmPwFocus] = useState(false);
  const [confirmPwMsg, setConfirmPwMsg] = useState(null);

  useEffect(() => {
    if (user) {
      setEmail(user.user.email);
      setUsername(user.user.username);
      setLoading(false);
    }
  }, [user]);

  console.log("MINA", user);
  console.log("email", email);
  console.log("username", username);
  console.log("password", pw);
  console.log("CONFIRMpw", confirmPw);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleUsername = (event) => {
    const value = event.target.value;
    const nameRegex = /^[a-zA-Z0-9!_-]+$/;
    setUsername(value);

    if (value.length < 3 || value.length > 30) {
      setNameLenMsg("3-30 characters.");
    } else {
      setNameLenMsg(null);
    }

    if (!nameRegex.test(value)) {
      setNameValidMsg(
        "Only letters numbers and special characters (!-_) allowed."
      );
    } else {
      setNameValidMsg(null);
    }
  };

  const handlePw = (event) => {
    const value = event.target.value;
    setPw(value);

    if (value.length < 8 || value.length > 30) {
      setPwLenMsg("8-30 characters.");
    } else {
      setPwLenMsg(null);
    }

    if (!/\d/.test(value)) {
      setPwNumMsg("At least one number.");
    } else {
      setPwNumMsg(null);
    }

    if (!/[A-Z]/.test(value)) {
      setPwCapitalMsg("At least one Uppercase letter.");
    } else {
      setPwCapitalMsg(null);
    }

    if (!/[-!_]/.test(value)) {
      setPwSpecialMsg("At least one special character (-!_)");
    } else {
      setPwSpecialMsg(null);
    }
  };

  const handleConfirmPw = (event) => {
    const value = event.target.value;
    setConfirmPw(value);

    if (value !== pw) {
      setConfirmPwMsg("Passwords doesn't match.");
    } else {
      setConfirmPwMsg(null);
    }
  };

  const updateInfo = async (event) => {
    event.preventDefault();
    if (!isClicked) {
      setIsClicked(true);
    } else {
      const newInfo = {
        newEmail: email,
        newUsername: username,
        newPw: pw,
        newConfpw: confirmPw,
      };
      const res = await userService.updateInfo(user.user.id, newInfo);
      console.log("RESPP", res);
      setMessage({ message: res.message, style: res.style });
      setTimeout(() => {
        setMessage(null);
        // window.location.replace("/loggedIn");
      }, 5000);
      setIsClicked(false);
    }
  };

  return (
    <div
      className="flex h-screen items-start justify-center rounded-sm bg-cover bg-center"
      style={{
        backgroundImage: `url(${confetti})`,
        // backgroundImage: `url(${chinese})`,
      }}
    >
      <div className="m-4 w-auto rounded-md bg-white p-4">
        {/* <div className="m-2 mx-auto h-full w-auto max-w-screen-sm rounded-md bg-white p-4 px-4"> */}
        <h1 className="m-4 flex justify-center text-center text-2xl font-bold">
          Account Settings
        </h1>
        <form onSubmit={updateInfo}>
          <div className="m-4 grid items-center px-4 lg:grid-cols-2">
            <div className="text-lg">Email:</div>
            <div className="py-2">
              <input
                className="rounded-md"
                type="email"
                placeholder={email}
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </div>
            <div className="text-lg">Username:</div>
            <div className="py-2">
              <input
                className="rounded-md"
                type="text"
                placeholder={username}
                defaultValue={username}
                autoComplete="off"
                onChange={handleUsername}
                onFocus={() => {
                  setNameLenFocus(true);
                  setNameValidFocus(true);
                }}
                onBlur={() => {
                  setNameLenFocus(false);
                  setNameValidFocus(false);
                }}
              />
            </div>
            {nameLenFocus && nameLenMsg && (
              <div className="col-span-2 text-xs font-light text-red-500">
                <li>{nameLenMsg}</li>
              </div>
            )}
            {nameValidFocus && nameValidMsg && (
              <div className="col-span-2 text-xs font-light text-red-500">
                <li>{nameValidMsg}</li>
              </div>
            )}
            <div className="text-lg">Password:</div>
            <div className="py-2">
              <input
                className="rounded-md"
                type="password"
                placeholder="Password.."
                autoComplete="off"
                onChange={handlePw}
                onFocus={() => {
                  setPwLenFocus(true);
                  setPwNumFocus(true);
                  setPwCapitalFocus(true);
                  setPwSpecialFocus(true);
                }}
                onBlur={() => {
                  setPwLenFocus(false);
                  setPwNumFocus(false);
                  setPwCapitalFocus(false);
                  setPwSpecialFocus(false);
                }}
              />
            </div>
            {pwLenFocus && pwLenMsg && (
              <div className="col-span-2 text-xs font-light text-red-500">
                <li>{pwLenMsg}</li>
              </div>
            )}
            {pwNumFocus && pwNumMsg && (
              <div className="col-span-2 text-xs font-light text-red-500">
                <li>{pwNumMsg}</li>
              </div>
            )}
            {pwCapitalFocus && pwCapitalMsg && (
              <div className="col-span-2 text-xs font-light text-red-500">
                <li>{pwCapitalMsg}</li>
              </div>
            )}
            {pwSpecialFocus && pwSpecialMsg && (
              <div className="col-span-2 text-xs font-light text-red-500">
                <li>{pwSpecialMsg}</li>
              </div>
            )}
            <div className="text-lg">Confirm Password:</div>
            <div className="py-2">
              <input
                className="rounded-md"
                type="password"
                placeholder="Confirm Password.."
                autoComplete="off"
                onChange={handleConfirmPw}
                onFocus={() => {
                  setConfirmPwFocus(true);
                }}
                onBlur={() => {
                  setConfirmPwFocus(false);
                }}
              />
            </div>
            <div className="col-span-2 text-center">
              <Notification message={message} />
            </div>
            {confirmPwFocus && confirmPwMsg && (
              <div className="col-span-2 text-xs font-light text-red-500">
                <li>{confirmPwMsg}</li>
              </div>
            )}
            <Button
              className={`col-span-2 my-2 ${isClicked ? "bg-green-600" : ""}`}
              type="submit"
            >
              {!isClicked ? "Update" : "Confirm"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
