import express from "express";
import diaryService from "../services/diaryService";
import { DiaryEntry, NewDiaryEntry } from "../types";
import toNewDiaryEntry from "../utils/utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(diaryService.getNonSensitiveEntries());
});

router.get("/:id", (_req, res) => {
  const diary = diaryService.findById(Number(_req.params.id));
  if (diary) {
    res.send(diary);
  } else {
    res.status(404).end();
  }
});

router.post("/", (_req, res) => {
  try {
    const newDiaryEntry: NewDiaryEntry = toNewDiaryEntry(_req.body);
    const addedEntry: DiaryEntry = diaryService.addDiary(newDiaryEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
