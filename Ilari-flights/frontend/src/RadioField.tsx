const RadioField = (props: {
  category: string;
  radioValues: string[];
  state: string;
  setState: (arg: string) => void;
}) => {
  return (
    <div>
      <label>
        {props.category
          .split("")
          .map((letter, index) => (index === 0 ? letter.toUpperCase() : letter))
          .join("")}
      </label>
      <div>
        {props.radioValues.map((value) => (
          <span key={value}>
            <input
              type="radio"
              checked={props.state === value}
              name={props.category}
              id={value}
              value={value}
              onChange={({ target }) => {
                props.setState(target.value);
              }}
            />
            <label htmlFor={value}>{value}</label>
          </span>
        ))}
      </div>
    </div>
  );
};

export default RadioField;
