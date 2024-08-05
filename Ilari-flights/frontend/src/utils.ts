import { z } from "zod";
import { VisibilityEnum, WeatherEnum } from "./types";

export const parseDate = (date: unknown): string => {
  try {
    return z.string().date().parse(date);
  } catch (error: unknown) {
    throw new Error(
      `Incorrect or missing date: "${date}". Should be of form "YYYY-MM-DD"`,
    );
  }
};

export const parseWeather = (value: string) => {
  return WeatherEnum.parse(value);
};

export const parseVisibility = (value: string) => {
  return VisibilityEnum.parse(value);
};

export const parseComment = (comment: unknown): string => {
  try {
    return z.string().trim().min(1).parse(comment);
  } catch (error) {
    throw new Error("Incorrect or missing comment");
  }
};

// const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
//   if (!object || typeof object !== "object") {
//     throw new Error("Incorrect or missing data");
//   }

//   if (
//     "comment" in object &&
//     "date" in object &&
//     "weather" in object &&
//     "visibility" in object
//   ) {
//     const newEntry: NewDiaryEntry = {
//       date: parseDate(object.date),
//       weather: parseWeather(object.weather) as Weather,
//       visibility: parseVisibility(object.visibility) as Visibility,
//       comment: parseComment(object.comment),
//     };

//     return newEntry;
//   }
//   throw new Error("Incorrect data: some fields are missing");
// };

// export default toNewDiaryEntry;
