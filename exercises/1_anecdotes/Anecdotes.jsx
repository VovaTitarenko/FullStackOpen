import { useState } from "react";
import Button from "../../frontend-notesApp/src/components/Button.jsx";
import Anec from "./AnecdotesComponent.jsx";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  });
  const [bestAnec, setBestAnec] = useState(0);

  function selectNew() {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  }

  function upvote() {
    // console.log(selected);
    // console.log(votes);
    const newVotes = { ...votes };
    newVotes[selected] = votes[selected] + 1;
    setVotes(newVotes);
    // console.log(newVotes);
    const newBestAnec =
      votes[selected] >= votes[bestAnec] - 1 ? selected : bestAnec;
    // console.log(newBestAnec);
    setBestAnec(newBestAnec);
    // console.log(bestAnec);
  }

  console.log("rerendering...");

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anec anecdote={anecdotes[selected]} votesCount={votes[selected]} />
      <Button onClick={selectNew} text="next anecdote" />
      <Button onClick={upvote} text="upvote" />
      <h1>Anecdote with the most votes</h1>
      <Anec anecdote={anecdotes[bestAnec]} votesCount={votes[bestAnec]} />
    </div>
  );
};

export default App;
