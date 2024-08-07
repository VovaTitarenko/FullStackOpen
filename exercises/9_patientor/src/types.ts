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

export interface Entry {
  patientId: string;
  creationDate: string;
  description: string;
  diagnoses: Diagnosis[];
  specialist: string;
}

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
