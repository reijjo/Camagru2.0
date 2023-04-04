const testRouter = require("express").Router();

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

testRouter.get("/", (req, res) => {
  res.send("<h3>HELLO FROM THE bACKKKK! </h3>");
});

testRouter.get("/api/notes", (req, res) => {
  res.json(notes);
});

testRouter.get("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  console.log("get id", id);
  const note = notes.find((note) => note.id === id);
  console.log("note", note);
  res.json(note);
});

module.exports = testRouter;
