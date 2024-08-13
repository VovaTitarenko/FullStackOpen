import { Entry, EntryWithoutId, Gender, HealthCheckRating, PatientFormValues } from "./types";
import { string, z } from "zod";

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

  if ("name" in object && "occupation" in object && "gender" in object && "dateOfBirth" in object && "ssn" in object) {
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

const EntryBase = z.object({
  id: z.string().min(4),
  date: z.string().date(),
  description: z.string().trim().min(4),
  specialist: z.string().trim().min(4),
});

const EntrySchema = z.discriminatedUnion("type", [
  EntryBase.extend({
    type: z.literal("Hospital"),
    diagnosisCodes: z.string().array(),
    discharge: z
      .object({
        date: z.string().date(),
        criteria: z.string().trim().min(4),
      })
      .optional(),
    admission: z
      .object({
        date: z.string().date(),
        criteria: z.string().trim().min(4),
      })
      .optional(),
  }),
  EntryBase.extend({
    type: z.literal("OccupationalHealthcare"),
    employerName: string(),
    diagnosisCodes: z.string().array().optional(),
    sickLeave: z
      .object({
        startDate: z.string().date(),
        endDate: z.string().date(),
      })
      .optional(),
  }),
  EntryBase.extend({
    type: z.literal("HealthCheck"),
    healthCheckRating: z.nativeEnum(HealthCheckRating),
  }),
]);

const NewEntrySchema = z.discriminatedUnion("type", [
  EntryBase.omit({ id: true }).extend({
    type: z.literal("Hospital"),
    diagnosisCodes: z.string().array(),
    discharge: z
      .object({
        date: z.string().date(),
        criteria: z.string().trim().min(4),
      })
      .optional(),
    admission: z
      .object({
        date: z.string().date(),
        criteria: z.string().trim().min(4),
      })
      .optional(),
  }),
  EntryBase.omit({ id: true }).extend({
    type: z.literal("OccupationalHealthcare"),
    employerName: string(),
    diagnosisCodes: z.string().array().optional(),
    sickLeave: z
      .object({
        startDate: z.string().date(),
        endDate: z.string().date(),
      })
      .optional(),
  }),
  EntryBase.omit({ id: true }).extend({
    type: z.literal("HealthCheck"),
    healthCheckRating: z.nativeEnum(HealthCheckRating),
  }),
]);

const toNewEntry = (object: unknown): EntryWithoutId => {
  return NewEntrySchema.parse(object);
};

const parseEntry = (object: unknown): Entry => {
  return EntrySchema.parse(object);
};

export default { toNewPatient, toNewEntry, parseEntry };
