const confetti = require("../img/confetti.png");

const LoggedIn = () => {
  return (
    <div
      className="flex h-screen items-center justify-center rounded-sm bg-cover bg-center"
      style={{
        backgroundImage: `url(${confetti})`,
        // backgroundImage: `url(${chinese})`,
      }}
    >
      <div className="font text-blue-200">kiva olla taal</div>
    </div>
  );
};

export default LoggedIn;
