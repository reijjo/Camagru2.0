const kettu = require("../img/kettu_wallpaper.jpg");
const logo = require("../img/oldig.png");

const Header = () => {
  return (
    <div
      className="br-cover relative bg-center"
      style={{ backgroundImage: `url(${kettu})` }}
    >
      <header className="flex h-24 items-center justify-start pl-3">
        <a href="/">
          <div className="flex items-center">
            <img
              className="mr-4 h-8 sm:h-12"
              src={logo}
              alt="logo"
              style={{ backdropFilter: "blur(10px)" }}
            />
            <div
              className="text-lg text-white sm:text-2xl"
              style={{ backdropFilter: "blur(10px)" }}
            >
              Camagru 2.0
            </div>
          </div>
        </a>
      </header>
      {/* <Nav user={user} /> */}
    </div>
  );
};

export default Header;
