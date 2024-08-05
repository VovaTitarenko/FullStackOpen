import Diary from "./Diary";
import { NonSensitiveDiaryEntry } from "./types";

const EntryList = ({ entries }: { entries: NonSensitiveDiaryEntry[] }) => {
  return (
    <div>
      <h2>Previous entries:</h2>
      {entries.map((diary) => (
        <Diary key={diary.id} {...diary} />
      ))}
    </div>
  );
};

export default EntryList;
