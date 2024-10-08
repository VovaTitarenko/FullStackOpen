import express from "express";
import patientService from "../services/patientService";
import diagnosisService from "../services/diagnosisService";
import { Entry, EntryWithoutId, NonSensitivePatient, PatientFormValues } from "../types";
import utils from "../utils";
import { ZodError } from "zod";

const app = express.Router();

app.get("/patients", (_req, res) => {
  res.send(patientService.getPatients());
});

app.get("/patients/:id", (_req, res) => {
  const id = _req.params.id;
  res.send(patientService.getPatientById(id));
});

app.post("/patients", (_req, res) => {
  try {
    const content: PatientFormValues = utils.toNewPatient(_req.body);
    const addedPatient: NonSensitivePatient = patientService.addPatient(content);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

app.post("/patients/:id/entries", (_req, res) => {
  try {
    const content: EntryWithoutId = utils.toNewEntry(_req.body);
    const patientId: string = _req.params.id;
    const addedPatientEntry: Entry = patientService.addPatientEntry(patientId, content);
    res.json(addedPatientEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof ZodError) {
      errorMessage = error.issues[0].message;
    }
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
