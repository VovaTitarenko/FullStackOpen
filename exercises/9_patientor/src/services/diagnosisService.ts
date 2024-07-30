import diagnoses from "../../data/diagnoses";
import { Diagnosis } from "../types";

const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

const addDiagnosis = (d: Diagnosis): void => {
  console.log(`i added a diagnosis ${d}`);
};

export default { getDiagnoses, addDiagnosis };
