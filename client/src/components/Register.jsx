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

  const [passwordFocus, setPasswordFocus] = useState(false);
  const [passwordValidationMessage, setPasswordValidationMessage] =
    useState("");

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

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);

    const regex = /^(?=.*[A-Z])(?=.*[!_-])(?=.*[0-9]).{8,}$/;

    if (!regex.test(value)) {
      setPasswordValidationMessage(
        "Password must contain at least one uppercase letter, one of the characters: ! _ -, and one number. It must be at least 8 characters long."
      );
    } else {
      setPasswordValidationMessage("");
    }
  };

  const handlePasswordFocus = () => {
    setPasswordFocus(true);
  };

  const handlePasswordBlur = () => {
    setPasswordFocus(false);
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
              onChange={(event) =>
                setUsername(event.target.value.toLowerCase())
              }
              value={username}
            />
          </div>
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
              onFocus={handlePasswordFocus}
              onBlur={handlePasswordBlur}
              value={password}
            />
            {passwordFocus && passwordValidationMessage && (
              <div className="text-xs font-light text-red-500">
                {passwordValidationMessage}
              </div>
            )}
          </div>
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
              onChange={(event) => setConfPassword(event.target.value)}
              value={confPassword}
            />
          </div>
          <Button type="submit">Register</Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
