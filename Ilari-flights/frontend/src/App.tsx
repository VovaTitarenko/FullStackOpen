import React, { useEffect, useState } from "react";
// import "./App.css";
import { NewDiaryEntry, VisibilityEnum, WeatherEnum } from "./types";
import axios from "axios";
import EntryList from "./EntryList";
import {
  parseComment,
  parseDate,
  parseVisibility,
  parseWeather,
} from "./utils";
import ErrorNotification from "./ErrorNotification";
import { ZodError } from "zod";
import RadioField from "./RadioField";

function App() {
  const [entries, setEntries] = useState([]);
  const [date, setDate] = useState("");
  const [weather, setWeather] = useState("");
  const [visibility, setVisibility] = useState("");
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3002/api/diaries")
      .then((res) => setEntries(res.data));
  }, []);

  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    try {
      const newEntry: NewDiaryEntry = {
        date: parseDate(date),
        weather: parseWeather(weather),
        visibility: parseVisibility(visibility),
        comment: parseComment(comment),
      };
      axios.post("http://localhost:3002/api/diaries", newEntry).then((res) => {
        setEntries(entries.concat(res.data));
      });
      setDate("");
      setWeather("");
      setVisibility("");
      setComment("");
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        setErrorMessage(error.issues[0].message);
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      } else if (error instanceof Error) {
        setErrorMessage(error.message);
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      } else {
        setErrorMessage(`Something went wrong`);
        console.log(error);
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      }
    }
  };

  return (
    <>
      <h2>Add a new diary entry:</h2>
      {errorMessage && <ErrorNotification text={errorMessage} />}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date: </label>
          <input
            type="date"
            value={date}
            onChange={({ target }) => {
              setDate(target.value);
            }}
          />
        </div>
        <RadioField
          category="weather"
          radioValues={Object.values(WeatherEnum.enum)}
          state={weather}
          setState={setWeather}
        />
        <RadioField
          category="visibility"
          radioValues={Object.values(VisibilityEnum.enum)}
          state={visibility}
          setState={setVisibility}
        />
        <div>
          <label>Comment: </label>
          <input
            value={comment}
            onChange={({ target }) => {
              setComment(target.value);
            }}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <EntryList entries={entries} />
    </>
  );
}

export default App;
