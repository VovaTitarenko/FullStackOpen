import { useDispatch } from 'react-redux';
import { createAnecdote } from './reducers/anecdoteReducer';
import {
  hideNotification,
  showNotification,
} from './reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';

    dispatch(createAnecdote(content));
    dispatch(showNotification('You added an anecdote!'));
    setTimeout(() => {
      dispatch(hideNotification());
    }, 3000);
  };

  return (
    <form onSubmit={addAnecdote}>
      <input name="anecdote" />
      <button type="submit">add</button>
    </form>
  );
};

export default AnecdoteForm;
