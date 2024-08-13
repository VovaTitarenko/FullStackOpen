import React, { useState } from "react";
import useField from "../hooks/useField";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { assertNever, Diagnosis, Entry, EntryWithoutId, HealthCheckRating } from "../types";
import { ZodError } from "zod";

const AddEntryForm = ({
  patientId,
  diagnoses,
  updatePatientEntries,
}: {
  patientId: string | undefined;
  diagnoses: Diagnosis[];
  updatePatientEntries: (obj: Entry) => void;
}) => {
  const [type, setType] = useState<"OccupationalHealthcare" | "Hospital" | "HealthCheck">("HealthCheck");
  const { reset: resetDate, ...date } = useField("date");
  const { reset: resetDescription, ...description } = useField("text");
  const { reset: resetSpecialist, ...specialist } = useField("text");
  const [hcr, setHCR] = useState<HealthCheckRating>(0);
  const { reset: resetEmployerName, ...employerName } = useField("text");
  const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis["code"][]>([diagnoses[0].code]);
  const { reset: resetStartDate, ...startDate } = useField("date");
  const { reset: resetEndDate, ...endDate } = useField("date");
  const [hospitalEntryType, setHospitalEntryType] = useState<"Admission" | "Discharge">("Admission");
  const { reset: resetAdmissionDate, ...admissionDate } = useField("date");
  const [admissionCriteria, setAdmissionCriteria] = useState("");
  const { reset: resetDischargeDate, ...dischargeDate } = useField("date");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const [error, setError] = useState<string | null>(null);

  const handleSubmit: React.FormEventHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      if (!date.value || !description.value || !specialist.value) {
        throw new Error("Missing required fields: date, description or specialist!");
      }
      switch (type) {
        case "OccupationalHealthcare": {
          if (!employerName.value) {
            throw new Error("Missing employer name!");
          }
          let sickLeave;
          if (startDate.value || endDate.value) {
            if (!startDate.value || !endDate.value) {
              throw new Error("Missing one of sick-leave dates!");
            }
            sickLeave = { startDate: startDate.value, endDate: endDate.value };
          }
          const newEntry: EntryWithoutId = {
            date: date.value,
            description: description.value,
            specialist: specialist.value,
            type: type,
            employerName: employerName.value,
            diagnosisCodes: undefined || diagnosisCodes,
            sickLeave,
          };
          const createdEntry: Entry = await axios
            .post(`${apiBaseUrl}/patients/${patientId}/entries`, newEntry)
            .then((res) => res.data);
          updatePatientEntries(createdEntry);
          resetDate();
          resetDescription();
          resetSpecialist();
          resetEmployerName();
          setDiagnosisCodes([diagnoses[0].code]);
          resetStartDate();
          resetEndDate();
          setType("HealthCheck");
          break;
        }
        case "Hospital": {
          if (hospitalEntryType === "Admission") {
            if (!admissionDate.value) {
              throw new Error("Missing admission date.");
            }
            const newEntry: EntryWithoutId = {
              date: date.value,
              description: description.value,
              specialist: specialist.value,
              type: type,
              diagnosisCodes: undefined || diagnosisCodes,
              admission: { date: admissionDate.value, criteria: admissionCriteria },
            };
            const createdEntry: Entry = await axios
              .post(`${apiBaseUrl}/patients/${patientId}/entries`, newEntry)
              .then((res) => res.data);
            updatePatientEntries(createdEntry);
          } else {
            if (!dischargeDate.value) {
              throw new Error("Missing discharge date.");
            }
            const newEntry: EntryWithoutId = {
              date: date.value,
              description: description.value,
              specialist: specialist.value,
              type: type,
              diagnosisCodes: undefined || diagnosisCodes,
              discharge: { date: dischargeDate.value, criteria: dischargeCriteria },
            };
            const createdEntry: Entry = await axios
              .post(`${apiBaseUrl}/patients/${patientId}/entries`, newEntry)
              .then((res) => res.data);
            updatePatientEntries(createdEntry);
          }
          resetDate();
          resetDescription();
          resetSpecialist();
          resetAdmissionDate();
          setAdmissionCriteria("");
          resetDischargeDate();
          setDischargeCriteria("");
          setType("HealthCheck");
          break;
        }
        case "HealthCheck": {
          const newEntry: EntryWithoutId = {
            date: date.value,
            description: description.value,
            specialist: specialist.value,
            type: type,
            healthCheckRating: hcr,
          };
          const createdEntry: Entry = await axios
            .post(`${apiBaseUrl}/patients/${patientId}/entries`, newEntry)
            .then((res) => res.data);
          updatePatientEntries(createdEntry);
          resetDate();
          resetDescription();
          resetSpecialist();
          setHCR(0);
          setType("HealthCheck");
          break;
        }
        default:
          return assertNever(type);
      }
    } catch (exception: unknown) {
      if (exception instanceof ZodError) {
        const errorMessage = exception.issues[0].message;
        setError(errorMessage);
        console.log(errorMessage);
        setTimeout(() => {
          setError(null);
        }, 5000);
      } else if (exception instanceof Error) {
        setError(exception.message);
        console.log(exception.message);
        setTimeout(() => {
          setError(null);
        }, 5000);
      } else {
        setError("Something went wrong.");
        console.log("Something went wrong.");
        setTimeout(() => {
          setError(null);
        }, 5000);
      }
    }
  };

  if (!patientId) {
    return <div>Missing patientId... Reload the page if nothing changes.</div>;
  }

  return (
    <div style={{ border: "2px dotted green" }}>
      <h4>New Entry</h4>
      {error && <div style={{ backgroundColor: "crimson" }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">Date: </label>
          <input name="date" data-testid="date" {...date} />
        </div>
        <div>
          <label htmlFor="description">Description: </label>
          <input name="description" data-testid="description" {...description} />
        </div>
        <div>
          <label htmlFor="specialist">Specialist: </label>
          <input name="specialist" data-testid="specialist" {...specialist} />
        </div>

        <label htmlFor="types">Choose entry type:</label>
        <select
          value={type}
          onChange={({ target }) => {
            if (
              target.value === "HealthCheck" ||
              target.value === "Hospital" ||
              target.value === "OccupationalHealthcare"
            ) {
              setType(target.value);
            } else {
              throw new Error("Wrong entry type.");
            }
          }}
          id="types"
          name="types"
        >
          <option value="HealthCheck">Health Check</option>
          <option value="OccupationalHealthcare">Occupational Healthcare</option>
          <option value="Hospital">Hospital</option>
        </select>
        {(() => {
          switch (type) {
            case "HealthCheck":
              return (
                <div>
                  <label htmlFor="hcr">Health Check Rating: </label>
                  <select
                    defaultValue={hcr}
                    name="hcr"
                    data-testid="hcr"
                    onChange={({ target }) => {
                      setHCR(Number(target.value));
                    }}
                  >
                    <option value={HealthCheckRating.Healthy}>0</option>
                    <option value={HealthCheckRating.LowRisk}>1</option>
                    <option value={HealthCheckRating.HighRisk}>2</option>
                    <option value={HealthCheckRating.CriticalRisk}>3</option>
                  </select>
                  {(() => {
                    switch (hcr) {
                      case 0:
                        return <span style={{ color: "green" }}>Healthy</span>;
                      case 1:
                        return <span style={{ color: "gold" }}>LowRisk</span>;
                      case 2:
                        return <span style={{ color: "orange" }}>HighRisk</span>;
                      case 3:
                        return <span style={{ color: "red" }}>CriticalRisk</span>;
                    }
                  })()}
                </div>
              );
            case "Hospital":
              return (
                <div>
                  <div>
                    <label>Diagnosis Codes:</label>
                    <select
                      name="diagnoses"
                      data-testid="diagnoses"
                      onChange={({ target }) => {
                        setDiagnosisCodes([target.value]);
                      }}
                    >
                      {diagnoses.map((d) => (
                        <option key={d.code} value={d.code}>
                          {d.code} {d.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label>Choose reason for entry:</label>
                    <select
                      name="hospitalEntry"
                      data-testid="hospitalEntry"
                      onChange={({ target }) => {
                        if (target.value === "Admission" || target.value === "Discharge") {
                          setHospitalEntryType(target.value);
                        } else {
                          throw new Error("Wrong hospital entry type. Should be either 'Admission' or 'Discharge'");
                        }
                      }}
                    >
                      <option value="Admission">Admission</option>
                      <option value="Discharge">Discharge</option>
                    </select>
                  </div>
                  {(() => {
                    switch (hospitalEntryType) {
                      case "Admission":
                        return (
                          <div>
                            <div>
                              <label>Admission date:</label>
                              <input {...admissionDate} />
                            </div>
                            <div>
                              <label>Admission criteria:</label>
                              <input
                                type="text"
                                value={admissionCriteria}
                                onChange={({ target }) => setAdmissionCriteria(target.value)}
                              />
                            </div>
                          </div>
                        );
                      case "Discharge":
                        return (
                          <div>
                            <div>
                              <label>Discharge date:</label>
                              <input {...dischargeDate} />
                            </div>
                            <div>
                              <label>Discharge criteria:</label>
                              <input
                                type="text"
                                value={dischargeCriteria}
                                onChange={({ target }) => setDischargeCriteria(target.value)}
                              />
                            </div>
                          </div>
                        );
                      default:
                        return assertNever(hospitalEntryType);
                    }
                  })()}
                </div>
              );
            case "OccupationalHealthcare":
              return (
                <div>
                  <div>
                    <label htmlFor="employerName">Employer name: </label>
                    <input name="employerName" data-testid="employerName" {...employerName} />
                  </div>

                  <div>
                    <label>Diagnosis Codes:</label>
                    <select
                      name="diagnoses"
                      data-testid="diagnoses"
                      onChange={({ target }) => {
                        setDiagnosisCodes([target.value]);
                      }}
                    >
                      {diagnoses.map((d) => (
                        <option key={d.code} value={d.code}>
                          {d.code} {d.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label>Sick Leave:</label>
                    <div>
                      <label htmlFor="startDate"> Start Date: </label>
                      <input name="startDate" data-testid="startDate" {...startDate} />
                    </div>
                    <div>
                      <label htmlFor="endDate"> End Date: </label>
                      <input name="endDate" data-testid="endDate" min={startDate.value} {...endDate} />
                    </div>
                  </div>
                </div>
              );
            default:
              return assertNever(type);
          }
        })()}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddEntryForm;
