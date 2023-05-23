import { useState } from "react";
import { Label, TextInput, Button } from "flowbite-react";
import loginService from "../../services/loginService";
import Notification from "../common/Notification";
const confetti = require("../../img/confetti.png");
// const tabbied = require("../img/tabbied.png");
// const chinese = require("../img/pattern_chinese.png");

const Login = ({ updateUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState(null);

  const login = async (event) => {
    event.preventDefault();

    const loginUser = {
      username: username,
      password: password,
    };
    try {
      const response = await loginService.login(loginUser);
      window.localStorage.setItem("loggedIn", JSON.stringify(response));
      updateUser(response);

      window.location.replace("/loggedIn");
    } catch (error) {
      setNotification({
        message: error.response.data.error,
        style: { color: "red", border: "2px solid" },
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
      console.log(error);
    }
  };

  return (
    <div
      className="flex h-screen items-center justify-center rounded-sm bg-cover bg-center"
      style={{
        backgroundImage: `url(${confetti})`,
        // backgroundImage: `url(${chinese})`,
      }}
    >
      <div className="mx-auto w-2/3 max-w-screen-sm rounded-md bg-white p-4 px-4">
        <div className="mb-4 text-3xl font-bold">Login</div>
        <Notification message={notification} />
        <form className="flex flex-col gap-4" onSubmit={login}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Username" />
            </div>
            <TextInput
              id="username1"
              type="text"
              placeholder="Your username"
              required={true}
              autoComplete="off"
              value={username}
              onChange={(event) =>
                setUsername(event.target.value.toLowerCase())
              }
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Password" />
            </div>
            <TextInput
              id="password1"
              type="password"
              required={true}
              placeholder="Your password"
              autoComplete="off"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <Button type="submit">Login</Button>
        </form>
        <div className="py-1 text-right">
          <a
            className="text-blue-900 transition-colors duration-300 hover:text-blue-700"
            href="/forgot"
          >
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
