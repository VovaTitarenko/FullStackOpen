import { useDispatch } from 'react-redux';
import { upvoteAnecdote } from './reducers/anecdoteReducer.js';
import Anec from './AnecdotesComponent';
import {
  hideNotification,
  showNotification,
} from './reducers/notificationReducer.js';

const AnecdoteList = ({ anecdotes }) => {
  const dispatch = useDispatch();

  const upvote = (anecId) => {
    dispatch(upvoteAnecdote(anecId));
    dispatch(showNotification(`You upvoted anecdote #${anecId}!`));
    setTimeout(() => {
      dispatch(hideNotification());
    }, 3000);
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
