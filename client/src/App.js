import { useState, useEffect } from "react";
import testService from "./services/axiosStuff";

const App = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    testService.getAll().then((response) => {
      setNotes(response);
    });
  }, []);

  console.table("notes", notes);
  return (
    <>
      <div>
        <h2 className="font bold text-3xl text-red-400 underline">
          Hello world
        </h2>
      </div>
      <div>
        <h2 className="font bold text-3xl text-blue-300 underline">
          Hello world with tailwindcss
        </h2>
      </div>
      <div>
        All notes:{" "}
        {notes.map((all) => (
          <div key={all.id}>
            <p>
              {all.content} {all.id}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
