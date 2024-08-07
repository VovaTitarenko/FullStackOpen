import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";

const PatientProfile = () => {
  const [patientInfo, setPatientInfo] = useState<Patient | null>(null);
  const { id } = useParams();
  useEffect(() => {
    console.log("Vova molodets!");
    axios
      .get(`${apiBaseUrl}/patients/${id}`)
      .then((res) => setPatientInfo(res.data))
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  if (!patientInfo) {
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
    </div>
  );
};

export default PatientProfile;
