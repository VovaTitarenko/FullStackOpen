const Part = ({ partInfo }) => {
  console.log(partInfo);
  return (
    <p>
      <i>{partInfo.name}</i> {partInfo.exercises}
    </p>
  );
};

export default Part;
