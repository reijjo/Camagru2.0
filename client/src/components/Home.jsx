const confetti = require("../img/confetti.png");

const Home = () => {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: `url(${confetti})`,
        // backgroundImage: `url(${chinese})`,
      }}
    >
      <h1>Welcome to Camagru</h1>
    </div>
  );
};

export default Home;
