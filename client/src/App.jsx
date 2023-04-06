import { useEffect, useState } from "react";
// import testService from "./services/axiosStuff";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Foot from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import LoggedIn from "./components/LoggedIn";
import userService from "./services/userService";

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
    <div className="wrapper min-h-screen bg-gradient-to-t from-blue-300 to-blue-200">
      <Router>
        <Header user={user} />
        <Routes>
          <Route
            path="/"
            element={!user ? <Login updateUser={updateUser} /> : <LoggedIn />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/loggedIn" element={<LoggedIn />} />
        </Routes>
        <Foot />
      </Router>
    </div>
  );
};

export default App;
