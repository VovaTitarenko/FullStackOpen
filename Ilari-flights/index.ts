import express from "express";

const app = express();

app.use(express.json());

app.get("/ping", (_req, res) => {
  res.send("pong");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`The Ilari flight app now works on port: ${PORT}`);
});
