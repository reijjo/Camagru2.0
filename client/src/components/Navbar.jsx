import { Navbar, Button } from "flowbite-react";
import { Link } from "react-router-dom";

const Nav = ({ user }) => {
  console.log("NAVBAR", user);

  const logout = (user) => {
    console.log("nappulasta", user);
    user = "";
    window.localStorage.removeItem("loggedIn");
    window.location.replace("/");
  };

  return (
    <Navbar fluid={true} className="navilapi sticky top-0 z-10">
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
          <div className="flex md:order-2">
            <Navbar.Toggle />
            <Link className="px-12" to="/settings">
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
            <Navbar.Link href="/" active={true}>
              Home
            </Navbar.Link>
            <Navbar.Link href="/loggedIn">Add Photo</Navbar.Link>
          </Navbar.Collapse>
        </>
      )}
    </Navbar>
  );
};

export default Nav;
