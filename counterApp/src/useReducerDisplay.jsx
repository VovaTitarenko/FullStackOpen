import { useCounterValue } from "./useReducerCounterContext";

export default function Display() {
  const counter = useCounterValue();
  return <div>{counter}</div>;
}
