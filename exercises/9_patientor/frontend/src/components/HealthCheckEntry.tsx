import { Entry } from "../types";

const HealthCheckEntry = ({ entry }: { entry: Entry }) => {
  return (
    <div style={{ border: "2px solid black", borderRadius: 8 }}>
      <h3>Health Check</h3>
      {entry.date}: ({entry.specialist}) {entry.description}
    </div>
  );
};

export default HealthCheckEntry;
