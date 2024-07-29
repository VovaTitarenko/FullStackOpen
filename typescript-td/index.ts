import { simpleBmiCalculate } from "./bmiCalculator";
import express from "express";
import { calculate, Operation } from "./calculator";
const app = express();

app.get("/ping", (_req, res) => {
  res.send("pong. Mi tut ochen hui!");
});

app.get("/hello", (_req, res) => {
  res.send("Hello, FullStack!");
});

app.get("/bmi", (_req, res) => {
  const weight = Number(_req.query.weight);
  const height = Number(_req.query.height);
  const bmi: string =
    weight && height
      ? simpleBmiCalculate(weight, height)
      : "Not enough data to tell.";
  res.json({ weight, height, bmi });
});

app.post("/calculate", (_req, res) => {
  const { value1, value2, op } = _req.body as {
    value1: number;
    value2: number;
    op: Operation;
  };
  if (!value1 || isNaN(Number(value1))) {
    return res.status(400).send({ error: "missing value1 of proper type" });
  }
  if (!value2 || isNaN(Number(value2))) {
    return res.status(400).send({ error: "missing value2 of proper type" });
  }
  if (!op) {
    return res.status(400).send({ error: "missing operation" });
  }
  const result = calculate(Number(value1), Number(value2), op);
  res.send({ result });
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
