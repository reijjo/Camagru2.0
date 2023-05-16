import { useEffect, useState } from "react";
// import testService from "./services/axiosStuff";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Foot from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import Verify from "./components/Verify";
import Forgot from "./components/Forgot";
import ChangePasswd from "./components/ChangePasswd";
import LoggedIn from "./components/LoggedIn";
import Settings from "./components/Settings";
import userService from "./services/userService";
import Home from "./components/Home";
import Nav from "./components/Navbar";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedIn");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
    }
  }, []);

  const updateUser = (user) => {
    setUser(user);
  };

  useEffect(() => {
    const fetchData = async () => {
      const users = await userService.getUsers();
      console.log("USERS", users);
    };
    fetchData();
  }, []);

  return (
    // <div className="wrapper min-h-screen bg-gradient-to-t from-blue-300 to-blue-200">
    <Router>
      <Header />
      <Nav user={user} />
      <Routes>
        {/* <Route
          path="/"
          element={!user ? <Login updateUser={updateUser} /> : <LoggedIn />}
        /> */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/:verifyCode" element={<Verify />} />
        <Route path="/login" element={<Login updateUser={updateUser} />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/forgot/:verifyCode" element={<ChangePasswd />} />
        <Route path="/loggedIn" element={<LoggedIn user={user} />} />
        <Route path="/settings" element={<Settings user={user} />} />
      </Routes>
      <Foot />
    </Router>
    // </div>
  );
};

export default App;
