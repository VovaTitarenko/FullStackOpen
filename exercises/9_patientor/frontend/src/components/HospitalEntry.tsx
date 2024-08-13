import { Entry } from "../types";

const HospitalEntry = ({
  entry,
  getDiagnosisName,
}: {
  entry: Entry;
  getDiagnosisName: (code: string) => string;
}) => {
  return (
    <div style={{ border: "2px solid black", borderRadius: 8 }}>
      <h3>Hospital</h3>
      {entry.date}: ({entry.specialist}) {entry.description}
      {entry.type === "Hospital" && (
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

export default HospitalEntry;
