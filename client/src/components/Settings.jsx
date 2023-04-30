const confetti = require("../img/confetti.png");
const Settings = () => {
  return (
    <div
      className="flex h-screen items-start justify-center rounded-sm bg-cover bg-center"
      style={{
        backgroundImage: `url(${confetti})`,
        // backgroundImage: `url(${chinese})`,
      }}
    >
      <div className="mx-auto mt-12 w-auto max-w-screen-sm rounded-md bg-white p-4 px-4">
        <h1 className="m-4 flex justify-center text-center text-2xl font-bold">
          FORGOT YOUR PASSWORD? NO WORRIES!
        </h1>
        <div className="m-4 grid grid-cols-3 items-center px-4">
          <div className="text-lg">Enter your email:</div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
