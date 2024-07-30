import express from "express";
import patientService from "../services/patientService";
import diagnosisService from "../services/diagnosisService";

const app = express.Router();

app.get("/patients", (_req, res) => {
  res.send(patientService.getPatients());
});

app.get("/diagnoses", (_req, res) => {
  res.send(diagnosisService.getDiagnoses());
});

app.get("/ping", (_req, res) => {
  res.send("pong");
});

export default app;
