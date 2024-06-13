function Anec({ anecdote, votesCount }) {
  return (
    <>
      <div>{anecdote}</div>
      <div style={{ color: "gray" }}>has {votesCount} votes</div>
    </>
  );
}

export default Anec;
