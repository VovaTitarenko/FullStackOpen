import { z } from "zod";

export enum Weather {
  Sunny = "sunny",
  Rainy = "rainy",
  Cloudy = "cloudy",
  Windy = "windy",
  Stormy = "stormy",
}

export const WeatherEnum = z.nativeEnum(Weather);

export enum Visibility {
  Great = "great",
  Good = "good",
  Ok = "ok",
  Poor = "poor",
}

export const VisibilityEnum = z.nativeEnum(Visibility);

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, "comment">;

export type NewDiaryEntry = Omit<DiaryEntry, "id">;
