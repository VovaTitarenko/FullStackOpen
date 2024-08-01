import { Gender, PatientFormValues } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (value: string): value is Gender => {
  return Object.values(Gender)
    .map((item) => item.toString())
    .includes(value);
};

const parseName = (name: unknown) => {
  if (!name || !isString(name) || !isNaN(Number(name))) {
    throw new Error(`Incorrect or missing name: ${name}, ${Number(name)}`);
  }
  return name;
};

const parseDateOfBirth = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

const parseGender = (gender: unknown): string => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender");
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation) || !isNaN(Number(occupation))) {
    throw new Error("Incorrect or missing occupation");
  }
  return occupation;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || isNaN(Number(ssn))) {
    throw new Error(`Incorrect or missing ssn; type of ssn: ${typeof ssn}`);
  }
  return `${ssn}`;
};

const toNewPatient = (object: unknown): PatientFormValues => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "occupation" in object &&
    "gender" in object &&
    "dateOfBirth" in object &&
    "ssn" in object
  ) {
    const newEntry: PatientFormValues = {
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      name: parseName(object.name),
      occupation: parseOccupation(object.occupation),
      gender: parseGender(object.gender) as Gender,
      ssn: parseSSN(object.ssn),
    };

    return newEntry;
  }
  throw new Error("Incorrect data: some fields are missing");
};

export default toNewPatient;
