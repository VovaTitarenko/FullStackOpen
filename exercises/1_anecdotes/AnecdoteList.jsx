import { useDispatch } from 'react-redux';
import { upvoteAnecdote } from './reducers/anecdoteReducer.js';
import Anec from './AnecdotesComponent';

const AnecdoteList = ({ anecdotes }) => {
  const dispatch = useDispatch();

  const upvote = (anecdote) => {
    dispatch(upvoteAnecdote(anecdote));
  };

  return (
    <>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((an) => (
          <Anec key={an.id} anecdote={an} upvote={upvote} />
        ))}
    </>
  );
};

export default AnecdoteList;
