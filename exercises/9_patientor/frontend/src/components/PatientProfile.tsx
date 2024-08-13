import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assertNever, Diagnosis, Entry, Patient } from "../types";
import { apiBaseUrl } from "../constants";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";
import HospitalEntry from "./HospitalEntry";
import HealthCheckEntry from "./HealthCheckEntry";
import AddEntryForm from "./AddEntryForm";

const PatientProfile = () => {
  const [patientInfo, setPatientInfo] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null);
  const { id } = useParams();
  useEffect(() => {
    console.log("Vova molodets!");
    axios
      .get(`${apiBaseUrl}/patients/${id}`)
      .then((res) => setPatientInfo(res.data))
      .catch((error) => {
        console.log(error.message);
      });
    axios
      .get(`${apiBaseUrl}/diagnoses`)
      .then((res) => setDiagnoses(res.data))
      .catch((error) => console.log(error.message));
  }, []);

  const getDiagnosisName = (code: string): string => {
    if (!diagnoses || !code) {
      throw new Error("Diagnoses data or code missing!");
    }
    return diagnoses.filter((d) => d.code === code)[0].name;
  };

  if (!patientInfo || !diagnoses) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1>
        {patientInfo.name} - {patientInfo.gender}
      </h1>
      <p>Date of birth: {patientInfo.dateOfBirth}</p>
      <p>SSN: {patientInfo.ssn}</p>
      <p>Occupation: {patientInfo.occupation}</p>
      <AddEntryForm
        patientId={id}
        diagnoses={diagnoses}
        updatePatientEntries={(newEntry: Entry) => {
          const updatedPatientInfo = { ...patientInfo, entries: patientInfo.entries.concat(newEntry) };
          setPatientInfo(updatedPatientInfo);
        }}
      />
      <h3>Entries:</h3>
      {patientInfo.entries.map((entry) => {
        // console.log(patientInfo);
        // console.log(entry.type, entry.type === "HealthCheck");
        if (!entry || !entry.type) {
          throw new Error("Something went wrong with entry.type. Go check.");
        }
        switch (entry.type) {
          case "OccupationalHealthcare":
            return <OccupationalHealthcareEntry key={entry.id} entry={entry} getDiagnosisName={getDiagnosisName} />;
          case "Hospital":
            return <HospitalEntry key={entry.id} entry={entry} getDiagnosisName={getDiagnosisName} />;
          case "HealthCheck":
            return <HealthCheckEntry key={entry.id} entry={entry} />;
          default:
            console.log("01: Fires off error because entry.type didn't get caught!");
            return assertNever(entry);
        }
      })}
    </div>
  );
};

export default PatientProfile;
