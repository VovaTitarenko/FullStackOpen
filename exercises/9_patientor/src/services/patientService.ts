import patients from "../../data/patients";
import { Patient } from "../types";

const getPatients = (): Omit<Patient, "ssn">[] => {
  return patients.map(({ id, name, occupation, gender, dateOfBirth }) => ({
    id,
    name,
    occupation,
    gender,
    dateOfBirth,
  }));
};

const addPatient = (d: Patient): void => {
  console.log(`i added a patient ${d}`);
};

export default { getPatients, addPatient };
