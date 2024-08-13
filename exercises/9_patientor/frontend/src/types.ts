// All types are present in the 'frontend' directory, expect for 'Entry'. Check how synched they are.

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

interface EntryBase {
  id: string;
  date: string;
  description: string;
  specialist: string;
}

export enum HealthCheckRating {
  Healthy = 0,
  LowRisk = 1,
  HighRisk = 2,
  CriticalRisk = 3,
}

interface Discharge {
  date: string;
  criteria: string;
}

interface Admission {
  date: string;
  criteria: string;
}

interface SickLeave {
  startDate: string;
  endDate: string;
}

interface OccupationalHealthcareEntry extends EntryBase {
  type: "OccupationalHealthcare";
  employerName: string;
  diagnosisCodes?: Diagnosis["code"][];
  sickLeave?: SickLeave;
}

interface HospitalEntry extends EntryBase {
  type: "Hospital";
  diagnosisCodes: Diagnosis["code"][];
  admission?: Admission;
  discharge?: Discharge;
}

interface HealthCheckEntry extends EntryBase {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export type Entry = OccupationalHealthcareEntry | HospitalEntry | HealthCheckEntry;

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn: string;
  dateOfBirth: string;
  entries: Entry[];
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, "id">;

export const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};
