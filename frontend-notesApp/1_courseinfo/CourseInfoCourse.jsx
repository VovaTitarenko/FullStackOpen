import Header from "./CourseInfoHeader";
import Content from "./CourseInfoContent";
import Total from "./CourseInfoTotal";

function Course({ course }) {
  return (
    <div>
      <Header coursename={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
}

export default Course;
