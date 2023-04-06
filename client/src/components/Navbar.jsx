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
    <Navbar fluid={true} rounded={true} className="navilapi">
      {!user ? (
        <>
          <div className="flex md:order-2">
            <Navbar.Toggle className="mr-2" />
            <Link to="/register">
              <Button className="mr-4">Register</Button>
            </Link>
            <Link to="/">
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
            {/* <Navbar.Link href="/navbars">About</Navbar.Link>
						<Navbar.Link href="/navbars">Services</Navbar.Link>
						<Navbar.Link href="/navbars">Pricing</Navbar.Link> */}
            <Navbar.Link
              href="/sneakpeak"
              className="text-white"
              style={{ backdropFilter: "blur(10px)" }}
            >
              Sneak peak
            </Navbar.Link>
          </Navbar.Collapse>
        </>
      ) : (
        <>
          <div className="flex md:order-2">
            <Navbar.Toggle />
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
            {/* <Navbar.Link href="/navbars">About</Navbar.Link>
						<Navbar.Link href="/navbars">Services</Navbar.Link>
						<Navbar.Link href="/navbars">Pricing</Navbar.Link> */}
            <Navbar.Link href="/sneakpeak">Sneak peak</Navbar.Link>
          </Navbar.Collapse>
        </>
      )}
    </Navbar>
  );
};

export default Nav;
