import { v4 as uuidv4 } from "uuid";
import patients from "../../data/patients";
import {
  Entry,
  EntryWithoutId,
  NonSensitivePatient,
  Patient,
  PatientFormValues,
} from "../types";

const patientData: Patient[] = patients;

const getPatients = (): NonSensitivePatient[] => {
  return patientData.map(({ id, name, occupation, gender, dateOfBirth }) => ({
    id,
    name,
    occupation,
    gender,
    dateOfBirth,
  }));
};

const getPatientById = (patientId: string): Patient => {
  const requestedPatient = patientData.filter((p) => p.id === patientId)[0];
  return requestedPatient;
};

const addPatient = (patient: PatientFormValues): NonSensitivePatient => {
  const newPatient: Patient = { ...patient, id: uuidv4(), entries: [] };
  patients.push(newPatient);
  console.log(`i added a patient ${newPatient}`);
  const securePatientEntry: NonSensitivePatient = {
    id: newPatient.id,
    name: newPatient.name,
    occupation: newPatient.occupation,
    gender: newPatient.gender,
    dateOfBirth: newPatient.dateOfBirth,
  };
  return securePatientEntry;
};

const addPatientEntry = (patientId: string, entry: EntryWithoutId): Entry => {
  const newEntry: Entry = { id: uuidv4(), ...entry };
  patients.filter((p) => p.id === patientId)[0].entries.push(newEntry);
  console.log(`i added an entry`);
  return newEntry;
};

export default { getPatients, getPatientById, addPatient, addPatientEntry };
