import express from "express";
import cors from "cors";
import apiRouter from "./routes/apiRouter";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);

app.get("/", (_req, res) => {
  res.send("Welcome to Patientor app!");
});

app.get("/vovka", (_req, res) => {
  res.send("Privet, Vovka!");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Patientor server now works on port: ${PORT}`);
});

export default app;
