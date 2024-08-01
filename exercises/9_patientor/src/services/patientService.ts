import { v4 as uuidv4 } from "uuid";
import patients from "../../data/patients";
import { Patient, PatientFormValues } from "../types";

const getPatients = (): Omit<Patient, "ssn">[] => {
  return patients.map(({ id, name, occupation, gender, dateOfBirth }) => ({
    id,
    name,
    occupation,
    gender,
    dateOfBirth,
  }));
};

const addPatient = (patient: PatientFormValues): Omit<Patient, "ssn"> => {
  const newPatient: Patient = { ...patient, id: uuidv4() };
  patients.push(newPatient);
  console.log(`i added a patient ${newPatient}`);
  const securePatientEntry: Omit<Patient, "ssn"> = {
    id: newPatient.id,
    name: newPatient.name,
    occupation: newPatient.occupation,
    gender: newPatient.gender,
    dateOfBirth: newPatient.dateOfBirth,
  };
  return securePatientEntry;
};

export default { getPatients, addPatient };
