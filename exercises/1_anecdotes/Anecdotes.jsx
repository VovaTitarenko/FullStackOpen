import { useSelector, useDispatch } from 'react-redux';
import AnecdoteForm from './AnecdoteForm.jsx';
import AnecdoteList from './AnecdoteList.jsx';
import Filter from './Filter.jsx';
import { filterAnecdotesBy } from './reducers/filterReducer.js';

const App = () => {
  let anecdoteStore = useSelector((state) => state);
  const dispatch = useDispatch();

  let filterRegexp = new RegExp(`.*${anecdoteStore.filter}`, 'i');
  let anecdotes = anecdoteStore.anecdotes.filter((an) =>
    filterRegexp.test(an.content),
  );

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    dispatch(filterAnecdotesBy(event.target.value));
  };

  console.log('rerendering...');
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteForm />
      <Filter
        value={anecdoteStore.filter}
        handleChange={(e) => handleFilterChange(e)}
      />
      <AnecdoteList anecdotes={anecdotes} />
    </div>
  );
};

export default App;
