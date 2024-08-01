import { NewDiaryEntry, Visibility, Weather } from "../types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

const parseComment = (comment: unknown): string => {
  if (!comment || !isString(comment)) {
    throw new Error("Incorrect or missing comment");
  }
  return comment;
};

const isWeather = (value: string): value is Weather => {
  return Object.values(Weather)
    .map((item) => item.toString())
    .includes(value);
};

const parseWeather = (weather: unknown): string => {
  if (!weather || !isString(weather) || !isWeather(weather)) {
    throw new Error("Incorrect or missing weather");
  }
  return weather;
};

const isVisibility = (value: string): value is Visibility => {
  return Object.values(Visibility)
    .map((item) => item.toString())
    .includes(value);
};

const parseVisibility = (visibility: unknown): string => {
  if (!visibility || !isString(visibility) || !isVisibility(visibility)) {
    throw new Error("Incorrect or missing visibility");
  }
  return visibility;
};

const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "comment" in object &&
    "date" in object &&
    "weather" in object &&
    "visibility" in object
  ) {
    const newEntry: NewDiaryEntry = {
      date: parseDate(object.date),
      weather: parseWeather(object.weather) as Weather,
      visibility: parseVisibility(object.visibility) as Visibility,
      comment: parseComment(object.comment),
    };

    return newEntry;
  }
  throw new Error("Incorrect data: some fields are missing");
};

export default toNewDiaryEntry;
