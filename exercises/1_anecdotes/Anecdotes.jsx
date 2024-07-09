import { useSelector } from 'react-redux';
import AnecdoteForm from './AnecdoteForm.jsx';
import AnecdoteList from './AnecdoteList.jsx';

const App = () => {
  const anecdotes = useSelector((state) => state);
  console.log('rerendering...');
  const timestampType = typeof new Date('1720531149560').toDateString();
  const timestampContent = new Date(1720531149560).toDateString();
  const now = Date.now();

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteForm />
      <AnecdoteList anecdotes={anecdotes} />
      {now.toString()}
    </div>
  );
};

export default App;
