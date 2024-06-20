const config = require("./utils/config.js");
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const notesRouter = require("./controllers/notes.js");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login.js");
const middleware = require("./utils/middleware.js");
const logger = require("./utils/logger.js");
// const Note = require("./models/note.js");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = config.MONGODB_URI;
logger.info("connecting to", url);

mongoose
  .connect(url)
  .then((result) => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/notes", notesRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;

// THE ROUTES WENT TO './controllers/notes.js'
//
// app.get("/api/notes", (request, response) => {
//   Note.find({}).then((notes) => {
//     response.send(notes);
//   });
// });

// app.get("/api/notes/:id", (request, response, next) => {
//   Note.findById(request.params.id)
//     .then((note) => {
//       if (note) {
//         response.json(note);
//       } else {
//         response.status(404).end();
//       }
//     })
//     .catch((error) => {
//       return next(error);
//     });
// });

// app.post("/api/notes", (request, response, next) => {
//   const note = new Note({
//     content: request.body.content,
//     important: Boolean(request.body.important) || false,
//   });
//   logger.info(note);
//   note
//     .save()
//     .then((savedNote) => {
//       response.json(savedNote);
//     })
//     .catch((error) => next(error));
// });

// app.put("/api/notes/:id", (request, response, next) => {
//   const { content, important } = request.body;

//   Note.findByIdAndUpdate(
//     request.params.id,
//     { content, important },
//     { new: true, runValidators: true, context: "query" }
//   )
//     .then((updatedNote) => {
//       logger.info("Note updated successfully!");
//       response.json(updatedNote);
//     })
//     .catch((error) => next(error));
// });

// app.delete("/api/notes/:id", (request, response, next) => {
//   Note.findByIdAndDelete(request.params.id)
//     .then((result) => {
//       response.status(204).end();
//     })
//     .catch((error) => next(error));
// });
