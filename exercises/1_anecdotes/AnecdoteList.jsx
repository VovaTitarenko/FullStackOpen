import { useDispatch } from 'react-redux';
import { upvoteAnecdoteInDb } from './reducers/anecdoteReducer.js';
import Anec from './AnecdotesComponent';
import { setNotification } from './reducers/notificationReducer.js';

const AnecdoteList = ({ anecdotes }) => {
  const dispatch = useDispatch();

  const upvote = (anecId) => {
    dispatch(upvoteAnecdoteInDb(anecId));
    dispatch(setNotification(`You upvoted anecdote #${anecId}!`, 3));
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
