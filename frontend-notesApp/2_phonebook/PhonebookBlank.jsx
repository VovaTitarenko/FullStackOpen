function Blank({ name, value, onChange }) {
  return (
    <label>
      {name} <input value={value} onChange={onChange} />
    </label>
  );
}

export default Blank;
