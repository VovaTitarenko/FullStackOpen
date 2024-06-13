//IMPORTING DEPENDENCIES
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const Number = require("./models/number");
const app = express();
//ADDING MIDDLEWARE AND UTILITIES
app.use(cors());
app.use(express.json());
app.use(express.static("dist"));
app.use(
  morgan(function (tokens, req, res) {
    if (tokens.method(req, res) === "POST") {
      return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, "content-length"),
        "-",
        tokens["response-time"](req, res),
        "ms",
        JSON.stringify(req.body),
      ].join(" ");
    } else {
      return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, "content-length"),
        "-",
        tokens["response-time"](req, res),
        "ms",
      ].join(" ");
    }
  })
);

// const requestLogger = (request, response, next) => {
//   console.log("Method:", request.method);
//   console.log("Path:  ", request.path);
//   console.log("Body:  ", request.body);
//   console.log("---");
//   next();
// };

// app.use(requestLogger);

//HTTP-VERB ROUTES
app.get("/api/persons", (request, response, next) => {
  Number.find({})
    .then((persons) => response.json(persons))
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (request, response, next) => {
  Number.findById(request.params.id)
    .then((result) => {
      response.json(result);
    })
    .catch((error) => {
      console.log(
        "No such id found in Database. Error message:",
        error.message
      );
      next(error);
    });
});

app.get("/info", (request, response, next) => {
  Number.countDocuments({})
    .then((count) => {
      response.send(
        `<p>Phonebook has info for ${count} people.</p><p>${new Date()}</p>`
      );
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
  if (!request.body.name) {
    return response.status(400).json({
      error: "Name missing!",
    });
  }
  if (!request.body.number) {
    return response.status(400).json({
      error: "Number missing!",
    });
  }
  let sameName = {};
  Number.find({ name: request.body.name })
    .then((result) => {
      sameName = result;
    })
    .catch((error) => {
      console.log("error finding person with the entered name", error.message);
    });
  if (sameName.name) {
    return response.status(400).json({
      error: "The name already exists in the phonebook!",
    });
  }
  const person = new Number({
    name: request.body.name,
    number: request.body.number,
  });
  person
    .save()
    .then((savedNumber) => {
      response.json(savedNumber);
    })
    .catch((error) => {
      console.log("caught error:", error.message);
      next(error);
    });
});

app.put("/api/persons/:id", (request, response, next) => {
  const person = {
    name: request.body.name,
    number: request.body.number,
  };
  Number.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  Number.findByIdAndDelete(request.params.id)
    .then((deletedNote) => {
      console.log("Note successfully deleted!");
      response.status(204).end();
    })
    .catch((error) => next(error));
});
//DEFAULT RESPONSE TO WRONG ENDPOINT
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);
//ERROR-HANDLING MIDDLEWARE IN THE END
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);
//LISTENING TO PORT
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`The Phonebook app is now working on port: ${PORT}`);
});
