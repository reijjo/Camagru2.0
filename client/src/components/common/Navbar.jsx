import { Navbar, Button } from "flowbite-react";
import { Link } from "react-router-dom";

const Nav = ({ user }) => {
  console.log("NAVBAR", user);

  const logout = (user) => {
    // console.log("nappulasta", user);
    user = "";
    window.localStorage.removeItem("loggedIn");
    window.location.replace("/");
  };

  return (
    <Navbar fluid={true} className="navilapi sticky top-0 z-50">
      {!user ? (
        <>
          <div className="flex md:order-2">
            <Navbar.Toggle className="mr-2" />
            <Link to="/register">
              <Button className="mr-4">Register</Button>
            </Link>
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          </div>
          <Navbar.Collapse>
            <Navbar.Link
              href="/"
              style={{ backdropFilter: "blur(10px)" }}
              className="text-white"
            >
              Home
            </Navbar.Link>
          </Navbar.Collapse>
        </>
      ) : (
        <>
          <div className="navilapi flex text-white md:order-2">
            <Navbar.Toggle />
            <Link className="navilapi px-4" to="/settings">
              <Button color="purple">Settings</Button>
            </Link>
            <Link to="/">
              <Button
                color="failure"
                onClick={() => {
                  logout(user);
                }}
              >
                Logout
              </Button>
            </Link>
          </div>
          <Navbar.Collapse>
            <Navbar.Link className="navilapi hoverlink" href="/">
              Home
            </Navbar.Link>
            <Navbar.Link className="navilapi" href="/loggedIn">
              Add Photo
            </Navbar.Link>
          </Navbar.Collapse>
        </>
      )}
    </Navbar>
  );
};

export default Nav;
