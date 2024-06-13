const Filter = ({ value, onChange }) => {
  return (
    <div>
      filter by: <input value={value} onChange={onChange} />
    </div>
  );
};

export default Filter;
