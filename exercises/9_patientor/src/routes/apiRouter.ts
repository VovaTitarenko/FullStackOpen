import express from "express";
import patientService from "../services/patientService";
import diagnosisService from "../services/diagnosisService";
import { Patient, PatientFormValues } from "../types";
import toNewPatient from "../utils";

const app = express.Router();

app.get("/patients", (_req, res) => {
  res.send(patientService.getPatients());
});

app.post("/patients", (_req, res) => {
  try {
    const content: PatientFormValues = toNewPatient(_req.body);
    const addedPatient: Omit<Patient, "ssn"> =
      patientService.addPatient(content);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

app.get("/diagnoses", (_req, res) => {
  res.send(diagnosisService.getDiagnoses());
});

app.get("/ping", (_req, res) => {
  res.send("pong");
});

export default app;
