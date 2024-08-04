import Chapter from "./Chapter";
import { CoursePart } from "./types";

const Contents = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map((part) => (
        <Chapter key={part.name} {...part} />
      ))}
    </div>
  );
};

export default Contents;
