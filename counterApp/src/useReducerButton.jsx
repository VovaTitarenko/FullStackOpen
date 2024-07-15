import { useCounterDispatch } from "./useReducerCounterContext";

export default function Button({ type, label }) {
  const dispatch = useCounterDispatch();
  return <button onClick={() => dispatch({ type })}>{label}</button>;
}
