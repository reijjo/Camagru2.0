import { Label, TextInput, Button } from "flowbite-react";
import { useState } from "react";
import userService from "../services/userService";
import Notification from "./Notification";
const confetti = require("../img/confetti.png");
// const tabbied = require("../img/tabbied.png");
// const chinese = require("../img/pattern_chinese.png");

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [notification, setNotification] = useState(null);

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

  const registerUser = async (event) => {
    event.preventDefault();

    const newUser = {
      email: email,
      username: username,
      password: password,
      confPassword: confPassword,
      verified: 0,
    };
    try {
      const response = await userService.createUser(newUser);
      setEmail("");
      setUsername("");
      setPassword("");
      setConfPassword("");
      setNotification({
        message: response.message,
        style: { color: "green", border: "2px solid" },
      });
      setTimeout(() => {
        setNotification(null);
        window.location.replace("/");
      }, 5000);
    } catch (error) {
      console.log(error);
      setNotification({
        message: error.response.data.error,
        style: { color: "red", border: "2px solid red" },
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

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

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);

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
    setConfPassword(value);

    if (value !== password) {
      setConfirmPwMsg("Passwords doesn't match.");
    } else {
      setConfirmPwMsg(null);
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center rounded-sm bg-cover bg-center"
      style={{
        backgroundImage: `url(${confetti})`,
        // backgroundImage: `url(${chinese})`,
      }}
    >
      <div className="mx-auto mb-60 mt-20 w-2/3 max-w-screen-sm rounded-md bg-white p-4 px-4">
        <div className="mb-4 text-3xl font-bold">Register</div>
        <Notification message={notification} />
        <form onSubmit={registerUser} className="flex flex-col gap-4">
          {/* EMAIL */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Email" />
            </div>
            <TextInput
              id="email"
              type="email"
              placeholder="user@email.com"
              required={true}
              autoComplete="off"
              onChange={(event) => setEmail(event.target.value.toLowerCase())}
              value={email}
            />
          </div>
          {/* USERNAME */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="username" value="Username" />
            </div>
            <TextInput
              id="username"
              type="username"
              placeholder="Username"
              autoComplete="off"
              required={true}
              onChange={handleUsername}
              value={username}
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
          {/* PASSWORD */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Password" />
            </div>
            <TextInput
              id="password1"
              type="password"
              required={true}
              autoComplete="off"
              placeholder="Password"
              onChange={handlePasswordChange}
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
              value={password}
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
          {/* CONFIRM PASSWORD */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="confPassword" value="Confirm Password" />
            </div>
            <TextInput
              id="confPassword"
              type="password"
              autoComplete="off"
              placeholder="Confirm Password"
              required={true}
              onChange={handleConfirmPw}
              onFocus={() => {
                setConfirmPwFocus(true);
              }}
              onBlur={() => {
                setConfirmPwFocus(false);
              }}
              value={confPassword}
            />
          </div>
          {confirmPwFocus && confirmPwMsg && (
            <div className="col-span-2 text-xs font-light text-red-500">
              <li>{confirmPwMsg}</li>
            </div>
          )}
          <Button type="submit">Register</Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
