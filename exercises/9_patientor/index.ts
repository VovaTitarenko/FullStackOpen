import express from "express";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Welcome to Patientor app!");
});

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.get("/vovka", (_req, res) => {
  res.send("Privet, Vovka!");
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Patientor server now works on port: ${PORT}`);
});
