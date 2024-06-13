const Total = ({ parts }) => {
  // console.log(parts);

  const total = parts.reduce((sum, part) => (sum += part.exercises), 0);
  // console.log(total);

  return <h3>Number of exercises {total}</h3>;
};

export default Total;
