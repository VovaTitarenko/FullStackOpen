const Filter = ({ value, handleChange }) => {
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input value={value} onChange={handleChange} />
    </div>
  );
};

export default Filter;
