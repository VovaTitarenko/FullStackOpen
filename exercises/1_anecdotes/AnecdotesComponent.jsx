import Button from './Button.jsx';

function Anec({ anecdote, upvote }) {
  return (
    <>
      <div>{anecdote.content}</div>
      <div style={{ color: 'gray' }}>
        has {anecdote.votes} votes
        <Button onClick={() => upvote(anecdote)} text="upvote" />
      </div>
    </>
  );
}

export default Anec;
