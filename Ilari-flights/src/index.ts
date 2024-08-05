import express from "express";
import diaryRouter from "./routes/diaries";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.use("/api/diaries", diaryRouter);

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`The Ilari flight app now works on port: ${PORT}`);
});
