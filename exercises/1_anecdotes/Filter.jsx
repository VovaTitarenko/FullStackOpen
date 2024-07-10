// import { useDispatch } from 'react-redux';
// import { filterAnecdotesBy } from './reducers/filterReducer';

const Filter = ({ value, handleChange }) => {
  //   const dispatch = useDispatch();
  const style = {
    marginBottom: 10,
  };
  //   const handleChange = (e) => {
  //     dispatch(filterAnecdotesBy(e.target.value));
  //   };

  return (
    <div style={style}>
      filter <input value={value} onChange={handleChange} />
    </div>
  );
};

export default Filter;
