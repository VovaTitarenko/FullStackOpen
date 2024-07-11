import { useDispatch } from 'react-redux';
import { createAnecdote } from './reducers/anecdoteReducer';
import { setNotification } from './reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';

    dispatch(createAnecdote(content));
    dispatch(setNotification('You added an anecdote!', 3));
  };

  return (
    <form onSubmit={(e) => addAnecdote(e)}>
      <input name="anecdote" />
      <button type="submit">add</button>
    </form>
  );
};

export default AnecdoteForm;
