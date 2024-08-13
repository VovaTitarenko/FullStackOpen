import { Entry } from "../types";

const OccupationalHealthcareEntry = ({
  entry,
  getDiagnosisName,
}: {
  entry: Entry;
  getDiagnosisName: (code: string) => string;
}) => {
  return (
    <div style={{ border: "2px solid black", borderRadius: 8 }}>
      <h3>Occupational Healthcare</h3>
      {entry.date}: ({entry.specialist}) {entry.description}
      {entry.type === "OccupationalHealthcare" && (
        <ul>
          {entry.diagnosisCodes?.map((d) => (
            <li key={d}>
              {d} {getDiagnosisName(d)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OccupationalHealthcareEntry;
