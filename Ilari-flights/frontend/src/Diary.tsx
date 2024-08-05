import { NonSensitiveDiaryEntry } from "./types";

const Diary = (props: NonSensitiveDiaryEntry) => {
  return (
    <div>
      <p>
        <b>{props.date}</b>
      </p>
      <p>visibility: {props.visibility}</p>
      <p>weather: {props.weather}</p>
    </div>
  );
};

export default Diary;
