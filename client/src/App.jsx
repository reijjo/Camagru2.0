import { useEffect, useState } from "react";
// import testService from "./services/axiosStuff";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/common/Header";
import Foot from "./components/common/Footer";
import Login from "./components/user/Login";
import Register from "./components/register/Register";
import Verify from "./components/register/Verify";
import Forgot from "./components/register/Forgot";
import ChangePasswd from "./components/register/ChangePasswd";
import LoggedIn from "./components/user/LoggedIn";
import Settings from "./components/user/Settings";
import userService from "./services/userService";
import Home from "./components/Home";
import Nav from "./components/common/Navbar";
import AddPost from "./components/user/AddPost";

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
      await userService.getUsers();
      // const users = await userService.getUsers();
      // console.log("USERS", users);
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
        <Route path="/" element={<Home user={user} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/:verifyCode" element={<Verify />} />
        <Route path="/login" element={<Login updateUser={updateUser} />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/forgot/:verifyCode" element={<ChangePasswd />} />
        <Route
          path="/loggedIn"
          element={user ? <LoggedIn user={user} /> : <Home />}
        />
        <Route
          path="/loggedIn/:id"
          element={user ? <AddPost user={user} /> : <Home />}
        />
        <Route
          path="/settings"
          element={user ? <Settings user={user} /> : <Home />}
        />
      </Routes>
      <Foot />
    </Router>
    // </div>
  );
};

export default App;
