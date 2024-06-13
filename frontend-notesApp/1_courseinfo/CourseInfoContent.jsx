import Part from "./CourseInfoPart";

const Content = ({ parts }) => {
  console.log(parts);

  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} partInfo={part} />
      ))}
      {/* <Part p_n={parts[0].name} ex_n={parts[0].exercises} />
      <Part p_n={parts[1].name} ex_n={parts[1].exercises} />
      <Part p_n={parts[2].name} ex_n={parts[2].exercises} /> */}
    </>
  );
};

export default Content;
